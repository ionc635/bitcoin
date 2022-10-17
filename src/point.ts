import { IPoint } from './interface/point.interface';

export class Point implements IPoint {
  readonly x: number | null;
  readonly y: number | null;
  readonly a: number;
  readonly b: number;

  constructor(x: number | null, y: number | null, a: number, b: number) {
    this.x = x;
    this.y = y;
    this.a = a;
    this.b = b;

    if (this.x === null && this.y === null) {
      return;
    }

    if (
      (this.y as number) ** 2 !==
      (this.x as number) ** 3 + a * (x as number) + b
    ) {
      throw new Error(`(${x}, ${y}) is not on the curve`);
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
      return new Point(null, null, this.a, this.b);
    }

    // P1 == P
    if (this.equal(other)) {
      const s = (3 * this.x ** 2 + this.a) / (2 * this.y);
      const x = s ** 2 - 2 * this.x;
      const y = s * (this.x - x) - this.y;

      return new Point(x, y, this.a, this.b);
    }

    // P1 == P2이면서 y 좌표가 0인 경우
    if (this === other && this.y == 0 * this.x) {
      return new Point(null, null, this.a, this.b);
    }

    // x1 != x2
    const s = (other.y - this.y) / (other.x - this.x);
    const x = s ** 2 - this.x - other.x;
    const y = s * (this.x - x) - this.y;

    return new Point(x, y, this.a, this.b);
  }

  equal(other: Point) {
    return (
      this.x === other.x &&
      this.y === other.y &&
      this.a === other.a &&
      this.b === other.b
    );
  }

  neither(other: Point) {
    return (
      this.x !== other.x ||
      this.y !== other.y ||
      this.a !== other.a ||
      this.b !== other.b
    );
  }
}
