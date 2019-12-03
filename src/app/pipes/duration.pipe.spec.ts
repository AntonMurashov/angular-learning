import { DurationPipe } from './duration.pipe';

describe('DurationPipe', () => {
  let pipe = new DurationPipe();
  
  it('should transforms "30" to "30 min"', () => {
    expect(pipe.transform(30)).toBe('30 min');
  });
  
  it('should transform "60" to "1 h"', () => {
    expect(pipe.transform(60)).toBe('1 h');
  });
  
  it('should transform "90" to "1 h 30 min"', () => {
    expect(pipe.transform(90)).toBe('1 h 30 min');
  });
  
  it('should return null on undefined', () => {
    expect(pipe.transform(undefined)).toEqual(null);
  });
  
  it('should return null on NaN', () => {
    expect(pipe.transform(NaN)).toEqual(null);
  });
});
