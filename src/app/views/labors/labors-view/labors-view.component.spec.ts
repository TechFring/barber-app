import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaborsViewComponent } from './labors-view.component';

describe('LaborsViewComponent', () => {
  let component: LaborsViewComponent;
  let fixture: ComponentFixture<LaborsViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LaborsViewComponent]
    });
    fixture = TestBed.createComponent(LaborsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
