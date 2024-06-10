import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { MockComponent } from 'ng-mocks';

import { ChatDashboardComponent } from '../private/components/messaging-components/chat-dashboard/chat-dashboard.component';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { LayoutComponent } from './layout.component';


describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;

  const mockAuthService = { signOut: jest.fn() };

  const mockUserService = { findByUsername: jest.fn() };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LayoutComponent, MockComponent(ChatDashboardComponent)],
      imports: [
        MatSidenavModule,
        BrowserAnimationsModule,
        RouterModule,
        MatAutocompleteModule,
        FormsModule,
        ReactiveFormsModule,
      ],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: UserService, useValue: mockUserService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});