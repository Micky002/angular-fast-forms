import { CodenturyLuxonDateAdapter } from './codentury-luxon-date-adapter';

describe('CodenturyLuxonDateAdapter', () => {
  let dateAdapter: CodenturyLuxonDateAdapter;

  beforeEach(() => {
    dateAdapter = new CodenturyLuxonDateAdapter('en');
  });

  it('should create', () => {
    expect(dateAdapter).toBeDefined();
  });
});
