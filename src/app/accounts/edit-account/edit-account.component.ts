import { Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import guestAccount from '../account-data.json'
import { Guest } from '../guest';

@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.css']
})
export class EditAccountComponent {
  account = guestAccount;
}
