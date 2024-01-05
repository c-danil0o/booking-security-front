import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsViewComponent } from './reports-view.component';

describe('ReportsViewComponent', () => {
  let component: ReportsViewComponent;
  let fixture: ComponentFixture<ReportsViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReportsViewComponent]
    });
    fixture = TestBed.createComponent(ReportsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
