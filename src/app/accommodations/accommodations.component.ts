import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Establishment } from '../admin/shared/models/establisment.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { PageTransitionsService } from '../shared/page-transitions.service';
import 'firebase/firestore';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-accommodations',
  templateUrl: './accommodations.component.html',
  styleUrls: ['./accommodations.component.scss'],
})
export class AccommodationsComponent implements OnInit, OnDestroy {
  private paramSub: Subscription;
  public area: string;
  public checkIn: number;
  public checkOut: number;
  public adults: string;
  public rooms: string;
  private page: number;
  private readonly pageOffset: number;
  private searchResults: Establishment[];
  public renderResult: Establishment[];

  constructor(
    private afs: AngularFirestore,
    private route: ActivatedRoute,
    private router: Router,
    public pageTransition: PageTransitionsService
  ) {
    this.pageOffset = 10;
    this.paramSub = route.queryParams.subscribe((p) => {
      // Get all data from the query string
      this.page = p.page ? parseInt(p.page, 10) : 1;
      this.area = p.area;
      this.checkIn = Date.parse(p.checkIn);
      this.checkOut = Date.parse(p.checkOut);
      this.adults = p.adults;
      this.rooms = p.rooms;
    });
  }

  ngOnInit(): void {
    this.searchResults = this.sortAlphabetically(
      this.route.snapshot.data.collections
    );

    this.renderResult = this.paginate(
      this.searchResults,
      this.pageOffset,
      this.page
    );
    this.pageTransition.toggleOpenClose(0);
  }

  ngOnDestroy(): void {
    this.paramSub.unsubscribe();
  }

  sortAlphabetically(array): Establishment[] {
    return array.sort((a, b) => {
      return a.establishmentName < b.establishmentName ? -1 : 1;
    });
  }

  // Source: https://stackoverflow.com/a/42761393/6422461
  paginate(
    array: Establishment[],
    pageSize: number,
    pageNumber: number
  ): Establishment[] {
    // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
    return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
  }

  nextPage() {
    if (this.page * this.pageOffset < this.searchResults.length) {
      this.page = this.page + 1;
      this.renderResult = this.paginate(
        this.searchResults,
        this.pageOffset,
        this.page
      );
      this.changeQueryParam(this.page);
    }
  }

  previousPage() {
    if (this.page > 1) {
      this.page = this.page - 1;
      this.renderResult = this.paginate(
        this.searchResults,
        this.pageOffset,
        this.page
      );
      this.changeQueryParam(this.page);
    }
  }

  changeQueryParam(page) {
    const urlTree = this.router.createUrlTree([], {
      queryParams: { page },
      queryParamsHandling: 'merge',
      preserveFragment: true,
    });

    this.router.navigateByUrl(urlTree);
  }

  get searchResultLength() {
    return this.searchResults.length;
  }
}
