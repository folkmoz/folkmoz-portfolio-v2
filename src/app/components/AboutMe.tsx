import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import AnimatedButton from "./AnimatedButton";
import SectionDescribe from "./SectionDescribe";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";
import { DATA } from "@/data/resume";
import useScreen from "@/app/hooks/useScreen";
import AnimatedText from "@/app/components/AnimatedText";

export default function AboutMe() {
  const pinnedRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const aboutMeRef = useRef<HTMLDivElement>(null);
  const buttonWrapperRef = useRef<HTMLDivElement>(null);

  const whitespaceRef = useRef<HTMLDivElement | null>(null);

  const { isMobile } = useScreen();

  useGSAP(() => {
    const paragraphs = aboutMeRef.current!.querySelectorAll(":scope > div");

    if (!paragraphs) return;

    paragraphs.forEach((paragraph) => {
      const lines = paragraph.querySelectorAll(
        ":scope > div > div:not(.not-italic)",
      );

      if (!lines.length) return;

      const anim = gsap.from(lines, {
        yPercent: 100,
        stagger: 0.05,
        paused: true,
      });

      ScrollTrigger.create({
        trigger: aboutMeRef.current,
        start: "top 70%",
        onEnter: () => anim.play(),
      });

      // # to repeat the animation

      // ScrollTrigger.create({
      //   trigger: aboutMeRef.current,
      //   start: "top bottom",
      //   onLeaveBack: () => {
      //     if (isMobile) return;
      //     anim.pause(0);
      //   },
      // });
    });

    const profileImage = profileRef.current!.querySelector("img");
    // Profile animation
    gsap
      .timeline({
        scrollTrigger: {
          trigger: profileImage,
          start: isMobile ? "top 80%" : "top-=700",
          end: isMobile ? "top center" : "top",
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
  }, [isMobile]);

  return (
    <section
      id="about-me"
      className="relative flex min-h-svh flex-col bg-foreground"
    >
      <div className="px-8 md:px-8 lg:px-16">
        <SectionDescribe title="about me" />

        <div
          ref={pinnedRef}
          className="mt-30 flex w-full grid-cols-5 flex-col items-center justify-items-start gap-8 lg:mt-60 lg:grid lg:h-screen lg:gap-0 lg:overflow-hidden"
        >
          <div
            ref={profileRef}
            className="relative col-span-full h-[400px] w-full overflow-hidden rounded-[16px] md:h-[700px] lg:col-span-2 lg:rounded-[24px]"
          >
            <Image
              src="/images/me.jpg"
              alt={`${DATA.initials}'s avatar`}
              sizes={"(min-width: 1024px) 700px, 100vw"}
              quality={100}
              fill
              priority
              className="w-full max-w-full object-cover brightness-75"
            />
          </div>
          <div className="relative col-span-full flex w-full flex-col justify-center text-lg italic text-white/40 md:text-3xl lg:col-span-3 lg:pl-20 lg:text-2xl xl:text-4xl">
            <div ref={aboutMeRef} className="space-y-4 lg:space-y-8">
              <div>
                <Heading text={"Who am I"} />

                <TextBody
                  words={[
                    "I'm ",
                    ">Folk",
                    ", from",
                    ">Thailand",
                    ", Pathum Thani",
                  ]}
                />
                <TextBody
                  words={["currently studying at ", ">Bangkok University"]}
                />
                <TextBody
                  words={["majoring in ", ">Information Technology (IT)"]}
                />
                <TextBody
                  words={["interested in ", ">Web Development", " and —"]}
                />

                <TextBody
                  words={["I'm fine ", ">thank you", ", sit down please"]}
                />

                <div className="my-8" />
                <TextBody words={["CUM GPA: ", ">3.81", " (2023)"]} />
              </div>

              {/*<div className="translate-y-4">*/}
              {/*  <Heading text={"What I love"} />*/}
              {/*  <TextBody words={["I love ", ">coding", " and —"]} />*/}
              {/*</div>*/}
            </div>
          </div>
        </div>
      </div>

      <div className="flex h-full w-full flex-col gap-16 px-8 pb-20 pt-16 text-white md:gap-40 md:px-20 md:pt-[5vh] lg:pb-[50vh]">
        <div className="flex flex-col justify-between gap-6 xl:flex-row">
          <div className="text-5xl sm:text-6xl md:text-7xl 2xl:text-8xl">
            <h4 className="font-bold leading-[1.2]">
              <AnimatedText words={["Hobby."]} atViewport="top 90%" />
            </h4>
          </div>
          <div className="w-full xl:w-1/2">
            <ul className="list-inside list-disc text-lg md:mt-8 md:text-2xl">
              <ListItem primary={"Listening to music"} />
              <ListItem primary={"Playing games"} />
              <ListItem primary={"Watching movies/series"} />
              <ListItem
                primary={
                  "Working out and trying to maintain a healthy lifestyle"
                }
              />
              <ListItem
                primary={"Exploring new technologies and learning new things"}
              />
            </ul>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-6 xl:flex-row">
          <div className="text-5xl sm:text-6xl md:text-7xl 2xl:text-8xl">
            <h4 className="font-bold leading-[1.2]">
              <AnimatedText words={["Experience."]} atViewport="top 90%" />
            </h4>
          </div>
          <div className="flex flex-col items-start gap-8 md:mt-8 md:flex-row xl:w-1/2 xl:gap-16">
            <div>
              <div className="text-2xl md:text-3xl">
                <h5>
                  <span>Web development</span>
                </h5>
              </div>
              <ul className="mt-2 list-inside list-disc text-lg text-gray-300 md:text-2xl">
                <ListItem primary={"React"} />
                <ListItem primary={"Next.JS"} secondary={"+ Typescript"} />
                <ListItem primary={"Tailwindcss"} />
                <ListItem
                  primary={"Animation"}
                  secondary={"(GSAP, Framer Motion)"}
                />
                <ListItem primary={"Responsive design"} />
              </ul>
            </div>

            <div>
              <div className="text-2xl md:text-3xl">
                <h5>
                  <span>DevOps</span>
                </h5>
              </div>
              <ul className="mt-2 list-inside list-disc text-lg md:text-2xl">
                <ListItem primary={"Git"} secondary={"(GitHub, GitLab)"} />
                <ListItem primary={"Docker"} secondary={"(Compose)"} />
                <ListItem primary={"CI/CD"} secondary={"(GitHub Actions)"} />
                <ListItem primary={"Azure DevOps"} />
                <ListItem primary={"Vercel"} />
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-6 xl:flex-row">
          <div className="text-5xl sm:text-6xl md:text-7xl 2xl:text-8xl">
            <h4 className="font-bold leading-[1.2]">
              <AnimatedText words={["Tools I use."]} atViewport="top 90%" />
            </h4>
          </div>
          <div className="xl:w-1/2">
            <ul className="list-inside list-disc text-lg md:mt-8 md:text-2xl">
              <ListItem primary={"Webstorm"} secondary={"+ Vscode"} />
              <ListItem primary={"Figma"} secondary={"(learning)"} />
              <ListItem primary={"Notion"} />
              <ListItem primary={"Postman"} secondary={"+ Apidog"} />
              <ListItem
                primary={"AI Tools"}
                secondary={"(ChatGPT, Copilot, etc.)"}
              />
            </ul>
          </div>
        </div>
      </div>

      <div
        ref={whitespaceRef}
        className={"relative z-[-1] h-0 w-full bg-foreground"}
      ></div>
    </section>
  );
}

const ListItem = ({
  primary,
  secondary = "",
}: {
  primary: string;
  secondary?: string;
}) => {
  return (
    <li>
      <span>
        {primary}{" "}
        {secondary && <i className="text-sm text-primary">{secondary}</i>}
      </span>
    </li>
  );
};

const Heading = ({ text }: { text: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const title = containerRef.current!.querySelector(":scope > div > span");
      const line = containerRef.current!.querySelector(":scope > span");

      if (!title || !line) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 90%",
          toggleActions: "play none none none",
          once: true,
        },
      });

      tl.from(line, {
        scaleX: 0,
        duration: 0.5,
      }).from(
        title,
        {
          xPercent: 100,
          opacity: 0,
          duration: 0.5,
        },
        "-=0.4",
      );
    },
    {
      scope: containerRef,
    },
  );

  return (
    <div
      ref={containerRef}
      className="mb-4 flex items-center gap-2 text-3xl font-bold lg:mb-8 lg:gap-8 lg:text-4xl xl:mb-6 xl:text-5xl"
    >
      <div className="overflow-hidden not-italic text-white/80">
        <span className="block">{text}</span>
      </div>
      <span className="mt-2 block h-2 flex-1 origin-right rounded-full bg-white/80 lg:mt-4 lg:w-1/3 lg:flex-none"></span>
    </div>
  );
};

const TextBody = React.memo(({ words }: { words: string[] }) => {
  return (
    <div className="w-full overflow-hidden">
      <div className="leading-normal">
        {words.map((word, i) =>
          word.startsWith(">") ? (
            <TextHighlight text={word.slice(1)} key={i} />
          ) : (
            <span key={i}>{word}</span>
          ),
        )}
      </div>
    </div>
  );
});

TextBody.displayName = "TextBody";

const TextHighlight = ({ text }: { text: string }) => {
  return (
    <>
      <span className="font-bold text-slate-200">{text}</span>
    </>
  );
};

const ShowMoreButton = ({ onClick }: { onClick: () => void }) => {
  const buttonWrapperRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <div className="absolute left-0 top-0 mt-14 h-full w-full opacity-80 before:absolute before:bottom-[-1rem] before:left-0 before:right-0 before:z-[1] before:h-1/2 before:bg-gradient-to-t before:from-foreground/80 before:from-60% lg:pl-20"></div>
      <div className={`absolute bottom-0 left-0 right-0 lg:pl-20`}>
        <div
          ref={buttonWrapperRef}
          className="translate-y-[200%] lg:translate-y-[150%]"
        >
          <AnimatedButton text={"Get to know me"} onClick={onClick} />
        </div>
      </div>
    </>
  );
};
