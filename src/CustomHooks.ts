import { useCallback, useMemo } from "react";
import { skillsData } from "./data";

export const useSkillFilter = (skillFilter: string) => {
  return useMemo(() => {
    return skillFilter === "All"
      ? skillsData
      : skillsData.filter((skill) => skill.category === skillFilter);
  }, [skillFilter]);
};

export const useScrollToSection = () => {
  return useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId.toLowerCase());
    element?.scrollIntoView({ behavior: "smooth" });
  }, []);
};

export const useExternalLink = () => {
  return useCallback((url: string, newTab = true) => {
    if (newTab) {
      window.open(url, "_blank", "noopener noreferrer");
    } else {
      window.location.href = url;
    }
  }, []);
};
