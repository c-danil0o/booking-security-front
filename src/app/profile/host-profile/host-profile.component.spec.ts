import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostProfileComponent } from './host-profile.component';

describe('HostProfileComponent', () => {
  let component: HostProfileComponent;
  let fixture: ComponentFixture<HostProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HostProfileComponent]
    });
    fixture = TestBed.createComponent(HostProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
