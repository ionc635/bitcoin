export class FieldElement {
  private readonly num: number;
  private readonly prime: number;

  constructor(num: number, prime: number) {
    this.num = num;
    this.prime = prime;

    if (num >= prime || num < 0) {
      throw new Error(`Num ${num} not in field range 0 to ${prime - 1}`);
    }
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
