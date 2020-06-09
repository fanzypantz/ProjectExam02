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
  private collectionsSubscription: Subscription;
  private paramSub: Subscription;
  readLayout: ReadInterface[];
  collections: Observable<
    Establishment[] | Enquiry[] | Post[] | User[] | Message[]
  >;
  showConfirmPrompt = false;
  deleteId: string;
  private page: any;
  private readonly pageOffset: any;
  private data: Establishment[] | Enquiry[] | Post[] | User[] | Message[];
  public renderData: Establishment[] | Enquiry[] | Post[] | User[] | Message[];

  constructor(
    private afs: AngularFirestore,
    private route: ActivatedRoute,
    public pageTransition: PageTransitionsService
  ) {
    this.page = 1;
    this.pageOffset = 10;
    // Subscribe to the queryParams so every time it changes this function is called
    // When the queryParam change, change the values and fetch the new data
    this.paramSub = route.queryParams.subscribe((p) => {
      if (p.mode === 'read') {
        this.model = p.model;
        this.readLayout = adminConfig[p.model].readLayout;
        this.setData();
      }
    });
  }

  ngOnInit(): void {
    this.readLayout = adminConfig[this.model].readLayout;
    this.setData();
  }

  ngOnDestroy(): void {
    this.paramSub.unsubscribe();
    this.collectionsSubscription.unsubscribe();
  }

  setData() {
    this.collections = this.route.snapshot.data.collections;
    this.collectionsSubscription = this.collections.subscribe((snapshot) => {
      this.data = snapshot;
      this.renderData = this.paginate(this.data, this.pageOffset, this.page);
      this.pageTransition.toggleOpenClose(0);
    });
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

  // Source: https://stackoverflow.com/a/42761393/6422461
  paginate(
    array: Establishment[] | Enquiry[] | Post[] | User[] | Message[],
    pageSize: number,
    pageNumber: number
  ): Establishment[] | Enquiry[] | Post[] | User[] | Message[] {
    // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
    return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
  }

  nextPage() {
    if (this.page * this.pageOffset < this.data.length) {
      this.page = this.page + 1;
      this.renderData = this.paginate(this.data, this.pageOffset, this.page);
    }
  }

  previousPage() {
    if (this.page > 1) {
      this.page = this.page - 1;
      this.renderData = this.paginate(this.data, this.pageOffset, this.page);
    }
  }

  get searchResultLength() {
    return this.data.length;
  }

  get dataArray() {
    return this.data;
  }
}
