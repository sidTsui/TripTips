import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-post',
  templateUrl: './delete-post.component.html',
  styleUrl: './delete-post.component.css',
})
export class DeletePostComponent {
  constructor(
    public dialogRef: MatDialogRef<DeletePostComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  confirmDelete(): void {
    this.dialogRef.close('confirm');
  }

  cancelDelete(): void {
    this.dialogRef.close('cancel');
  }
}
