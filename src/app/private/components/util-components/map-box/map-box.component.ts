import { AfterViewInit, Component, Input, OnChanges, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';



import * as mapboxgl from 'mapbox-gl';
import { Subscription } from 'rxjs';



import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';



import { environment } from '../../../../../environments/environment';
import { Post } from '../../../../models/post.interface';
import { PostService } from '../../../../services/post.service';
import { CreatePostComponent } from '../../post-components/create-post/create-post.component';
import { PostDetailsComponent } from '../../post-components/post-details/post-details.component';


@Component({
  selector: 'app-map-box',
  templateUrl: './map-box.component.html',
  styleUrls: ['./map-box.component.css'],
})
export class MapBoxComponent implements OnDestroy, OnChanges, AfterViewInit {
  @Input() showControls: boolean = false;
  @Input() friendsOnly: boolean = false;
  @Input() readOnly: boolean = false;
  @Input() height: string = '400px';
  @Input() width: string = '100%';
  @Input() userId: string = '';

  // Component properties
  map!: mapboxgl.Map;

  style = 'mapbox://styles/mapbox/navigation-night-v1'; // Map style
  lat: number = 20.5513;
  lng: number = 35.9496;
  lastTap = 0;

  pinsSubscription!: Subscription;

  // Component constructor with dependency injection
  constructor(
    private postService: PostService,
    public dialog: MatDialog,
  ) {}

  ngOnChanges(): void {
    this.initializeMap();
  }

  ngAfterViewInit() {
    this.map.resize();
  }

  // OnDestroy lifecycle hook
  ngOnDestroy() {
    // Unsubscribe from the pins subscription
    if (this.pinsSubscription) {
      this.pinsSubscription.unsubscribe();
    }
  }

  // Initializes the map
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
      style: this.style,
      container: 'map',
      maxZoom: 20,
      minZoom: 1,
      zoom: 1,
    });

    this.addMapControls();
    this.handleMapEvents();
    this.loadPins();
  }

  // Adds map controls
  private addMapControls() {
    if (!this.showControls) return;
    let geocoder = new MapboxGeocoder({
      accessToken: environment.mapbox.accessToken,
      mapboxgl: mapboxgl,
    });

    this.map.addControl(geocoder);
    // Add navigation and fullscreen controls
    this.map.addControl(new mapboxgl.NavigationControl());
    this.map.addControl(new mapboxgl.FullscreenControl(), 'top-left');

    let geolocate = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
    });

    // Add geolocate control
    this.map.addControl(geolocate, 'top-left');
  }

  // Handles map events
  private handleMapEvents() {
    if (!this.readOnly) {
      // Double-click event to create a pin
      this.map.on('dblclick', (event) => this.createPin([event.lngLat.lng, event.lngLat.lat]));
      // Touchend event for mobile interactions
      this.map.on('touchend', (event) => this.handleTouchEnd(event));
    }
  }

  // Loads pins from the MapService
  private async loadPins() {
    if (this.friendsOnly) {
      this.pinsSubscription = await this.postService.getUserFriendsPosts().then((res) =>
        res.subscribe((res: any[]) => {
          res.forEach((pin: any) => this.addPin(pin)); // Add each pin
        }),
      );
    } else if (this.userId) {
      this.pinsSubscription = this.postService.getUserPosts(this.userId).subscribe((res: any[]) => {
        res.forEach((pin: any) => this.addPin(pin)); // Add each pin
      });
    } else {
      this.pinsSubscription = await this.postService.getPosts().then((res) =>
        res.subscribe((res: any[]) => {
          res.forEach((pin: any) => this.addPin(pin)); // Add each pin
        }),
      );
    }
  }

  // Adds a pin to the map
  private addPin(pin: any) {
    const clickablePin = new ClickablePin({ color: '#b40219' }).setLngLat(pin?.geometry?.coordinates);
    clickablePin.onClick(() => {
      // this.flyTo(pin?.geometry?.coordinates);
      this.openDialog(pin);
    });
    clickablePin.addTo(this.map);
  }

  openDialog(post: Post): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      post: post,
      editMode: false,
    };
    dialogConfig.width = '750px';

    this.dialog.open(PostDetailsComponent, dialogConfig);
  }

  // Creates a new pin and adds it to the map
  private createPin(coordinates: [number, number]) {
    this.openCreatePostModal(coordinates);
    // const newPin = new GeoJson(coordinates, { message: this.message });
    // this.mapService.createPin(newPin); // Use the MapService to create the pin
  }

  // Handles the touchend event for mobile devices
  private handleTouchEnd(event: any) {
    event.preventDefault();
    const curTime = new Date().getTime();
    const tapLength = curTime - this.lastTap;
    if (tapLength < 500 && tapLength > 0) {
      this.createPin([event.lngLat.lng, event.lngLat.lat]);
    }
    this.lastTap = curTime;
  }

  // Flies the map to the given coordinates
  flyTo(coordinates: [number, number]) {
    this.map.flyTo({ center: coordinates, zoom: 6 });
  }

  openCreatePostModal(coordinates: [number, number]): void {
    const dialogRef = this.dialog.open(CreatePostComponent, {
      width: '120vw',
      height: '100vh'
    });
    dialogRef.componentInstance.coordinates = coordinates;
    dialogRef.afterClosed().subscribe((result) => {});
  }
}

// Custom class for clickable pins extending mapboxgl.pin
class ClickablePin extends mapboxgl.Marker {
  _handleClick: any;
  _element: any;

  // Method to set the click handler
  onClick(handleClick: any) {
    this._handleClick = handleClick;
    return this;
  }

  // Internal method to handle map clicks
  _onMapClick(e: any) {
    const targetElement = e.originalEvent.target;
    const element = this._element;
    if (this._handleClick && (targetElement === element || element.contains(targetElement))) {
      this._handleClick();
    }
  }
}