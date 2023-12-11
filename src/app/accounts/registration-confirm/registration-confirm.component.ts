import {Component, OnInit} from '@angular/core';
import {AccountService} from "../services/account.service";
import {ActivatedRoute} from "@angular/router";
import {Accommodation} from "../../model/accommodation-model";
import {Review} from "../../model/review-model";

@Component({
  selector: 'app-registration-confirm',
  templateUrl: './registration-confirm.component.html',
  styleUrls: ['./registration-confirm.component.css']
})
export class RegistrationConfirmComponent implements OnInit {
  confirmed: number = 0
  token: string

  constructor(private route: ActivatedRoute, private accountService: AccountService) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.token = params['token']
      if (this.token == null){
        return
      }
      this.accountService.confirmRegistration(this.token).subscribe({
        next: (message: string) => {
          this.confirmed = 1
        },
        error: (message: string) => {
          this.confirmed = -1
        }
      })

    })

  }
}
