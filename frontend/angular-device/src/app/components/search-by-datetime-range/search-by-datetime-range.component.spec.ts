import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchByDatetimeRangeComponent } from './search-by-datetime-range.component';

describe('SearchByDatetimeRangeComponent', () => {
  let component: SearchByDatetimeRangeComponent;
  let fixture: ComponentFixture<SearchByDatetimeRangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchByDatetimeRangeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchByDatetimeRangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
