import Image from "next/image";
import React, { useRef } from "react";
import AnimatedButton from "./AnimatedButton";
import SectionDescribe from "./SectionDescribe";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { DATA } from "@/data/resume";

export default function AboutMe() {
  const profileRef = useRef<HTMLDivElement | null>(null);
  const aboutMeRef = useRef<HTMLDivElement | null>(null);

  const age = new Date().getFullYear() - DATA.personal.bod.getFullYear();

  useGSAP(() => {
    const textAboutMeLines = aboutMeRef.current!.querySelectorAll("div > div");
    gsap.from(textAboutMeLines, {
      yPercent: 100,
      stagger: 0.05,
      scrollTrigger: {
        trigger: aboutMeRef.current,
        start: "top 75%",
        toggleActions: "play none none none",
        once: true,
      },
    });

    const profileImage = profileRef.current!.querySelector("img");
    // Profile animation
    gsap
      .timeline({
        scrollTrigger: {
          trigger: profileImage,
          start: "top-=700",
          end: "top",
          toggleActions: "play none none none",
          once: true,
          scrub: 1,
        },
      })
      .fromTo(
        profileImage,
        {
          scale: 1.5,
          clipPath: "inset(0% 0% 100% 0%)",
        },
        {
          scale: 1,
          clipPath: "inset(0% 0% 0% 0%)",
          ease: "none",
          duration: 1,
        },
      );
  }, []);

  return (
    <section
      id="about-me"
      className="relative flex min-h-screen flex-col bg-foreground pb-[20vh]"
    >
      <div className="p-16">
        <SectionDescribe title="about me" />

        <div className="mt-60 grid w-full grid-cols-5 items-end justify-items-start">
          <div
            ref={profileRef}
            className="relative col-span-2 w-full overflow-hidden rounded-[16px]"
          >
            <Image
              src="/images/me.jpg"
              alt={`${DATA.initials}'s avatar`}
              width={700}
              height={700}
              quality={100}
              priority
              className="w-full max-w-full brightness-75"
            />
          </div>
          <div
            ref={aboutMeRef}
            className="col-span-full flex flex-col justify-center text-[5vw] italic text-white/40 md:text-3xl lg:col-span-3 lg:ml-20 lg:text-4xl xl:text-5xl"
          >
            <div className="overflow-hidden">
              <div className="leading-normal">
                I&apos;m <span className="font-bold text-slate-200">Folk</span>,
                from Thailand
              </div>
            </div>
            <div className="overflow-hidden">
              <div className="leading-normal">
                currently{" "}
                <span className="font-bold text-slate-200">{age}</span> years
                old,
              </div>
            </div>
            <div className="overflow-hidden">
              <div className="leading-normal">
                <span className="font-bold text-slate-200">coffee</span> addict,
                and —{" "}
              </div>
            </div>
            <div className="overflow-hidden">
              <div className="leading-normal">
                I&apos;m fine{" "}
                <span className="font-bold text-slate-200">thank you</span> sit
                down
              </div>
            </div>
            <div className="pt-8">
              <AnimatedButton href="/#projects" text="Get in Touch" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
