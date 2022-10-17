import { Point } from './../src/point';

const DEFAULT_A = 5;
const DEFAULT_B = 7;

describe('타원곡선 생성', () => {
  it('타원곡선을 생성한다.', () => {
    const x = -1;
    const y = -1;

    const point = new Point(x, y, DEFAULT_A, DEFAULT_B);

    expect(point).toBeTruthy();
  });

  it('y ** 2 !== x ** 3 + a * x + b이라면 타원곡선이 생성되지 않는다.', () => {
    const x = -1;
    const y = -2;

    try {
      new Point(x, y, DEFAULT_A, DEFAULT_B);
    } catch (error) {
      expect(error).toEqual(new Error(`(${x}, ${y}) is not on the curve`));
    }
  });

  it('(2, 4)는 y ** 2 = x ** 3 + 5x + 7 위에 있는가?', () => {
    const x = 2;
    const y = 4;

    try {
      const result = new Point(x, y, DEFAULT_A, DEFAULT_B);
      expect(result).toEqual({ x, y, a: DEFAULT_A, b: DEFAULT_B });
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
      const result = new Point(x, y, DEFAULT_A, DEFAULT_B);
      expect(result).toEqual({ x, y, a: DEFAULT_A, b: DEFAULT_B });
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
      const result = new Point(x, y, DEFAULT_A, DEFAULT_B);
      expect(result).toEqual({ x, y, a: DEFAULT_A, b: DEFAULT_B });
      console.log('위에 있다.');
    } catch (error) {
      expect(error).toEqual(new Error(`(${x}, ${y}) is not on the curve`));
      console.log('위에 없다.');
    }
  });
});

describe('점 덧셈', () => {
  it('항등원 덧셈', () => {
    const x = -1;
    const y = -1

    const point1 = new Point(null, null, DEFAULT_A, DEFAULT_B);
    const point2 = new Point(x, y, DEFAULT_A, DEFAULT_B);

    const result = point1.add(point2);

    expect(result).toEqual(point2);
  })

  it('역원 덧셈', () => {
    const x = -1;
    const y = -1;

    const point1 = new Point(x, y, DEFAULT_A, DEFAULT_B);
    const point2 = new Point(x, -y, DEFAULT_A, DEFAULT_B);

    const result = point1.add(point2);

    expect(result).toEqual({ x: null, y: null, a: DEFAULT_A, b: DEFAULT_B});
  })

  it('타원곡선 y ** 2 = x ** 3 + 5x + 7 위의 두점 (2, 5), (-1, -1)를 더하면?', () => {
    const x1 = 2;
    const y1 = 5;
    const x2 = -1;
    const y2 = -1;

    const point1 = new Point(x1, y1, DEFAULT_A, DEFAULT_B);
    const point2 = new Point(x2, y2, DEFAULT_A, DEFAULT_B);

    const result = point1.add(point2);

    expect(result).toEqual({ x: 3, y: -7, a: DEFAULT_A, b: DEFAULT_B});
  })

  it('타원곡선 y ** 2 = x ** 3 + 5x + 7 위의 두점 (-1, -1), (-1, -1)를 더하면?', () => {
    const x = -1;
    const y = -1;

    const point1 = new Point(x, y, DEFAULT_A, DEFAULT_B);
    const point2 = new Point(x, y, DEFAULT_A, DEFAULT_B);

    const result = point1.add(point2);

    expect(result).toEqual({ x: 18, y: 77, a: DEFAULT_A, b: DEFAULT_B});
  })
})