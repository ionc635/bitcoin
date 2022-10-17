import { IPoint } from './interface/point.interface';

export class Point implements IPoint {
  readonly x: number;
  readonly y: number;
  readonly a: number;
  readonly b: number;

  constructor(x: number, y: number, a: number, b: number) {
    this.x = x;
    this.y = y;
    this.a = a;
    this.b = b;

    if (this.y ** 2 !== this.x ** 3 + a * x + b) {
      throw new Error(`(${x}, ${y}) is not on the curve`);
    }
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
