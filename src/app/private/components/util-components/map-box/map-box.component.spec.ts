import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';

import { PostService } from '../../../../services/post.service';
import { MapBoxComponent } from './map-box.component';


describe('MapBoxComponent', () => {
  let component: MapBoxComponent;
  let fixture: ComponentFixture<MapBoxComponent>;
  const mockPostService = {
    getPosts: jest.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MapBoxComponent],
      providers: [
        {
          provide: PostService,
          useValue: mockPostService,
        },
      ],
      imports: [MatDialogModule],
    }).compileComponents();

    fixture = TestBed.createComponent(MapBoxComponent);
    component = fixture.componentInstance;
    component.map = {
      resize: jest.fn(),
    } as any;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});