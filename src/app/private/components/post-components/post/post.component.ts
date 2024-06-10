import { Component, Input, OnChanges } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { Post } from '../../../../models/post.interface';
import { PostDetailsComponent } from '../post-details/post-details.component';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrl: './post.component.css',
})
export class PostComponent implements OnChanges {
  @Input() posts!: Post[];
  @Input() editable: boolean = false;

  constructor(private dialogRef: MatDialog) {}

  ngOnChanges(): void {}

  // This method is triggered when a post image is clicked, it opens a MatDialog that displays UserPostDetailsComponent
  openDialog(post: Post): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      post: post,
      editMode: this.editable,
    };
    dialogConfig.width = '750px';

    this.dialogRef.open(PostDetailsComponent, dialogConfig);
  }
}
