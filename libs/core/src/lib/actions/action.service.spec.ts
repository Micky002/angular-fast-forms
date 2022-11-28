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
      next: event => {
        expect(event.matchId).toEqual('group.action-id');
        expect(event.rawId).toEqual('group.action-id');
        expect(event.args).toEqual(['group', 'action-id']);
        cb();
      }
    });
    service.emitAction('group.action-id');
  });

  it('should match with end of action name', (cb) => {
    const eventName = 'this-is-an-action.with-a-custom-end';
    service.actionEndWith('custom-end')
        .subscribe({
          next: event => {
            expect(event.matchId).toEqual(eventName);
            expect(event.rawId).toEqual(eventName);
            expect(event.args).toEqual(['this-is-an-action', 'with-a-custom-end']);
            cb();
          }
        });
    service.emitAction(eventName);
  });

  it('should emit action with data payload', (cb) => {
    service.actions.subscribe({
      next: event => {
        expect(event.args).toEqual(['test', 'id']);
        expect(event.data).toEqual({
          oldValue: 'Donald',
          newValue: 'Duck'
        });
        cb();
      }
    });
    service.emitAction('test.id', {
      oldValue: 'Donald',
      newValue: 'Duck'
    });
  });
});
