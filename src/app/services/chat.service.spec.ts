import { TestBed } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';


import { mockFirebase } from '../../test/mockFirebase';
import { ChatService } from './chat.service';
import { Room } from '../models/room.interface';


describe('ChatService', () => {
  let service: ChatService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AngularFirestore, useValue: mockFirebase },
        { provide: AngularFireAuth, useValue: mockFirebase },
      ],
    });

    mockFirebase.setUpDB();

    service = TestBed.get(ChatService);
  });

  afterEach(() => {
    mockFirebase.clear();
    mockFirebase.clear();
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  describe('createRoom', () => {
    it('should create a room', async () => {
      const room = await service.createRoom(
        {
          id: 'test',
          name: 'Test Room',
          users: [
            {
              id: 'test',
              username: 'user1',
              email: 'user1@test.com',
            },
            {
              id: 'test2',
              username: 'user2',
              email: 'user2@test.com'
            }
          ],
        } as Room
      );
      expect(room).toBeDefined();
    });
  });

  describe('getMessages', () => {
    it('should get messages', async () => {
      const messages = await service.getMessages('test');
      expect(messages).toBeTruthy();
    });
  });

  describe('getMyRooms', () => {
    it('should get my rooms', async () => {
      const rooms = await service.getMyRooms();
      expect(rooms).toBeTruthy();
    });
  });

  // describe('sendMessage', () => {
  //   it('should send a message', async () => {
  //     const message = await service.sendMessage('test', 'Hello World!');
  //     expect(message).toBeTruthy();
  //   });
  // });
});