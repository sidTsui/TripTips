import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostService } from '../../../../services/post.service';
import { PostDashboardComponent } from './post-dashboard.component';

describe('PostDashboardComponent', () => {
  let component: PostDashboardComponent;
  let fixture: ComponentFixture<PostDashboardComponent>;
  let mockPostService!: {
    getPosts: jest.Mock;
    getUserPosts: jest.Mock;
    getUserFriendsPosts: jest.Mock;
  };

  beforeEach(async(() => {
    mockPostService = {
      getPosts: jest.fn(),
      getUserPosts: jest.fn(),
      getUserFriendsPosts: jest.fn(),
    };
    TestBed.configureTestingModule({
      declarations: [PostDashboardComponent],
      providers: [{ provide: PostService, useValue: mockPostService }],
    }).compileComponents();

    fixture = TestBed.createComponent(PostDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
