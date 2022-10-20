import { TestBed } from '@angular/core/testing';

import { ActionService } from './action.service';

describe('ActionService', () => {
  let service: ActionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ActionService]
    });
    service = TestBed.inject(ActionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should emit event', (cb) => {
    service.actions.subscribe({
      next: value => {
        expect(value.matchId).toEqual('group.action-id');
        expect(value.rawId).toEqual('group.action-id');
        expect(value.args).toEqual(['group', 'action-id']);
        cb();
      }
    });
    service.emitAction('group.action-id');
  });
});
