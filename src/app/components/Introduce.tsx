import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef, useEffect } from "react";
import { splitLetters } from "../helpers/splitText";
import { DATA } from "@/data/resume";
import AnimatedButton from "./AnimatedButton";
import SectionDescribe from "./SectionDescribe";

export default function Introduce() {
  const container = useRef(null);
  const intro = useRef(null);
  const profileRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const profileImage = profileRef.current!.querySelector("img");
      // Profile animation
      gsap
        .timeline({
          scrollTrigger: {
            trigger: profileImage,
            start: "top bottom",
            end: "bottom 70%",
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
            ease: "power4.inOut",
            duration: 1,
          },
        );

      gsap.to(container.current, {
        scale: 1,
        borderTopLeftRadius: "12px",
        borderTopRightRadius: "12px",
        scrollTrigger: {
          trigger: container.current,
          start: "top bottom",
          end: "top 20%",
          scrub: 1,
        },
      });

      const lines = document.querySelectorAll(".line");

      lines.forEach((line, index) => {
        const letters = line.querySelectorAll("span");

        gsap.to(letters, {
          opacity: 1,
          fontStyle: "normal",
          fontWeight: "700",
          stagger: 0.1,
          ease: "none",
          scrollTrigger: {
            trigger: container.current,
            start: `top 60%-=${index * 100}`,
            end: `+=${window.innerHeight / 2 - index * 10}`,
            scrub: 1,
          },
        });
      });
    },
    {
      scope: container,
    },
  );

  return (
    <section
      id="introduce"
      ref={container}
      style={{ scale: 0.95 }}
      className="relative flex min-h-screen flex-col rounded-t-[2rem] bg-foreground pb-[40vh]"
    >
      <div className="mx-auto w-full px-10 py-16 pt-[300px] md:px-16 lg:px-32">
        <div
          ref={intro}
          className="font-body text-[5vw] text-white xl:text-[80px]"
        >
          {DATA.description.split("\n").map((line, index) => (
            <div key={index} className="line lg:-mb-4">
              {splitLetters(line, "opacity-20 ")}
            </div>
          ))}
        </div>
        <SectionDescribe title="about me" />

        <div className="mt-60 grid w-full grid-cols-5 items-end justify-items-start">
          <div
            ref={profileRef}
            className="relative col-span-2 w-full overflow-hidden rounded-[16px] shadow-xl"
          >
            <Image
              src="/images/me.jpg"
              alt={`${DATA.initials}'s avatar`}
              width={700}
              height={700}
              quality={100}
              priority
              className="w-full max-w-full"
            />
          </div>
          <div className="col-span-full flex flex-col justify-center text-[5vw] italic text-white/40 md:text-3xl lg:col-span-3 lg:ml-20 lg:space-y-4 lg:text-4xl xl:text-5xl">
            <p>
              I&apos;m <span className="text-[#D98841]">Folk</span>, from
              Thailand
            </p>
            <p>currently 22 years old,</p>
            <p>coffee addict, and — </p>
            <p>I&apos;m fine thank you sit down</p>
            <div className="pt-8">
              <AnimatedButton href="/#projects" text="Get in Touch" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
