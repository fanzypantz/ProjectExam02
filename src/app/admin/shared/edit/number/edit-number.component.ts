import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-number',
  template: `
    <div class="admin-edit-card-container">
      <p>
        number works!
      </p>
    </div>
  `,
  styleUrls: ['../edit.component.scss'],
  styles: [],
})
export class EditNumberComponent implements OnInit {
  @Input() number: number;

  constructor() {}

  ngOnInit(): void {}
}
