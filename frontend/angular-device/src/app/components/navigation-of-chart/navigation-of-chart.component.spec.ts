import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationOfChartComponent } from './navigation-of-chart.component';

describe('NavigationOfChartComponent', () => {
  let component: NavigationOfChartComponent;
  let fixture: ComponentFixture<NavigationOfChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavigationOfChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationOfChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
