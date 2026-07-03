export type Locale = "pt" | "en";

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
  nav: Record<string, string>;
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
    skills: string[];
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
  footer: { built: string; rights: string };
}

export interface ContactChannel {
  id: string;
  label: string;
  description: string;
  value: string;
  cta: string;
}

export interface TalkTopic {
  title: string;
  description: string;
}
