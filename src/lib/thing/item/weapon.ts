import { Dice } from "../../dice";
import { Skill } from "../../skill";
import { Item, ItemPrototype } from "../item";

export enum DamageType {
  None,
  Slashing,
  Piercing,
  Bashing,
}

export function getDamageType(damageType: string) {
  for (const [name, value] of Object.entries(DamageType)) {
    if (name === damageType) {
      return value as DamageType;
    }
  }
  return undefined;
}

export class Damage {
  type = DamageType.None;
  amount = new Dice();
}

export class Weapon {
  constructor(private base: Item | ItemPrototype) {}
  skill = new Skill();
  damage = new Damage();
}
