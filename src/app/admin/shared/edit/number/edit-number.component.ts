import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-number',
  template: `
    <div [formGroup]="adminForm" class="admin-edit-card-container">
      <label [for]="key">{{ name }}</label>
      <div class="admin-input-group">
        <div class="admin-input-icon">
          <svg viewBox="0 0 18 16">
            <defs></defs>
            <g id="Group_92_1_" transform="translate(-6.5 -8)">
              <line
                id="Line_14_1_"
                class="st0"
                x1="6.5"
                y1="8.5"
                x2="24.5"
                y2="8.5"
              />
              <line
                id="Line_15_1_"
                class="st0"
                x1="10.8"
                y1="11.5"
                x2="24.5"
                y2="11.5"
              />
              <line
                id="Line_16_1_"
                class="st0"
                x1="6.5"
                y1="14.5"
                x2="24.5"
                y2="14.5"
              />
              <line
                id="Line_17_1_"
                class="st0"
                x1="10.8"
                y1="17.5"
                x2="24.5"
                y2="17.5"
              />
              <line
                id="Line_18_1_"
                class="st0"
                x1="6.5"
                y1="20.5"
                x2="24.5"
                y2="20.5"
              />
              <line
                id="Line_19_1_"
                class="st0"
                x1="10.8"
                y1="23.5"
                x2="24.5"
                y2="23.5"
              />
            </g>
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
