import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApproveReviewsComponent } from './approve-reviews/approve-reviews.component';
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {SharedModule} from "primeng/api";
import {TableModule} from "primeng/table";



@NgModule({
  declarations: [
    ApproveReviewsComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    InputTextModule,
    SharedModule,
    TableModule
  ]
})
export class ReviewsModule { }
