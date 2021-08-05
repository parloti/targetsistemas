const memoize = () => {
  const cache = new Map<number, number>();

  const projection = (term: number): number => {
    let value = cache.get(term);
    if (value === void 0) {
      if (term < 1) {
        value = 0;
      } else if (term <= 2) {
        value = 1;
      } else {
        value = projection(term - 1) + projection(term - 2)
      }
    }
    cache.set(term, value);
    return value;
  }

  return projection;
}

export const fibonacci = memoize();
