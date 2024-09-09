import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import GradientCanvas from "./GredientBackground";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const container = useRef(null);
  const scrollIndicator = useRef(null);

  useGSAP(
    () => {
      // Hero animation

      //exit animation
      gsap.to("h1.font-heading", {
        scale: 3,
        y: -300,
        opacity: 0.2,
        letterSpacing: "3rem",
        ease: "power3.inOut",
        scrollTrigger: {
          trigger: "#project",
          start: "top bottom",
          end: "top 20%",
          scrub: 1,
        },
      });

      // Scroll indicator animation
      gsap.to(scrollIndicator.current, {
        y: 10,
        duration: 0.5,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    },
    {
      //   scope: container,
    },
  );

  return (
    <section
      id="hero"
      ref={container}
      className="sticky top-0 grid min-h-screen place-items-center overflow-hidden bg-[#0B1215] text-white"
    >
      {/* <GradientCanvas /> */}
      <div>
        <div className="flex flex-col items-center text-white">
          <h1 className="select-none font-heading text-[14vw]">FOLKMOZ</h1>
          <p className="font-body text-[3vw] text-white opacity-50 lg:-mt-12 lg:text-[2vw]">
            Do be do be doo. - Scooby-Doo
          </p>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicator}
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 transform flex-col items-center"
      >
        <span className="mb-2">Scroll</span>
        <ArrowRight className="h-6 w-6 rotate-90 transform" />
      </div>
    </section>
  );
}
