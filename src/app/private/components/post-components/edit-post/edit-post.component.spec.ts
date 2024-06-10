import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';



import { NgxStarsModule } from 'ngx-stars';



import { Post } from '../../../../models/post.interface';
import { EditPostComponent } from './edit-post.component';


describe('EditPostComponent', () => {
  let component: EditPostComponent;
  let fixture: ComponentFixture<EditPostComponent>;

  beforeEach(async () => {
    let data: Post = {
      id: '1',
      comment: 'This is a test post',
      rating: 3,
    };

    window.alert = jest.fn();

    await TestBed.configureTestingModule({
      declarations: [EditPostComponent],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {
            close: jest.fn(),
          },
        },
        { provide: MAT_DIALOG_DATA, useValue: data },
      ],
      imports: [MatDialogModule, NgxStarsModule, FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(EditPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update post', () => {
    component.editedPost = {
      comment: 'This is a test post',
      rating: 3,
    };
    component.saveChanges();
  });

  it('should not update post', () => {
    component.editedPost = {
      comment: '',
      rating: undefined,
    };
    component.saveChanges();
  });

  it('should set rating', () => {
    component.onRatingSet(5);

    expect(component.editedPost.rating).toBe(5);
  });
});