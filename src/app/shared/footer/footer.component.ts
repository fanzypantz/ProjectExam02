import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  constructor(private location: Location) {}

  ngOnInit(): void {}

  isTall() {
    return document.body.clientHeight > 3000;
  }

  isHome() {
    return this.location.path() === '/';
  }

  isPost() {
    return (
      this.location.path().includes('post') &&
      !this.location.path().includes('posts')
    );
  }

  isAccommodations() {
    return this.location.path().includes('accommodations');
  }

  isAccommodationDetails() {
    return this.location.path().includes('accommodation-details');
  }

  isContact() {
    return this.location.path().includes('contact');
  }

  isReservations() {
    return this.location.path().includes('reservations');
  }

  isAdmin() {
    return this.location.path().includes('admin');
  }

  isAdminEdit() {
    return this.location.path().includes('edit');
  }

  goUp() {
    const element = document.querySelector('#nav');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
