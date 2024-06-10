import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';



import { Comment } from '../../../../models/comment.interface';
import { Post } from '../../../../models/post.interface';
import { AuthService } from '../../../../services/auth.service';
import { PostService } from '../../../../services/post.service';


@Component({
  selector: 'app-post-comment',
  templateUrl: './post-comment.component.html',
  styleUrls: ['./post-comment.component.css'],
})
export class PostCommentComponent implements OnInit {
  @Input()
  post!: Post;

  comments!: Comment[];
  comment: FormControl = new FormControl(null, [Validators.required]);
  currentUserId!: string;

  constructor(
    private postService: PostService,
    private authService: AuthService,
  ) {
    this.currentUserId = this.authService.currentUser.uid;
  }

  ngOnInit() {
    this.loadComments();
  }

  submitComment() {
    this.postService.addComment(this.post!, this.comment.value);
    this.comment.reset();
    this.loadComments();
  }

  loadComments() {
    this.postService.getComments(this.post).subscribe((comments) => {
      this.comments = comments;
    });
  }

  deleteComment(commentId: string) {
    this.postService.deleteComment(this.post, commentId);
    this.loadComments();
  }
}