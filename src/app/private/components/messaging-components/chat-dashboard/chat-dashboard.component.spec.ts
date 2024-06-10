import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatInputModule } from '@angular/material/input';

import { AuthService } from '../../../../services/auth.service';
import { ChatService } from '../../../../services/chat.service';
import { ChatDashboardComponent } from './chat-dashboard.component';

describe('ChatDashboardComponent', () => {
  let component: ChatDashboardComponent;
  let fixture: ComponentFixture<ChatDashboardComponent>;

  const mockChatService = {
    getMyRooms: () => {
      return {
        subscribe: () => {},
      };
    },
  };

  const mockAuthService = {
    getLoggedInUser: () => {
      return {
        subscribe: () => {},
      };
    },
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChatDashboardComponent],
      imports: [MatInputModule],
      providers: [
        { provide: ChatService, useValue: mockChatService },
        { provide: AuthService, useValue: mockAuthService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ChatDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
