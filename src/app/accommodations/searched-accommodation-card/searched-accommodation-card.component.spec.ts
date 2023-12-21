import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchedAccommodationCardComponent } from './searched-accommodation-card.component';

describe('SearchedAccommodationCardComponent', () => {
  let component: SearchedAccommodationCardComponent;
  let fixture: ComponentFixture<SearchedAccommodationCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchedAccommodationCardComponent]
    });
    fixture = TestBed.createComponent(SearchedAccommodationCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
