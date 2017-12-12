import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamplePlotComponent } from './example-plot.component';

describe('ExamplePlotComponent', () => {
  let component: ExamplePlotComponent;
  let fixture: ComponentFixture<ExamplePlotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamplePlotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamplePlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
