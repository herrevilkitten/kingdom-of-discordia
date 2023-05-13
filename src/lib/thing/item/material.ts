import { Damage } from "./weapon";

export interface MaterialFn {
  (attack: Damage): number;
}

export interface MaterialMap {
  [name: string]: number;
}

export interface MaterialType {
  onAttack?: MaterialFn | MaterialMap;
  onDefense?: MaterialFn | MaterialMap;
}

export const Material: { [name: string]: MaterialType } = {
  Generic: {},
  Iron: {}
} as const;

export function getMaterial(text: string) {
  text = text.toLowerCase();
  for (const [name, material] of Object.entries(Material)) {
    if (name.toLowerCase() === text) {
      return material;
    }
  }
  return undefined;
}
