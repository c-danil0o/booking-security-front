import {Component, OnInit} from '@angular/core';
import {TableRowSelectEvent} from "primeng/table";
import {OverlayPanel} from "primeng/overlaypanel";
import {Notification} from "../../model/notification-model";
import {NotificationsService} from "../notifications.service";
import {AuthService} from "../../infrastructure/auth/auth.service";
import {MessageService} from "primeng/api";
import * as Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import {environment} from "../../../env/env";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit{
  notifications: Notification[];
  userId: number | null;
  private stompClient: any;
  isLoaded: boolean = false;
  isCustomSocketOpened = false;
  notificationVisible: boolean = false;
  constructor(private notificationsService: NotificationsService, private authService: AuthService, private messageService: MessageService, private datePipe: DatePipe) {
  }

  ngOnInit(): void {
    this.initializeWebSocketConnection()
    this.userId = this.authService.getId();
    if (this.userId != null){
      this.notificationsService.findByUserId(this.userId).subscribe({
        next: (notifications: Notification[]) => this.notifications = notifications,
        error: (err) => console.log(err)
      })
    }

  }
  initializeWebSocketConnection() {
    let ws = new SockJS(environment.socket);
    this.stompClient = Stomp.over(ws);
    let that = this;

    this.stompClient.connect({}, function () {
      that.isLoaded = true;
      that.openSocket()
    });

  }
  openSocket() {
    if (this.isLoaded) {
      this.isCustomSocketOpened = true;
      this.stompClient.subscribe("/socket-publisher/" + this.userId,  (message: { body: string; }) => {
        this.handleResult(message);
      });
    }
  }
  handleResult(message: { body: string; }){
    if (message.body){
      let notification: Notification = JSON.parse(message.body);
      console.log(message.body)
      this.messageService.add({
        severity: 'success',
        summary: this.datePipe.transform(notification.date, 'dd.MM.yyyy | HH:mm') || '',
        key: 'notification',
        detail: notification.message,
        sticky: true
      });
      this.notificationVisible = true;
      this.refresh();
    }

  }

  removeNotification(id: number) {
    this.notificationsService.removeNotification(id).subscribe((success) => {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        key: 'bc',
        detail: 'Notification dismissed!',
        life: 2000
      });
      this.refresh();
    } )
  }
  refresh(): void{
    this.notificationsService.findByUserId(this.userId || -1).subscribe({
      next: (notifications: Notification[]) => this.notifications = notifications,
      error: (err) => console.log(err)
    })
  }

  openSettings() {

  }

  onClose() {
    this.messageService.clear("notification");
    this.notificationVisible = false;

  }
}
