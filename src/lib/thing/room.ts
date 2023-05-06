import { Contents } from "../contents";
import { Thing } from "../thing";
import { PeopleLocation, Character } from "./character";
import { ItemLocation, Item } from "./item";

export class Room extends Thing implements ItemLocation, PeopleLocation {
  type = "room";
  items = new Contents<Item>();
  people = new Contents<Character>();
}

