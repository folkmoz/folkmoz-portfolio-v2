import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { SplitText } from "../helpers/gsapSplitText";

export default function RevealText({
  children,
}: {
  children: React.ReactElement<any>;
}) {
  const textWrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      //@ts-ignore
      const splitText = new SplitText(textWrapperRef.current, {
        type: "lines",
        linesClass: "line",
      });

      gsap.from(splitText.lines, {
        duration: 1,
        y: 200,
        ease: "power4.out",
        stagger: 0.1,
      });
    },
    {
      scope: textWrapperRef,
    },
  );

  return <div ref={textWrapperRef}>{children}</div>;
}
