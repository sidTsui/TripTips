import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';



import { debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs';



import { User } from '../models/user.interface';
import { ChatDashboardComponent } from '../private/components/messaging-components/chat-dashboard/chat-dashboard.component';
import { SettingsComponent } from '../private/components/user-components/settings/settings.component';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent {
  drawerOpened: boolean = false;
  searchText = '';
  searchUsername = new FormControl();
  filteredUsers: User[] = [];
  selectedUser: User = {};

  constructor(
    private authService: AuthService,
    private dialog: MatDialog,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    if (this.searchUsername.value === '') {
      this.filteredUsers = [];
      return;
    }

    this.searchUsername.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap((username: string) =>
          this.userService.findByUsername(username).pipe(
            tap((users: User[]) => {
              console.log(users);
              this.filteredUsers = users;
            }),
          ),
        ),
      )
      .subscribe();
  }

  toggleDrawer() {
    this.drawerOpened = !this.drawerOpened;
  }

  logout() {
    this.authService.signOut().subscribe(() => {
      window.location.reload();
    });
  }

  openSettingsModal(): void {
    const dialogRef = this.dialog.open(SettingsComponent, {
      width: '600px',
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }

  openChat(): void {
    const dialogRef = this.dialog.open(ChatDashboardComponent, {
      width: '90vw',
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }

  filterUsers(event: any) {
    let search = event.data;
    if (!search) {
      this.filteredUsers = [];
    } else {
      this.filteredUsers = this.filteredUsers.filter((user) =>
        user.username?.toLowerCase().includes(search.toLowerCase()),
      );
    }
  }

  setSelectedUser(user: User) {
    window.location.href = window.location.origin + `/s/followers/${user.id}`;
  }

  displayFn(user: User): string {
    if (user) {
      return user.username || '';
    } else {
      return '';
    }
  }
}