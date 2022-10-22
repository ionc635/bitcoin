import { FieldElement } from '../src/field.element';
import { PointForFieldElement } from '../src/point.cipher';

const DEFAULT_A = 0;
const DEFAULT_B = 7;

describe('타원곡선 암호', () => {
  it('(192, 105) 점이 위수 223의 유한체에서 정의된 곡선 y ** 2 = x ** 3 + 7에 위치하는가?', () => {
    const prime = 223;
    const DEFAULT_X = 192;
    const DEFAULT_Y = 105;

    const a = new FieldElement(DEFAULT_A, prime);
    const b = new FieldElement(DEFAULT_B, prime);
    const x = new FieldElement(DEFAULT_X, prime);
    const y = new FieldElement(DEFAULT_Y, prime);

    const result = new PointForFieldElement(x, y, a, b);

    expect(result).toBeTruthy();
  });

  it('(17, 56) 점이 위수 223의 유한체에서 정의된 곡선 y ** 2 = x ** 3 + 7에 위치하는가?', () => {
    const prime = 223;
    const DEFAULT_X = 17;
    const DEFAULT_Y = 56;

    const a = new FieldElement(DEFAULT_A, prime);
    const b = new FieldElement(DEFAULT_B, prime);
    const x = new FieldElement(DEFAULT_X, prime);
    const y = new FieldElement(DEFAULT_Y, prime);

    const result = new PointForFieldElement(x, y, a, b);

    expect(result).toBeTruthy();
  });

  it('(200, 119) 점이 위수 223의 유한체에서 정의된 곡선 y ** 2 = x ** 3 + 7에 위치하는가?', () => {
    const prime = 223;
    const DEFAULT_X = 200;
    const DEFAULT_Y = 119;

    const a = new FieldElement(DEFAULT_A, prime);
    const b = new FieldElement(DEFAULT_B, prime);
    const x = new FieldElement(DEFAULT_X, prime);
    const y = new FieldElement(DEFAULT_Y, prime);

    try {
      new PointForFieldElement(x, y, a, b);
    } catch (error) {
      expect(error).toEqual(
        new Error(`(${DEFAULT_X}, ${DEFAULT_Y}) is not on the curve`)
      );
    }
  });

  it('(42, 99) 점이 위수 223의 유한체에서 정의된 곡선 y ** 2 = x ** 3 + 7에 위치하는가?', () => {
    const prime = 223;
    const DEFAULT_X = 42;
    const DEFAULT_Y = 99;

    const a = new FieldElement(DEFAULT_A, prime);
    const b = new FieldElement(DEFAULT_B, prime);
    const x = new FieldElement(DEFAULT_X, prime);
    const y = new FieldElement(DEFAULT_Y, prime);

    try {
      new PointForFieldElement(x, y, a, b);
    } catch (error) {
      expect(error).toEqual(
        new Error(`(${DEFAULT_X}, ${DEFAULT_Y}) is not on the curve`)
      );
    }
  });

  it('223의 위수에서 정의된 곡선 y ** 2 = x ** 3 + 7 위의 점에서 (192, 105) + (17, 52)는?', () => {
    const prime = 223;
    const DEFAULT_X1 = 192;
    const DEFAULT_Y1 = 105;
    const DEFAULT_X2 = 17;
    const DEFAULT_Y2 = 56;

    const a = new FieldElement(DEFAULT_A, prime);
    const b = new FieldElement(DEFAULT_B, prime);
    const x1 = new FieldElement(DEFAULT_X1, prime);
    const y1 = new FieldElement(DEFAULT_Y1, prime);
    const x2 = new FieldElement(DEFAULT_X2, prime);
    const y2 = new FieldElement(DEFAULT_Y2, prime);

    const p1 = new PointForFieldElement(x1, y1, a, b);
    const p2 = new PointForFieldElement(x2, y2, a, b);

    const result = p1.add(p2);

    expect(result).toEqual(
      new PointForFieldElement(
        new FieldElement(170, prime),
        new FieldElement(142, prime),
        a,
        b
      )
    );
  });

  it('위수 223에서 정의된 곡선 y ** 2 = x ** 3 + 7에서 2 * (192, 105) 스칼라 곱셈은?', () => {
    const prime = 223;
    const DEFAULT_X = 192;
    const DEFAULT_Y = 105;

    const a = new FieldElement(DEFAULT_A, prime);
    const b = new FieldElement(DEFAULT_B, prime);
    const x = new FieldElement(DEFAULT_X, prime);
    const y = new FieldElement(DEFAULT_Y, prime);

    const point = new PointForFieldElement(x, y, a, b);

    const result = point.rmul(2);
    expect(result).toEqual(
      new PointForFieldElement(
        new FieldElement(49, prime),
        new FieldElement(71, prime),
        a,
        b
      )
    );
  });

  it('위수 223에서 정의된 곡선 y ** 2 = x ** 3 + 7에서 2 * (143, 98) 스칼라 곱셈은?', () => {
    const prime = 223;
    const DEFAULT_X = 143;
    const DEFAULT_Y = 98;

    const a = new FieldElement(DEFAULT_A, prime);
    const b = new FieldElement(DEFAULT_B, prime);
    const x = new FieldElement(DEFAULT_X, prime);
    const y = new FieldElement(DEFAULT_Y, prime);

    const point = new PointForFieldElement(x, y, a, b);

    const result = point.rmul(2);
    expect(result).toEqual(
      new PointForFieldElement(
        new FieldElement(64, prime),
        new FieldElement(168, prime),
        a,
        b
      )
    );
  });

  it('위수 223에서 정의된 곡선 y ** 2 = x ** 3 + 7에서 2 * (47, 71) 스칼라 곱셈은?', () => {
    const prime = 223;
    const DEFAULT_X = 47;
    const DEFAULT_Y = 71;

    const a = new FieldElement(DEFAULT_A, prime);
    const b = new FieldElement(DEFAULT_B, prime);
    const x = new FieldElement(DEFAULT_X, prime);
    const y = new FieldElement(DEFAULT_Y, prime);

    const point = new PointForFieldElement(x, y, a, b);

    const result = point.rmul(2);
    expect(result).toEqual(
      new PointForFieldElement(
        new FieldElement(36, prime),
        new FieldElement(111, prime),
        a,
        b
      )
    );
  });

  it('위수 223에서 정의된 곡선 y ** 2 = x ** 3 + 7에서 4 * (47, 71) 스칼라 곱셈은?', () => {
    const prime = 223;
    const DEFAULT_X = 47;
    const DEFAULT_Y = 71;

    const a = new FieldElement(DEFAULT_A, prime);
    const b = new FieldElement(DEFAULT_B, prime);
    const x = new FieldElement(DEFAULT_X, prime);
    const y = new FieldElement(DEFAULT_Y, prime);

    const point = new PointForFieldElement(x, y, a, b);

    const result = point.rmul(4);
    expect(result).toEqual(
      new PointForFieldElement(
        new FieldElement(194, prime),
        new FieldElement(51, prime),
        a,
        b
      )
    );
  });

  it('위수 223에서 정의된 곡선 y ** 2 = x ** 3 + 7에서 8 * (47, 71) 스칼라 곱셈은?', () => {
    const prime = 223;
    const DEFAULT_X = 47;
    const DEFAULT_Y = 71;

    const a = new FieldElement(DEFAULT_A, prime);
    const b = new FieldElement(DEFAULT_B, prime);
    const x = new FieldElement(DEFAULT_X, prime);
    const y = new FieldElement(DEFAULT_Y, prime);

    const point = new PointForFieldElement(x, y, a, b);

    const result = point.rmul(8);
    expect(result).toEqual(
      new PointForFieldElement(
        new FieldElement(116, prime),
        new FieldElement(55, prime),
        a,
        b
      )
    );
  });

  it('위수 223에서 정의된 곡선 y ** 2 = x ** 3 + 7에서 21 * (47, 71) 스칼라 곱셈은?', () => {
    const prime = 223;
    const DEFAULT_X = 47;
    const DEFAULT_Y = 71;

    const a = new FieldElement(DEFAULT_A, prime);
    const b = new FieldElement(DEFAULT_B, prime);
    const x = new FieldElement(DEFAULT_X, prime);
    const y = new FieldElement(DEFAULT_Y, prime);

    const point = new PointForFieldElement(x, y, a, b);

    const result = point.rmul(21);

    expect(result).toEqual(new PointForFieldElement(null, null, a, b));
  });
});
