import { Component, Input, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service'

import { User } from '../../../../models/user.interface';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-user-profile-button',
  templateUrl: './user-profile-button.component.html',
  styleUrls: ['./user-profile-button.component.css'],
})
export class UserProfileButtonComponent implements OnChanges {
  @Input()
  userId!: string;

  user!: User;

  constructor(
    private userService: UserService,
    private router: Router,
    private authService: AuthService,
  ) {}

  ngOnChanges() {
    if (this.userId) {
      this.userService.getUserById(this.userId).subscribe((user) => {
        this.user = user as User;
      });
    }
  }

  goToUser() {
    if (this.userId == this.authService.currentUser.uid) {
      this.router.navigate(['s/profile/']);
    }
    else {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['s/followers/' + this.userId]);
    });
    }
  }
}