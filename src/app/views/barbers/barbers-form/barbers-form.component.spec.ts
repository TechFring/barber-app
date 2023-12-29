import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarbersFormComponent } from './barbers-form.component';

describe('BarbersFormComponent', () => {
  let component: BarbersFormComponent;
  let fixture: ComponentFixture<BarbersFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BarbersFormComponent]
    });
    fixture = TestBed.createComponent(BarbersFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
