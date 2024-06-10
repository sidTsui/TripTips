/* tslint:disable:no-unused-variable */
import { Component, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSidenavModule } from '@angular/material/sidenav';

import { MockComponent } from 'ng-mocks';

import { PostDashboardComponent } from '../post-components/post-dashboard/post-dashboard.component';
import { MapBoxComponent } from '../util-components/map-box/map-box.component';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent, MockComponent(PostDashboardComponent), MockComponent(MapBoxComponent)],
      imports: [MatSidenavModule],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
