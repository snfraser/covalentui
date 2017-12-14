import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewWaypointsDialogComponent } from './review-waypoints-dialog.component';

describe('ReviewWaypointsDialogComponent', () => {
  let component: ReviewWaypointsDialogComponent;
  let fixture: ComponentFixture<ReviewWaypointsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewWaypointsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewWaypointsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
