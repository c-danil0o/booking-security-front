import {Component, OnInit} from '@angular/core';
import {TableRowSelectEvent} from "primeng/table";
import {OverlayPanel} from "primeng/overlaypanel";
import {Notification} from "../../model/notification-model";
import {NotificationsService} from "../notifications.service";
import {MessageService} from "primeng/api";
import * as Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import {environment} from "../../../env/env";
import {DatePipe} from "@angular/common";
import {KeycloakService} from "../../infrastructure/auth/keycloak.service";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit{
  notifications: Notification[];
  userId: number | null;
  userRole: string;
  private stompClient: Stomp.Client;
  isLoaded: boolean = false;
  isCustomSocketOpened = false;
  notificationVisible: boolean = false;
  notificationSettings: Map<string, boolean> = new Map<string, boolean>([
    ['HOST_REVIEW_NOTIFICATION', false],
    ['ACCOMMODATION_REVIEW_NOTIFICATION', false],
    ['RESERVATION_CANCEL_NOTIFICATION', false],
    ['RESERVATION_REQUEST_NOTIFICATION', false],
    ['RESERVATION_RESPONSE_NOTIFICATION', false],
  ]);
  constructor(private notificationsService: NotificationsService, private keycloakService: KeycloakService, private messageService: MessageService, private datePipe: DatePipe) {
  }

  ngOnInit(): void {
    this.initializeWebSocketConnection()
    this.userId = this.keycloakService.getId();
    this.userRole = this.keycloakService.getRole() || "";
    if (this.userId != null){
      this.notificationsService.findByUserId(this.userId).subscribe({
        next: (notifications: Notification[]) => this.notifications = notifications,
        error: (err) => console.log(err)
      })
     this.getSettings()
    }

  }
  initializeWebSocketConnection() {
    let ws = new SockJS(environment.socket);
    this.stompClient = Stomp.over(ws);
    let that = this;

    this.notificationsService.setStompClient(this.stompClient);
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

  applySettings() {
    let settings: string[] = []
    for (let [key, value] of this.notificationSettings){
      if (value)
        settings.push(key)
    }
    this.notificationsService.applyNotificationSettings(settings, this.userId || -1).subscribe((m) => {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        key: 'bc',
        detail: 'Notification settings updated!',
        life: 2000
      })
    })

  }

  getSettings() {
    this.notificationsService.getUserSettings(this.userId || -1).subscribe((settings) => {
      for (let i = 0; i < settings.length; i++){
        this.notificationSettings.set(settings[i], true);
      }
    });
  }
}
