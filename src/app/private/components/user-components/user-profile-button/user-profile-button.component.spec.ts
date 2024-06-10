import { async, ComponentFixture, TestBed } from '@angular/core/testing';



import { mockUsers } from '../../../../../test/dataset/users';
import { User } from '../../../../models/user.interface';
import { AuthService } from '../../../../services/auth.service';
import { UserService } from '../../../../services/user.service';
import { UserProfileButtonComponent } from './user-profile-button.component';


describe('UserProfileButtonComponent', () => {
  let component: UserProfileButtonComponent;
  let fixture: ComponentFixture<UserProfileButtonComponent>;
  let mockUserService!: { getUserById: jest.Mock };

  beforeEach(async(() => {
    mockUserService = {
      getUserById: jest.fn((mockUsersId) => {
        return {
          subscribe: jest.fn().mockReturnValue(mockUsers.get(mockUsersId)),
        };
      }),
    };

    const mockAuthService = {
      getUserById: jest.fn(),
    };

    TestBed.configureTestingModule({
      declarations: [UserProfileButtonComponent],
      providers: [
        { provide: UserService, useValue: mockUserService },
        { provide: AuthService, useValue: mockAuthService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserProfileButtonComponent);
    component = fixture.componentInstance;
    component.userId = 'MRogfqrsRjhFkXsCA8TkCfLLDXp1';
    component.user = mockUsers.get('MRogfqrsRjhFkXsCA8TkCfLLDXp1') as User;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});