import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { arrayRemove, arrayUnion } from '@angular/fire/firestore';



import { firstValueFrom, map, Observable } from 'rxjs';

import { Post } from '../models/post.interface';
import { User } from '../models/user.interface';
import { AuthService } from './auth.service';
import { UserService } from './user.service';

type createPost = {
  rating: number;
  comment: string;
  img: string;
};

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private afs: AngularFirestore,
  ) {}

  async createPost(createPostData: createPost, coordinates: [number, number]): Promise<string> {
    const userId = this.authService.currentUser.uid;

    const post = this.afs
      .doc(`/users/${userId}`)
      .collection('posts')
      .add({
        ...createPostData,
        geometry: {
          coordinates: {
            lat: coordinates[1],
            lng: coordinates[0],
          },
          type: 'Point',
        },
        properties: {
          message: '',
        },
        type: 'Feature',
        likes: [],
        createdBy: userId,
        createdAt: new Date(),
        lastModifiedDate: new Date(),
      });

    return post.then((doc) => doc.id);
  }

  /**
   * Get all posts
   * @returns all posts
   */
  async getPosts() {
    const userId = this.authService.currentUser.uid;
    const user = (await firstValueFrom(this.userService.getUserById(userId))) as User;

    return this.afs
      .collectionGroup('posts', (ref) => ref.orderBy('createdAt', 'desc'))
      .valueChanges({ idField: 'id' })
      .pipe(map((posts: any) => posts.filter((post: any) => !user.blockedBy?.includes(post.createdBy)))); // get posts from firestore
  }

  /**
   * Get all posts for a specific user
   * @param userId - user id
   * @returns all posts for a specific user
   */
  getUserPosts(userId: string) {
    return this.afs
      .collectionGroup('posts', (ref) => ref.where('createdBy', '==', userId).orderBy('createdAt', 'desc'))
      .valueChanges({ idField: 'id' }); // get posts from firestore
  }

  async getUserFriendsPosts(): Promise<Observable<any[]>> {
    const userId = this.authService.currentUser.uid;
    const user = (await firstValueFrom(this.userService.getUserById(userId))) as User;
    if (user.following!.length == 0) {
      return new Observable<any[]>();
    }
    return this.afs
      .collectionGroup('posts', (ref) =>
        ref.where('createdBy', 'in', user.following).where('createdBy', '!=', userId).orderBy('createdAt', 'desc'),
      )
      .valueChanges({ idField: 'id' })
      .pipe(map((posts: any) => posts.filter((post: any) => !user.blockedBy?.includes(post.createdBy)))); // get posts from firestore
  }

  /**
   * Remove a post
   * @param $key - post id
   * @returns - deletes a post from the database
   */
  async removePost($key: string) {
    const userId = this.authService.currentUser.uid;
    this.afs
      .doc(`/users/${userId}/posts/${$key}`)
      .collection('comments')
      .get()
      .subscribe((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref.delete();
        });
      });
    return this.afs.doc(`/users/${userId}/posts/${$key}`).delete();
  }

  /**
   * Edit a post
   * @param postId - ID of the post to edit
   * @param editPostData - New data for the post
   * @returns Promise<void>
   */
  editPost(post: Post, editPostData: createPost): Promise<void> {
    return this.afs.doc(`/users/${post.createdBy}/posts/${post.id}`).update({
      ...editPostData,
      lastModifiedDate: new Date(),
    });
  }

  /**
   * Like a post
   * @param postId - ID of the post to like
   * @returns Promise<void>
   * @todo Implement this method
   */
  likePost(post: Post): void {
    const userId = this.authService.currentUser.uid;
    this.afs.doc(`/users/${post.createdBy}/posts/${post.id}`).update({
      likes: arrayUnion(userId),
    });
  }

  /**
   * Unlike a post
   * @param postId - ID of the post to unlike
   * @returns Promise<void>
   * @todo Implement this method
   */
  unlikePost(post: Post): void {
    const userId = this.authService.currentUser.uid;
    this.afs.doc(`/users/${post.createdBy}/posts/${post.id}`).update({
      likes: arrayRemove(userId),
    });
  }

  /**
   * Do I like a post?
   * @param postId - ID of the post to check
   * @returns Promise<boolean>
   * @todo Implement this method
   */
  doILikePost(post: Post): boolean {
    const userId = this.authService.currentUser.uid;
    return post.likes!.includes(userId);
  }

  /**
   * Add a comment to a post
   * @param postId - ID of the post to get
   * @param comment - Comment to add
   * @returns Observable<Post>
   * @todo Implement this method
   */
  addComment(post: Post, comment: string): void {
    const user = this.authService.currentUser;

    const commentData = {
      comment,
      createdBy: user.displayName,
      createdById: user.uid,
      createdAt: new Date(),
    };

    this.afs.doc(`/users/${post.createdBy}/posts/${post.id}/`).collection('comments').add(commentData);
  }

  /**
   * Get comments for a post
   * @param postId - ID of the post to get
   * @returns Observable<Comment[]>
   * @todo Implement this method
   */
  getComments(post: Post) {
    return this.afs
      .doc(`/users/${post.createdBy}/posts/${post.id}`)
      .collection('comments', (ref) => ref.orderBy('createdAt', 'desc'))
      .valueChanges({ idField: 'id' });
  }

  deleteComment(post: Post, commentId: string) {
    return this.afs.doc(`/users/${post.createdBy}/posts/${post.id}/comments/${commentId}`).delete();
  }
}