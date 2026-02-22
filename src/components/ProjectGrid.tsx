import { projects } from "../data/projects";
import { ProjectCard } from "./ProjectCard";
import { useScrollReveal } from "../hooks/useScrollReveal";

export function ProjectGrid() {
  const ref = useScrollReveal();

  return (
    <section ref={ref} className="max-w-4xl mx-auto px-6 pb-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project, i) => (
          <div
            key={project.url}
            className="scroll-reveal"
            style={{ transitionDelay: `${i * 100}ms` }}
          >
            <ProjectCard {...project} />
          </div>
        ))}
      </div>
    </section>
  );
}
