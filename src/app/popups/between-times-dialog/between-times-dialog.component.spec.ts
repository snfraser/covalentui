import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BetweenTimesDialogComponent } from './between-times-dialog.component';

describe('BetweenTimesDialogComponent', () => {
  let component: BetweenTimesDialogComponent;
  let fixture: ComponentFixture<BetweenTimesDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BetweenTimesDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BetweenTimesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
