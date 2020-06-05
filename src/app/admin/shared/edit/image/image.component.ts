import { Component, Input, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-image',
  template: `
    <div [formGroup]="adminForm" class="admin-edit-card-container">
      <div
        *ngIf="progress !== 0 && progress !== 100"
        class="admin-spinner lds-spinner"
      >
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>

      <p>{{ name }}</p>

      <div class="admin-images-row">
        <div class="admin-images-container">
          <div
            *ngIf="image !== ''"
            (click)="deleteImage()"
            class="admin-images-box admin-images-singular"
          >
            <svg class="admin-images-delete" viewBox="0 0 53.8 53.8">
              <g>
                <g transform="matrix(1, 0, 0, 1, 0, 0)">
                  <ellipse
                    id="Ellipse_1-2_1_"
                    class="st0"
                    cx="26.9"
                    cy="26.8"
                    rx="26.9"
                    ry="26.8"
                  />
                </g>
                <line class="st1" x1="15.5" y1="38.6" x2="39" y2="15.1" />
                <line class="st1" x1="38.7" y1="38.9" x2="15.2" y2="15.3" />
              </g>
            </svg>
            <img [src]="image" alt="" />
          </div>
        </div>

        <div class="admin-images-upload">
          <div class="admin-images-input">
            <svg class="admin-input-icon" viewBox="0 0 30.1 35.8">
              <style type="text/css">
                .svg-upload1 {
                  stroke-width: 3;
                }

                .svg-upload2 {
                  stroke-width: 4;
                }
              </style>
              <defs></defs>
              <g>
                <line
                  class="svg-upload1"
                  x1="0"
                  y1="34.3"
                  x2="30.1"
                  y2="34.3"
                />
                <polygon points="0,15 15,0 30.1,15 	" />
                <line class="svg-upload2" x1="15" y1="30.1" x2="15" y2="15" />
              </g>
            </svg>

            <label *ngIf="!file" class="form-input-label" [for]="key"
              >Select File...</label
            >
            <label *ngIf="file" class="form-input-label" [for]="key"
              >1 file selected</label
            >
            <input
              #fileInput
              [id]="key"
              class="form-input-files"
              type="file"
              [name]="key"
              (change)="handleFiles($event.target.files)"
            />
          </div>

          <button type="button" class="btn" (click)="uploadImages(fileInput)">
            Upload Image
          </button>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['../edit.component.scss'],
  styles: [],
})
export class EditImageComponent implements OnInit {
  @Input() adminForm: FormGroup;
  @Input() key: string;
  @Input() name: string;
  @Input() model: string;
  public file: File;
  public progress: number;

  constructor() {
    this.progress = 0;
  }

  ngOnInit(): void {}

  handleFiles(files) {
    this.file = files[0];
  }

  uploadImages(fileInput) {
    const storageRef = firebase
      .storage()
      .ref()
      .child(`${this.model}/${this.file.name}`);

    const uploadTask = storageRef.put(this.file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        this.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            break;
        }
      },
      (err) => {
        console.log('error: ', err);
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          const imageObject = {};
          imageObject[this.key] = downloadURL;
          this.adminForm.patchValue(imageObject);
          fileInput.value = '';
          this.file = null;
        });
      }
    );
  }

  deleteImage() {
    const imagesObject = {};
    imagesObject[this.key] = '';
    this.adminForm.patchValue(imagesObject);
  }

  get image() {
    return this.adminForm.get(this.key).value;
  }
}
