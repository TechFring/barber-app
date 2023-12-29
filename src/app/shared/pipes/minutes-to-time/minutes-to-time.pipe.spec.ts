import { MinutesToTimePipe } from './minutes-to-time.pipe';

describe('MinutesToTimePipe', () => {
  it('create an instance', () => {
    const pipe = new MinutesToTimePipe();
    expect(pipe).toBeTruthy();
  });
});
