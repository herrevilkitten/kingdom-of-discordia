import { Character, CharacterPrototype } from "./lib/thing/character";
import { Item, ItemPrototype } from "./lib/thing/item";
import { Room } from "./lib/thing/room";
import * as fs from "fs/promises";
import { join } from "path";
import JSON5 from "json5";
import { Material, getMaterial } from "./lib/thing/item/material";
import { Damage, DamageType, Weapon, getDamageType } from "./lib/thing/item/weapon";
import { Dice } from "./lib/dice";

export const World = {
  rooms: new Map<string, Room>(),
  items: new Map<string, Item>(),
  characters: new Map<string, Character>(),
  prototypes: {
    items: new Map<string, ItemPrototype>(),
    characters: new Map<string, CharacterPrototype>(),
  },
};

function loadItem(id: string, data: DatabaseItem) {
  const prototype = new ItemPrototype();

  prototype.id = id;
  prototype.name = data.name;
  prototype.description = data.description;
  prototype.material = getMaterial(data.material) ?? Material.Generic;

  if (data.weapon) {
    prototype.weapon = new Weapon(prototype);
    prototype.weapon.damage = new Damage();
    prototype.weapon.damage.type = getDamageType(data.weapon.type) ?? DamageType.None;
    prototype.weapon.damage.amount = Dice.parse(data.weapon.damage.amount) ?? new Dice();
  }

  return prototype;
}

function loadArea(areaId: string, data: DatabaseArea) {
  for (const [itemId, itemData] of Object.entries(data.items ?? {})) {
    const item = loadItem(itemId, itemData);
    console.log(item);
  }
}

const AREA_DIR = "./database/areas";
export async function loadAreas() {
  const dir = await fs.opendir(AREA_DIR);
  const areas: { [name: string]: DatabaseArea } = {};
  for await (const dirent of dir) {
    const path = join(AREA_DIR, dirent.name);
    const data = await fs.readFile(path, "utf-8");
    const json: DatabaseArea = JSON5.parse(data);
    loadArea(path, json);
  }

}

/*
{
  items: {
    longsword: {
      name: "a longsword",
      description: "a longsword made of shiny metal",
      material: "iron",
      attack: {
        type: "slashing",
        dice: "1d8",
      },
      weight: 5
    },
  },
  characters: {},
  roooms: {},
  resets: [
    {
      
    }
  ]
}
*/

export interface DatabaseDamage {
  type: string;
  amount: string;
}

export interface DatabaseWeapon {
  type: string;
  damage: DatabaseDamage;
}

export interface DatabaseItem {
  name: string;
  description: string;
  material: string;
  weight: number;
  weapon?: DatabaseWeapon;
}

export interface DatabaseArea {
  items: { [name: string]: DatabaseItem };
}
