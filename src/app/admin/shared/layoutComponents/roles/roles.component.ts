import { Component, Input, OnInit } from '@angular/core';

interface Roles {
  customer?: boolean;
  editor?: boolean;
  admin?: boolean;
}

@Component({
  selector: 'app-roles',
  template: `
    <p *ngIf="roles.admin">Admin</p>
    <p *ngIf="roles.editor">Editor</p>
    <p *ngIf="roles.customer">Customer</p>
  `,
  styleUrls: ['./roles.component.scss'],
})
export class RolesComponent implements OnInit {
  @Input() roles: Roles;

  constructor() {}

  ngOnInit(): void {}
}
