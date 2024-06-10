import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { arrayRemove, arrayUnion } from '@angular/fire/firestore';



import { firstValueFrom, map } from 'rxjs';



import { User } from '../models/user.interface';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private authService: AuthService,
    private afs: AngularFirestore,
  ) {}

  getUserById(id: string) {
    return this.afs.collection('users').doc(id).valueChanges({ idField: 'id' });
  }

  findByUsername(username: string) {
    const user = this.authService.currentUser;
    // const userRecord = (await firstValueFrom(this.getUserById(user.uid))) as User;

    return this.afs
      .collection('users', (ref) =>
        ref
          .where('username', '>=', username)
          .where('username', '<=', username + '\uf8ff')
          .where('username', '!=', user.displayName)
          .orderBy('username', 'desc'),
      )
      .valueChanges({ idField: 'id' });
  }

  getFollowingUsers(accountOfFollowing: string) {
    return this.afs
      .collection('users', (ref) => ref.where('followers', 'array-contains', accountOfFollowing))
      .valueChanges({ idField: 'id' });
  }

  async getUsers() {
    const currentUser = this.authService.currentUser;
    const userRecord = (await firstValueFrom(this.getUserById(currentUser.uid))) as User;

    return this.afs
      .collection('users', (ref) => ref.where('username', '!=', currentUser.displayName).orderBy('username', 'asc'))
      .valueChanges({ idField: 'id' })
      .pipe(map((users: any) => users.filter((user: any) => !userRecord.blockedBy?.includes(user.id)))); // get posts from firestore
  }

  updateUserProfilePicture(userId: string, pictureUrl: string) {
    return this.afs.collection('users').doc(userId).update({ profilePicture: pictureUrl });
  }

  userFollowUser(followUserId: string) {
    const userId = this.authService.currentUser.uid;
    this.afs
      .collection('users')
      .doc(userId)
      .update({
        following: arrayUnion(followUserId),
      });
    this.afs
      .collection('users')
      .doc(followUserId)
      .update({
        followers: arrayUnion(userId),
      });
  }

  userUnfollowUser(unfollowUserId: string) {
    const userId = this.authService.currentUser.uid;
    this.afs
      .collection('users')
      .doc(userId)
      .update({
        following: arrayRemove(unfollowUserId),
      });
    this.afs
      .collection('users')
      .doc(unfollowUserId)
      .update({
        followers: arrayRemove(userId),
      });
  }

  blockUser(blockId: string) {
    const userId = this.authService.currentUser.uid;
    this.afs
      .collection('users')
      .doc(userId)
      .update({
        blocked: arrayUnion(blockId),
      });
    this.afs
      .collection('users')
      .doc(blockId)
      .update({
        blockedBy: arrayUnion(userId),
      });
  }

  unblockUser(blockId: string) {
    const userId = this.authService.currentUser.uid;
    this.afs
      .collection('users')
      .doc(userId)
      .update({
        blocked: arrayRemove(blockId),
      });
    this.afs
      .collection('users')
      .doc(blockId)
      .update({
        blockedBy: arrayRemove(userId),
      });
  }

  getUserBlocked() {
    const userId = this.authService.currentUser.uid;
    return this.afs.collection('users/' + userId + '/blocked').valueChanges({ idField: 'id' });
  }
}