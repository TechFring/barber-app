import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaborsFormComponent } from './labors-form.component';

describe('LaborsFormComponent', () => {
  let component: LaborsFormComponent;
  let fixture: ComponentFixture<LaborsFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LaborsFormComponent]
    });
    fixture = TestBed.createComponent(LaborsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
