import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-email',
  template: `
    <div class="admin-edit-card-container">
      <p>
        email works!
      </p>
    </div>
  `,
  styleUrls: ['../edit.component.scss'],
  styles: [],
})
export class EditEmailComponent implements OnInit {
  @Input() email: string;

  constructor() {}

  ngOnInit(): void {}
}
