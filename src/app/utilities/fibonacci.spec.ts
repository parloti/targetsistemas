import { fibonacci } from './fibonacci';

describe('fibonacci', () => {

  const terms = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34];

  it(`should return the specified term of the 'fibonacci' sequence.`, () => {
    terms.forEach((term, index) => {
      const result = fibonacci(index);
      const expected = term;
      expect(result).toBe(expected);
    });
  });
});
