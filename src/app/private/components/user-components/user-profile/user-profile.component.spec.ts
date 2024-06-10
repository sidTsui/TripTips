import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { MockComponent } from 'ng-mocks';

import { AuthService } from '../../../../services/auth.service';
import { PostService } from '../../../../services/post.service';
import { UserService } from '../../../../services/user.service';
import { PostDashboardComponent } from '../../post-components/post-dashboard/post-dashboard.component';
import { MapBoxComponent } from '../../util-components/map-box/map-box.component';
import { UserProfileComponent } from './user-profile.component';

describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;

  const mockUserService = {
    getUserById: jest.fn(() => ({
      subscribe: jest.fn(),
    })),
    getFollowingUsers: jest.fn(() => ({
      subscribe: jest.fn(),
    })),
  };

  const mockAuthService = {
    currentUser: {
      uid: '123',
    },
  };

  const mockPostService = {
    getUserPosts: jest.fn(() => ({
      subscribe: jest.fn(),
    })),
  };

  const mockRouter = {
    navigate: jest.fn(),
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserProfileComponent, MockComponent(MapBoxComponent), MockComponent(PostDashboardComponent)],
      imports: [],
      providers: [
        { provide: UserService, useValue: mockUserService },
        { provide: AuthService, useValue: mockAuthService },
        { provide: PostService, useValue: mockPostService },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
