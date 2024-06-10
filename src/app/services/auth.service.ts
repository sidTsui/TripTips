import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';



import { catchError, from, Observable, throwError } from 'rxjs';





/**
 * Sign in data type
 */
type SignIn = {
  email: string;
  password: string;
};

/**
 * Sign up data type
 */
type SignUp = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  phoneNumber: string;
};

/**
 * Firebase error type
 */
type FirebaseError = {
  code: string;
  message: string;
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUser!: firebase.default.User;

  constructor(
    private afs: AngularFirestore,
    private auth: AngularFireAuth,
  ) {
    this.authStatusListener();
  }

  authStatusListener() {
    this.auth.onAuthStateChanged((credential) => {
      if (credential) {
        this.currentUser = credential;
      }
    });
  }

  /**
   * Sign in user
   * @param params
   * @returns error message if any or void
   */
  signIn(signInData: SignIn): Observable<any> {
    // sign in using firebase
    return from(
      this.auth.signInWithEmailAndPassword(signInData.email, signInData.password).then((userCredential) => {
        // get user from userCredential
        const user = userCredential.user;

        // if user exists, set user in environment and set token
        // if (user?.emailVerified) {
        if (user) {
          this.updateLastLogin(user.uid);
        } else {
          throw new Error('Email not verified');
        }
      }),
    ).pipe(
      catchError(
        (error: FirebaseError) => throwError(() => new Error(this.translateFirebaseErrorMessage(error))), // translate error message and throw
      ),
    );
  }

  /**
   * Sign up user
   * @param signUpData
   * @returns error message if any or void
   */
  signUp(signUpData: SignUp): Observable<any> {
    // create user using firebase
    return from(
      this.auth.createUserWithEmailAndPassword(signUpData.email, signUpData.password).then((userCredential) => {
        // update user profile with username
        userCredential.user?.updateProfile({
          displayName: signUpData.username,
        });
        this.setUserData(signUpData, userCredential.user?.uid || ''); // set user data
        userCredential.user?.sendEmailVerification(); // send email verification
      }),
    ).pipe(
      catchError((error: FirebaseError) => {
        console.debug(error);
        return throwError(() => new Error(this.translateFirebaseErrorMessage(error))); // return throwError instead of void
      }),
    );
  }

  /**
   * Set user data
   * @param signUpData - user data
   * @param uid - user id
   */
  setUserData(signUpData: SignUp, uid: string) {
    // A user document is created in the users collection
    this.afs.collection('users').doc(uid).set({
      firstName: signUpData.firstName,
      lastName: signUpData.lastName,
      username: signUpData.username,
      email: signUpData.email,
      phoneNumber: signUpData.phoneNumber,
      createdAt: new Date(),
      lastLogin: new Date(),
    });
  }

  /**
   * Recover password
   * @param email
   * @returns error message if any or void
   */
  recoverPassword(email: string): Observable<void> {
    // send password reset email using firebase
    return from(this.auth.sendPasswordResetEmail(email)).pipe(
      catchError(
        (error: FirebaseError) => throwError(() => new Error(this.translateFirebaseErrorMessage(error))), // translate error message and throw
      ),
    );
  }

  /**
   * Sign out user
   * @returns error message if any or void
   */
  signOut() {
    localStorage.removeItem('user_id');
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    return from(this.auth.signOut()).pipe(
      catchError(
        (error: FirebaseError) => throwError(() => new Error(this.translateFirebaseErrorMessage(error))), // translate error message and throw
      ),
    );
  }

  changePassword(password: string) {
    this.auth.currentUser.then((user) => {
      return from(user!.updatePassword(password)).pipe(
        catchError(
          (error: FirebaseError) => throwError(() => new Error(this.translateFirebaseErrorMessage(error))), // translate error message and throw
        ),
      );
    });
  }

  /**
   * Translate firebase error message
   * @param object { code, message} - FirebaseError
   * @returns error message
   */
  private translateFirebaseErrorMessage({ code, message }: FirebaseError) {
    if (code === 'auth/user-not-found' || code === 'auth/invalid-credential') {
      return 'User not found.';
    }
    if (code === 'auth/email-already-in-use') {
      return 'Email already in use.';
    }
    if (code === 'auth/invalid-email') {
      return 'The email address is badly formatted.';
    }
    if (code === 'auth/weak-password') {
      return 'Password should be at least 6 characters.';
    }
    return message;
  }

  /**
   * Update last login
   * @param uid - user id
   */
  private updateLastLogin(uid: string) {
    this.afs.collection('users').doc(uid).update({ lastLogin: new Date() });
  }
}