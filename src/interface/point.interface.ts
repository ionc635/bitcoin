import { Point } from './../point';

export interface IPoint {
  equal(other: Point): boolean;
  neither(other: Point): boolean;
  add(other: Point): Point | undefined;
}
