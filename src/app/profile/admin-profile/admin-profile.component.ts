import {Component, OnInit} from '@angular/core';
import {Account} from "../../model/account-model";
import {Router} from "@angular/router";
import {GuestService} from "../../accounts/services/guest.service";
import {AccommodationService} from "../../accommodations/accommodation.service";
import {Email} from "../../model/Email";
import {Guest} from "../../model/guest-model";
import {Accommodation} from "../../model/accommodation-model";
import {AccountService} from "../../accounts/services/account.service";
import {NotificationsService} from "../../notifications/notifications.service";
import {KeycloakService} from "../../infrastructure/auth/keycloak.service";

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css']
})
export class AdminProfileComponent implements OnInit {
  user: Account;

  constructor(private keycloakService: KeycloakService, private router: Router, private accountService: AccountService, private notificationService: NotificationsService) {
  }

  ngOnInit(): void {
    this.accountService.findById(this.keycloakService.getId()).subscribe({
      next: (data: Account) => {
        this.user = data;
      },
      error: (_) => {
        console.log("error getting user")
      }
    })
  }


  logOut(): void {
    this.keycloakService.logout();
  }


}
