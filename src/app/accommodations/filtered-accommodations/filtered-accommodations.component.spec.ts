import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilteredAccommodationsComponent } from './filtered-accommodations.component';

describe('FilteredAccommodationsComponent', () => {
  let component: FilteredAccommodationsComponent;
  let fixture: ComponentFixture<FilteredAccommodationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FilteredAccommodationsComponent]
    });
    fixture = TestBed.createComponent(FilteredAccommodationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
