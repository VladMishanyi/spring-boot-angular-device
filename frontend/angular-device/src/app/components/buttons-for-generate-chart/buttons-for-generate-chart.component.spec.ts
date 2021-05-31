import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonsForGenerateChartComponent } from './buttons-for-generate-chart.component';

describe('ButtonsForGenerateChartComponent', () => {
  let component: ButtonsForGenerateChartComponent;
  let fixture: ComponentFixture<ButtonsForGenerateChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonsForGenerateChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonsForGenerateChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
