import { TestBed } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';



import { mockFirebase } from '../../test/mockFirebase';
import { AuthService } from './auth.service';
import { PostService } from './post.service';
import { UserService } from './user.service';

describe('PostService', () => {
  let service: PostService;

  const mockAuthService = {
    currentUser: {
      uid: 'MRogfqrsRjhFkXsCA8TkCfLLDXp1',
    },
  };

  const mockUserService = {
    getUserById: jest.fn(),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AngularFirestore, useValue: mockFirebase },
        { provide: AngularFireAuth, useValue: mockFirebase },
        { provide: UserService, useValue: mockUserService },
        { provide: AuthService, useValue: mockAuthService },
      ],
    });

    mockFirebase.setUpDB();

    service = TestBed.get(PostService);
  });

  afterEach(() => {
    mockFirebase.clear();
    mockFirebase.clear();
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  describe('createPost', () => {});

  describe('getPosts', () => {});

  describe('getUserPosts', () => {});

  describe('getUserFriendsPosts', () => {});

  describe('removePost', () => {});

  describe('likePost', () => {});

  describe('unlikePost', () => {});

  describe('editPost', () => {});

  describe('doILikePost', () => {});

  describe('addComment', () => {});

  describe('getComments', () => {});
});