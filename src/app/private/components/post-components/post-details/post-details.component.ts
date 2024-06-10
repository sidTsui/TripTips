import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';



import { NgxStarsComponent } from 'ngx-stars';
import * as mapboxgl from 'mapbox-gl';

import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { faCalendar, faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';

import { environment } from '../../../../../environments/environment';
import { Post } from '../../../../models/post.interface';
import { PostService } from '../../../../services/post.service';
import { DeletePostComponent } from '../delete-post/delete-post.component';
import { EditPostComponent } from '../edit-post/edit-post.component';
@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrl: './post-details.component.css',
})
export class PostDetailsComponent implements OnInit {
  @ViewChild('starsComponent')
  starsComponent!: NgxStarsComponent;

  map!: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/navigation-night-v1'; // Map style
  lat: number = 20.5513;
  lng: number = 35.9496;
  lastTap = 0;

  editMode: boolean = false;
  isLiked: boolean = false;
  faCalendar = faCalendar;
  faHeart = faHeartSolid;
  post!: Post;

  stars: number = 0;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private postService: PostService,
    private dialog: MatDialog,
  ) {
    this.editMode = data.editMode;
    this.post = data.post;
  }

  ngOnInit(): void {
    this.initializeMap();
    this.isLiked = this.postService.doILikePost(this.post!);
    this.faHeart = this.isLiked ? faHeartSolid : faHeartRegular;
  }

  private initializeMap() {
    // Check if Mapbox GL is supported
    if (!mapboxgl.supported()) {
      alert('Your browser does not support Mapbox GL');
      return;
    }

    // Initialize the map
    this.map = new mapboxgl.Map({
      accessToken: environment.mapbox.accessToken,
      center: [this.lng, this.lat],
      doubleClickZoom: false,
      container: 'postMap',
      interactive: false,
      style: this.style,
      zoom: 2,
    });

    // Map load event
    this.map.on('load', () => {
      const postPin = new mapboxgl.Marker({ color: '#b40219' })
        .setLngLat(this.post.geometry!.coordinates as any)
        .addTo(this.map);
      this.flyTo(this.post.geometry!.coordinates as any);
      postPin.addTo(this.map);
    });
  }

  // Flies the map to the given coordinates
  flyTo(coordinates: [number, number]) {
    this.map.flyTo({ center: coordinates, zoom: 2 });
  }

  // this method is triggered when the Edit Post button is clicked, it opens a MatDialog with the EditPostComponent
  editPost() {
    const dialogRef = this.dialog.open(EditPostComponent, {
      width: '500px',
      data: this.post,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.postService.editPost(this.post!, result); // data is passed to PostService to updated in the database
        // all the current values for the post are updated so you don't have to click off the post and back into it
        // for the updated post details to be shown
        this.starsComponent.setRating(this.post.rating!);
        this.post = result;
      }
    });
  }

  deletePost() {
    const dialogRef = this.dialog.open(DeletePostComponent, {
      width: '500px',
      data: { postId: this.post },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'confirm') {
        try {
          this.postService.removePost(this.post.id!); // deleted post in database
          this.dialog.closeAll(); // closes post details mat dialog
        } catch {
          alert('Error while deleting post!');
        }
      }
    });
  }

  handleLike() {
    this.isLiked = !this.isLiked;
    this.faHeart = this.isLiked ? faHeartSolid : faHeartRegular;
    if (this.isLiked) {
      this.post.likes?.push('ph');
      this.postService.likePost(this.post!);
    } else {
      this.post.likes?.pop();
      this.postService.unlikePost(this.post!);
    }
  }
}