import { TestBed } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';


import { mockFirebase } from '../../test/mockFirebase';
import { AuthService } from './auth.service';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let currentUserId: string;

  const mockAuthService = {
    currentUser: {
      uid: 'MRogfqrsRjhFkXsCA8TkCfLLDXp1',
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AngularFirestore, useValue: mockFirebase },
        { provide: AngularFireAuth, useValue: mockFirebase },
        { provide: AuthService, useValue: mockAuthService },
      ],
    });

    service = TestBed.get(UserService);
    mockFirebase.setUpDB();
  });

  afterEach(() => {
    mockFirebase.clear();
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  describe('getUserById', () => {
    it('should get a user by id', async () => {
      const user = await service.getUserById('MRogfqrsRjhFkXsCA8TkCfLLDXp1');
      expect(user).toBeTruthy();
    });

    it('should throw an error if user doesnt exist', async () => {
      try {
        await service.getUserById('invalidId');
      } catch (error) {
        expect(error).toEqual(new Error('firestore/document-doesnt-exist'));
      }
    });
  });

  describe('findByUsername', () => {
    it('should find a user by username', async () => {
      const user = await service.findByUsername('test');
      expect(user).toBeTruthy();
    });

    it('should throw an error if user doesnt exist', async () => {
      try {
        await service.findByUsername('invalidUsername');
      } catch (error) {
        expect(error).toEqual(new Error('firestore/document-doesnt-exist'));
      }
    });
  });

  describe('getFollowingUsers', () => {
    it('should return users who have the given user in others followers lists', async () =>{
      const user = await service.getFollowingUsers('test');
      expect(user).toBeTruthy();
    });

    it('should throw an error if user doesnt exist', async () => {
      try {
        await service.getFollowingUsers('invalidUsername');
      } catch (error) {
        expect(error).toEqual(new Error('firestore/document-doesnt-exist'));
      }
    });
  });

  describe('getUsers', () => {
    it('should return a list of filtered users', async () => {
      const user = await service.getUsers();
      expect(user).toBeTruthy();
    });
  });

  describe('updateUserProfilePicture', () => {
    it('should change the user profile picture URL', async () => {
      const user = await service.updateUserProfilePicture('MRogfqrsRjhFkXsCA8TkCfLLDXp1','https://thomasmmiller.com/wp-content/uploads/2024/01/Photo-1024x994.png');
      expect(user).toBeUndefined();
    });

    it('should throw an error if user doesnt exist', async () => {
      try {
        await service.updateUserProfilePicture('invalidId','https://thomasmmiller.com/wp-content/uploads/2024/01/Photo-1024x994.png');
      } catch(error) {
        expect(error).toEqual(new Error('firestore/document-doesnt-exist'));
      }
    });

    it('should throw an error if image doesnt exist', async () => {
      try {
        await service.updateUserProfilePicture('MRogfqrsRjhFkXsCA8TkCfLLDXp1','invalidURL');
      } catch(error) {
        expect(error).toEqual(new Error('firestore/document-doesnt-exist'));
      }
    });
  });

  describe('getUserBlocked', () => {
    it('should return a list of blocked users', async () => {
      const user = await service.getUserBlocked();
      expect(user).toBeTruthy();
    });
  });
});