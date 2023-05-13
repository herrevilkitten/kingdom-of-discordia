import { Character, CharacterPrototype } from "./lib/thing/character";
import { Item, ItemPrototype } from "./lib/thing/item";
import { Room } from "./lib/thing/room";
import * as fs from "fs/promises";
import { join } from "path";
import JSON5 from "json5";
import { Material, getMaterial } from "./lib/thing/item/material";
import { Damage, DamageType, Weapon, getDamageType } from "./lib/thing/item/weapon";
import { Dice } from "./lib/dice";
import { Skill, SkillCategories, SkillCategory, getSkillCategory } from "./lib/skill";

export const World = {
  rooms: new Map<string, Room>(),
  items: new Map<string, Item>(),
  characters: new Map<string, Character>(),
  prototypes: {
    items: new Map<string, ItemPrototype>(),
    characters: new Map<string, CharacterPrototype>(),
  },
  skills: new Map<string, Skill>(),
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
    prototype.weapon.damage.type = getDamageType(data.weapon.damage.type) ?? DamageType.None;
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

function loadSkill(skillId: string, data: DatabaseSkill) {
  const skill = new Skill();
  skill.id = skillId;
  skill.name = data.name;
  skill.category = getSkillCategory(data.category) ?? SkillCategories.General;
}


const DATABASE_DIR = "./database";
export async function readSkills() {
  const file = await fs.readFile(join(DATABASE_DIR, "skills.json5"), "utf-8");
  const skills = JSON5.parse(file) as DatabaseSkill;
}

const AREA_DIR = `${DATABASE_DIR}/areas`;
export async function readAreas() {
  const dir = await fs.opendir(AREA_DIR);
  const areas: { [name: string]: DatabaseArea } = {};
  for await (const dirent of dir) {
    const path = join(AREA_DIR, dirent.name);
    const data = await fs.readFile(path, "utf-8");
    const json: DatabaseArea = JSON5.parse(data);
    loadArea(path, json);
  }

}

export interface DatabaseSkill {
  name: string;
  category: string;
}

export interface DatabaseDamage {
  type: string;
  amount: string;
}

export interface DatabaseWeapon {
  skill: string;
  damage: DatabaseDamage;
}

export interface DatabaseItem {
  name: string;
  description: string;
  material: string;
  weight: number;
  weapon?: DatabaseWeapon;
}

export interface DatabaseType {
  weapon: { [name: string]: string };
}

export interface DatabaseArea {
  items: { [name: string]: DatabaseItem };
}
