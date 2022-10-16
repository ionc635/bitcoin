import { power } from "../utils/power";
import { IFieldElement } from "./interface/field.element.interface";

export class FieldElement implements IFieldElement {
  readonly num: number;
  readonly prime: number;

  constructor(num: number, prime: number) {
    this.num = num;
    this.prime = prime;

    if (num >= prime || num < 0) {
      throw new Error(`Num ${num} not in field range 0 to ${prime - 1}`);
    }

    // if (!this.isPrime(prime)) {
    //   throw new Error(`${prime} is not prime `)
    // }
  }

  add(other: FieldElement) {
    if (this.prime !== other.prime) {
      throw new Error('Cannot add two numbers in different Fields');
    }
    const num = (this.num + other.num) % this.prime;
    return new FieldElement(num, this.prime);
  }

  sub(other: FieldElement) {
    if (this.prime !== other.prime) {
      throw new Error('Cannot sub two numbers in different Fields');
    }

    let num;
    const diff = this.num - other.num;

    if (diff < 0) {
      num = this.prime - (Math.abs(diff) % this.prime);
    } else {
      num = (this.num - other.num) % this.prime;
    }

    return new FieldElement(num, this.prime);
  }

  mul(other: FieldElement) {
    if (this.prime !== other.prime) {
      throw new Error('Cannot mul two numbers in different Fields');
    }

    const num = (this.num * other.num) % this.prime;
    return new FieldElement(num, this.prime);
  }

  pow(exponent: number) {
    let n = exponent;
    
    while (n < 0) {
      n += this.prime - 1;
    }

    const num = power(this.num, n, this.prime);
    return new FieldElement(num, this.prime);
  }

  div(other: FieldElement) {
    if (this.prime !== other.prime) {
      throw new Error('Cannot truediv two numbers in different Fields');
    }

    const powed = power(other.num, this.prime - 2, this.prime);
    const num = this.num * powed % this.prime;

    return new FieldElement(num, this.prime);
  }

  represent() {
    return `FieldElement_${this.prime}(${this.num})`;
  }

  equal(other: FieldElement) {
    if (!other) {
      return false;
    }
    return this.num === other.num && this.prime === other.prime;
  }

  neither(other: FieldElement) {
    if (!other) {
      return true;
    }
    return this.num !== other.num || this.prime !== other.prime;
  }
}
