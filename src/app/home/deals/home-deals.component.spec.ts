import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeDealsComponent } from './home-deals.component';

describe('DealsComponent', () => {
  let component: HomeDealsComponent;
  let fixture: ComponentFixture<HomeDealsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeDealsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeDealsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
