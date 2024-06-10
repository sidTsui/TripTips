import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';



import { AuthService } from '../../../../services/auth.service';


@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.css'],
})
export class PasswordChangeComponent {
  constructor(private authService: AuthService) {}

  passwordChangeForm: FormGroup = new FormGroup(
    {
      oldPassword: new FormControl(null, [Validators.required]),
      newPassword: new FormControl(null, [Validators.required]),
      newPasswordConfirm: new FormControl(null, [Validators.required]),
    },
    {
      validators: PasswordChangeComponent.passwordsMatching,
    },
  );

  static passwordsMatching(control: AbstractControl): ValidationErrors | null {
    const newPassword = control.get('newPassword')?.value;
    const newPasswordConfirm = control.get('newPasswordConfirm')?.value;

    return newPassword === newPasswordConfirm && newPassword !== null && newPasswordConfirm !== null
      ? null
      : { passwordsDoNotMatch: true };
  }

  async onSubmit(): Promise<void> {
    const password = this.passwordChangeForm.value;
    this.authService.changePassword(password);
  }
}