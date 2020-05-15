import { Component, OnInit, Input } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Establishment } from '../../../shared/models/establisment.model';
import { User } from '../../../shared/models/user.model';

import { adminConfig, ReadInterface } from '../../admin.config';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-read-establishments',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.scss'],
})
export class ReadComponent implements OnInit {
  @Input() model: string;
  readLayout: ReadInterface[];
  collections: Observable<Array<any>>;

  constructor(private afs: AngularFirestore, private route: ActivatedRoute) {
    // Subscribe to the queryParams so every time it changes this function is called
    // When the queryParam change, change the values and fetch the new data
    route.queryParams.subscribe((p) => {
      this.model = p.model;
      this.readLayout = adminConfig[p.model].readLayout;
      this.collections = this.getCollection();
      this.collections.subscribe((p) => {
        console.log('p: ', p);
      });
    });
  }

  ngOnInit(): void {
    this.readLayout = adminConfig[this.model].readLayout;
    this.collections = this.getCollection();
  }

  getCollection() {
    // Use the queryParam and Model to force type declaration in the document
    // No invalid data can be displayed
    switch (this.model) {
      case 'enquiries':
        return this.afs
          .collection<Establishment>(this.model)
          .valueChanges({ idField: 'id' });
      case 'messages':
        return this.afs
          .collection<Establishment>(this.model)
          .valueChanges({ idField: 'id' });
      case 'posts':
        return this.afs
          .collection<Establishment>(this.model)
          .valueChanges({ idField: 'id' });
      case 'users':
        return this.afs.collection<User>(this.model).valueChanges();
      default:
        return this.afs
          .collection<Establishment>(this.model)
          .valueChanges({ idField: 'id' });
    }
  }
}
