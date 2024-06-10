import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';



import { debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';



import { User } from '../../../../models/user.interface';
import { UserService } from '../../../../services/user.service';


@Component({
  selector: 'app-select-users',
  templateUrl: './select-users.component.html',
  styleUrls: ['./select-users.component.css'],
})
export class SelectUsersComponent implements OnInit {
  @Output() removeuser: EventEmitter<User> = new EventEmitter<User>();
  @Output() addUser: EventEmitter<User> = new EventEmitter<User>();

  @Input() users: User[] = [];

  searchUsername = new FormControl();
  filteredUsers: User[] = [];
  selectedUser: User = {};

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.searchUsername.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap((username: string) =>
          this.userService.findByUsername(username).pipe(
            tap((users: User[]) => {
              this.filteredUsers = users;
            }),
          ),
        ),
      )
      .subscribe();
  }

  addUserToForm() {
    this.addUser.emit(this.selectedUser);
    this.searchUsername.setValue(null);
    this.filteredUsers = [];
    this.selectedUser = {};
  }

  removeUserFromForm(user: User) {
    this.removeuser.emit(user);
  }

  setSelectedUser(user: User) {
    this.selectedUser = user;
  }

  displayFn(user: User): string {
    if (user) {
      return user.username || '';
    } else {
      return '';
    }
  }
}