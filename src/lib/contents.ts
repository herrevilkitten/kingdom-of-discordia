import { Thing } from "./thing";
import { Weighable, isWeighable } from "./thing/weighable";

export class Contents<T extends Thing> extends Set<T> implements Weighable {
  getWeight() {
    return [...this.entries()].reduce((prev, curr) => {
      if (isWeighable(curr)) {
        return prev + curr.getWeight();
      }
      return prev;
    }, 0);
  }
}

