import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-text',
  template: `
    <div [formGroup]="adminForm" class="admin-edit-card-container">
      <label [for]="key">{{ name }}</label>
      <textarea
        *ngIf="editAble"
        [froalaEditor]
        [formControlName]="key"
        [name]="key"
      ></textarea>
      <div *ngIf="!editAble" [froalaView]="documentText"></div>
    </div>
  `,
  styleUrls: ['../edit.component.scss'],
  styles: [],
})
export class EditTextComponent implements OnInit {
  @Input() adminForm: FormGroup;
  @Input() key: string;
  @Input() name: string;
  @Input() editAble: boolean;

  constructor() {}

  ngOnInit(): void {}

  get documentText() {
    return this.adminForm.get(this.key).value;
  }
}
