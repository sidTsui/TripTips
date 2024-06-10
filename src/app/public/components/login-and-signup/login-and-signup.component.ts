import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
// Import form-related classes for handling form controls and validation
import { MatSnackBar } from '@angular/material/snack-bar'; // Import MatSnackBar for displaying notifications

import { Router } from '@angular/router'; // Import Router for navigation

import { AuthService } from '../../../services/auth.service'; // Import AuthService for authentication operations

@Component({
  selector: 'app-login-and-signup', // Component's CSS selector
  templateUrl: './login-and-signup.component.html', // Path to the HTML template
  styleUrls: ['../../public.style.css'], // Path to the stylesheets
})
export class LoginAndSignupComponent implements OnInit {
  // FormGroup for the login form with validations
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required]),
  });

  // FormGroup for the signup form with validations and custom validator
  signupForm: FormGroup = new FormGroup(
    {
      firstName: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),
      username: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      phoneNumber: new FormControl(null, [Validators.required, Validators.pattern('^[0-9]{10}$')]),
      password: new FormControl(null, [Validators.required]),
      passwordConfirm: new FormControl(null, [Validators.required]),
    },
    {
      validators: LoginAndSignupComponent.passwordsMatching,
    },
  );

  // Component state properties
  isRegestered = false;
  isLoggingIn = false;
  isRecoveringPassword = false;

  // Constructor with dependency injection
  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router,
  ) {}

  // ngOnInit lifecycle hook (currently unused)
  ngOnInit(): void {}

  // Method to handle login
  login() {
    this.isLoggingIn = true;

    this.authService
      .signIn({
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
      })
      .subscribe({
        next: () => this.router.navigate(['s']),
        error: (error) => {
          this.isLoggingIn = false;
          this.snackBar.open(error.message, 'OK', {
            duration: 5000,
          });
        },
      });
  }

  // Method to reset login and signup forms
  resetForms() {
    this.loginForm.reset();
    this.signupForm.reset();
  }

  // Method to handle registration
  regester() {
    this.isRegestered = true; // Set registration status to true

    this.authService
      .signUp({
        // Collect form data for registration
        firstName: this.signupForm.value.firstName,
        lastName: this.signupForm.value.lastName,
        username: this.signupForm.value.username,
        email: this.signupForm.value.email,
        password: this.signupForm.value.password,
        phoneNumber: this.signupForm.value.phoneNumber,
      })
      .subscribe({
        next: () => {
          document.getElementById('tab-1')?.click(),
            this.snackBar.open('Successfully Signed Up!', 'OK', {
              duration: 5000,
            });
        },
        error: (error) => {
          this.isRegestered = false;
          this.snackBar.open(error.message, 'OK', {
            duration: 5000,
          });
        },
      });
  }

  // Static method for custom validator to check if passwords match
  static passwordsMatching(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const passwordConfirm = control.get('passwordConfirm')?.value;

    // Return null if passwords match (no error), or an error object if they don't
    return password === passwordConfirm && password !== null && passwordConfirm !== null
      ? null
      : { passwordsNotMatching: true };
  }

  activeForm: 'login' | 'signup' = 'login'; // Default to login form

  switchForm(form: 'login' | 'signup'): void {
    this.activeForm = form;
  }
}
