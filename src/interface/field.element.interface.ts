import { FieldElement } from './../field.element';

export interface IFieldElement {
  add(other: FieldElement): FieldElement;
  sub(other: FieldElement): FieldElement;
  mul(other: FieldElement): FieldElement;
  pow(exponent: number): FieldElement;
  div(other: FieldElement): FieldElement;
  represent(): string;
  equal(other: FieldElement): boolean;
  neither(other: FieldElement): boolean;
}
