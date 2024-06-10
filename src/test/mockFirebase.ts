import { BehaviorSubject, Observable } from 'rxjs';

import { generateMockData } from './dataset/mockData';

export const fakeAuthState = new BehaviorSubject<any | null>(null);

export const createUserMock = {
  user: {
    uid: 'ABC123',
    email: 'abc@123.com',
  },
};

export const userMock = {
  uid: 'ABC123',
  email: 'abc@123.com',
};

const mockUserCredential = {
  operationType: 'signIn',
  credential: null,
  additionalUserInfo: {
    isNewUser: false,
    providerId: 'password',
    profile: {},
  },
  user: {
    uid: 'hHFLwycuYqRnz7UH4qMNRP0fZQT2',
    email: 'em1814@uncw.edu',
    emailVerified: true,
    displayName: 'johndoe',
    isAnonymous: false,
    photoURL:
      'https://firebasestorage.googleapis.com/v0/b/csc450-sp24-project-team-3.appspot.com/o/profile_images%2F1712811207471_Pug%20on%20White.webp?alt=media&token=0978ba49-8f35-430a-a920-f3654ef143d0',
    providerData: [
      {
        providerId: 'password',
        uid: 'em1814@uncw.edu',
        displayName: 'johndoe',
        email: 'em1814@uncw.edu',
        phoneNumber: null,
        photoURL:
          'https://firebasestorage.googleapis.com/v0/b/csc450-sp24-project-team-3.appspot.com/o/profile_images%2F1712811207471_Pug%20on%20White.webp?alt=media&token=0978ba49-8f35-430a-a920-f3654ef143d0',
      },
    ],
    stsTokenManager: {
      refreshToken:
        'AMf-vBxGqmTfVJTAFBRIV1LlMP7G_uthxBPGKqzFLUcncMYSg5mednMhbIzlq95Qh2qbZeh-PqPm4QSsOhyW9pd3IPcWmaAkmOVkRnJaWDuTCorJUZBBO4d7DPOfcCw2WHks12n8XRO5Ou2qfLrEuxQfAeZFHgCne2vlDRbqjSqNSmb6fHxCyReyXQjfCE5JoRyFS6NmDJ9oUAqjKYQEOpfAnjcjEq4-lXUBEWFkXFO_-fDW-rKEx5hPzblE9grWHLFZ0rqo_sM0',
      accessToken:
        'eyJhbGciOiJSUzI1NiIsImtpZCI6ImYyOThjZDA3NTlkOGNmN2JjZTZhZWNhODExNmU4ZjYzMDlhNDQwMjAiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiam9obmRvZSIsInBpY3R1cmUiOiJodHRwczovL2ZpcmViYXNlc3RvcmFnZS5nb29nbGVhcGlzLmNvbS92MC9iL2NzYzQ1MC1zcDI0LXByb2plY3QtdGVhbS0zLmFwcHNwb3QuY29tL28vcHJvZmlsZV9pbWFnZXMlMkYxNzEyODExMjA3NDcxX1B1ZyUyMG9uJTIwV2hpdGUud2VicD9hbHQ9bWVkaWEmdG9rZW49MDk3OGJhNDktOGYzNS00MzBhLWE5MjAtZjM2NTRlZjE0M2QwIiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL2NzYzQ1MC1zcDI0LXByb2plY3QtdGVhbS0zIiwiYXVkIjoiY3NjNDUwLXNwMjQtcHJvamVjdC10ZWFtLTMiLCJhdXRoX3RpbWUiOjE3MTI4OTExMDUsInVzZXJfaWQiOiJoSEZMd3ljdVlxUm56N1VINHFNTlJQMGZaUVQyIiwic3ViIjoiaEhGTHd5Y3VZcVJuejdVSDRxTU5SUDBmWlFUMiIsImlhdCI6MTcxMjg5MTEwNSwiZXhwIjoxNzEyODk0NzA1LCJlbWFpbCI6ImVtMTgxNEB1bmN3LmVkdSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbImVtMTgxNEB1bmN3LmVkdSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.c6RFKiWFiG8zGUqB_U9JKyB80FH43W7s9mkEMsPjYkS0QJSuP0nwvde2eM2X2onn4FE1o11RK-HFTRoQlGfyrFJUuEkLJTaMA0l2IM0cshiQg9ARRnloJbGTrVyc094m3uAyz_Fa1ko81luHXPeHj7hPA431QitzrBpfJ0i9ZtjNWTkM2CJ1zcwAppDQOY5XGNI1JI7SkDPWMaM3XQyqe7x0QPwKeuUhNy-bs9dJuidPnsfDBoWbpx32GBbe-plfxE94uG18WeEgkKJaRdMNPjbwL1QrOEzYqH3Wif2C5frEOKvrTU2y61eV5ryhpYgq0G1jziE0uIpfWiVTgtLFSA',
      expirationTime: 1712894705122,
    },
    updateProfile: (body: any) => {
      return Promise.resolve();
    },
    createdAt: '1711043790536',
    lastLoginAt: '1712891105091',
    apiKey: 'AIzaSyBrk7-sJ5GmT7wwnFuKpbRto7Uhhn1NWd0',
    appName: '[DEFAULT]',
  },
};

interface UserInfo {
  displayName: string | null;
  email: string | null;
  phoneNumber: string | null;
  photoURL: string | null;
  providerId: string;
  uid: string;
}

const mockDB = {
  users: new Map<string, { email: string; password: string }>(),
  objects: new Map<string, Map<string, any>>(),
  addUser(email: string, password: string) {
    const id = Date.now().toString(); // Simple unique ID for demonstration
    this.users.set(id, { email, password });
    return { id, email };
  },
  findUserByEmail(email: string) {
    for (const [_, user] of this.users) {
      if (user.email === email) {
        return user;
      }
    }
    return null;
  },
  addObject(collection: string, data: any) {
    let id = Date.now().toString();
    if (!this.objects.has(collection)) {
      this.objects.set(collection, new Map()).set(id, data);
    } else {
      this.objects.set(collection, new Map().set(id, data));
    }
    return id;
  },
  getObject(collection: string, id: string) {
    if (!this.objects.has(collection)) {
      throw new Error('firestore/collection-doesnt-exist');
    }

    if (!this.objects.get(collection)?.has(id)) {
      throw new Error('firestore/document-doesnt-exist');
    }

    return this.objects.get(collection)?.get(id);
  },
  getObjectWithQuery(collection: string, query: any) {
    if (!this.objects.has(collection)) {
      throw new Error('firestore/collection-doesnt-exist');
    }

    const objects = this.objects.get(collection);
    const result = new Map<string, any>();
    for (const [id, object] of objects!) {
      let match = true;
      for (const [field, value] of Object.entries(query)) {
        if (object[field] !== value) {
          match = false;
          break;
        }
      }
      if (match) {
        result.set(id, object);
      }
    }
    return result;
  },
  getObjectCollection(collection: string) {
    if (!this.objects.has(collection)) {
      throw new Error('firestore/collection-doesnt-exist');
    }

    return this.objects.get(collection);
  },
  setMockData(mockData: Map<string, Map<string, any>>) {
    this.objects = mockData;
  },
  loginUser(email: string, password: string) {
    for (const [_, user] of this.users) {
      if (user.email === email && user.password === password) {
        return user;
      }
    }
    return null;
  },
  clear() {
    this.users.clear();
  },
  toString() {
    return JSON.stringify(Array.from(this.users.values())) + JSON.stringify(Array.from(this.objects.values()));
  },
};

type mockQuery = (ref: any) => {
  orderBy: (field: string) => any;
  where: (field: string, operator: string, value: any) => any;
  limit: (limit: number) => any;
};

export const mockFirebase = {
  mockDB: mockDB, // Now mockDB is a direct property of the stub
  onAuthStateChanged: (userCredential: UserInfo) => fakeAuthState.asObservable(),
  createUserWithEmailAndPassword: (email: string, password: string) => {
    if (!email.includes('@')) {
      throw new Error('auth/invalid-email');
    }

    if (mockDB.findUserByEmail(email)) {
      throw new Error('auth/email-already-in-use');
    }

    mockDB.addUser(email, password);
    fakeAuthState.next(createUserMock);
    return Promise.resolve(mockUserCredential);
  },
  signInWithEmailAndPassword: (email: string, password: string) => {
    const user = mockDB.loginUser(email, password);
    if (!user) {
      throw new Error('auth/user-not-found');
    }
    fakeAuthState.next(userMock);
    return Promise.resolve(mockUserCredential);
  },
  updatePassword: (password: string) => {
    if (password.length < 6) {
      throw new Error('auth/weak-password');
    }
    return Promise.resolve();
  },
  signOut: () => {
    fakeAuthState.next(null);
    return Promise.resolve();
  },
  sendPasswordResetEmail: (email: string) => {
    if (!email.includes('@')) {
      throw new Error('auth/invalid-email');
    }

    if (!mockDB.findUserByEmail(email)) {
      throw new Error('auth/user-not-found');
    }

    return Promise.resolve();
  },
  currentUser: Promise.resolve({
    updatePassword: (password: string) => {
      if (password.length < 6) {
        throw new Error('auth/weak-password');
      }
      return Promise.resolve();
    },
    displayName: 'johndoe',
    uid: 'ABC123',
  }),
  createUserWithUserDocument: (request: {
    email: string;
    password: string;
    username: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    profilePicture: string;
  }) => {
    if (!request.email.includes('@')) {
      throw new Error('auth/invalid-email');
    }

    if (mockDB.findUserByEmail(request.email)) {
      throw new Error('auth/email-already-in-use');
    }

    let id = mockDB.addObject('users', request);

    fakeAuthState.next(createUserMock);

    return id;
  },
  collection: (name: string, query?: mockQuery) => ({
    doc: (id: string) => ({
      valueChanges: (_?: any) => {
        return new Observable((observer) => {
          try {
            const result = mockDB.getObject(name, id);
            observer.next(result);
            observer.complete();
          } catch (error) {
            observer.error(error);
          }
        });
      },
      add: (d: any) => {
        mockDB.addObject(id, d);
        return Promise.resolve();
      },
      set: (d: any) => {
        mockDB.addObject(id, d);
        return Promise.resolve();
      },
      delete: () => {
        mockDB.objects.delete(id);
        return Promise.resolve();
      },
      update: (d: any) => {
        let currentObject = mockDB.getObject(name, id)
        if (currentObject) {
          currentObject = { ...currentObject, ...d };
          mockDB.objects.set(id, currentObject!);
          return Promise.resolve();
        }
        throw new Error('firestore/document-doesnt-exist');
      },
    }),
    add: (d: any) => {
      const id = mockDB.addObject(name, d);
      mockDB.addObject(id, d);
      return Promise.resolve(id);
    },
    valueChanges: (_?: any) => {
      return new Observable((observer) => {
        try {
          const result = mockDB.getObjectCollection(name);
          observer.next(result);
          observer.complete();
        } catch (error) {
          observer.error(error);
        }
      });
    },
  }),
  createId: () => {
    return new Promise((resolve) => resolve('1234567890'));
  },
  doc: (idFirst: string) => ({
    collection: (name: string) => ({
      doc: (idSecond: string) => ({
        valueChanges: () => {
          mockDB.objects.get(idFirst)?.get(idSecond);
        },
        set: (d: any) => {
          mockDB.addObject(idFirst, d);
          return Promise.resolve();
        },
        delete: () => {
          mockDB.objects.get(idFirst)?.delete(idSecond);
          return Promise.resolve();
        },
        update: (d: any) => {
          mockDB.objects.get(idFirst)?.set(idSecond, d);
          return Promise.resolve();
        },
      }),
    }),
  }),
  setUpDB: () => {
    let mockData: any = generateMockData();
    mockDB.setMockData(mockData);
  },
  clear: () => {
    mockDB.clear();
  },
};
