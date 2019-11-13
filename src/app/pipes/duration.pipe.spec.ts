import { DurationPipe } from './duration.pipe';

describe('DurationPipe', () => {
  let pipe = new DurationPipe();
  
  it('transforms "30" to "30 min"', () => {
    expect(pipe.transform(30)).toBe('30 min');
  });
  
  it('transforms "60" to "1 h"', () => {
    expect(pipe.transform(60)).toBe('1 h');
  });
  
  it('transforms "90" to "1 h 30 min"', () => {
    expect(pipe.transform(90)).toBe('1 h 30 min');
  });
});
