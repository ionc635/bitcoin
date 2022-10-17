import { Point } from "../point.cipher";

export interface IPoint {
  add(other: Point): void;
  equal(other: Point): boolean;
}