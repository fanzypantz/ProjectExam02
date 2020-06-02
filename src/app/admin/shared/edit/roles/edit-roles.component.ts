import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-roles',
  template: `
    <div [formGroup]="adminForm" class="admin-edit-card-container">
      <label [for]="key">{{ name }}</label>
      <input [formControlName]="key" type="text" />
    </div>
  `,
  styleUrls: ['../edit.component.scss'],
  styles: [],
})
export class EditRolesComponent implements OnInit {
  @Input() adminForm: FormGroup;
  @Input() key: string;
  @Input() name: string;
  @Input() editAble: boolean;

  constructor() {}

  ngOnInit(): void {}
}
