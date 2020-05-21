import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Guards
import { CanDeleteGuard } from './auth/guards/can-delete.guard';
import { CanReadGuard } from './auth/guards/can-read.guard';

// Components
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { AccommodationsComponent } from './accommodations/accommodations.component';
import { AccommodationDetailsComponent } from './addommodation-details/accommodation-details.component';
import { ContactComponent } from './contact/contact.component';
import { EnquiriesComponent } from './enquiries/enquiries.component';
import { PostsComponent } from './posts/posts.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'accommodations', component: AccommodationsComponent },
  {
    path: 'accommodation-details/:id',
    component: AccommodationDetailsComponent,
  },
  {
    path: 'posts/:id',
    component: PostsComponent,
  },
  { path: 'contact', component: ContactComponent },
  { path: 'enquiries', component: EnquiriesComponent },
  { path: 'admin', component: AdminComponent, canActivate: [CanDeleteGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
