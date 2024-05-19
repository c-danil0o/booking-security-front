import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from "./layout/home/home.component";
import { Router, RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./infrastructure/auth/login/login.component";
import { RegisterComponent } from "./accounts/register/register.component";
import { AccommodationListComponent } from './accommodations/accommodation-list/accommodation-list.component';
import { EditAccountComponent } from './accounts/edit-account/edit-account.component';
import { AccommodationDetailsComponent } from "./accommodations/accommodation-details/accommodation-details.component";
import { RegistrationConfirmComponent } from "./accounts/registration-confirm/registration-confirm.component";
import { EmailSentComponent } from "./accounts/email-sent/email-sent.component";
import { HostProfileComponent } from "./profile/host-profile/host-profile.component";
import { HostPropertiesComponent } from "./profile/host-properties/host-properties.component";
import { NewAccommodationComponent } from "./accommodations/new-accommodation/new-accommodation.component";
import {
  AccommodationTimeslotsComponent
} from "./accommodations/accommodation-timeslots/accommodation-timeslots.component";
import { HostReservationsComponent } from "./reservations/host-reservations/host-reservations.component";
import { GuestProfileComponent } from "./profile/guest-profile/guest-profile.component";
import { GuestReservationsComponent } from "./reservations/guest-reservations/guest-reservations.component";
import {
  FilteredAccommodationsComponent
} from "./accommodations/filtered-accommodations/filtered-accommodations.component";
import { EditAccommodationComponent } from "./accommodations/edit-accommodation/edit-accommodation.component";
import { AdminProfileComponent } from "./profile/admin-profile/admin-profile.component";
import { ApproveAccommodationsComponent } from "./accommodations/approve-accommodations/approve-accommodations.component";
import { ApproveReviewsComponent } from "./reviews/approve-reviews/approve-reviews.component";
import { ReportsViewComponent } from "./reports/reports-view/reports-view.component";
import { YearAnalyticsComponent } from "./analytics/year-analytics/year-analytics.component";
import { authGuard } from './infrastructure/auth/guard/auth-guard';


const routes: Routes = [
  { component: HomeComponent, path: ""},
  { component: LoginComponent, path: "login" },
  { component: RegisterComponent, path: "register" },
  { component: AccommodationListComponent, path: "accommodation-list", canActivate: [authGuard]  },
  { component: FilteredAccommodationsComponent, path: "filtered-accommodations" },
  { component: AccommodationDetailsComponent, path: "accommodation-details/:accommodationId" },
  { component: EditAccountComponent, path: "edit-account/:id", canActivate: [authGuard] },
  { component: EmailSentComponent, path: "email-sent" },
  { component: RegistrationConfirmComponent, path: "registration-confirmation" },
  { component: HostProfileComponent, path: "host-profile/:hostId"},
  { component: AdminProfileComponent, path: "admin-profile", canActivate: [authGuard] },
  { component: HostPropertiesComponent, path: "host-properties/:hostId" , canActivate: [authGuard] },
  { component: ApproveAccommodationsComponent, path: "approve-accommodation", canActivate: [authGuard]  },
  { component: NewAccommodationComponent, path: "new-accommodation", canActivate: [authGuard]  },
  { component: AccommodationTimeslotsComponent, path: "accommodation-timeslots/:accId", canActivate: [authGuard]  },
  { component: HostProfileComponent, path: "host-profile", canActivate: [authGuard]  },
  { component: GuestReservationsComponent, path: "guest-reservations/:guestId", canActivate: [authGuard]  },
  { component: HostReservationsComponent, path: "host-reservations/:hostId", canActivate: [authGuard]  },
  { component: GuestProfileComponent, path: "guest-profile", canActivate: [authGuard]  },
  { component: EditAccommodationComponent, path: "edit-accommodation/:accId", canActivate: [authGuard]  },
  { component: ApproveReviewsComponent, path: "approve-reviews", canActivate: [authGuard]  },
  { component: ReportsViewComponent, path: "reports-view", canActivate: [authGuard]  },
  { component: YearAnalyticsComponent, path: "analytics/:hostId", canActivate: [authGuard]  }
];

@NgModule({
  declarations: [],
  imports: [
    [RouterModule.forRoot(routes)]
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
