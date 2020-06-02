import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Enquiry } from '../models/enquiry.model';
import { Message } from '../models/message.model';
import { Post } from '../models/post.model';
import { User } from '../models/user.model';
import { Establishment } from '../models/establisment.model';
import { adminConfig, ReadInterface, WriteInterface } from '../../admin.config';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit, OnDestroy {
  @Input() model: string;
  @Input() id: string;
  private documentSubscription: Subscription;
  public adminForm: FormGroup;
  public writeLayout: WriteInterface[];
  private document: Observable<any>;
  public data: any;

  constructor(private afs: AngularFirestore) {}

  ngOnInit(): void {
    this.writeLayout = adminConfig[this.model].writeLayout;
    this.document = this.getCollection();
    this.documentSubscription = this.document.subscribe((snapshot) => {
      this.data = snapshot;
      // When data arrives/changes make a formGroup dynamically based on the keys
      // from the layout config
      const group = {};
      this.writeLayout.forEach((layoutItem) => {
        if (layoutItem.key === 'booking') {
        } else {
          group[layoutItem.key] = new FormControl({
            value: this.data[layoutItem.key],
            disabled: !layoutItem.editAble,
          });
        }
      });

      this.adminForm = new FormGroup(group);
    });
  }

  ngOnDestroy(): void {
    this.documentSubscription.unsubscribe();
  }

  getCollection() {
    // Use the queryParam and Model to force type declaration in the document
    // No invalid data can be displayed
    switch (this.model) {
      case 'enquiries':
        return this.afs
          .collection<Enquiry>(this.model)
          .doc(this.id)
          .valueChanges();
      case 'messages':
        return this.afs
          .collection<Message>(this.model)
          .doc(this.id)
          .valueChanges();
      case 'posts':
        return this.afs
          .collection<Post>(this.model)
          .doc(this.id)
          .valueChanges();
      case 'users':
        return this.afs
          .collection<User>(this.model)
          .doc(this.id)
          .valueChanges();
      default:
        return this.afs
          .collection<Establishment>(this.model)
          .doc(this.id)
          .valueChanges();
    }
  }

  onSubmit(data) {
    console.log('submitted data: ', data);
  }
}
