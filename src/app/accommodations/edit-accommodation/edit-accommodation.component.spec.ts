import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAccommodationComponent } from './edit-accommodation.component';

describe('EditAccommodationComponent', () => {
  let component: EditAccommodationComponent;
  let fixture: ComponentFixture<EditAccommodationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditAccommodationComponent]
    });
    fixture = TestBed.createComponent(EditAccommodationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
