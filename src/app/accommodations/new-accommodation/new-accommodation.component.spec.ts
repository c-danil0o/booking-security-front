import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAccommodationComponent } from './new-accommodation.component';

describe('NewAccommodationComponent', () => {
  let component: NewAccommodationComponent;
  let fixture: ComponentFixture<NewAccommodationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewAccommodationComponent]
    });
    fixture = TestBed.createComponent(NewAccommodationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
