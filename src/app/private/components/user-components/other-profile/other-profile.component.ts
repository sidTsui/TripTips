import { Component, Input, OnChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';



import { User } from '../../../../models/user.interface';
import { AuthService } from '../../../../services/auth.service';
import { UserService } from '../../../../services/user.service';
import { UserListDialogComponent } from '../user-list-dialog/user-list-dialog.component';


@Component({
  selector: 'app-other-profile',
  templateUrl: './other-profile.component.html',
  styleUrls: ['./other-profile.component.css'],
})
export class OtherProfileComponent implements OnChanges {
  @Input() userId!: any;

  following: boolean = true;
  blocked: boolean = false;
  seeFollowersList: boolean = false;
  seeFollowingList: boolean = false;
  followers: string[] = [];
  followedAccounts: string[] = [];
  user!: User;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.userDetails();
  }

  ngOnChanges() {
    this.userDetails();
  }

  userDetails() {
    if (this.userId) {
      this.userService.getUserById(this.userId).subscribe((user) => {
        this.user = user as User;
        this.followers = this.user.followers!;
        this.blocked = this.user?.blockedBy!.includes(this.authService.currentUser.uid);
        this.following = !this.followers.includes(this.authService.currentUser.uid);

        this.userService.getFollowingUsers(this.userId).subscribe((followingList) => {
          this.followedAccounts = followingList.map((followingUser: any) => followingUser.id);
        });
      });
    }
  }

  followAccount() {
    if (!this.following == false) {
      this.userService.userFollowUser(this.userId);
    } else {
      this.userService.userUnfollowUser(this.userId);
    }
    this.following = !this.following;
  }

  blockUser() {
    if (this.blocked == false) {
      this.userService.blockUser(this.userId);
    } else {
      this.userService.unblockUser(this.userId);
    }
    this.blocked = !this.blocked;
  }

  viewFollowersList() {
    const dialogRef = this.dialog.open(UserListDialogComponent, {
      width: '300px',
    });

    dialogRef.componentInstance.title = 'Followers';
    dialogRef.componentInstance.users = this.user.followers!;
  }

  viewFollowingList() {
    const dialogRef = this.dialog.open(UserListDialogComponent, {
      width: '300px',
    });

    dialogRef.componentInstance.title = 'Following';
    dialogRef.componentInstance.users = this.user.following!;
  }
}