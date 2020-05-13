import { Component, OnInit, Input } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Establishment } from '../../../shared/models/establisment.model';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.scss'],
})
export class ReadComponent implements OnInit {
  @Input() model: string;
  collections: Observable<Establishment[]>;

  constructor(private afs: AngularFirestore) {}

  ngOnInit(): void {
    console.log('hello I am going to read: ');
    this.collections = this.getCollection();
    this.collections.subscribe((data) => {
      console.log('data: ', data);
    });
  }

  getCollection() {
    return this.afs.collection<Establishment>(this.model).valueChanges();
  }
}
