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

  isHome() {
    return this.location.path() === '/';
  }

  isAccommodations() {
    return this.location.path().includes('accommodations');
  }

  isAccommodationDetails() {
    return this.location.path().includes('accommodation-details');
  }

  isAdmin() {
    return this.location.path().includes('admin');
  }

  goUp() {
    const element = document.querySelector('#nav');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
