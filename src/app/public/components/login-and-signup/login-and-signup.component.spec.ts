import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';

import { NgxMaskModule } from 'ngx-mask';

import { AuthService } from '../../../services/auth.service';
import { LoginAndSignupComponent } from './login-and-signup.component';

describe('LoginAndSignupComponent', () => {
  let component: LoginAndSignupComponent;
  let fixture: ComponentFixture<LoginAndSignupComponent>;
  let mockAuthService!: {
    signIn: jest.Mock;
    signUp: jest.Mock;
  };

  const mockActivatedRoute = {
    navigator: {
      get: jest.fn(),
    },
  };

  beforeEach(async(() => {
    mockAuthService = {
      signIn: jest.fn(),
      signUp: jest.fn(),
    };

    TestBed.configureTestingModule({
      declarations: [LoginAndSignupComponent],
      imports: [RouterModule, FormsModule, ReactiveFormsModule, NgxMaskModule.forRoot()],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginAndSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
