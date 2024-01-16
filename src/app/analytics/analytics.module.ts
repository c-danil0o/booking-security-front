import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YearAnalyticsComponent } from './year-analytics/year-analytics.component';
import {NgChartsModule} from "ng2-charts";
import {ButtonModule} from "primeng/button";
import {CalendarModule} from "primeng/calendar";
import {DialogModule} from "primeng/dialog";
import {DropdownModule} from "primeng/dropdown";
import {InputTextModule} from "primeng/inputtext";
import {InputTextareaModule} from "primeng/inputtextarea";
import {PaginatorModule} from "primeng/paginator";
import {SharedModule} from "primeng/api";
import {TableModule} from "primeng/table";



@NgModule({
  declarations: [
    YearAnalyticsComponent
  ],
  imports: [
    CommonModule,
    NgChartsModule,
    ButtonModule,
    CalendarModule,
    DialogModule,
    DropdownModule,
    InputTextModule,
    InputTextareaModule,
    PaginatorModule,
    SharedModule,
    TableModule
  ]
})
export class AnalyticsModule { }
