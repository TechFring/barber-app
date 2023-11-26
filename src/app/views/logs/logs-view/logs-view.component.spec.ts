import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogsViewComponent } from './logs-view.component';

describe('LogsViewComponent', () => {
  let component: LogsViewComponent;
  let fixture: ComponentFixture<LogsViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LogsViewComponent]
    });
    fixture = TestBed.createComponent(LogsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
