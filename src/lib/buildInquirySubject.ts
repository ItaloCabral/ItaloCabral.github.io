import type { InquiryType } from "../types/locale";

export function buildInquirySubject(
  type: InquiryType,
  name: string,
  organization: string | undefined,
  templates: { mentorship: string; workshop: string },
): string {
  if (type === "mentorship") {
    return templates.mentorship.replace("{name}", name);
  }

  const actor = organization?.trim() || name;
  return templates.workshop.replace("{actor}", actor);
}
