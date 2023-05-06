import { Dice } from "../../dice";
import { Item, ItemPrototype } from "../item";

export const WeaponType = { Dagger: "short blades" } as const;

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
  weaponType = WeaponType.Dagger;
  damage = new Damage();
}
