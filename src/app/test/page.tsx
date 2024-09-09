"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { GithubIcon, ExternalLinkIcon } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "AI-Powered Task Manager",
    description:
      "An innovative task management application that uses artificial intelligence to prioritize and categorize tasks, providing smart suggestions and improving productivity.",
    technologies: ["React", "Node.js", "TensorFlow.js", "MongoDB"],
    image: "/images/projects/roommatch.jpeg",
    githubLink: "#",
    demoLink: "#",
  },
  {
    title: "Virtual Reality Art Gallery",
    description:
      "An immersive VR experience showcasing digital art in a beautifully designed virtual space, allowing users to explore and interact with artworks in new ways.",
    technologies: ["Three.js", "WebXR", "React", "WebGL"],
    image: "/images/projects/roommatch.jpeg",

    githubLink: "#",
    demoLink: "#",
  },
];

export default function CoolestProjects() {
  const [currentProject, setCurrentProject] = useState(0);
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const content = contentRef.current;

    gsap.fromTo(
      image,
      { scale: 1 },
      {
        scale: 1.5,
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      },
    );

    ScrollTrigger.create({
      trigger: section,
      start: "center center",
      onEnter: () => {
        gsap.to(image, {
          clipPath: "inset(0% 0% 100% 0%)",
          duration: 1,
          ease: "power2.inOut",
          onComplete: () => {
            setCurrentProject((prev) => prev + 1);
            console.log("currentProject", currentProject);
            gsap.set(image, { clipPath: "inset(100% 0% 0% 0%)" });
            gsap.to(image, {
              clipPath: "inset(0% 0% 0% 0%)",
              duration: 1,
              ease: "power2.inOut",
            });
          },
        });
        gsap.to(content, {
          opacity: 0,
          y: 50,
          duration: 0.5,
          onComplete: () => {
            gsap.set(content, { y: -50 });
            gsap.to(content, { opacity: 1, y: 0, duration: 0.5, delay: 1 });
          },
        });
      },
      once: true,
    });
  }, []);

  const project = projects[currentProject];
  console.log(project);

  return (
    <section
      ref={sectionRef}
      className="flex h-[150vh] min-h-screen items-center bg-gradient-to-br from-gray-900 to-gray-800 py-16"
    >
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center text-3xl font-bold text-white">
          Coolest Projects
        </h2>
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div className="relative aspect-video overflow-hidden rounded-lg shadow-xl">
            <div ref={imageRef} className="h-full w-full">
              <Image
                src={project.image}
                alt={`${project.title} Screenshot`}
                layout="fill"
                objectFit="cover"
              />
            </div>
          </div>
          <div ref={contentRef} className="space-y-4">
            <h3 className="text-2xl font-semibold text-white">
              {project.title}
            </h3>
            <p className="text-gray-300">{project.description}</p>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded bg-gray-700 px-2 py-1 text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
            <div className="flex space-x-4 pt-4"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
