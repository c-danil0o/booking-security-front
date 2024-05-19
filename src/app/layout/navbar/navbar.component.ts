import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../infrastructure/auth/auth.service";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { KeycloakService } from 'src/app/infrastructure/auth/keycloak.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  role: string | null;
  id: number | undefined;
  constructor(private keycloakService: KeycloakService, private router: Router) {
  }
  ngOnInit(): void {
    this.role = this.keycloakService.getRole();
    this.id = this.keycloakService.getId();
  }

  logOut(): void {
    this.keycloakService.logout();
  }


}
