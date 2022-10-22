import { power } from './../utils/power';
import { FieldElement } from './field.element';
import { IPointForFieldElement } from './interface/point.cipher';

export class PointForFieldElement implements IPointForFieldElement {
  readonly x: number | null;
  readonly y: number | null;
  readonly a: number;
  readonly b: number;
  private readonly prime: number;

  constructor(
    x: FieldElement | null,
    y: FieldElement | null,
    a: FieldElement,
    b: FieldElement
  ) {
    if (x?.prime !== y?.prime || a.prime !== b.prime) {
      throw new Error("they aren't on the same prime");
    }

    this.x = typeof x?.num === 'number' ? x.num : null;
    this.y = typeof y?.num === 'number' ? y.num : null;
    this.a = a.num;
    this.b = b.num;
    this.prime = a.prime;

    if (this.x === null || this.y === null) {
      return;
    }

    if (
      power(this.y, 2, this.prime) !==
      power(this.x, 3, this.prime) + this.b
    ) {
      throw new Error(`(${this.x}, ${this.y}) is not on the curve`);
    }
  }

  add(other: PointForFieldElement) {
    if (this.a !== other.a || this.b !== other.b) {
      throw new Error(`Points ${this}, ${other} are not on the same curve`);
    }

    // 항등원
    if (this.x === null || this.y === null) {
      return other;
    }

    if (other.x === null || other.y === null) {
      return this;
    }

    // 역원
    if (this.x === other.x && this.y !== other.y) {
      const a = new FieldElement(this.a, this.prime);
      const b = new FieldElement(this.b, this.prime);

      return new PointForFieldElement(null, null, a, b);
    }

    // P1 == P2
    if (this.equal(other)) {
      const s = new FieldElement(3, this.prime)
        .mul(new FieldElement(this.x, this.prime).pow(2))
        .add(new FieldElement(this.a, this.prime))
        .div(
          new FieldElement(2, this.prime).mul(
            new FieldElement(this.y, this.prime)
          )
        );
      const x = s
        .pow(2)
        .sub(
          new FieldElement(2, this.prime).mul(
            new FieldElement(this.x, this.prime)
          )
        );
      const y = s
        .mul(new FieldElement(this.x, this.prime).sub(x))
        .sub(new FieldElement(this.y, this.prime));

      return new PointForFieldElement(
        x,
        y,
        new FieldElement(this.a, this.prime),
        new FieldElement(this.b, this.prime)
      );
    }

    // P1 == P2이면서 y 좌표가 0인 경우
    if (this === other && this.y == 0 * this.x) {
      const a = new FieldElement(this.a, this.prime);
      const b = new FieldElement(this.a, this.prime);

      return new PointForFieldElement(null, null, a, b);
    }

    // x1 != x2
    if (this.x != other.x) {
      const s = new FieldElement(other.y, this.prime)
        .sub(new FieldElement(this.y, this.prime))
        .div(
          new FieldElement(other.x, this.prime).sub(
            new FieldElement(this.x, this.prime)
          )
        );
      const x = s
        .pow(2)
        .sub(new FieldElement(this.x, this.prime))
        .sub(new FieldElement(other.x, this.prime));
      const y = s
        .mul(new FieldElement(this.x, this.prime).sub(x))
        .sub(new FieldElement(this.y, this.prime));

      return new PointForFieldElement(
        x,
        y,
        new FieldElement(this.a, this.prime),
        new FieldElement(this.b, this.prime)
      );
    }
  }

  rmul(coefficient: number) {
    let coef = coefficient;

    const a = new FieldElement(this.a, this.prime);
    const b = new FieldElement(this.b, this.prime);

    let current = this as PointForFieldElement;
    let result = new PointForFieldElement(null, null, a, b);

    while (coef) {
      if (coef & 1) {
        result = result.add(current) as PointForFieldElement;
      }
      current = current.add(current) as PointForFieldElement;
      coef = Math.floor(coef / 2);
    }
    return result;
  }

  equal(other: PointForFieldElement) {
    return (
      this.x === other.x &&
      this.y === other.y &&
      this.a === other.a &&
      this.b === other.b
    );
  }
}
