export class SkillCategory {

}


export const SkillCategories = {
  General: new SkillCategory(),
  Weapon: new SkillCategory(),
} as const;

export function getSkillCategory(text: string) {
  text = text.toLowerCase();
  for (const [name, category] of Object.entries(SkillCategories)) {
    if (name.toLowerCase() === text) {
      return category;
    }
  }
  return undefined;
}

export class Skill {
  id = '';
  name = '';
  description = '';
  category = SkillCategories.General;
}
