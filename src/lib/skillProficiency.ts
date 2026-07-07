import type { SkillProficiency } from "../types/locale";

export const PROFICIENCY_BAR_WIDTH: Record<SkillProficiency, number> = {
  beginner: 33,
  intermediate: 66,
  advanced: 100,
};

export function proficiencyBarWidth(proficiency: SkillProficiency): number {
  return PROFICIENCY_BAR_WIDTH[proficiency];
}
