import { Component, Input, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-image',
  template: `
    <div [formGroup]="adminForm" class="admin-edit-card-container">
      <label [for]="key">{{ name }}</label>
      {{ adminForm.controls[key].value }}
    </div>
  `,
  styleUrls: ['../edit.component.scss'],
  styles: [],
})
export class EditImageComponent implements OnInit {
  @Input() adminForm: FormGroup;
  @Input() key: string;
  @Input() name: string;
  @Input() editAble: boolean;

  constructor() {}

  ngOnInit(): void {}
}
