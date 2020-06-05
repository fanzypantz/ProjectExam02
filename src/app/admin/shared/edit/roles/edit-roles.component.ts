import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RoleInterface } from '../../../admin.config';

@Component({
  selector: 'app-edit-roles',
  template: `
    <div [formGroup]="adminForm" class="admin-edit-card-container">
      <label [for]="key">{{ name }}</label>
      <div class="form-group">
        <p class="form-input-p">Admin</p>
        <label for="admin" class="form-input-switch">
          <input
            (change)="updateRoles('admin')"
            id="admin"
            type="checkbox"
            [checked]="roles.admin"
          />
          <span class="form-input-switch-toggle"></span>
        </label>
      </div>

      <div class="form-group">
        <p class="form-input-p">Editor</p>
        <label for="editor" class="form-input-switch">
          <input
            (change)="updateRoles('editor')"
            id="editor"
            type="checkbox"
            [checked]="roles.editor"
          />
          <span class="form-input-switch-toggle"></span>
        </label>
      </div>

      <div class="form-group">
        <p class="form-input-p">Customer</p>
        <label for="customer" class="form-input-switch">
          <input
            (change)="updateRoles('customer')"
            id="customer"
            type="checkbox"
            [checked]="roles.customer"
          />
          <span class="form-input-switch-toggle"></span>
        </label>
      </div>
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
  roles: RoleInterface;

  constructor() {}

  ngOnInit(): void {
    this.roles = this.adminForm.get(this.key).value;
  }

  updateRoles(role) {
    if (this.roles[role]) {
      this.roles[role] = !this.roles[role];
    } else {
      this.roles[role] = true;
    }
    const roleObject = {};
    roleObject[this.key] = this.roles;
    this.adminForm.patchValue(roleObject);
  }
}
