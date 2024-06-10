import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';



import { Observable } from 'rxjs';

import { User } from '../../../../models/user.interface';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-users-dashboard',
  templateUrl: './users-dashboard.component.html',
  styleUrls: ['./users-dashboard.component.css'],
})
export class UsersDashboardComponent implements OnInit {
  users$!: Observable<User[]>;
  userSelected$: boolean = false;
  selectedUser!: any;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
  ) {}

  async ngOnInit() {
    this.users$ = await this.userService.getUsers();
    if (this.route.snapshot.params['id']) {
      this.userService.getUserById(this.route.snapshot.params['id']).subscribe((user) => {
        this.selectedUser = user;
        this.userSelected$ = true;
      });
    }
  }

  onSelectUser(user: any) {
    this.userSelected$ = true;
    this.selectedUser = user;
    const refresh = window.location.protocol + '//' + window.location.host + '/s/followers/' + this.selectedUser.id;
    window.history.pushState({ path: refresh }, '', refresh);
  }
}