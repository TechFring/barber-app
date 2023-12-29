import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersViewComponent } from './customers-view.component';

describe('CustomersViewComponent', () => {
  let component: CustomersViewComponent;
  let fixture: ComponentFixture<CustomersViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomersViewComponent]
    });
    fixture = TestBed.createComponent(CustomersViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
