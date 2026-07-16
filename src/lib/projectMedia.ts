import type { ProjectItem } from "../types/locale";

export type ThemeMode = "light" | "dark";

export function resolveThemedSrc(src: string, theme: ThemeMode): string {
  if (theme === "dark" && src.includes("_light.")) {
    return src.replace("_light.", "_dark.");
  }

  if (theme === "light" && src.includes("_dark.")) {
    return src.replace("_dark.", "_light.");
  }

  return src;
}

export function getProjectSlides(project: ProjectItem): string[] {
  if (project.previews?.length) {
    return project.previews;
  }

  return project.poster === project.gif
    ? [project.poster]
    : [project.poster, project.gif];
}

export function hasProjectGallery(project: ProjectItem): boolean {
  return (project.previews?.length ?? 0) > 1;
}
