import { ProjectDetailPage } from "@/app/projects/_components/ProjectDetailPage";
import { completedProjects, getCompletedProject } from "../completed-project-data";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return completedProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getCompletedProject(slug);

  if (!project) {
    return {};
  }

  return {
    title: `${project.name} Completed Project`,
    description: project.description,
    alternates: {
      canonical: `/completed-projects/${project.slug}`,
    },
    openGraph: {
      title: `${project.name} Completed Project | Sky Skrabers`,
      description: project.description,
      url: `/completed-projects/${project.slug}`,
      siteName: "Sky Skrabers",
      type: "website",
    },
  };
}

export default async function CompletedProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getCompletedProject(slug);

  if (!project) {
    notFound();
  }

  return (
    <ProjectDetailPage
      titleLines={project.titleLines}
      projectName={project.name}
      addressLabel={project.name}
      addressGroups={project.categories}
      whatsappText={`I want to know more about ${project.name} completed projects.`}
      linkAddressCellsToWhatsapp
      addressWhatsappMessageTemplate="i want to know more about {address}. please provide some details"
      kicker="Completed Project / Property Portfolio"
      projectStatusLabel="Completed Project"
      secondaryMarqueeText="Outright Properties • Commercial Properties • Sky Skrabers •"
      defaultTags={["Completed", "Property", "Sky Skrabers"]}
      ctaHeading={`Discuss ${project.name} Properties.`}
    />
  );
}
