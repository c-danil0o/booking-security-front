import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccommodationListComponent } from './accommodation-list/accommodation-list.component';
import {ButtonModule} from "primeng/button";
import { RouterModule } from '@angular/router';
import { AccommodationDetailsComponent } from './accommodation-details/accommodation-details.component';
import {HttpClientModule} from "@angular/common/http";
import { AccommodationCardComponent } from './accommodation-card/accommodation-card.component';
import {CardModule} from "primeng/card";
import {PaginatorModule} from "primeng/paginator";
import {InputTextModule} from "primeng/inputtext";
import {ListboxModule} from "primeng/listbox";
import { NewAccommodationComponent } from './new-accommodation/new-accommodation.component';
import {ReactiveFormsModule} from "@angular/forms";
import {CheckboxModule} from "primeng/checkbox";
import {FileUploadModule} from "primeng/fileupload";
import {StyleClassModule} from "primeng/styleclass";
import {SharedModule} from "../shared/shared.module";
import {InputTextareaModule} from "primeng/inputtextarea";



@NgModule({
  declarations: [
    AccommodationListComponent,
    AccommodationDetailsComponent,
    AccommodationCardComponent,
    NewAccommodationComponent,
  ],
  imports: [
    CommonModule, RouterModule, HttpClientModule, CardModule, PaginatorModule, InputTextModule, ListboxModule, ReactiveFormsModule, CheckboxModule, FileUploadModule, StyleClassModule, SharedModule, InputTextareaModule
  ]
})
export class AccommodationsModule { }
