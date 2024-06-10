import { async, ComponentFixture, TestBed } from '@angular/core/testing';



import { mockUsers } from '../../../../../test/dataset/users';
import { AuthService } from '../../../../services/auth.service';
import { UserService } from '../../../../services/user.service';
import { OtherProfileComponent } from './other-profile.component';


describe('OtherProfileComponent', () => {
  let component: OtherProfileComponent;
  let fixture: ComponentFixture<OtherProfileComponent>;
  let mockAuthService!: {
    currentUser: jest.Mock;
  };
  let mockUserService: {
    getUserById: jest.Mock;
    getUserPosts: jest.Mock;
    getUserFriends: jest.Mock;
  };

  beforeEach(async(() => {
    mockAuthService = {
      currentUser: jest.fn().mockReturnValue({ uid: '1' }),
    };

    mockUserService = {
      getUserById: jest.fn(() => ({
        subscribe: jest.fn().mockReturnValue(mockUsers.get('MRogfqrsRjhFkXsCA8TkCfLLDXp1')),
      })),
      getUserPosts: jest.fn().mockReturnValue([]),
      getUserFriends: jest.fn().mockReturnValue([]),
    };

    TestBed.configureTestingModule({
      declarations: [OtherProfileComponent],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: UserService, useValue: mockUserService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(OtherProfileComponent);
    component = fixture.componentInstance;
    component.userId = 'MRogfqrsRjhFkXsCA8TkCfLLDXp1';
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});