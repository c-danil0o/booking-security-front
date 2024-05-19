import { Component, OnInit } from '@angular/core';
import { KeycloakService } from '../keycloak.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private keycloakService: KeycloakService, private router: Router) {

  }
  async ngOnInit(): Promise<void> {
    // await this.keycloakService.init();
    if (!this.keycloakService.isLoggedIn()) {
      await this.keycloakService.login();
    } else {
      this.router.navigate(['/']);
    }
  }
}
