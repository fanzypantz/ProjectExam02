import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminResolverService } from './admin/shared/admin-resolver.service';
// Guards
import { CanDeleteGuard } from './shared/auth/guards/can-delete.guard';
import { CanReadGuard } from './shared/auth/guards/can-read.guard';

// Components
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { AccommodationsComponent } from './accommodations/accommodations.component';
import { AccommodationDetailsComponent } from './addommodation-details/accommodation-details.component';
import { ContactComponent } from './contact/contact.component';
import { ReservationsComponent } from './reservations/reservations.component';
import { PostsDetailsComponent } from './posts-details/posts-details.component';
import { PostsComponent } from './posts/posts.component';
import { PostResolverService } from './shared/post-resolver.service';
import { AccommodationResolverService } from './shared/accommodation-resolver.service';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'accommodations',
    component: AccommodationsComponent,
    resolve: { collections: AccommodationResolverService },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
  },
  {
    path: 'accommodation-details/:id',
    component: AccommodationDetailsComponent,
  },
  {
    path: 'posts',
    component: PostsComponent,
    resolve: { collections: PostResolverService },
  },
  {
    path: 'post/:id',
    component: PostsDetailsComponent,
  },
  { path: 'contact', component: ContactComponent },
  {
    path: 'reservations',
    component: ReservationsComponent,
    canActivate: [CanReadGuard],
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [CanDeleteGuard],
    resolve: { collections: AdminResolverService },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
