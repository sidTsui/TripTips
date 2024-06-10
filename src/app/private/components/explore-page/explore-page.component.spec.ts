import { async, ComponentFixture, TestBed } from '@angular/core/testing';



import { MockComponent } from 'ng-mocks';

import { PostDashboardComponent } from '../post-components/post-dashboard/post-dashboard.component';
import { MapBoxComponent } from '../util-components/map-box/map-box.component';
import { ExplorePageComponent } from './explore-page.component';

describe('ExplorePageComponent', () => {
  let component: ExplorePageComponent;
  let fixture: ComponentFixture<ExplorePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ExplorePageComponent, MockComponent(PostDashboardComponent), MockComponent(MapBoxComponent)],
    }).compileComponents();

    fixture = TestBed.createComponent(ExplorePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});