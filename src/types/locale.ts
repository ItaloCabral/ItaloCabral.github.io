export type Locale = "pt" | "en";

export type InquiryType = "mentorship" | "workshop";

export interface InquiryCopy {
  title: string;
  description: string;
}

export type SkillProficiency = "beginner" | "intermediate" | "advanced";

export interface SkillItem {
  name: string;
  proficiency: SkillProficiency;
}

export interface SkillCategory {
  id: string;
  label: string;
  skills: SkillItem[];
}

export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  description: string;
  highlights: string[];
  tech: string[];
}

export interface ProjectItem {
  name: string;
  tagline?: string;
  description: string;
  outcome?: string;
  tech: string[];
  github: string | null;
  demo: string | null;
  poster: string;
  gif: string;
  featured?: boolean;
  isPlaceholder?: boolean;
}

export interface LocaleStrings {
  meta: { title: string; description: string };
  sections: Record<string, string>;
  nav: Record<string, string>;
  share: {
    buttonLabel: string;
    title: string;
    description: string;
    message: string;
    linkedin: string;
    whatsapp: string;
    copyLink: string;
    copied: string;
    close: string;
    scrollHint: string;
    dismissHint: string;
  };
  hero: {
    greeting: string;
    name: string;
    role: string;
    summary: string;
    highlights: string[];
    ctaProjects: string;
    ctaContact: string;
    downloadCv: string;
  };
  about: {
    title: string;
    paragraphs: string[];
    skillsTitle: string;
    proficiencyLevels: Record<SkillProficiency, string>;
    skillCategories: SkillCategory[];
  };
  experience: {
    title: string;
    subtitle: string;
    highlightsTitle: string;
    items: ExperienceItem[];
  };
  projects: {
    title: string;
    subtitle: string;
    viewCode: string;
    liveDemo: string;
    featured: string;
    placeholder: string;
    previewHint: string;
    previewHintTouch: string;
    outcomeLabel: string;
    filterAll: string;
    filterFeatured: string;
    prev: string;
    next: string;
    items: ProjectItem[];
  };
  talks: {
    title: string;
    subtitle: string;
    topicsTitle: string;
    topics: TalkTopic[];
    mentorship: { title: string; description: string; cta: string };
    workshops: { title: string; description: string; cta: string };
  };
  contact: {
    title: string;
    subtitle: string;
    intro: string;
    availability: string;
    channels: ContactChannel[];
  };
  footer: {
    built: string;
    rights: string;
    navTitle: string;
    socialTitle: string;
    cv: string;
    contactCta: string;
  };
  a11y: { backToTop: string };
  inquiry: {
    close: string;
    cancel: string;
    submit: string;
    sending: string;
    successTitle: string;
    successDesc: string;
    error: string;
    note: string;
    fields: {
      name: string;
      email: string;
      organization: string;
      message: string;
    };
    placeholders: {
      name: string;
      email: string;
      organization: string;
      messageMentorship: string;
      messageWorkshop: string;
    };
    subjects: {
      mentorship: string;
      workshop: string;
    };
    mentorship: InquiryCopy;
    workshop: InquiryCopy;
  };
}

export interface ContactChannel {
  id: string;
  label: string;
  description: string;
  value: string;
  cta: string;
  href?: string;
}

export interface TalkTopic {
  title: string;
  description: string;
}
