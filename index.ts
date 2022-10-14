import { FieldElement } from "./src/field.element";

const a = new FieldElement(7, 13);
const b = new FieldElement(6, 13);

console.log(a === b);
console.log(a === a);
console.log(a.equal(b));