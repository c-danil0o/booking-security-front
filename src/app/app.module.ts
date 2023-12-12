import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {LayoutModule} from "./layout/layout.module";
import {RouterOutlet} from "@angular/router";
import { AppRoutingModule } from './app-routing.module';
import {AccountsModule} from "./accounts/accounts.module";
import { AccommodationsModule } from './accommodations/accommodations.module';
import {AuthModule} from "./infrastructure/auth/auth.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ProfileModule} from "./profile/profile.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {Interceptor} from "./infrastructure/auth/interceptor";
import {ReservationsModule} from "./reservations/reservations.module";
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    LayoutModule,
    RouterOutlet,
    AppRoutingModule,
    AccountsModule,
    AccommodationsModule,
    AuthModule, BrowserAnimationsModule,
    ProfileModule, HttpClientModule,
    ReservationsModule,
    ConfirmDialogModule,
    DropdownModule,
  ],
  providers:[{provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true},ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
