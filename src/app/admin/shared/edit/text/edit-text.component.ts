import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-text',
  template: `
    <div class="admin-edit-card-container">
      <p>text works! {{ text }}</p>
    </div>
  `,
  styleUrls: ['../edit.component.scss'],
  styles: [],
})
export class EditTextComponent implements OnInit {
  @Input() text: string;

  constructor() {}

  ngOnInit(): void {}
}
