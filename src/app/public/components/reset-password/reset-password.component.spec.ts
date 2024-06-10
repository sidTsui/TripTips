import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';

import { AuthService } from '../../../services/auth.service';
import { ResetPasswordComponent } from './reset-password.component';

describe('ResetPasswordComponent', () => {
  let component: ResetPasswordComponent;
  let fixture: ComponentFixture<ResetPasswordComponent>;
  let mockAuthService!: {
    recoverPassword: jest.Mock;
  };

  const mockActivatedRoute = {
    navigate: jest.fn(),
  };

  beforeEach(async(() => {
    mockAuthService = {
      recoverPassword: jest.fn(),
    };

    TestBed.configureTestingModule({
      declarations: [ResetPasswordComponent],
      imports: [FormsModule, ReactiveFormsModule, RouterModule],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
