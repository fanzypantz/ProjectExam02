import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';
import { CanDeleteGuard } from './guards/can-delete.guard';
import { CanReadGuard } from './guards/can-read.guard';

@NgModule({
  imports: [CommonModule],
  declarations: [],
  providers: [AuthService, CanDeleteGuard, CanReadGuard],
})
export class AuthModule {}
