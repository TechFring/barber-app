import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { userLevelGuard } from './user-level.guard';

describe('userLevelGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => userLevelGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
