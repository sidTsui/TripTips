import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { NgxStarsComponent } from 'ngx-stars';
import { PostService } from '../../../../services/post.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
})
export class CreatePostComponent implements OnInit {
  imageChangedEvent: any = '';
  croppedImage: any = '';

  constructor(private postService: PostService) {}

  @ViewChild(NgxStarsComponent)
  starsComponent!: NgxStarsComponent;

  @Input()
  coordinates!: [number, number];

  imgString!: string;
  rating = 5;

  createPost: FormGroup = new FormGroup({
    rating: new FormControl(null, [Validators.required]),
    comment: new FormControl(null, [Validators.required]),
    image: new FormControl(null, []),
  });

  ngOnInit() {}

  async createPostSubmit() {
    if (this.createPost.valid) {
      await this.postService.createPost(this.createPost.value, this.coordinates);
      const closeButton = document.getElementById('close-button');
      if (closeButton) {
        closeButton.click();
      }
    } else {
      alert('Failed to save, ensure comment is not empty and rating between 1 and 5!');
    }
  }

  onRatingSet(rating: number): void {
    this.createPost.controls['rating'].setValue(rating);
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.resizeImage(event!.base64!, 500, 833.33, (resizedImage) => {
      this.createPost.controls['image'].setValue(resizedImage);
    });
  }

  resizeImage(base64Str: string, width: number, height: number, callback: (newBase64: string) => void) {
    const img = new Image();
    img.src = base64Str;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = width;
      canvas.height = height;
      ctx!.drawImage(img, 0, 0, width, height);
      const resizedBase64 = canvas.toDataURL('image/jpeg');
      callback(resizedBase64);
    };
  }
}