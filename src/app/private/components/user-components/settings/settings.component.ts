import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { MatDialog } from '@angular/material/dialog';



import { finalize } from 'rxjs/operators';



import { User } from '../../../../models/user.interface';
import { AuthService } from '../../../../services/auth.service';
import { UserService } from '../../../../services/user.service';
import { PasswordChangeComponent } from '../password-change/password-change.component';
import { UserListDialogComponent } from '../user-list-dialog/user-list-dialog.component';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit {
  user!: User; // Defining user object to hold user account info
  previewUrl = this.authService.currentUser.photoURL; // Defining previewUrl to hold user profile image

  constructor(
    private storage: AngularFireStorage,
    private userService: UserService,
    private authService: AuthService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.userService.getUserById(this.authService.currentUser.uid).subscribe((data: any) => {
      this.user = data; // assigning fetched user data to user object
    });
  }

  loadFile(event: any) {
    const file = event.target.files[0]; // Get the file from the input event
    if (file) {
      // Define the file path in Firebase Storage
      const filePath = `profile_images/${new Date().getTime()}_${file.name}`;
      const fileRef = this.storage.ref(filePath); // Reference to the file location in Firebase Storage
      const uploadTask = this.storage.upload(filePath, file); // Upload the file to Firebase Storage

      // Get notified when the download URL is available and update user profile
      uploadTask
        .snapshotChanges()
        .pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe((url) => {
              this.userService.updateUserProfilePicture(this.authService.currentUser.uid, url); // Update user profile image in Firestore
              this.authService.currentUser
                .updateProfile({
                  photoURL: url,
                })
                .catch((error) => {
                  // Handle error here
                  console.error('Error updating profile:', error);
                });
            });
          }),
        )
        .subscribe();
    }
  }

  openPasswordChangeModal(): void {
    const dialogRef = this.dialog.open(PasswordChangeComponent, {
      width: '850px',
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }

  openBlockedUserModal() {
    const dialogRef = this.dialog.open(UserListDialogComponent, {
      width: '300px',
    });

    dialogRef.componentInstance.title = 'Blocked Users';
    dialogRef.componentInstance.users = this.user.blocked!;
    dialogRef.componentInstance.showUnblockButton = true;
  }
}