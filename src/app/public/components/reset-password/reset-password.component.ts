import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['../../public.style.css'],
})
export class ResetPasswordComponent implements OnInit {
  // FormGroup for the reset password form with a single field for email
  resetPassordForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
  });

  // Constructor with dependency injection for AuthService, MatSnackBar, and Router
  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router,
  ) {}

  // ngOnInit lifecycle hook - currently not used but necessary for OnInit implementation
  ngOnInit() {}

  // Method to initiate password reset process
  resetPassword() {
    this.authService.recoverPassword(this.resetPassordForm.value.email).subscribe({
      next: (response) => {
        // Handle successful password reset request
        this.snackBar.open('Reset Password Email Sent', 'close', {
          duration: 3000,
        });
        this.router.navigate(['/auth']);
      },
      error: (error) => {
        // Handle error in password reset request
        this.snackBar.open(error.error.message, 'close', {
          duration: 3000,
        });
      },
    });
  }
}
