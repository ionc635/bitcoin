import { power } from './../utils/power';
import { FieldElement } from './../src/field.element';

describe('유한체 생성', () => {
  beforeEach(() => {});

  it('유한체가 생성된다.', () => {
    const fieldElement = new FieldElement(1, 17);

    expect(fieldElement).toEqual({ num: 1, prime: 17 });
  });

  it('num이 0보다 작으면 유한체가 생성되지 않는다.', () => {
    try {
      new FieldElement(-1, 17);
    } catch (error) {
      expect(error).toEqual(new Error('Num -1 not in field range 0 to 16'));
    }
  });

  it('num이 prime 보다 크면 유한체가 생성되지 않는다.', () => {
    try {
      new FieldElement(19, 17);
    } catch (error) {
      expect(error).toEqual(new Error('Num 19 not in field range 0 to 16'));
    }
  });
});

describe('유한체 사칙 연산', () => {
  it('57의 위수를 가진 유한체에서 44 + 33은?', () => {
    const fieldElement1 = new FieldElement(44, 57);
    const fieldElement2 = new FieldElement(33, 57);

    const result = fieldElement1.add(fieldElement2);

    expect(result).toEqual({ num: 20, prime: 57 });
  });

  it('57의 위수를 가진 유한체에서 9 - 29는?', () => {
    const fieldElement1 = new FieldElement(9, 57);
    const fieldElement2 = new FieldElement(29, 57);

    const result = fieldElement1.sub(fieldElement2);

    expect(result).toEqual({ num: 37, prime: 57 });
  });

  it('57의 위수를 가진 유한체에서 17 - 42 + 49는?', () => {
    const fieldElement1 = new FieldElement(17, 57);
    const fieldElement2 = new FieldElement(42, 57);
    const fieldElement3 = new FieldElement(49, 57);

    const result = fieldElement1.sub(fieldElement2).add(fieldElement3);

    expect(result).toEqual({ num: 24, prime: 57 });
  });

  it('57의 위수를 가진 유한체에서 52 - 30 - 38은?', () => {
    const fieldElement1 = new FieldElement(52, 57);
    const fieldElement2 = new FieldElement(30, 57);
    const fieldElement3 = new FieldElement(38, 57);

    const result = fieldElement1.sub(fieldElement2).sub(fieldElement3);

    expect(result).toEqual({ num: 41, prime: 57 });
  });

  it('97의 위수를 가진 유한체에서 95 * 45 * 31은?', () => {
    const fieldElement1 = new FieldElement(95, 97);
    const fieldElement2 = new FieldElement(45, 97);
    const fieldElement3 = new FieldElement(31, 97);

    const result = fieldElement1.mul(fieldElement2).mul(fieldElement3);

    expect(result).toEqual({ num: 23, prime: 97 });
  });

  it('97의 위수를 가진 유한체에서 17 * 13 * 19 * 44는?', () => {
    const fieldElement1 = new FieldElement(17, 97);
    const fieldElement2 = new FieldElement(13, 97);
    const fieldElement3 = new FieldElement(19, 97);
    const fieldElement4 = new FieldElement(44, 97);

    const result = fieldElement1
      .mul(fieldElement2)
      .mul(fieldElement3)
      .mul(fieldElement4);

    expect(result).toEqual({ num: 68, prime: 97 });
  });

  it('13의 위수를 가진 유한체에서 3 ** 3은?', () => {
    const fieldElement = new FieldElement(3, 13);

    const result = fieldElement.pow(3);

    expect(result).toEqual({ num: 1, prime: 13 });
  });

  it('위수가 17인 유한체에서 다음 집합을 구하시오', () => {
    const prime = 17;
    const result = [];

    for (let i = 1; i < prime; i++) {
      const value = power(i, prime - 1, prime);
      result.push(value);
    }

    expect(result).toEqual(Array(prime - 1).fill(1));
  });

  it('위수가 31인 유한체에서 다음 집합을 구하시오', () => {
    const prime = 31;
    const result = [];

    for (let i = 1; i < prime; i++) {

      const value = power(i, prime - 1, prime);
      result.push(value);
    }

    expect(result).toEqual(Array(prime - 1).fill(1));
  });

  it('19의 위수를 가진 유한체에서 2 / 7은?', () => {
    const fieldElement1 = new FieldElement(2, 19);
    const fieldElement2 = new FieldElement(7, 19);

    const result = fieldElement1.div(fieldElement2);

    expect(result).toEqual({ num: 3, prime: 19 });
  });

  it('31의 위수를 가진 유한체에서 3 / 24은?', () => {
    const fieldElement1 = new FieldElement(3, 31);
    const fieldElement2 = new FieldElement(24, 31);

    const result = fieldElement1.div(fieldElement2);

    expect(result).toEqual({ num: 4, prime: 31 });
  });

  it('31의 위수를 가진 유한체에서 17의 -3승은?', () => {
    const fieldElement1 = new FieldElement(17, 31);

    const result = fieldElement1.pow(-3);

    expect(result).toEqual({ num: 29, prime: 31 });
  });

  it('31의 위수를 가진 유한체에서 4의 -4승 * 11은?', () => {
    const fieldElement1 = new FieldElement(4, 31);
    const fieldElement2 = new FieldElement(11, 31);

    const powed = fieldElement1.pow(-4);
    const result = powed.mul(fieldElement2);

    expect(result).toEqual({ num: 13, prime: 31 });
  });
});
