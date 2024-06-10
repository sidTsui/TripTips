import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { UserService } from '../../../../services/user.service';
import { UsersDashboardComponent } from './users-dashboard.component';

describe('UsersDashboardComponent', () => {
  let component: UsersDashboardComponent;
  let fixture: ComponentFixture<UsersDashboardComponent>;

  const mockActivatedRoute = {
    navigate: jest.fn(),
    snapshot: {
      params: {},
    },
  };

  const mockUserService = {
    getUserById: jest.fn(() => ({
      subscribe: jest.fn(),
    })),
    getUsers: jest.fn(),
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UsersDashboardComponent],
      imports: [RouterModule, MatInputModule],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: UserService, useValue: mockUserService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UsersDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
