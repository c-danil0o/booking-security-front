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
import { ConnectableObservable } from 'rxjs';

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

  constructor(private route: ActivatedRoute, private authService: AuthService, private router: Router, private hostService: HostService, private reviewService: ReviewService) {
  }

  that = this;
  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['viewOnly'] == "false"){
        this.viewOnly = false;
      }
      this.id = +params['hostId'];
      this.hostService.findById(this.id).subscribe({
        next: (data: Host) => {
          this.user = data;
          if (this.user.id != undefined){
            this.reviewService.findByHostId(this.user.id).subscribe({
              next: (data: Review[]) => {
                this.user.hostReviews = data;
                for (let i=0; i< data.length; i++){
                  this.user.hostReviews[i].date = new Date(this.user.hostReviews[i].date);
                }
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
    })

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
