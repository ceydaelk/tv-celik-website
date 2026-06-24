"use client";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { fadeUp, staggerFast, ease } from "@/lib/motion";

interface Project {
  id: string;
  title: string;
  category?: string;
  location?: string;
  description?: string;
  imageUrl?: string;
}

interface ProjectsGridProps {
  projects: Project[];
  emptyText?: string;
}

export default function ProjectsGrid({ projects, emptyText = "Projeler yakında eklenecektir." }: ProjectsGridProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  if (projects.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="text-base text-[#8A8680]">{emptyText}</p>
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={staggerFast}
    >
      {projects.map((project) => (
        <motion.div
          key={project.id}
          variants={fadeUp}
          className="border border-[#DDDBD6] rounded-lg overflow-hidden bg-white"
        >
          <div className="relative h-48 bg-gradient-to-br from-[#E8E6E1] to-[#F3F2EF] overflow-hidden">
            {project.imageUrl ? (
              <Image
                src={project.imageUrl}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-700 ease-out hover:scale-[1.04]"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-[#DDDBD6]" />
              </div>
            )}
          </div>

          <div className="p-4">
            {project.category && (
              <span className="text-xs font-bold uppercase tracking-wide text-[#9D7C64]">
                {project.category}
              </span>
            )}
            <h3 className="text-base font-bold text-[#1C1C1C] mt-1 mb-1">{project.title}</h3>
            {project.location && (
              <p className="text-sm font-normal text-[#8A8680]">{project.location}</p>
            )}
            {project.description && (
              <p className="text-sm font-normal text-[#8A8680] mt-1 line-clamp-2 leading-relaxed">
                {project.description}
              </p>
            )}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
