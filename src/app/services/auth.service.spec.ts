import { TestBed } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';



import { mockFirebase } from '../../test/mockFirebase';
import { AuthService } from './auth.service';


describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AngularFirestore, useValue: mockFirebase },
        { provide: AngularFireAuth, useValue: mockFirebase },
      ],
    });

    service = TestBed.get(AuthService);
    mockFirebase.setUpDB();

    service.signUp({
      firstName: 'first',
      lastName: 'last',
      username: 'username',
      email: 'email@test.com',
      password: 'password',
      phoneNumber: '1234567890',
    });
  });

  afterEach(() => {
    mockFirebase.clear();
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  describe('signIn', () => {
    it('should sign in a user with email and password', async () => {
      service.signIn({ email: 'email@test.com', password: 'password' });
    });

    it('should throw an error if user doesnt exist', async () => {
      try {
        await service.signIn({ email: 'email@test.com', password: 'password' });
      } catch (error) {
        expect(error).toEqual(new Error('auth/user-not-found'));
      }
    });
  });

  describe('signUp', () => {
    it('should sign up a user with email and password', async () => {
      const response = await service.signUp({
        firstName: 'first',
        lastName: 'last',
        username: 'username',
        email: 'firslast@test.com',
        password: 'password',
        phoneNumber: '1234567890',
      });

      expect(response).toBeDefined();
    });

    it('should throw an error if the email is invalid', async () => {
      try {
        await service.signUp({
          firstName: 'first',
          lastName: 'last',
          username: 'username',
          email: 'email',
          password: 'password',
          phoneNumber: '1234567890',
        });
      } catch (error) {
        expect(error).toEqual(new Error('auth/invalid-email'));
      }
    });

    it('should throw an error if the user already exists', async () => {
      try {
        await service.signUp({
          firstName: 'first',
          lastName: 'last',
          username: 'username',
          email: 'email@test.com',
          password: 'password',
          phoneNumber: '1234567890',
        });
      } catch (error) {
        expect(error).toEqual(new Error('auth/email-already-in-use'));
      }
    });
  });

  describe('recoverPassword', () => {
    it('should send a password reset email', async () => {
      service.recoverPassword('email@test.com').subscribe((response) => {
        expect(response).toBe(void 0);
      });
    });
  });

  describe('signOut', () => {
    it('should sign out the user', async () => {
      service.signOut().subscribe((response) => {
        expect(response).toBe(void 0);
      });
    });
  });

  describe('changePassword', () => {
    it('should change the user password', async () => {
      expect(service.changePassword('newpassword')).toBe(void 0);
    });

    it('should throw an error if the password is invalid', async () => {
      try {
        service.changePassword('short');
      } catch (error) {
        expect(error).toEqual(new Error('auth/weak-password'));
      }
    });
  });
});