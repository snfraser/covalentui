import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectBasestationDialogComponent } from './select-basestation-dialog.component';

describe('SelectBasestationDialogComponent', () => {
  let component: SelectBasestationDialogComponent;
  let fixture: ComponentFixture<SelectBasestationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectBasestationDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectBasestationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
