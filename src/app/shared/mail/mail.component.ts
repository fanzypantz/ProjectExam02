import {
  Component,
  OnInit,
  Input,
  Output,
  HostBinding,
  EventEmitter,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { PageTransitionsService } from '../page-transitions.service';

@Component({
  selector: 'app-mail',
  template: `
    <form
      class="contact-form"
      [formGroup]="mailForm"
      (ngSubmit)="onSubmit(mailForm.value)"
      #ngForm="ngForm"
    >
      <h1 class="contact-form-title">{{ displayName }}</h1>

      <div class="contact-form-input-group">
        <label for="name">Your Name</label>

        <div class="contact-form-input-icon">
          <svg viewBox="0 0 18 16">
            <defs></defs>
            <g id="Group_92_1_" transform="translate(-6.5 -8)">
              <line
                id="Line_14_1_"
                class="st0"
                x1="6.5"
                y1="8.5"
                x2="24.5"
                y2="8.5"
              />
              <line
                id="Line_15_1_"
                class="st0"
                x1="10.8"
                y1="11.5"
                x2="24.5"
                y2="11.5"
              />
              <line
                id="Line_16_1_"
                class="st0"
                x1="6.5"
                y1="14.5"
                x2="24.5"
                y2="14.5"
              />
              <line
                id="Line_17_1_"
                class="st0"
                x1="10.8"
                y1="17.5"
                x2="24.5"
                y2="17.5"
              />
              <line
                id="Line_18_1_"
                class="st0"
                x1="6.5"
                y1="20.5"
                x2="24.5"
                y2="20.5"
              />
              <line
                id="Line_19_1_"
                class="st0"
                x1="10.8"
                y1="23.5"
                x2="24.5"
                y2="23.5"
              />
            </g>
          </svg>
        </div>

        <div
          *ngIf="
            name.invalid && (name.dirty || name.touched || ngForm.submitted)
          "
          class="form-overbox form-error"
        >
          <h3 *ngIf="name.errors.required">Name required!</h3>
          <h3 *ngIf="name.errors.minlength">
            Name must be at least 3 characters long
          </h3>
        </div>

        <input
          id="name"
          class="form-input"
          formControlName="name"
          placeholder="John Hancock"
          type="text"
          name="name"
          required
          minlength="3"
        />
      </div>

      <div class="contact-form-input-group">
        <label for="email">Your Email Address</label>

        <div class="contact-form-input-icon">
          <svg viewBox="0 0 18 16">
            <defs></defs>
            <g id="Group_92_1_" transform="translate(-6.5 -8)">
              <line
                id="Line_14_1_"
                class="st0"
                x1="6.5"
                y1="8.5"
                x2="24.5"
                y2="8.5"
              />
              <line
                id="Line_15_1_"
                class="st0"
                x1="10.8"
                y1="11.5"
                x2="24.5"
                y2="11.5"
              />
              <line
                id="Line_16_1_"
                class="st0"
                x1="6.5"
                y1="14.5"
                x2="24.5"
                y2="14.5"
              />
              <line
                id="Line_17_1_"
                class="st0"
                x1="10.8"
                y1="17.5"
                x2="24.5"
                y2="17.5"
              />
              <line
                id="Line_18_1_"
                class="st0"
                x1="6.5"
                y1="20.5"
                x2="24.5"
                y2="20.5"
              />
              <line
                id="Line_19_1_"
                class="st0"
                x1="10.8"
                y1="23.5"
                x2="24.5"
                y2="23.5"
              />
            </g>
          </svg>
        </div>

        <div
          *ngIf="
            email.invalid && (email.dirty || email.touched || ngForm.submitted)
          "
          class="form-overbox form-error"
        >
          <h3 *ngIf="email.errors.required">Email required!</h3>
          <h3 *ngIf="email.errors.pattern">Not a valid email!</h3>
        </div>

        <input
          id="email"
          class="form-input"
          formControlName="email"
          placeholder="email@address.com"
          type="email"
          required
          name="email"
        />
      </div>

      <div class="contact-form-input-group">
        <label for="text">Your Message</label>

        <div
          *ngIf="
            text.invalid && (text.dirty || text.touched || ngForm.submitted)
          "
          class="form-overbox form-error"
        >
          <h3 *ngIf="text.errors.required">Message required!</h3>
        </div>

        <textarea
          id="text"
          class="form-input-text"
          formControlName="text"
          placeholder="Your message here"
          required
          name="text"
        ></textarea>
      </div>

      <button type="submit" class="btn">Send {{ displayName }}</button>
      <button
        *ngIf="contactType === 'enquiries'"
        (click)="closeContactForm.emit()"
        type="button"
        class="btn btn-close"
      >
        Close Menu
      </button>
    </form>
  `,
  styleUrls: ['./mail.component.scss'],
})
export class MailComponent implements OnInit {
  @Input() contactType: string;
  @Input() displayName: string;
  public mailForm: FormGroup;

  @Output() closeContactForm: EventEmitter<any> = new EventEmitter<any>();

  @HostBinding('className') class = 'contact-form-container';

  constructor(
    private afs: AngularFirestore,
    private pageTransition: PageTransitionsService
  ) {}

  ngOnInit(): void {
    this.mailForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^[a-z0-9](?!.*?[^\na-z0-9]{2})[^\s@]+@[^\s@]+\.[^\s@]+[a-z0-9]$/
        ),
      ]),
      name: new FormControl(''),
      text: new FormControl(''),
    });
  }

  onSubmit(data) {
    if (this.mailForm.valid) {
      // If it is an enquiry store it for now, this should all be email logic
      if (this.contactType === 'enquiries') {
        // This should also probably send out an email to the user that we have gotten it
        // Secondly it should send the message to the actual owner of the place as an email
        // instead of saving it
        this.createNewEntry(data, 'messages').then(() => {
          this.closeContactForm.emit();
        });
      } else if (this.contactType === 'messages') {
        this.createNewEntry(data, 'messages');
        this.pageTransition.navigate('/');
      }
    }
  }

  private createNewEntry(data, path) {
    return new Promise<any>((resolve, reject) => {
      this.afs
        .collection(path)
        .add(data)
        .then(
          (res) => {
            resolve(res);
          },
          (err) => reject(err)
        );
    });
  }

  get name() {
    return this.mailForm.get('name');
  }

  get email() {
    return this.mailForm.get('email');
  }

  get text() {
    return this.mailForm.get('text');
  }
}
