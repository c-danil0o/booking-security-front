import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsViewComponent } from './reports-view/reports-view.component';
import {ButtonModule} from "primeng/button";
import {DropdownModule} from "primeng/dropdown";
import {SharedModule} from "primeng/api";
import {TableModule} from "primeng/table";
import {DialogModule} from "primeng/dialog";
import {InputTextareaModule} from "primeng/inputtextarea";
import {PaginatorModule} from "primeng/paginator";
import {InputTextModule} from "primeng/inputtext";



@NgModule({
  declarations: [
    ReportsViewComponent
  ],
    imports: [
        CommonModule,
        ButtonModule,
        DropdownModule,
        SharedModule,
        TableModule,
        DialogModule,
        InputTextareaModule,
        PaginatorModule,
        InputTextModule
    ]
})
export class ReportsModule { }
