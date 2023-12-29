import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulesDialogComponent } from './schedules-dialog.component';

describe('SchedulesDialogComponent', () => {
  let component: SchedulesDialogComponent;
  let fixture: ComponentFixture<SchedulesDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SchedulesDialogComponent]
    });
    fixture = TestBed.createComponent(SchedulesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
