import { Component, Input, OnInit } from '@angular/core';
import { Enquiry } from '../models/enquiry.model';
import { Message } from '../models/message.model';
import { Post } from '../models/post.model';
import { User } from '../models/user.model';
import { Establishment } from '../models/establisment.model';
import { adminConfig, ReadInterface } from '../../admin.config';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  @Input() model: string;
  @Input() id: string;
  writeLayout: ReadInterface[];
  document: Observable<any>;
  data: any;

  constructor(private afs: AngularFirestore) {}

  ngOnInit(): void {
    this.writeLayout = adminConfig[this.model].writeLayout;
    this.document = this.getCollection();
    this.document.subscribe((snapshot) => {
      this.data = snapshot;
    });
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
}
