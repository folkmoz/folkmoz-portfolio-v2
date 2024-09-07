import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

export default function Project() {
  const container = useRef(null);

  useGSAP(
    () => {
      gsap.to(container.current, {
        scale: 1,
        borderRadius: "0",
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%",
          end: "bottom center",
          scrub: 1,
        },
      });
    },
    {
      scope: container,
    },
  );

  return (
    <section
      id="project"
      ref={container}
      style={{ scale: 0.95, borderRadius: "2rem" }}
      className="relative min-h-[200vh] bg-[#fff8e0]"
    >
      <div className="p-16">
        <div>
          <h1 className="text-[5vw]">Selected Projects</h1>
        </div>
      </div>
    </section>
  );
}
