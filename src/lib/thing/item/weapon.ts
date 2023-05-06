import { Dice } from "../../dice";
import { Item } from "../item";

export enum WeaponType {
  Dagger,
  Sword,
  Mace,
  Axe,
}

export enum AttackType {
  None,
  Slashing,
  Piercing,
  Bashing,
}

export class Attack {
  type = AttackType.None;
  damage = new Dice();
}

export class Weapon {
  constructor(private base: Item) {}
  weaponType = WeaponType.Dagger;
  attack = new Attack();
}

