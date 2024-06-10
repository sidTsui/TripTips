import { TextFieldModule } from '@angular/cdk/text-field';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';






import 'hammerjs';

import { ImageCropperModule } from 'ngx-image-cropper';
import { NgxStarsComponent, NgxStarsModule } from 'ngx-stars';

import { MockComponent } from 'ng-mocks';

import { PostService } from '../../../../services/post.service';
import { CreatePostComponent } from './create-post.component';

describe('CreatePostComponent', () => {
  let component: CreatePostComponent;
  let fixture: ComponentFixture<CreatePostComponent>;

  const mockPostService = {
    createPost: jest.fn(),
  };

  beforeEach(async(() => {
    jest.clearAllMocks();
    window.alert = jest.fn();

    TestBed.configureTestingModule({
      declarations: [CreatePostComponent, MockComponent(NgxStarsComponent)],
      imports: [
        FormsModule,
        MatDialogModule,
        NgxStarsModule,
        MatFormFieldModule,
        TextFieldModule,
        ReactiveFormsModule,
        ImageCropperModule,
        MatInputModule,
        BrowserAnimationsModule,
      ],
      providers: [
        { provide: PostService, useValue: mockPostService },
        { provide: MatDialogRef, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreatePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a post', () => {
    component.coordinates = [0, 0];
    component.createPost.setValue({
      comment: 'content',
      image: 'image',
      rating: 5,
    });

    component.createPostSubmit();

    expect(mockPostService.createPost).toHaveBeenCalledWith(
      {
        rating: 5,
        comment: 'content',
        image: 'image',
      },
      [0, 0],
    );
  });

  it('should not create a post', () => {
    component.createPost.reset();
    component.createPostSubmit();

    expect(mockPostService.createPost).not.toHaveBeenCalled();
  });

  it('should set rating', () => {
    component.onRatingSet(3);
    expect(component.createPost.controls['rating'].value).toBe(3);
  });
});