import {Component, OnInit} from '@angular/core';
import {Account} from "../../model/account-model";
import {AuthService} from "../../infrastructure/auth/auth.service";
import {Router} from "@angular/router";
import {GuestService} from "../../accounts/services/guest.service";
import {AccommodationService} from "../../accommodations/accommodation.service";
import {Email} from "../../model/Email";
import {Guest} from "../../model/guest-model";
import {Accommodation} from "../../model/accommodation-model";
import {AccountService} from "../../accounts/services/account.service";
import {NotificationsService} from "../../notifications/notifications.service";

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css']
})
export class AdminProfileComponent implements OnInit{
  user: Account;

  constructor(private authService: AuthService, private router: Router, private accountService: AccountService, private notificationService: NotificationsService) {
  }

  ngOnInit(): void {
    const user_email: string | null = this.authService.getEmail();
    if (user_email != null) {
      const email: Email = {
        email: user_email
      }
      this.accountService.findByEmail(email).subscribe({
        next: (data: Account) => {
          this.user = data;
        },
        error: (_) => {
          console.log("error getting user by email")
        }
      })
    }
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


}
