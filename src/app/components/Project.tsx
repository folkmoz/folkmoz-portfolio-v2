import Image from "next/image";
import React, { Fragment, useCallback, useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { DATA } from "@/data/resume";
import { splitLetters } from "../helpers/splitText";

import { Antic_Didone } from "next/font/google";
import { cn } from "../../lib/utils";
import { ArrowBigRight, ArrowRight } from "lucide-react";

const font = Antic_Didone({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-body",
});

export default function Project() {
  const container = useRef(null);
  const pinned = useRef(null);
  const whitespace = useRef(null);
  const title = useRef(null);

  const [currentProject, setCurrentProject] = useState(0);
  const [titleLetters, setTitleLetters] = useState("Selected Project");

  // useGSAP(
  //   () => {
  //     ScrollTrigger.create({
  //       trigger: pinned.current,
  //       start: "top top",
  //       end: "bottom bottom",
  //       endTrigger: whitespace.current,
  //       pin: true,
  //       pinSpacing: false,
  //     });
  //   },
  //   {
  //     scope: container,
  //   },
  // );

  const project = DATA.projects.fullDev[currentProject];

  return (
    <>
      <section
        ref={container}
        id="project"
        className="relative h-full min-h-[200vh] overflow-hidden bg-[hsl(30,4%,9%)]"
      >
        <div className="h-full p-16">
          <div ref={pinned}>
            <div ref={title} className="relative mt-20">
              <h1 className="overflow-hidden text-center font-body text-[10vw] font-bold text-white">
                {splitLetters(titleLetters)}
              </h1>
            </div>
            <div className="mt-36 w-full">
              <div className="mx-auto flex max-w-screen-2xl flex-col">
                {DATA.projects.fullDev.map((project, index) => (
                  <div
                    key={project.title + index}
                    className="group/proj cursor-pointer py-20"
                  >
                    <div
                      className={
                        "flex items-center justify-between gap-16 text-[5vw] text-white transition-all group-hover/proj:px-12"
                      }
                    >
                      <div className="font-bod flex items-center space-x-12 group-hover/proj:text-red-200">
                        <div>0{index + 1}.</div>
                        <div>{project.title}</div>
                      </div>

                      <ArrowRight size={64} />
                    </div>

                    <div className="mt-12 h-2 w-full rounded-full bg-[#444]"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <section
        ref={whitespace}
        style={{
          height: DATA.projects.fullDev.length * 100 + "vh",
        }}
        className="z-[-1] w-full bg-[hsl(30,4%,9%)]"
      ></section> */}
    </>
  );
}

// const bak = () => (
//   <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
//                   <div className="relative aspect-video overflow-hidden rounded-lg shadow-xl">
//                     <div className="h-full w-full">
//                       {DATA.projects.fullDev.map((project, index) => (
//                         <Image
//                           style={{
//                             zIndex: DATA.projects.fullDev.length - index,
//                           }}
//                           id={`project-${index + 1}`}
//                           key={index}
//                           src={project.image}
//                           alt={project.title}
//                           fill
//                           className="object-cover"
//                         />
//                       ))}
//                     </div>
//                   </div>

//                   <div className="flex flex-col space-y-4">
//                     {/* <h2 className="font-body text-4xl font-bold text-white lg:text-7xl">
//                       {project.title}
//                     </h2> */}
//                     <div className="space-y-2">
//                       <div>
//                         <h3 className="font-body text-4xl italic text-[#D9A689]">
//                           description
//                         </h3>
//                       </div>
//                       <p className="text-4xl text-white">
//                         {project.description}
//                       </p>
//                     </div>
//                     <div className="space-y-2">
//                       <div>
//                         <h3 className="font-body text-4xl italic text-[#D9A689]">
//                           stacks
//                         </h3>
//                       </div>
//                       <div className="flex flex-wrap gap-4">
//                         {project.stacks.map((stack, index) => (
//                           <span
//                             key={index}
//                             className="rounded-full bg-[#333] px-4 py-2 text-white"
//                           >
//                             {stack}
//                           </span>
//                         ))}
//                       </div>
//                     </div>
//                     <a
//                       href={project.url}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="flex items-center justify-center rounded-full bg-[#333] px-4 py-2 text-white"
//                     >
//                       Visit Project
//                     </a>
//                   </div>
//                 </div>
// )
