import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-read-string',
  template: ` {{ text }} `,
  styleUrls: ['./string.component.scss'],
})
export class StringComponent implements OnInit {
  @Input() text: string;

  constructor() {}

  ngOnInit(): void {}
}
