import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDateComponent } from './edit-date.component';

describe('DateComponent', () => {
  let component: EditDateComponent;
  let fixture: ComponentFixture<EditDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditDateComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
