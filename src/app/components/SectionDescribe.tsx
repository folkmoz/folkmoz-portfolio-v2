import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

export default function SectionDescribe({ title }: { title: string }) {
  let lineRef = useRef(null);
  let titleRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: titleRef.current,
        start: "top 90%",
        once: true,
      },
    });

    tl.from(lineRef.current, {
      scaleX: 0,
      duration: 0.2,
      ease: "linear",
    });

    tl.from(titleRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.5,
      ease: "back.out(1.7)",
    });
  }, [titleRef, lineRef]);

  return (
    <div className="relative mb-12 mt-20 flex w-full justify-end text-white lg:mb-20 lg:mt-36">
      <div className="w-full overflow-hidden text-right font-body text-2xl font-bold italic text-white/80 md:text-4xl xl:text-5xl">
        <div ref={titleRef} className="pr-1 leading-normal">
          {title}
        </div>
      </div>
      <div
        ref={lineRef}
        className="absolute -bottom-4 left-0 h-1 w-full origin-left bg-white/60"
      ></div>
    </div>
  );
}
