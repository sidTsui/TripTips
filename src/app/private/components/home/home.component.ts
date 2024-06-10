import { Component, OnInit } from '@angular/core';



import { AuthService } from '../../../services/auth.service';
import { ChatService } from '../../../services/chat.service';
import { PostService } from '../../../services/post.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor() {}
}