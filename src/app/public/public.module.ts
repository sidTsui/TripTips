import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatStepperModule } from '@angular/material/stepper';

import { NgxMaskModule } from 'ngx-mask';

import { LoginAndSignupComponent } from './components/login-and-signup/login-and-signup.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { PublicRoutingModule } from './public-routing.module';

@NgModule({
  declarations: [LoginAndSignupComponent, ResetPasswordComponent],
  imports: [
    MatProgressSpinnerModule,
    NgxMaskModule.forRoot(),
    PublicRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatStepperModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    CommonModule,
  ],
  providers: [],
})
export class PublicModule {}
