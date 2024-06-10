import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';



import { Observable } from 'rxjs';



import { Room } from '../models/room.interface';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(
    private authService: AuthService,
    private afs: AngularFirestore,
  ) {}

  createRoom(room: Room) {
    room = {
      ...room,
      name: room.users.map((user) => user.username).join(', '),
    };
    return this.afs.collection('rooms').add(room);
  }

  getMessages(roomId: string): Observable<unknown[]> {
    return this.afs.collection(`rooms/${roomId}/messages`, (ref) => ref.orderBy('timestamp')).valueChanges();
  }

  getMyRooms() {
    const user = this.authService.currentUser;
    return this.afs
      .collection<Room>('rooms', (ref) =>
        ref.where('users', 'array-contains', {
          id: user!.uid,
          username: user.displayName,
          email: user.email,
        }),
      )
      .valueChanges({ idField: 'id' });
  }

  getAllMessages() {
    return this.afs.collectionGroup('messages').valueChanges({ idField: 'id' });
  }

  sendMessage(roomId: string, message: string): void {
    const test = this.authService.currentUser.displayName;
    this.afs
      .collection(`rooms/${roomId}/messages`)
      .add({
        content: message,
        timestamp: new Date(),
        type: 'text',
        createdBy: this.authService.currentUser.displayName,
        createdById: this.authService.currentUser.uid,
      })
      .catch(() => {
        throw new Error('Error sending message');
      });
  }
}