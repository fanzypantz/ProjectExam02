import { Component, Input, OnInit } from '@angular/core';

interface Roles {
  customer?: boolean;
  editor?: boolean;
  admin?: boolean;
}

@Component({
  selector: 'app-read-roles',
  template: `
    <div *ngIf="roles">
      <p *ngIf="roles.admin">Admin</p>
      <p *ngIf="roles.editor">Editor</p>
      <p *ngIf="roles.customer">Customer</p>
    </div>
  `,
  styleUrls: ['./roles.component.scss'],
})
export class RolesComponent implements OnInit {
  @Input() roles: Roles;

  constructor() {}

  ngOnInit(): void {}
}
