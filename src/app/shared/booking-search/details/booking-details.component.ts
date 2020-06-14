import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-booking-details',
  template: `
    <div class="search-form-group search-form-details" [formGroup]="roomData">
      <div class="search-icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="31.034"
          height="32.514"
          viewBox="0 0 31.034 32.514"
        >
          <path
            id="person"
            d="M22.216,19.235a9.864,9.864,0,1,0-10.306,0C5.82,20.6,1.546,24.327,1.546,28.837c0,3.691,9.754,4.676,15.517,4.676s15.517-.985,15.517-4.676C32.58,24.327,28.307,20.6,22.216,19.235ZM9.231,10.852a7.832,7.832,0,1,1,7.832,7.819A7.835,7.835,0,0,1,9.231,10.852Zm7.832,20.63c-8.284,0-13.243-1.748-13.485-2.651C3.585,24.348,9.632,20.7,17.063,20.7s13.477,3.645,13.484,8.127C30.312,29.732,25.353,31.481,17.063,31.481Z"
            transform="translate(0 0) scale(0.9)"
            fill="#fff"
          />
        </svg>
      </div>

      <div class="form-overbox">
        <h3>Details</h3>
      </div>

      <div (click)="toggleForm()" class="search-details">
        <h4>Adults: {{ adults.value }}</h4>
        <p>Rooms: {{ rooms.value }}</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="16"
          viewBox="0 0 18 16"
        >
          <path
            id="Polygon_1"
            data-name="Polygon 1"
            d="M9,0l9,16H0Z"
            transform="translate(18 16) rotate(180)"
            fill="#026774"
          />
        </svg>
      </div>

      <div *ngIf="showForm" class="search-dropdown-container">
        <label for="adults">Adults:</label>

        <input
          id="adults"
          type="number"
          min="1"
          max="50"
          name="adults"
          formControlName="adults"
          required
        />
        <label for="rooms">Rooms:</label>

        <input
          id="rooms"
          type="number"
          min="1"
          max="50"
          name="rooms"
          formControlName="rooms"
          required
        />
      </div>
    </div>
  `,
  styleUrls: ['../booking-search.component.scss'],
})
export class BookingDetailsComponent implements OnInit {
  @Input() roomData: FormGroup;
  public showForm = false;

  constructor() {}

  ngOnInit(): void {}

  toggleForm() {
    this.showForm = !this.showForm;
  }

  get adults() {
    return this.roomData.get('adults');
  }

  get rooms() {
    return this.roomData.get('rooms');
  }
}
