import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostPropertiesComponent } from './host-properties.component';

describe('HostPropertiesComponent', () => {
  let component: HostPropertiesComponent;
  let fixture: ComponentFixture<HostPropertiesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HostPropertiesComponent]
    });
    fixture = TestBed.createComponent(HostPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
