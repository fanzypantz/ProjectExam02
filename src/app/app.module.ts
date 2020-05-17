import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

// Components
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

// Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AdminComponent } from './admin/admin.component';
import { AuthModule } from './auth/auth.module';
import { NavBarComponent } from './shared/nav-bar/nav-bar.component';
import { firebaseConfig } from './shared/app.config';
import { ReadComponent } from './admin/shared/read/read.component';
import { EditComponent } from './admin/shared/edit/edit.component';
import { BookingDateComponent } from './admin/shared/layoutComponents/booking-date/booking-date.component';
import { ImagesComponent } from './admin/shared/layoutComponents/images/images.component';
import { ImageComponent } from './admin/shared/layoutComponents/image/images.component';
import { DateComponent } from './admin/shared/layoutComponents/date/date.component';
import { RolesComponent } from './admin/shared/layoutComponents/roles/roles.component';
import { StringComponent } from './admin/shared/layoutComponents/string/string.component';
import { AccommodationsComponent } from './accommodations/accommodations.component';
import { ContactComponent } from './contact/contact.component';
import { EnquiriesComponent } from './enquiries/enquiries.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdminComponent,
    NavBarComponent,
    ReadComponent,
    EditComponent,
    BookingDateComponent,
    ImagesComponent,
    ImageComponent,
    DateComponent,
    RolesComponent,
    StringComponent,
    AccommodationsComponent,
    ContactComponent,
    EnquiriesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
