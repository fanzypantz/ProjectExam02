import { Component, Input, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-date',
  template: `
    <div [formGroup]="adminForm" class="admin-edit-card-container">
      <label [for]="key">{{ name }}</label>

      <div class="admin-input-group">
        <div class="admin-input-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44.2 44.1">
            <g id="calendar" transform="translate(-10 -9.9)">
              <g id="Icon-Calendar" transform="translate(30 478)">
                <path
                  id="Fill-133"
                  d="M19.6-424H-15.6a4.439,4.439,0,0,1-4.4-4.4v-32.3c0-2.4,1.6-4.4,3.7-4.4h2.2v2.9h-2.2c-.3,0-.7.6-.7,1.5v32.3a1.538,1.538,0,0,0,1.5,1.5H19.7a1.538,1.538,0,0,0,1.5-1.5v-32.3c0-.9-.5-1.5-.7-1.5H18.3v-2.9h2.2c2,0,3.7,2,3.7,4.4v32.3a4.76,4.76,0,0,1-4.6,4.4"
                  fill="#fff"
                />
                <path
                  id="Fill-134"
                  d="M-9.7-459.2a1.538,1.538,0,0,1-1.5-1.5v-5.9a1.538,1.538,0,0,1,1.5-1.5,1.538,1.538,0,0,1,1.5,1.5v5.9a1.612,1.612,0,0,1-1.5,1.5"
                  fill="#fff"
                />
                <path
                  id="Fill-135"
                  d="M13.7-459.2a1.538,1.538,0,0,1-1.5-1.5v-5.9a1.538,1.538,0,0,1,1.5-1.5,1.538,1.538,0,0,1,1.5,1.5v5.9a1.538,1.538,0,0,1-1.5,1.5"
                  fill="#fff"
                />
                <path id="Fill-136" d="M-5.3-465.1H9.3v3H-5.3Z" fill="#fff" />
                <path
                  id="Fill-137"
                  d="M-17.1-456.3H21.1v3H-17.1Z"
                  fill="#fff"
                />
                <path id="Fill-138" d="M15.2-450.4h2.9v2.9H15.2Z" fill="#fff" />
                <path id="Fill-139" d="M9.3-450.4h3v2.9h-3Z" fill="#fff" />
                <path id="Fill-140" d="M3.5-450.4H6.4v2.9H3.5Z" fill="#fff" />
                <path id="Fill-141" d="M-2.4-450.4H.5v2.9H-2.4Z" fill="#fff" />
                <path id="Fill-142" d="M-8.3-450.4h3v2.9h-3Z" fill="#fff" />
                <path id="Fill-143" d="M15.2-444.5h2.9v2.9H15.2Z" fill="#fff" />
                <path id="Fill-144" d="M9.3-444.5h3v2.9h-3Z" fill="#fff" />
                <path id="Fill-145" d="M3.5-444.5H6.4v2.9H3.5Z" fill="#fff" />
                <path id="Fill-146" d="M-2.4-444.5H.5v2.9H-2.4Z" fill="#fff" />
                <path id="Fill-147" d="M-8.3-444.5h3v2.9h-3Z" fill="#fff" />
                <path
                  id="Fill-148"
                  d="M-14.1-444.5h2.9v2.9h-2.9Z"
                  fill="#fff"
                />
                <path id="Fill-149" d="M15.2-438.7h2.9v3H15.2Z" fill="#fff" />
                <path id="Fill-150" d="M9.3-438.7h3v3h-3Z" fill="#fff" />
                <path id="Fill-151" d="M3.5-438.7H6.4v3H3.5Z" fill="#fff" />
                <path id="Fill-152" d="M-2.4-438.7H.5v3H-2.4Z" fill="#fff" />
                <path id="Fill-153" d="M-8.3-438.7h3v3h-3Z" fill="#fff" />
                <path id="Fill-154" d="M-14.1-438.7h2.9v3h-2.9Z" fill="#fff" />
                <path id="Fill-155" d="M9.3-432.8h3v2.9h-3Z" fill="#fff" />
                <path id="Fill-156" d="M3.5-432.8H6.4v2.9H3.5Z" fill="#fff" />
                <path id="Fill-157" d="M-2.4-432.8H.5v2.9H-2.4Z" fill="#fff" />
                <path id="Fill-158" d="M-8.3-432.8h3v2.9h-3Z" fill="#fff" />
                <path
                  id="Fill-159"
                  d="M-14.1-432.8h2.9v2.9h-2.9Z"
                  fill="#fff"
                />
              </g>
            </g>
          </svg>
        </div>
        <input
          class="form-input form-date"
          (change)="onChange($event)"
          type="date"
          [value]="dateString"
          [name]="key"
          [disabled]="!editAble"
        />
      </div>
    </div>
  `,
  styleUrls: ['../edit.component.scss'],
  styles: [],
})
export class EditDateComponent implements OnInit {
  @Input() adminForm: FormGroup;
  @Input() key: string;
  @Input() name: string;
  @Input() editAble: boolean;
  public dateString: string;
  private date: Date;

  constructor() {}

  ngOnInit(): void {
    // As firestore timestamp wont work well with the default HTML input it has
    // to be formatted to a readable string manually.
    this.date = this.adminForm.get(this.key).value.toDate();
    const year = this.date.getFullYear();
    const month = (this.date.getMonth() + 1).toString().padStart(2, '0');
    const day = this.date.getDate().toString().padStart(2, '0');
    this.dateString = `${year}-${month}-${day}`;
  }

  onChange(e) {
    // On date change, change the formGroup with a new firestore timestamp
    const newDate = e.target.valueAsDate;
    const dateObject = {};
    dateObject[this.key] = firebase.firestore.Timestamp.fromDate(newDate);
    this.adminForm.patchValue(dateObject);
  }
}
