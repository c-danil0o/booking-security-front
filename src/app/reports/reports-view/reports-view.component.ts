import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {MessageService} from "primeng/api";
import {ReportService} from "../report.service";
import {Table} from "primeng/table";
import {Report} from "../../model/report-model";
import {ReportView} from "../../model/report-view-model";
import {Review} from "../../model/review-model";
import {AccountService} from "../../accounts/services/account.service";
import {EmailSentComponent} from "../../accounts/email-sent/email-sent.component";
import {Email} from "../../model/Email";
import {Account} from "../../model/account-model";


@Component({
  selector: 'app-reports-view',
  templateUrl: './reports-view.component.html',
  styleUrls: ['./reports-view.component.css']
})
export class ReportsViewComponent {
  reports: ReportView[];
  loading: boolean = true;
  account: Account;
  reasonVisible: boolean = false;
  reportReason: string = ""

  constructor(private route: ActivatedRoute, private reportService: ReportService, private messageService: MessageService, private accountService: AccountService) {
  }

  clear(table: Table) {
    table.clear();
  }

  ngOnInit() {
    this.route.params.subscribe((params)=>{
      this.reportService.getAll().subscribe({
        next: (data: ReportView[]) =>{
          console.log(data);
          this.reports = data;
          this.loading = false;
        }
      })
    })
  }

  deleteReport(id: number){
    const isConfirmed = window.confirm('Are you sure you want to delete this report?');
    if (isConfirmed) {
      this.reportService.deleteReport(id).subscribe(
          () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              key: 'bc',
              detail: 'Report deleted successfully!',
              life: 2000
            })
            this.refresh();
          },
          (error) => {
            console.error('Failed to delete review:', error);
          }
      );
    }
  }

  blockUser(userId: number){
    const isConfirmed = window.confirm('Are you sure you want to block this account?');
    if (isConfirmed) {

      this.accountService.blockAccount(userId).subscribe(
          () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              key: 'bc',
              detail: 'Account blocked successfully!',
              life: 2000
            })
            this.refresh();
          },
          (error) => {
            console.error('Failed to block account:', error);
          }
      );
    }
  }

  showFullReason(reason: string){
    this.reportReason = reason;
    this.reasonVisible = true;
  }


  refresh() {
    this.loading = true;
    this.reportService.getAll().subscribe({
      next: (data: ReportView[]) => {
        this.reports = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Failed to refresh reviews:', error);
        this.loading = false;
      }
    });
  }



}
