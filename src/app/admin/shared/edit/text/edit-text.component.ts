import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-text',
  template: `
    <div [formGroup]="adminForm" class="admin-edit-card-container">
      <label [for]="key">{{ name }}</label>
      <textarea [froalaEditor] [formControlName]="key" [name]="key"></textarea>
    </div>
  `,
  styleUrls: ['../edit.component.scss'],
  styles: [],
})
export class EditTextComponent implements OnInit {
  @Input() adminForm: FormGroup;
  @Input() key: string;
  @Input() name: string;

  constructor() {}

  ngOnInit(): void {}
}
