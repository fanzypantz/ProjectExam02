import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AgmCoreModule } from '@agm/core';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { ReactiveFormsModule } from '@angular/forms';

// Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AdminComponent } from './admin/admin.component';
import { AuthModule } from './shared/auth/auth.module';
import { NavBarComponent } from './shared/nav-bar/nav-bar.component';
import { firebaseConfig } from './shared/app.config';

// Components
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ReadComponent } from './admin/shared/read/read.component';
import { EditComponent } from './admin/shared/edit/edit.component';
import { BookingDateComponent } from './admin/shared/read/booking-date/booking-date.component';
import { ImagesComponent } from './admin/shared/read/images/images.component';
import { ImageComponent } from './admin/shared/read/image/images.component';
import { DateComponent } from './admin/shared/read/date/date.component';
import { RolesComponent } from './admin/shared/read/roles/roles.component';
import { StringComponent } from './admin/shared/read/string/string.component';
import { AccommodationsComponent } from './accommodations/accommodations.component';
import { ContactComponent } from './contact/contact.component';
import { ReservationsComponent } from './reservations/reservations.component';
import { HomeGalleryComponent } from './home/gallery/home-gallery.component';
import { BookingSearchComponent } from './shared/booking-search/booking-search.component';
import { HomeDealsComponent } from './home/deals/home-deals.component';
import { HomePostsComponent } from './home/posts/home-posts.component';
import { FooterComponent } from './shared/footer/footer.component';
import { AccommodationDetailsComponent } from './addommodation-details/accommodation-details.component';
import { PostsDetailsComponent } from './posts-details/posts-details.component';
import { PostsComponent } from './posts/posts.component';
import { BookingDetailsComponent } from './shared/booking-search/details/booking-details.component';
import { EditStringComponent } from './admin/shared/edit/edit-string/edit-string.component';
import { EditBooleanComponent } from './admin/shared/edit/boolean/edit-boolean.component';
import { EditNumberComponent } from './admin/shared/edit/number/edit-number.component';
import { EditImageComponent } from './admin/shared/edit/image/image.component';
import { EditImagesComponent } from './admin/shared/edit/images/edit-images.component';
import { EditDateComponent } from './admin/shared/edit/date/edit-date.component';
import { EditBookingDateComponent } from './admin/shared/edit/booking-date/edit-booking-date.component';
import { EditRolesComponent } from './admin/shared/edit/roles/edit-roles.component';
import { EditEmailComponent } from './admin/shared/edit/email/edit-email.component';
import { EditTextComponent } from './admin/shared/edit/text/edit-text.component';
import { EditLocationComponent } from './admin/shared/edit/location/edit-location.component';
import { PageTransitionsService } from './shared/page-transitions.service';
import { GalleryComponent } from './shared/gallery/gallery.component';
import { AccommodationService } from './shared/accommodation.service';
import { BooleanComponent } from './admin/shared/read/boolean/boolean.component';
import { MailComponent } from './shared/mail/mail.component';
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
    AccommodationDetailsComponent,
    ContactComponent,
    ReservationsComponent,
    BookingSearchComponent,
    HomeGalleryComponent,
    HomeDealsComponent,
    HomePostsComponent,
    PostsComponent,
    PostsDetailsComponent,
    FooterComponent,
    BookingDetailsComponent,
    EditStringComponent,
    EditImageComponent,
    EditImagesComponent,
    EditDateComponent,
    EditBooleanComponent,
    EditNumberComponent,
    EditBookingDateComponent,
    EditRolesComponent,
    EditEmailComponent,
    EditTextComponent,
    EditLocationComponent,
    GalleryComponent,
    BooleanComponent,
    MailComponent,
  ],
  imports: [
    BrowserModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAcTjgqq0ifpF5Hjcz334aiuHTxNztbN6I',
    }),
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    AppRoutingModule,
    AuthModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    ReactiveFormsModule,
  ],
  providers: [PageTransitionsService, AccommodationService],
  bootstrap: [AppComponent],
})
export class AppModule {}
