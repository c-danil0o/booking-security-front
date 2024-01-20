import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Review} from "../model/review-model";
import {environment} from "../../env/env";
import {Notification} from "../model/notification-model";
import * as Stomp from 'stompjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  private stompClient: Stomp.Client;
  constructor(private httpClient: HttpClient) {

  }
  setStompClient(stompClient: any){
    this.stompClient = stompClient;
  }
  disconnectStompClient():void{
    this.stompClient.disconnect(() => console.log("ws client disconnected!"));
  }
  findByUserId(id: number): Observable<Notification[]>{
    return this.httpClient.get<Notification[]>(environment.apiHost + 'api/notifications/user/' + id)
  }
  removeNotification(id: number): Observable<void>{
    return this.httpClient.delete<void>(environment.apiHost + 'api/notifications/' + id);
  }
  applyNotificationSettings(settings: string[], id: number): Observable<void>{
    return this.httpClient.post<void>(environment.apiHost + 'api/notifications/settings/' + id, settings);
  }
  getUserSettings(id: number): Observable<string[]>{
    return this.httpClient.get<string[]>(environment.apiHost + 'api/notifications/settings/get/' + id );
  }
}
