import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApproveReviewsComponent } from './approve-reviews/approve-reviews.component';
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {SharedModule} from "primeng/api";
import {TableModule} from "primeng/table";
import {DropdownModule} from "primeng/dropdown";
import {FormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    ApproveReviewsComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    InputTextModule,
    SharedModule,
    TableModule,
    DropdownModule,
    FormsModule
  ]
})
export class ReviewsModule { }
