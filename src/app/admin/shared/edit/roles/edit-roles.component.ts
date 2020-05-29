import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-roles',
  template: `
    <div class="admin-edit-card-container">
      <p>roles works! {{ roles }}</p>
    </div>
  `,
  styleUrls: ['../edit.component.scss'],
  styles: [],
})
export class EditRolesComponent implements OnInit {
  @Input() roles: string[];

  constructor() {}

  ngOnInit(): void {}
}
