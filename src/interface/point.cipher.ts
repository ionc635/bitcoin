import { PointForFieldElement } from "../point.cipher";

export interface IPointForFieldElement {
  add(other: PointForFieldElement): PointForFieldElement | undefined;
  equal(other: PointForFieldElement): boolean;
  rmul(coefficient: number): PointForFieldElement;
}