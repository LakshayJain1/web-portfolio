import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import DetailPageShell from "../../../components/DetailPageShell";
import ProjectHeroImage from "../../../components/ProjectHeroImage";
import { getAllProjectSlugs, getProjectBySlug } from "../../../data/projects";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project Not Found" };

  return {
    title: project.title,
    description: project.excerpt,
    openGraph: {
      title: `${project.title} — Case Study`,
      description: project.excerpt,
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <DetailPageShell badge={`MISSION FILE // ${project.type}`} backHref="/#projects">
      <div className="bg-[#0A0A0F] border-4 border-[var(--coin)] p-6 md:p-10 shadow-[12px_12px_0_#000] relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          <div className="md:sticky md:top-24 md:self-start">
            <ProjectHeroImage
              title={project.title}
              type={project.type}
              accentColor={project.accentColor}
            />
            <p className="font-pixel text-[5px] text-[var(--text-dim)] tracking-widest mt-4 text-center md:text-left">
              DEPLOYED {project.year}
            </p>
          </div>

          <div>
            <span className="font-pixel text-[6px] text-[var(--mario-skin)] block mb-2">
              {project.type}
            </span>
            <h1 className="font-pixel text-[var(--coin)] text-[clamp(18px,3vw,28px)] tracking-tight mb-4">
              {project.title}
            </h1>
            <p className="font-terminal text-[17px] text-[var(--text-body)] leading-relaxed mb-8">
              {project.description}
            </p>

            <div className="mb-8">
              <span className="font-pixel text-[5px] text-[var(--text-dim)] uppercase tracking-widest block mb-3">
                Technologies
              </span>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="font-pixel text-[5px] border border-[rgba(255,215,0,0.2)] px-2 py-1 text-[var(--coin)]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-5 border-t border-[var(--border-dim)] pt-8">
              {project.content.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 32)}
                  className="font-terminal text-[16px] text-[var(--text-dim)] leading-relaxed"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-4 bg-[var(--coin)] text-black font-pixel text-[7px] text-center hover:brightness-110 active:translate-y-1 transition-all shadow-[0_4px_0_#B88A00]"
              >
                VIEW LIVE PROJECT
              </a>
              <Link
                href="/#projects"
                className="flex-1 py-4 border-2 border-[var(--coin)] text-[var(--coin)] font-pixel text-[7px] text-center hover:bg-[var(--coin)]/10 transition-colors"
              >
                BACK TO MISSIONS
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[var(--coin)] opacity-50" />
      </div>
    </DetailPageShell>
  );
}
