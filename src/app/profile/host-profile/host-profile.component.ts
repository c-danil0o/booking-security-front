import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../infrastructure/auth/auth.service";
import {Router} from "@angular/router";
import {Host} from "../../model/host-model";
import {HostService} from "../../accounts/services/host.service";
import {Review} from "../../model/review-model";
import {ReviewService} from "../../reviews/review.service";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {confirmPasswordValidator} from "../../accounts/register/password.validator";
import {Email} from "../../model/Email";
import { ConnectableObservable } from 'rxjs';

@Component({
  selector: 'app-host-profile',
  templateUrl: './host-profile.component.html',
  styleUrls: ['./host-profile.component.css']
})
export class HostProfileComponent implements OnInit {
  user: Host;
  reviewsLoaded: boolean = false;

  constructor(private authService: AuthService, private router: Router, private hostService: HostService, private reviewService: ReviewService) {
  }

  that = this;
  ngOnInit() {
    const user_email: string | null = this.authService.getEmail();
    // console.log(user_email);

    if (user_email != null) {
      const email: Email = {
        email: user_email
      }

      this.hostService.findByEmail(email).subscribe({
        next: (data: Host) => {
          this.user = data;
          if (this.user.id != undefined){
            this.reviewService.findByHostId(this.user.id).subscribe({
              next: (data: Review[]) => {
                this.user.hostReviews = data;
                this.reviewsLoaded = true;

              },
              error: (_) =>{
                console.log("error getting reviews for host")
              }
            })
          }

        },
        error: (_) => {
          console.log("error getting host by email")
        }


      })
    }

  }

  logOut(): void {
    this.authService.logout().subscribe({
      next: (_) => {
        localStorage.removeItem('user');
        this.authService.setUser();
        this.router.navigate(['/login']);
      }
    })
  }

  protected readonly confirmPasswordValidator = confirmPasswordValidator;
  protected readonly length = length;
}
