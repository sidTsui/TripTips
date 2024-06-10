import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



import { mockRooms } from '../../../../../test/dataset/rooms';
import { ChatService } from '../../../../services/chat.service';
import { ChatRoomComponent } from './chat-room.component';


describe('ChatRoomComponent', () => {
  let component: ChatRoomComponent;
  let fixture: ComponentFixture<ChatRoomComponent>;

  const mockChatService = {
    sendMessage: jest.fn(),
    getMessages: jest.fn(() => {
      return {
        subscribe: jest.fn(),
      };
    }),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChatRoomComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        BrowserAnimationsModule,
      ],
      providers: [{ provide: ChatService, useValue: mockChatService }],
    }).compileComponents();

    fixture = TestBed.createComponent(ChatRoomComponent);
    component = fixture.componentInstance;
    component.chatRoom = mockRooms.get('OEK4boZbAedjiGOl9oJx')!;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});