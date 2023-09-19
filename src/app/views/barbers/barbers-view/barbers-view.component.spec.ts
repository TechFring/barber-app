import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarbersViewComponent } from './barbers-view.component';

describe('BarbersComponent', () => {
  let component: BarbersViewComponent;
  let fixture: ComponentFixture<BarbersViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BarbersViewComponent]
    });
    fixture = TestBed.createComponent(BarbersViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
