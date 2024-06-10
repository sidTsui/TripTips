import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

import { AuthService } from '../../../../services/auth.service';
import { UserService } from '../../../../services/user.service';
import { SettingsComponent } from './settings.component';

describe('SettingsComponent', () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;

  const mockAuthService = {
    currentUser: {
      uid: '123',
    },
  };

  const mockUserService = {
    getUserById: jest.fn(() => ({
      subscribe: jest.fn(),
    })),
  };

  const mockAngularFireStorage = {
    ref: jest.fn(),
    upload: jest.fn(),
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SettingsComponent],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: AuthService, useValue: mockAuthService },
        { provide: UserService, useValue: mockUserService },
        { provide: AngularFireStorage, useValue: mockAngularFireStorage },
      ],
      imports: [MatDialogModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
