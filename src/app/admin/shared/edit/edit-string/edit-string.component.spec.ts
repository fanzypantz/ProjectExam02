import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditStringComponent } from './edit-string.component';

describe('EditStringComponent', () => {
  let component: EditStringComponent;
  let fixture: ComponentFixture<EditStringComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditStringComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditStringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
