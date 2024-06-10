import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { UserService } from '../../../../services/user.service';
import { SelectUsersComponent } from './select-users.component';

describe('SelectUsersComponent', () => {
  let component: SelectUsersComponent;
  let fixture: ComponentFixture<SelectUsersComponent>;

  const mockUserService = {
    getUsers: () => {
      return {
        subscribe: () => {},
      };
    },
    findByUsername: () => {
      return {
        subscribe: () => {},
      };
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectUsersComponent],
      imports: [MatInputModule, MatAutocompleteModule, FormsModule, ReactiveFormsModule, BrowserAnimationsModule],
      providers: [{ provide: UserService, useValue: mockUserService }],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});