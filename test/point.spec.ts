import { Point } from './../src/point';

describe('타원곡선 생성', () => {
  it('타원곡선을 생성한다.', () => {
    const point = new Point(-1, -1, 5, 7);

    expect(point).toBeTruthy();
  });

  it('y ** 2 !== x ** 3 + a * x + b이라면 타원곡선이 생성되지 않는다.', () => {
    const x = -1;
    const y = -2;

    try {
      new Point(x, y, 5, 7);
    } catch (error) {
      expect(error).toEqual(new Error(`(${x}, ${y}) is not on the curve`));
    }
  });

  it('(2, 4)는 y ** 2 = x ** 3 + 5x + 7 위에 있는가?', () => {
    const x = 2;
    const y = 4;

    try {
      const result = new Point(x, y, 5, 7);
      expect(result).toEqual({ x, y, a: 5, b: 7 });
      console.log('위에 있다.');
    } catch (error) {
      expect(error).toEqual(new Error(`(${x}, ${y}) is not on the curve`));
      console.log('위에 없다.');
    }
  });

  it('(18, 77)는 y ** 2 = x ** 3 + 5x + 7 위에 있는가?', () => {
    const x = 18;
    const y = 77;

    try {
      const result = new Point(x, y, 5, 7);
      expect(result).toEqual({ x, y, a: 5, b: 7 });
      console.log('위에 있다.');
    } catch (error) {
      expect(error).toEqual(new Error(`(${x}, ${y}) is not on the curve`));
      console.log('위에 없다.');
    }
  });

  it('(5, 7)는 y ** 2 = x ** 3 + 5x + 7 위에 있는가?', () => {
    const x = 5;
    const y = 7;

    try {
      const result = new Point(x, y, 5, 7);
      expect(result).toEqual({ x, y, a: 5, b: 7 });
      console.log('위에 있다.');
    } catch (error) {
      expect(error).toEqual(new Error(`(${x}, ${y}) is not on the curve`));
      console.log('위에 없다.');
    }
  });
});
