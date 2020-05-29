import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-boolean',
  template: `
    <div class="admin-edit-card-container">
      <p>
        boolean works!
      </p>
    </div>
  `,
  styleUrls: ['../edit.component.scss'],
  styles: [],
})
export class EditBooleanComponent implements OnInit {
  @Input() truthy: boolean;

  constructor() {}

  ngOnInit(): void {}
}
