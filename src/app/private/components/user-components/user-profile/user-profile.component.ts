import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';



import { Post } from '../../../../models/post.interface';
import { User } from '../../../../models/user.interface';
import { AuthService } from '../../../../services/auth.service';
import { PostService } from '../../../../services/post.service';
import { UserService } from '../../../../services/user.service';
import { SettingsComponent } from '../settings/settings.component';
import { UserListDialogComponent } from '../user-list-dialog/user-list-dialog.component';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  // Define user object to hold user data
  user = this.authService.currentUser;
  userProfile!: User;
  userPosts: Post[] = [];
  seeFollowersList: boolean = false;
  seeFollowingList: boolean = false;
  followers: string[] = [];
  followedAccounts: string[] = [];

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private postService: PostService,
    private router: Router,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.getUserProfile();
  }

  getUserProfile(): void {
    this.userService.getUserById(this.user.uid).subscribe((user) => {
      this.userProfile = user as User;
      this.followers = this.userProfile.followers!;
    });

    this.postService.getUserPosts(this.user.uid).subscribe((posts) => {
      this.userPosts = posts;
    });

    this.userService.getFollowingUsers(this.user.uid).subscribe((followingList) => {
      this.followedAccounts = followingList.map((followingUser: any) => followingUser.id);
    });
  }

  viewFollowersList() {
    const dialogRef = this.dialog.open(UserListDialogComponent, {
      width: '300px',
    });

    dialogRef.componentInstance.title = 'Followers';
    dialogRef.componentInstance.users = this.userProfile.followers!;
  }

  viewFollowingList() {
    const dialogRef = this.dialog.open(UserListDialogComponent, {
      width: '300px',
    });

    dialogRef.componentInstance.title = 'Following';
    dialogRef.componentInstance.users = this.userProfile.following!;
    dialogRef.componentInstance.showUnfollowButton = true;
  }

  openSettingsDialog(): void {
    // function that opens the settings component dialog on user profile.
    const dialogRef = this.dialog.open(SettingsComponent, {
      width: '600px',
    });
    // May not be necessary, using for testing
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The settings dialog was closed');
    });
  }
}