import { Attack } from "./weapon";

export interface MaterialType {
  damageReduction?: (attack: Attack) => number;
}

export const Material: { [name: string]: MaterialType } = {
  Generic: {},
} as const;

export function getMaterial(lookingFor: string) {
  for (const [name, material] of Object.entries(Material)) {
    if (name === lookingFor) {
      return material;
    }
  }
  return undefined;
}