import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Review} from "../model/review-model";
import {environment} from "../../env/env";
import {Notification} from "../model/notification-model";

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  constructor(private httpClient: HttpClient) {

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
