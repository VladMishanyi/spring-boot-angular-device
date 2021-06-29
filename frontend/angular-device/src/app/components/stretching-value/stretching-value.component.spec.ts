import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StretchingValueComponent } from './stretching-value.component';

describe('StretchingValueComponent', () => {
  let component: StretchingValueComponent;
  let fixture: ComponentFixture<StretchingValueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StretchingValueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StretchingValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
