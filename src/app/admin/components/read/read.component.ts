import { Component, OnInit, Input } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Establishment } from '../../../shared/models/establisment.model';

import { adminConfig } from '../../admin.config';

@Component({
  selector: 'app-read-establishments',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.scss'],
})
export class ReadComponent implements OnInit {
  @Input() model: string;
  readLayout: any;
  collections: Observable<Array<any>>;

  constructor(private afs: AngularFirestore) {}

  ngOnInit(): void {
    this.readLayout = adminConfig[this.model].readLayout;
    console.log('test: ', this.readLayout);
    this.collections = this.getCollection();
  }

  getCollection() {
    switch (this.model) {
      case 'enquiries':
        return this.afs.collection<Establishment>(this.model).valueChanges();
      case 'messages':
        return this.afs.collection<Establishment>(this.model).valueChanges();
      case 'posts':
        return this.afs.collection<Establishment>(this.model).valueChanges();
      case 'users':
        return this.afs.collection<Establishment>(this.model).valueChanges();
      default:
        return this.afs.collection<Establishment>(this.model).valueChanges();
    }
  }
}
