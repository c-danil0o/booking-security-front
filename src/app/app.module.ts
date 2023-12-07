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
    AuthModule, BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
