import { Component, Input, OnInit } from '@angular/core';



import { UserService } from '../../../../services/user.service';


@Component({
  selector: 'app-user-list-dialog',
  templateUrl: './user-list-dialog.component.html',
  styleUrls: ['./user-list-dialog.component.css'],
})
export class UserListDialogComponent implements OnInit {
  title!: string;
  users!: any[];
  showUnblockButton: boolean = false;
  showUnfollowButton: boolean = false;

  constructor(private userService: UserService) {}

  ngOnInit() {}

  unblockUser(userId: string) {
    this.userService.unblockUser(userId);
  }

  unfollowUser(userId: string) {
    this.userService.userUnfollowUser(userId);
  }
}