import { Component, Input } from '@angular/core';

import { Message } from '../../../../models/message.interface';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.css'],
})
export class ChatMessageComponent {
  @Input() message!: Message;
  userId = this.authService.currentUser.uid;

  constructor(private authService: AuthService) {
    this.message = {} as Message;
  }
}
