import { power } from './../utils/power';

export class FieldElement {
  readonly num: number;
  readonly prime: number;

  constructor(num: number, prime: number) {
    this.num = num;
    this.prime = prime;

    if (num >= prime || num < 0) {
      throw new Error(`Num ${num} not in field range 0 to ${prime - 1}`);
    }
  }
}

export class Point {
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
    this.x = typeof x?.num === 'number' ? x.num : null;
    this.y = typeof y?.num === 'number' ? y.num : null;
    this.a = a.num;
    this.b = b.num;
    this.prime = a.prime;

    if (x?.prime !== y?.prime || a.prime !== b.prime) {
      throw new Error("they aren't on the same prime");
    }

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

  add(other: Point) {
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
      const fieldElementA = new FieldElement(this.a, this.prime);
      const fieldElementB = new FieldElement(this.b, this.prime);

      return new Point(null, null, fieldElementA, fieldElementB);
    }

    // P1 == P
    if (this.equal(other)) {
      const s = (3 * this.x ** 2 + this.a) / (2 * this.y);
      const x = s ** 2 - 2 * this.x;
      const y = s * (this.x - x) - this.y;

      const fieldElementX = new FieldElement(x, this.prime);
      const fieldElementY = new FieldElement(y, this.prime);
      const fieldElementA = new FieldElement(this.a, this.prime);
      const fieldElementB = new FieldElement(this.a, this.prime);

      return new Point(
        fieldElementX,
        fieldElementY,
        fieldElementA,
        fieldElementB
      );
    }

    // P1 == P2이면서 y 좌표가 0인 경우
    if (this === other && this.y == 0 * this.x) {
      const a = new FieldElement(this.a, this.prime);
      const b = new FieldElement(this.a, this.prime);

      return new Point(null, null, a, b);
    }

    // x1 != x2
    const s = (other.y - this.y) / (other.x - this.x);
    const x = s ** 2 - this.x - other.x;
    const y = s * (this.x - x) - this.y;

    const fieldElementX = new FieldElement(x, this.prime);
    const fieldElementY = new FieldElement(y, this.prime);
    const fieldElementA = new FieldElement(this.a, this.prime);
    const fieldElementB = new FieldElement(this.b, this.prime);

    return new Point(
      fieldElementX,
      fieldElementY,
      fieldElementA,
      fieldElementB
    );
  }

  equal(other: Point) {
    return (
      this.x === other.x &&
      this.y === other.y &&
      this.a === other.a &&
      this.b === other.b
    );
  }
}
