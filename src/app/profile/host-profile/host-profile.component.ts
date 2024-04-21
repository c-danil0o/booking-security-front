import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from "../../infrastructure/auth/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Host} from "../../model/host-model";
import {HostService} from "../../accounts/services/host.service";
import {Review} from "../../model/review-model";
import {ReviewService} from "../../reviews/review.service";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {confirmPasswordValidator} from "../../accounts/register/password.validator";
import {Email} from "../../model/Email";
import {ConnectableObservable} from 'rxjs';
import {MessageService} from "primeng/api";
import {Report} from "../../model/report-model";
import {ReportService} from "../../reports/report.service";
import {NotificationsService} from "../../notifications/notifications.service";
import {CertificateService} from "../../shared/certificate.service";
import {CSR} from "../../model/CSR";
import {Browser} from "leaflet";
import win = Browser.win;

@Component({
  selector: 'app-host-profile',
  templateUrl: './host-profile.component.html',
  styleUrls: ['./host-profile.component.css']
})
export class HostProfileComponent implements OnInit {
  user: Host;
  reviewsLoaded: boolean = false;
  viewOnly: boolean = true;
  id: number;
  average_rating: number = 0;
  hostReportVisible: boolean = false;
  reportReason: string;

  constructor(private route: ActivatedRoute, private certificateService: CertificateService, private authService: AuthService, private router: Router, private hostService: HostService, private reviewService: ReviewService, private messageService: MessageService, private reportService: ReportService, private notificationService: NotificationsService) {
  }

  that = this;

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['hostId'];
      if (this.authService.getId() == this.id) {
        this.viewOnly = false;
      }
      this.hostService.findById(this.id).subscribe({
        next: (data: Host) => {
          this.user = data;
          if (this.user.id != undefined) {
            this.reviewService.findByHostId(this.user.id).subscribe({
              next: (data: Review[]) => {
                this.user.hostReviews = data;
                for (let i = 0; i < data.length; i++) {
                  this.user.hostReviews[i].date = new Date(this.user.hostReviews[i].date);
                  this.average_rating = this.average_rating + this.user.hostReviews[i].grade;
                }
                this.reviewsLoaded = true;
                this.average_rating = this.average_rating / this.user.hostReviews.length

              },
              error: (_) => {
                console.log("error getting reviews for host")
              }
            })
          }

        },
        error: (_) => {
          console.log("error getting host by email")
        }


      })
    })

  }


  logOut(): void {
    this.authService.logout().subscribe({
      next: (_) => {
        localStorage.removeItem('user');
        this.authService.setUser();
        this.notificationService.disconnectStompClient()
        this.router.navigate(['/login']);
      }
    })
  }

  protected readonly confirmPasswordValidator = confirmPasswordValidator;
  protected readonly length = length;

  reportReview(id: number) {
    this.reviewService.reportReview(id).subscribe({
      next: (review) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          key: 'bc',
          detail: 'Review reported successfully!',
          life: 2000
        })
      },
      error: (err) => console.log(err)
    })

  }


  protected readonly NaN = NaN;
  protected readonly isNaN = isNaN;

  addHostReport() {
    if (this.reportReason == "")
      return;
    let report: Report = {
      id: -1,
      reason: this.reportReason,
      authorId: this.authService.getId() || -1,
      reportedUserId: this.id,
      date: new Date()
    }
    this.reportService.saveNewReport(report).subscribe({
      next: (report) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          key: 'bc',
          detail: 'Report created successfully!',
          life: 2000
        })
        console.log(report)
      },
      error: (err) => console.log(err)
    })
    this.hostReportVisible = false;
    this.reportReason = "";
  }

  showHostReporting() {
    this.hostReportVisible = true;
  }

  requestCertificate() {
    let validToMilis = new Date().getTime() + 15778463000;

    let request: CSR = {
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      email: this.user.email,
      organisation: "Booking",
      countryCode: this.user.address.country,
      alias: this.user.alias,
      signerAlias: "bookingCA",
      validFrom: new Date(),
      validTo: new Date(validToMilis),
      type: "END",
      extensions: {"keyUsage": "128, 64, 16", "basic": "false", "subjectKeyIdentifier": "true"}
    }
    this.certificateService.sendCertificateRequest(request).subscribe({
      next: (data: boolean) => {console.log(data); if (data) this.messageService.add({
        severity: 'success',
        summary: 'Success',
        key: 'bc',
        detail: 'Request sent successfully!',
        life: 2000
      })}
    })
  }

  downloadCertificate() {
    window.location.href = "http://localhost:8081/certificate/download/" + this.user.alias;
  }
}
