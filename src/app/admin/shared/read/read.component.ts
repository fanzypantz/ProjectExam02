import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';
import { Establishment } from '../models/establisment.model';
import { User } from '../models/user.model';
import { Enquiry } from '../models/enquiry.model';
import { Message } from '../models/message.model';
import { Post } from '../models/post.model';

import { adminConfig, ReadInterface } from '../../admin.config';
import { ActivatedRoute, Router } from '@angular/router';
import { PageTransitionsService } from '../../../shared/page-transitions.service';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.scss'],
})
export class ReadComponent implements OnInit, OnDestroy {
  @Input() model: string;
  private paramSub: Subscription;
  readLayout: ReadInterface[];
  collections: Observable<Array<any>>;
  showConfirmPrompt = false;
  deleteId: string;

  constructor(
    private afs: AngularFirestore,
    private route: ActivatedRoute,
    public pageTransition: PageTransitionsService
  ) {
    // Subscribe to the queryParams so every time it changes this function is called
    // When the queryParam change, change the values and fetch the new data
    this.paramSub = route.queryParams.subscribe((p) => {
      if (p.mode === 'read') {
        this.pageTransition.toggleOpenClose(0);
        this.model = p.model;
        this.readLayout = adminConfig[p.model].readLayout;
        this.collections = this.route.snapshot.data.collections;
      }
    });
  }

  ngOnInit(): void {
    this.pageTransition.toggleOpenClose(0);
    this.readLayout = adminConfig[this.model].readLayout;
    this.collections = this.route.snapshot.data.collections;
  }

  ngOnDestroy(): void {
    this.paramSub.unsubscribe();
  }

  confirmDelete(id) {
    this.showConfirmPrompt = true;
    this.deleteId = id;
  }

  cancelDelete() {
    this.showConfirmPrompt = false;
    this.deleteId = null;
  }

  deleteEntry() {
    this.showConfirmPrompt = false;
    this.afs.collection(this.model).doc(this.deleteId).delete();
    this.deleteId = null;
  }
}
