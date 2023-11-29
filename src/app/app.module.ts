import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {LayoutModule} from "./layout/layout.module";
import {RouterOutlet} from "@angular/router";
import { AppRoutingModule } from './app-routing.module';
import {AccountsModule} from "./accounts/accounts.module";
import { AccommodationsModule } from './accommodations/accommodations.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    LayoutModule,
    RouterOutlet,
    AppRoutingModule,
    AccountsModule,
    AccommodationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
