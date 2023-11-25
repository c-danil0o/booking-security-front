import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';



@NgModule({
    declarations: [
        HeaderComponent,
        HomeComponent,
        NavbarComponent
    ],
  exports: [
    NavbarComponent,
    HeaderComponent
  ],
    imports: [
        CommonModule
    ]
})
export class LayoutModule { }
