import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

export function ScrollIndicator() {
  const svgRef = useRef(null);

  useGSAP(
    () => {
      gsap.to(svgRef.current, {
        rotation: 360,
        repeat: -1,
        duration: 10,
        ease: "linear",
        transformOrigin: "center center",
      });
    },
    { scope: svgRef },
  );

  return (
    <svg
      ref={svgRef}
      width="200"
      height="200"
      viewBox="0 0 200 200"
      className="relative overflow-visible"
    >
      <defs>
        <path
          id="circlePath"
          d="M 100, 100
               m -75, 0
               a 75,75 0 1,1 150,0
               a 75,75 0 1,1 -150,0"
        />
      </defs>
      <text className="font-body text-black">
        <textPath href="#circlePath" className="fill-current">
          SCROLL SCROLL SCROLL SCROLL SCROLL SCROLL SCROLL SCROLL
        </textPath>
      </text>
    </svg>
  );
}
