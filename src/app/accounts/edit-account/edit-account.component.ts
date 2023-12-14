import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule, Routes } from '@angular/router';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { HostService } from '../services/host.service';
import { GuestService } from '../services/guest.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { countries } from '../register/countries';

@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.css']
})
export class EditAccountComponent {
  account: any;
  editAccountForm: FormGroup;

  constructor(private authService: AuthService, private route: ActivatedRoute, private hostService: HostService, private guestService: GuestService) {}

  ngOnInit() {
    this.editAccountForm = new FormGroup({
      firstname: new FormControl('', [Validators.required, Validators.max(30)]),
      lastname: new FormControl('', [Validators.required, Validators.max(30)]),
      phone: new FormControl('', [Validators.required, Validators.pattern("^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\\s\\./0-9]*$")]),
      selectedCountry: new FormControl('', Validators.required),
      street: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      number: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      oldpassword: new FormControl('', Validators.required),
      newpassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
    })//, [confirmPasswordValidator])
    
    this.route.params.subscribe(params => {
      const userId = params['id'];
      if(this.authService.getRole().toUpperCase() === 'ROLE_ADMIN') {
      } if(this.authService.getRole().toUpperCase() === 'ROLE_HOST') {
        this.account = this.hostService.findById(userId).subscribe(data => {
          this.account = data = data;
        });
      } else {
        this.account = this.guestService.findById(userId).subscribe(data => {
          this.account = data = data;
        });
      }
    });
  }
  
  selectedCountry = {"name": "12", "code": "23"};
  protected readonly countries = countries;
}
