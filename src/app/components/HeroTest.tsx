import { useRef } from "react";
import { ScrollIndicator } from "@/app/components/ScrollIndicator";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import useScreen from "@/app/hooks/useScreen";

export default function HeroTest() {
  const container = useRef<HTMLDivElement>(null);
  const titleWrapperRef = useRef<HTMLDivElement>(null);

  const { isMobile } = useScreen();

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
        // letter.addEventListener("mouseenter", () => {
        //   gsap.to(letter, {
        //     ...letterAnim,
        //     duration: 0.01,
        //   });
        // });
        //
        // letter.addEventListener("mouseleave", () => {
        //   gsap.to(letter, {
        //     x: 0,
        //     y: 0,
        //     textShadow:
        //       "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",
        //     duration: 0.01,
        //   });
        // });
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

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#introduce",
        start: "top 80%",
        end: "top 10%",
        scrub: true,
      },
    });

    tl.to(container.current, {
      opacity: 0,
      duration: 1,
      ease: "expo.inOut",
    }).to(
      titleWrapperRef.current,
      {
        y: -100,
        duration: 1,
        ease: "expo.inOut",
      },
      "<",
    );
  }, [isMobile]);

  return (
    <>
      <section
        id="home"
        ref={container}
        className="sticky top-0 grid min-h-[calc(100svh-50px)] place-items-center bg-[#f5f8fa]"
      >
        <div className="flex h-full w-full flex-col items-center justify-center">
          <div
            ref={titleWrapperRef}
            className="select-none space-x-2 font-heading text-[16vw] font-bold leading-none"
          >
            {"FOLKMOZ".split("").map((letter, index) => (
              <span key={index} className="strokeme inline-block">
                {letter}
              </span>
            ))}
          </div>
          <div>
            <p className="font-body text-xl lg:text-3xl">
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
