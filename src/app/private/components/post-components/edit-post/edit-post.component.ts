import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';



import { Post } from '../../../../models/post.interface';


@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrl: './edit-post.component.css',
})
export class EditPostComponent {
  editedPost!: Post;

  constructor(
    public dialogRef: MatDialogRef<EditPostComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Post,
  ) {
    this.editedPost = data;
  }

  onRatingSet(rating: number): void {
    this.editedPost.rating = rating;
  }

  saveChanges() {
    if (this.validateForm()) {
      this.dialogRef.close(this.editedPost);
    } else {
      alert('Failed to save, ensure comment is not empty and rating between 1 and 5!');
    }
  }

  // method to ensure that the user enters valid information before saving changes
  validateForm(): boolean {
    return (
      this.editedPost.rating !== undefined &&
      this.editedPost.rating >= 1 &&
      this.editedPost.rating <= 5 &&
      this.editedPost.comment !== ''
    );
  }
}