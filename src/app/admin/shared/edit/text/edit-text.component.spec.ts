import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTextComponent } from './edit-text.component';

describe('TextComponent', () => {
  let component: EditTextComponent;
  let fixture: ComponentFixture<EditTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditTextComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});