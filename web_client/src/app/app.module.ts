import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';


import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';

/*import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { TableListComponent } from './table-list/table-list.component';
import { TypographyComponent } from './typography/typography.component';
import { IconsComponent } from './icons/icons.component';
import { MapsComponent } from './maps/maps.component';
import { NotificationsComponent } from './notifications/notifications.component';*/

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { Web3Service } from './services/web3.service';
import { StudentLayoutComponent } from './layouts/student-layout/student-layout.component';
import { VerifierLayoutComponent } from './layouts/verifier-layout/verifier-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { LandingComponent } from './pages/landing/landing.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    StudentLayoutComponent,
    VerifierLayoutComponent,
    AuthLayoutComponent,
    LandingComponent
  ],
  providers: [
    Web3Service
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
