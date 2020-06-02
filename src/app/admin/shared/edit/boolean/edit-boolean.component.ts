import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-boolean',
  template: `
    <div [formGroup]="adminForm" class="admin-edit-card-container">
      <label [for]="key">{{ name }}</label>
      <input
        class="form-input-boolean"
        [formControlName]="key"
        type="checkbox"
        [name]="key"
      />
    </div>
  `,
  styleUrls: ['../edit.component.scss'],
  styles: [],
})
export class EditBooleanComponent implements OnInit {
  @Input() adminForm: FormGroup;
  @Input() key: string;
  @Input() name: string;

  constructor() {}

  ngOnInit(): void {}
}
