import { useRef } from "react";
import { ScrollIndicator } from "@/app/components/ScrollIndicator";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

export default function HeroTest() {
  const container = useRef<HTMLDivElement>(null);
  const titleWrapperRef = useRef<HTMLDivElement>(null);

  const letterAnim = {
    textShadow:
      "-10px 7px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",
    x: 10,
    y: -10,
  };

  useGSAP(() => {
    const titleLetters = titleWrapperRef.current?.querySelectorAll(".strokeme");

    if (titleLetters) {
      titleLetters.forEach((letter) => {
        letter.addEventListener("mouseenter", () => {
          gsap.to(letter, {
            ...letterAnim,
            duration: 0.1,
            ease: "expo",
          });
        });

        letter.addEventListener("mouseleave", () => {
          gsap.to(letter, {
            x: 0,
            y: 0,
            textShadow:
              "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",
            duration: 0.1,
            ease: "expo",
          });
        });
      });

      gsap.to(titleLetters, {
        ...letterAnim,
        stagger: 0.1,
        ease: "expo.inOut",
        scrollTrigger: {
          trigger: "#introduce",
          start: "top bottom",
          end: "top 65%",
          scrub: true,
        },
      });
    }
  }, []);

  return (
    <>
      <section
        id="hero"
        ref={container}
        className="sticky top-0 grid min-h-[calc(100vh-50px)] place-items-center bg-[#f5f8fa]"
      >
        <div className="flex h-full w-full flex-col items-center justify-center">
          <div
            ref={titleWrapperRef}
            className="select-none space-x-2 font-heading text-[16vw] font-bold"
          >
            {"FOLKMOZ".split("").map((letter, index) => (
              <span key={index} className="strokeme inline-block">
                {letter}
              </span>
            ))}
          </div>
          <div>
            <p className="font-body text-3xl">
              Curious developer, Hard worker, Sleepless
            </p>
          </div>
        </div>

        <div className="absolute -bottom-28 left-1/2 flex -translate-x-1/2 transform flex-col items-center font-body text-black">
          <ScrollIndicator />
        </div>
      </section>
    </>
  );
}
