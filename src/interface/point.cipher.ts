import { PointForFieldElement } from "../point.cipher";

export interface IPointForFieldElement {
  add(other: PointForFieldElement): void;
  equal(other: PointForFieldElement): boolean;
}