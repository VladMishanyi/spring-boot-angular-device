import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NameOfChartComponent } from './name-of-chart.component';

describe('NameOfChartComponent', () => {
  let component: NameOfChartComponent;
  let fixture: ComponentFixture<NameOfChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NameOfChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NameOfChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
