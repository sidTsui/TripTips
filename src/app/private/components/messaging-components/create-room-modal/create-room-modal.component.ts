import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';



import { User } from '../../../../models/user.interface';
import { AuthService } from '../../../../services/auth.service';
import { ChatService } from '../../../../services/chat.service';


@Component({
  selector: 'app-create-room-modal',
  templateUrl: './create-room-modal.component.html',
  styleUrls: ['./create-room-modal.component.css'],
})
export class CreateRoomModalComponent {
  form: FormGroup = new FormGroup({
    users: new FormArray([], [Validators.required]),
  });

  constructor(
    private chatService: ChatService,
    private authService: AuthService,
  ) {}

  create() {
    const user = this.authService.currentUser;
    this.addUser(
      new FormControl({
        id: user.uid,
        username: user.displayName,
        email: user.email,
      }),
    );

    if (this.form.valid) {
      this.chatService.createRoom(this.form.getRawValue());
      const closeButton = document.getElementById('close-button');
      if (closeButton) {
        closeButton.click();
      }
    }
  }

  initUser(user: User) {
    return new FormControl({
      id: user.id,
      username: user.username,
      email: user.email,
    });
  }

  addUser(userFormControl: FormControl) {
    this.users.push(userFormControl);
  }

  removeUser(user: User) {
    this.users.removeAt(this.users.value.findIndex((user: User) => user.id === user.id));
  }

  clearForm() {
    this.form.reset();
  }

  get name(): FormControl {
    return this.form.get('name') as FormControl;
  }

  get description(): FormControl {
    return this.form.get('description') as FormControl;
  }

  get users(): FormArray {
    return this.form.get('users') as FormArray;
  }
}