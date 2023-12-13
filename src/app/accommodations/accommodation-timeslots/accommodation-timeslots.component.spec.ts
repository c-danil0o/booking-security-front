import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccommodationTimeslotsComponent } from './accommodation-timeslots.component';

describe('AccommodationTimeslotsComponent', () => {
  let component: AccommodationTimeslotsComponent;
  let fixture: ComponentFixture<AccommodationTimeslotsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccommodationTimeslotsComponent]
    });
    fixture = TestBed.createComponent(AccommodationTimeslotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
