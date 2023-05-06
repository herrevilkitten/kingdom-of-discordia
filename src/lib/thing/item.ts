import { Contents } from "../contents";
import { Thing } from "../thing";
import { Container } from "./item/container";
import { Material } from "./item/material";
import { Weapon } from "./item/weapon";
import { Wearable } from "./item/wearable";
import { Weighable } from "./weighable";

export interface ItemLocation {
  items: Contents<Item>;
}

export enum ItemType {
  Generic,
  Container,
  Weapon,
  Wearable,
}

export class ItemPrototype {
  id = "";
  name = "";
  description = "";
  material = Material.Generic;
  weapon?: Weapon;
}

export class Item extends Thing implements Weighable {
  type = "item";
  subtype = "";
  prototype: ItemPrototype;
  material = Material.Generic;
  weight = 0;
  location?: ItemLocation;

  wearable?: Wearable;
  container?: Container;
  weapon?: Weapon;

  constructor(prototype: ItemPrototype) {
    super();
    this.prototype = prototype;
  }

  getWeight(): number {
    return this.weight + (this.container?.getWeight() ?? 0);
  }
}
