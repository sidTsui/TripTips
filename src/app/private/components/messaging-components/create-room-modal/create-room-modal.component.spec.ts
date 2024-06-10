/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MockComponents } from 'ng-mocks';

import { AuthService } from '../../../../services/auth.service';
import { ChatService } from '../../../../services/chat.service';
import { SelectUsersComponent } from '../../util-components/select-users/select-users.component';
import { CreateRoomModalComponent } from './create-room-modal.component';

describe('CreateRoomModalComponent', () => {
  let component: CreateRoomModalComponent;
  let fixture: ComponentFixture<CreateRoomModalComponent>;
  let mockChatService!: {
    createRoom: jest.Mock;
  };
  let mockAuthService!: {
    currentUser: {
      uid: string;
    };
  };

  beforeEach(async(() => {
    mockChatService = {
      createRoom: jest.fn(),
    };

    mockAuthService = {
      currentUser: {
        uid: '123',
      },
    };

    TestBed.configureTestingModule({
      declarations: [CreateRoomModalComponent, MockComponents(SelectUsersComponent)],
      imports: [
        MatDialogModule,
        FormsModule,
        ReactiveFormsModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule,
      ],
      providers: [
        { provide: ChatService, useValue: mockChatService },
        { provide: AuthService, useValue: mockAuthService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateRoomModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
