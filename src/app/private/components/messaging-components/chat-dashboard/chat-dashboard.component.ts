import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectionListChange } from '@angular/material/list';
import { PageEvent } from '@angular/material/paginator';



import { Observable } from 'rxjs';



import { Room } from '../../../../models/room.interface';
import { AuthService } from '../../../../services/auth.service';
import { ChatService } from '../../../../services/chat.service';
import { CreateRoomModalComponent } from '../create-room-modal/create-room-modal.component';


@Component({
  selector: 'app-chat-dashboard',
  templateUrl: './chat-dashboard.component.html',
  styleUrls: ['./chat-dashboard.component.css'],
})
export class ChatDashboardComponent implements OnInit, AfterViewInit {
  rooms$!: Observable<Room[]>;

  user = this.authService.currentUser;
  roomSelected$: boolean = false;
  selectedRoom!: Room;

  constructor(
    private chatService: ChatService,
    private authService: AuthService,
    public dialog: MatDialog,
  ) {}

  openCreateRoomModal(): void {
    const dialogRef = this.dialog.open(CreateRoomModalComponent, {
      width: '450px',
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }

  ngOnInit() {
    this.rooms$ = this.chatService.getMyRooms();
  }

  ngAfterViewInit() {}

  onSelectRoom(event: MatSelectionListChange) {
    this.selectedRoom = event.source.selectedOptions.selected[0].value;
    this.roomSelected$ = true;
  }
}