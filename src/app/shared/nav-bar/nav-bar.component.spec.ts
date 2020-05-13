import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { DebugElement } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { firebaseConfig } from '../app.config';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';

import { NavBarComponent } from './nav-bar.component';

describe('NavBarComponent', () => {
  let component: NavBarComponent;
  let fixture: ComponentFixture<NavBarComponent>;
  let de: DebugElement;

  let service: AuthService;
  let spy: jasmine.Spy;

  beforeEach(async(() => {
    // const serviceStub = {
    //   test: () => of('test'),
    // };

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        AngularFireModule.initializeApp(firebaseConfig),
        AngularFirestoreModule,
        AngularFireAuthModule,
        AngularFireStorageModule,
      ],
      declarations: [NavBarComponent],
      providers: [AuthService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavBarComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;

    service = de.injector.get(AuthService);

    fixture.detectChanges();
  });

  it('should create', () => {
    console.log(
      'service: ',
      service.user$.subscribe((value) => {
        console.log('this is the user: ', value);
      })
    );
    expect(component).toBeTruthy();
  });
});
