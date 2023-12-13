import {Component, OnInit} from '@angular/core';
import {Guest} from "../../model/guest-model";
import {AuthService} from "../../infrastructure/auth/auth.service";
import {Router} from "@angular/router";
import {confirmPasswordValidator} from "../../accounts/register/password.validator";
import {HostService} from "../../accounts/services/host.service";
import {ReviewService} from "../../reviews/review.service";
import {GuestService} from "../../accounts/services/guest.service";
import {Email} from "../../model/Email";
import {Host} from "../../model/host-model";
import {Review} from "../../model/review-model";
import {AccommodationService} from "../../accommodations/accommodation.service";
import {Accommodation} from "../../model/accommodation-model";
import {PaginatorState} from "primeng/paginator";

@Component({
  selector: 'app-guest-profile',
  templateUrl: './guest-profile.component.html',
  styleUrls: ['./guest-profile.component.css']
})
export class GuestProfileComponent implements OnInit{
  user: Guest;
  currentPage: number = 1;
  rows: number = 3;
  first: number = 0;
  totalItems: number = 0

  constructor(private authService: AuthService, private router: Router, private guestService: GuestService, private accommodationService: AccommodationService) {
  }

  ngOnInit(): void {
    const user_email: string | null = this.authService.getEmail();
    console.log(this.user);
    if (user_email != null) {
      const email: Email = {
        email: user_email
      }
      this.guestService.findByEmail(email).subscribe({
        next: (data: Guest) => {
          this.user = data;
          if (this.user.id!=undefined){
            this.guestService.getFavorites(this.user.id).subscribe({
              next: (data: Accommodation[]) =>{
                this.user.favorites=data;
              },
              error: (_) =>{
                console.log("error getting favorite accommodations")
              }
            })
          }

        },
        error: (_) => {
          console.log("error getting guest by email")
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

  onPageChange($event: PaginatorState) {
    if ($event.page != null) {
      this.currentPage = $event.page;
    }
    if ($event.rows != null) {
      this.rows = $event.rows
    }
    if ($event.first != null){
      this.first = $event.first
    }

  }

  protected readonly confirmPasswordValidator = confirmPasswordValidator;
  protected readonly length = length;

  onAccommodationClicked($event: Accommodation) {

  }
}


