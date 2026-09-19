import React from 'react';
import { HeroSection } from '@/components/sections/HeroSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { ExperienceSection } from '@/components/sections/ExperienceSection';
import { SkillsSection } from '@/components/sections/SkillsSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { AchievementsSection } from '@/components/sections/AchievementsSection';
import { GitHubSection } from '@/components/sections/GitHubSection';
import { WallSection } from '@/components/sections/WallSection';
import { ContactSection } from '@/components/sections/ContactSection';
import type { Project } from '@/data/portfolioData';

interface HomePageProps {
  onNavigate: (route: string) => void;
  onSelectProject: (project: Project) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onSelectProject,
}) => {
  return (
    <div className="flex flex-col bg-black w-full overflow-x-clip">
      {/* 1. Hero Section */}
      <HeroSection onNavigate={onNavigate} />

      {/* 2. About Me Section */}
      <AboutSection />

      {/* 3. Experience Section */}
      <ExperienceSection />

      {/* 4. Skills Section */}
      <SkillsSection />

      {/* 5. Featured Projects Section */}
      <ProjectsSection
        onSelectProject={onSelectProject}
        onNavigate={onNavigate}
      />

      {/* 6. Achievements Section */}
      <AchievementsSection />

      {/* 7. Code & Contributions (GitHub Calendar) Section */}
      <GitHubSection />

      {/* 8. Misc Section */}
      <WallSection onNavigate={onNavigate} />

      {/* 9. Contact CTA Section */}
      <ContactSection onNavigate={onNavigate} />
    </div>
  );
};
