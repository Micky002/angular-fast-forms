import { ActionEventImpl } from './action-event-impl';

describe('ActionEventImpl', () => {

  it('should parse without array', () => {
    const event = new ActionEventImpl('first-group.next.button');
    expect(event.args).toEqual(['first-group', 'next', 'button']);
    expect(event.matchId).toEqual('first-group.next.button');
    expect(event.rawId).toEqual('first-group.next.button');
  });

  it('should parse with array', () => {
    const event = new ActionEventImpl('first-array[1].next-arr[5][3].button');
    expect(event.args).toEqual(['first-array', 1, 'next-arr', 5, 3, 'button']);
    expect(event.matchId).toEqual('first-array.next-arr.button');
    expect(event.rawId).toEqual('first-array[1].next-arr[5][3].button');
  });
});
