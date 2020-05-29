import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditNumberComponent } from './edit-number.component';

describe('NumberComponent', () => {
  let component: EditNumberComponent;
  let fixture: ComponentFixture<EditNumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditNumberComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
