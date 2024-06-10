import { ComponentFixture, TestBed } from '@angular/core/testing';



import { AppModule } from '../../../../app.module';
import { AuthService } from '../../../../services/auth.service';
import { ChatMessageComponent } from './chat-message.component';

describe('ChatMessageComponent', () => {
  let component: ChatMessageComponent;
  let fixture: ComponentFixture<ChatMessageComponent>;
  let mockAuthService!: {
    currentUser: {
      uid: string;
    };
  };

  beforeEach(async () => {
    mockAuthService = {
      currentUser: {
        uid: '123',
      },
    };

    await TestBed.configureTestingModule({
      declarations: [ChatMessageComponent],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ChatMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});