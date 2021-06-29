import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchByNameRecipeComponent } from './search-by-name-recipe.component';

describe('SearchByNameRecipeComponent', () => {
  let component: SearchByNameRecipeComponent;
  let fixture: ComponentFixture<SearchByNameRecipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchByNameRecipeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchByNameRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
