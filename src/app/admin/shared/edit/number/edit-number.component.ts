import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-number',
  template: `
    <div [formGroup]="adminForm" class="admin-edit-card-container">
      <label [for]="key">{{ name }}</label>
      <div class="admin-input-group">
        <div class="admin-input-icon">
          <svg viewBox="0 0 52.9 52.9">
            <style type="text/css">
              .edit-number-svg {
                stroke-width: 3;
              }
            </style>
            <defs></defs>
            <line
              id="Line_20_1_"
              class="edit-number-svg"
              x1="15.5"
              y1="52.9"
              x2="15.5"
              y2="0"
            />
            <line
              id="Line_21_1_"
              class="edit-number-svg"
              x1="37.3"
              y1="52.9"
              x2="37.3"
              y2="0"
            />
            <line
              id="Line_22_1_"
              class="edit-number-svg"
              x1="0"
              y1="15.5"
              x2="52.9"
              y2="15.5"
            />
            <line
              id="Line_23_1_"
              class="edit-number-svg"
              x1="0"
              y1="37.3"
              x2="52.9"
              y2="37.3"
            />
          </svg>
        </div>

        <input
          class="form-input"
          (change)="onChange($event)"
          [formControlName]="key"
          [name]="key"
          type="number"
        />
      </div>
    </div>
  `,
  styleUrls: ['../edit.component.scss'],
  styles: [],
})
export class EditNumberComponent implements OnInit {
  @Input() adminForm: FormGroup;
  @Input() key: string;
  @Input() name: string;
  private number: number;

  constructor() {}

  ngOnInit(): void {
    this.number = parseInt(this.adminForm.get(this.key).value, 10);
  }

  onChange(e) {
    const numberObject = {};
    numberObject[this.key] = e.target.value;
    this.adminForm.patchValue(numberObject);
  }
}
