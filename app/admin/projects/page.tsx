import type { Metadata } from "next";
import ProjectsManager from "@/components/admin/ProjectsManager";

export const metadata: Metadata = { title: "Projeler" };

export default function AdminProjectsPage() {
  return <ProjectsManager />;
}
