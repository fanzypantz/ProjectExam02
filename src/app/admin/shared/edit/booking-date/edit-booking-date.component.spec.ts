import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBookingDateComponent } from './edit-booking-date.component';

describe('BookingDateComponent', () => {
  let component: EditBookingDateComponent;
  let fixture: ComponentFixture<EditBookingDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditBookingDateComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBookingDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
