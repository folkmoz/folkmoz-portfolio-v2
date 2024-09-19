import SectionDescribe from "@/app/components/SectionDescribe";
import React from "react";
import { DATA } from "@/data/resume";
import Image from "next/image";
import { Project } from "@/app/types";

export default function ProjectMobile() {
  return (
    <section
      id={"works"}
      className="relative -mb-1 flex min-h-svh flex-col bg-foreground px-8 pb-[20vh]"
    >
      <SectionDescribe title="selected works" />

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {DATA.projects.fullDev.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </section>
  );
}

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <div className="flex flex-col items-center justify-center overflow-hidden rounded-[12px] bg-[#1a1a1a] shadow-lg">
      <div className="relative aspect-video w-full overflow-hidden">
        <Image fill src={project.image} alt={`${project.title} image`} />
      </div>

      <div className="mt-4 px-4 pb-10">
        <h3 className="text-2xl font-bold text-white">{project.title}</h3>
        <p className="text-sm text-white/70">
          {project.description.length > 150
            ? project.description.slice(0, 150) + "..."
            : project.description}
        </p>

        <div className="mt-4">
          <div className="flex flex-wrap gap-1">
            {project.stacks.map((stack, index) => (
              <span
                key={index}
                className="rounded-full bg-black px-2 py-1 text-xs text-white"
              >
                {stack}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
