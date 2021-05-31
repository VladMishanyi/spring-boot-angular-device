import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationTimeComponent } from './creation-time.component';

describe('CreationTimeComponent', () => {
  let component: CreationTimeComponent;
  let fixture: ComponentFixture<CreationTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreationTimeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreationTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
