export interface Weighable {
  getWeight(): number;
}

export function isWeighable(thing: any): thing is Weighable {
  return "getWeight" in thing;
}

