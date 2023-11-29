import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccommodationListComponent } from './accommodation-list.component';

describe('AccommodationListComponent', () => {
  let component: AccommodationListComponent;
  let fixture: ComponentFixture<AccommodationListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccommodationListComponent]
    });
    fixture = TestBed.createComponent(AccommodationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
