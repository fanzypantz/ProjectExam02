import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-string',
  template: `
    <div class="admin-edit-card-container">
      <p>edit-string works! {{ text }}</p>
    </div>
  `,
  styleUrls: ['../edit.component.scss'],
  styles: [],
})
export class EditStringComponent implements OnInit {
  @Input() text: string;

  constructor() {}

  ngOnInit(): void {}
}
