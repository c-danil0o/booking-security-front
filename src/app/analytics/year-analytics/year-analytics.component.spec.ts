import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YearAnalyticsComponent } from './year-analytics.component';

describe('YearAnalyticsComponent', () => {
  let component: YearAnalyticsComponent;
  let fixture: ComponentFixture<YearAnalyticsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [YearAnalyticsComponent]
    });
    fixture = TestBed.createComponent(YearAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
