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
import { NavBarComponent } from './components/nav-bar/nav-bar.component';

const config = {
  apiKey: 'AIzaSyAcTjgqq0ifpF5Hjcz334aiuHTxNztbN6I',
  authDomain: 'noroff-projectexam-02.firebaseapp.com',
  databaseURL: 'https://noroff-projectexam-02.firebaseio.com',
  projectId: 'noroff-projectexam-02',
  storageBucket: 'noroff-projectexam-02.appspot.com',
  messagingSenderId: '156222630589',
  appId: '1:156222630589:web:d3bbe08c66eff461fd25d4',
  measurementId: 'G-H8SZ64J4QX',
};

@NgModule({
  declarations: [AppComponent, HomeComponent, AdminComponent, NavBarComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
