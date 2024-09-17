import { Project } from "@/app/types";
import { cn } from "@/lib/utils";
import AnimatedText from "@/app/components/AnimatedText";
import MagneticButton from "@/app/components/MagneticButton";
import { ArrowUpRight, X } from "lucide-react";
import RevealText from "@/app/components/RevealText";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import Portal from "@/app/components/Portal";

export default function ProjectDetail({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const [isClosing, setIsClosing] = useState(false);
  const imageHeaderRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.to("#mobile-menu", {
      scale: 0,
      duration: 0.5,
    });

    gsap.from("#close-detail", {
      scale: 0,
      duration: 0.5,
      delay: 0.5,
    });

    gsap.from(imageHeaderRef.current, {
      clipPath: "inset(100% 0% 0% 0%)",
      duration: 1,
      ease: "power4.out",
      delay: 0.5,
    });

    const image = imageHeaderRef.current?.querySelector("img");

    if (image) {
      gsap.to(image, {
        scale: 1.05,
        duration: 1,
        ease: "power4.out",
        delay: 0.5,
      });
    }
  }, []);

  useGSAP(() => {
    if (isClosing) {
      gsap.to("#close-detail", {
        scale: 0,
        duration: 0.5,
        pointerEvents: "none",
      });
    }
  }, [isClosing]);

  return (
    <>
      <Portal>
        <div className="fixed left-0 right-0 top-0 z-50 flex h-[100px] items-center justify-end px-4 py-4 lg:px-16">
          <MagneticButton>
            <div
              onClick={() => {
                setIsClosing(true);
                onClose();
              }}
              id="close-detail"
              className="grid size-12 cursor-pointer place-items-center rounded-full border border-white text-white"
            >
              <X size={32} />
            </div>
          </MagneticButton>
        </div>
      </Portal>
      <div className="flex flex-col text-white">
        <div
          ref={imageHeaderRef}
          className="relative mb-10 aspect-video h-[500px] w-full overflow-hidden rounded-[16px]"
        >
          <Image
            src={project.image}
            alt={`${project.title}'s image`}
            fill
            quality={100}
            priority
            className="h-full w-full max-w-full object-cover object-top"
          />
        </div>

        <div className="mt-12 h-auto pb-20">
          <div className="flex gap-y-20">
            <div className="flex-1">
              <div className="text-heading-responsive relative flex max-w-max items-end gap-4 text-left font-body font-bold leading-none">
                <AnimatedText
                  words={[project.title]}
                  atViewport={"top bottom"}
                />

                {project.url ? (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MagneticButton>
                      <div
                        title={`Visit ${project.title}`}
                        className="group absolute -right-20 top-0 grid size-14 place-items-center rounded-full border border-white transition-colors hover:bg-white/20"
                      >
                        <ArrowUpRight size={32} />
                      </div>
                    </MagneticButton>
                  </a>
                ) : (
                  <span className="inline text-lg font-normal italic">
                    <RevealText>
                      <>(site not available)</>
                    </RevealText>
                  </span>
                )}
              </div>
            </div>
            <div className="flex-1">
              <div className="text-xl md:text-2xl lg:text-3xl xl:text-3xl">
                <RevealText>
                  <>{project.description}</>
                </RevealText>
              </div>

              <div className="mt-20">
                <div>
                  <h2 className="font-body text-2xl font-bold">
                    Technologies used
                  </h2>
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                  {project.stacks.map((tech, index) => (
                    <div
                      key={tech + index}
                      className={cn(
                        "rounded-lg bg-white bg-opacity-10 px-4 py-2",
                      )}
                    >
                      {tech}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
