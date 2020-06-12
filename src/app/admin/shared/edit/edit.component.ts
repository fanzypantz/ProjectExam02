import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Reservation } from '../models/reservation.model';
import { Message } from '../models/message.model';
import { Post } from '../models/post.model';
import { User } from '../models/user.model';
import { Establishment } from '../models/establisment.model';
import { adminConfig, WriteInterface } from '../../admin.config';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { PageTransitionsService } from '../../../shared/page-transitions.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit, OnDestroy, OnChanges {
  @Input() model: string;
  @Input() id: string;
  private paramSub: Subscription;
  private documentSubscription: Subscription;
  public adminForm: FormGroup;
  public writeLayout: WriteInterface[];
  private document: Observable<any>;
  public data: any;
  public isSaving: boolean;

  constructor(
    private afs: AngularFirestore,
    private route: ActivatedRoute,
    private pageTransition: PageTransitionsService
  ) {}

  ngOnInit(): void {
    this.paramSub = this.route.queryParams.subscribe((p) => {
      if (p.mode === 'edit') {
        this.isSaving = true;
        this.data = null;
        this.initEdit();
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    this.initEdit();
  }

  ngOnDestroy(): void {
    this.documentSubscription.unsubscribe();
    this.paramSub.unsubscribe();
  }

  initEdit(): void {
    this.writeLayout = adminConfig[this.model].writeLayout;
    this.document = this.getCollection();
    this.documentSubscription = this.document.subscribe((snapshot) => {
      this.data = snapshot;
      // When data arrives/changes make a formGroup dynamically based on the keys
      // from the layout config
      const group = {};
      this.writeLayout.forEach((layoutItem) => {
        // Booking is the only value in the database that should never be a regular widget
        // Todo: Remove booking from DB so this if statement can be removed
        if (layoutItem.key !== 'booking') {
          group[layoutItem.key] = new FormControl({
            value: this.data[layoutItem.key],
            disabled: !layoutItem.editAble,
          });
        }
      });

      this.adminForm = new FormGroup(group);
      this.pageTransition.toggleOpenClose(0);
      this.isSaving = false;
    });
  }

  getCollection() {
    // Use the queryParam and Model to force type declaration in the document
    // No invalid data can be displayed
    switch (this.model) {
      case 'reservations':
        return this.afs
          .collection<Reservation>(this.model)
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
    // Save the document based on it's model and ID.
    this.isSaving = true;
    const documentRef = this.afs.doc(`${this.model}/${this.id}`);
    documentRef.set(data, { merge: true }).then((r) => (this.isSaving = false));
  }
}
