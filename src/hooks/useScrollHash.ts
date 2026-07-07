import { useEffect } from "react";

export function useScrollHash(activeSection: string, sectionIds: readonly string[]) {
  useEffect(() => {
    if (!sectionIds.includes(activeSection)) return;

    const nextHash = `#${activeSection}`;
    if (window.location.hash === nextHash) return;

    history.replaceState(
      null,
      "",
      `${window.location.pathname}${window.location.search}${nextHash}`,
    );
  }, [activeSection, sectionIds]);
}
