import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';



import { NgxStarsModule } from 'ngx-stars';



import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MockComponent } from 'ng-mocks';



import { mockPosts } from '../../../../../test/dataset/posts';
import { PostService } from '../../../../services/post.service';
import { MapBoxComponent } from '../../util-components/map-box/map-box.component';
import { PostCommentComponent } from '../post-comment/post-comment.component';
import { PostDetailsComponent } from './post-details.component';


describe('PostDetailsComponent', () => {
  let component: PostDetailsComponent;
  let fixture: ComponentFixture<PostDetailsComponent>;

  window.alert = jest.fn();
  const mockPostService = {
    doILikePost: jest.fn(),
    likePost: jest.fn(),
    unlikePost: jest.fn(),
    removePost: jest.fn(),
    editPost: jest.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostDetailsComponent, MockComponent(PostCommentComponent), MockComponent(MapBoxComponent)],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: { post: mockPosts.get('czhCG2zORH3sSCHUtWcG') } },
        { provide: PostService, useValue: mockPostService },
      ],
      imports: [MatDialogModule, NgxStarsModule, FormsModule, FontAwesomeModule],
    }).compileComponents();

    fixture = TestBed.createComponent(PostDetailsComponent);
    component = fixture.componentInstance;
    component.map = {
      resize: jest.fn(),
    } as any;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});