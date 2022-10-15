import { FieldElement } from './../src/field.element';

describe('FieldElement', () => {
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
