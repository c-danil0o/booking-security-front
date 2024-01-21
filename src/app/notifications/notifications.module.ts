import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from './notification/notification.component';
import {ToastModule} from "primeng/toast";
import {ButtonModule} from "primeng/button";
import {OverlayPanelModule} from "primeng/overlaypanel";
import {TableModule} from "primeng/table";
import {InputSwitchModule} from "primeng/inputswitch";
import {FormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    NotificationComponent
  ],
  exports: [
    NotificationComponent
  ],
  imports: [
    CommonModule,
    ToastModule,
    ButtonModule,
    OverlayPanelModule,
    TableModule,
    InputSwitchModule,
    FormsModule
  ]
})
export class NotificationsModule { }
