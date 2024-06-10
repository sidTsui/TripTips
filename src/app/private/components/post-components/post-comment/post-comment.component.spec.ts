import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



import { AuthService } from '../../../../services/auth.service';
import { PostService } from '../../../../services/post.service';
import { PostCommentComponent } from './post-comment.component';

describe('PostCommentComponent', () => {
  let component: PostCommentComponent;
  let fixture: ComponentFixture<PostCommentComponent>;

  const mockPostService = {
    addComment: jest.fn(),
    getComments: jest.fn(() => {
      return {
        subscribe: jest.fn(),
      };
    }),
  };

  const mockAuthService = {
    currentUser: {
      uid: 'testId',
    },
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PostCommentComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        FormsModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        BrowserAnimationsModule,
      ],
      providers: [
        { provide: PostService, useValue: mockPostService },
        { provide: AuthService, useValue: mockAuthService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PostCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});