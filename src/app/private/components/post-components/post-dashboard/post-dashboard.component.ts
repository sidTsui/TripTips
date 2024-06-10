import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';



import { Post } from '../../../../models/post.interface';
import { PostService } from '../../../../services/post.service';


@Component({
  selector: 'app-post-dashboard',
  templateUrl: './post-dashboard.component.html',
  styleUrls: ['./post-dashboard.component.css'],
})
export class PostDashboardComponent implements OnChanges {
  @Input() friendsOnly: boolean = false;
  @Input() editable: boolean = false;
  @Input() userId: string = '';

  posts: Post[] = [];

  constructor(private postService: PostService) {}

  async ngOnChanges(changes: SimpleChanges) {
    if (changes['userId']) {
      if (changes['userId'].currentValue !== changes['userId'].previousValue) {
        this.postService.getUserPosts(this.userId).subscribe((posts) => {
          this.posts = posts;
        });
      } else if (changes['userId'].currentValue === '') {
        this.postService.getPosts().then((res) =>
          res.subscribe((posts) => {
            this.posts = posts;
          }),
        );
      }
    } else if (this.friendsOnly) {
      await this.postService.getUserFriendsPosts().then((res) =>
        res.subscribe((res: any[]) => {
          this.posts = res;
        }),
      );
    } else {
      this.postService.getPosts().then((res) =>
        res.subscribe((posts) => {
          this.posts = posts;
        }),
      );
    }
  }
}