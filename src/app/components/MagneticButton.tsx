import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function MagneticButton({
  children,
}: {
  children: React.ReactElement;
}) {
  const magnetic = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!magnetic.current) return;

    const xTo = gsap.quickTo(magnetic.current, "x", {
      duration: 1,
      ease: "elastic.out(1, 0.3)",
    });
    const yTo = gsap.quickTo(magnetic.current, "y", {
      duration: 1,
      ease: "elastic.out(1, 0.3)",
    });

    magnetic.current.addEventListener("mousemove", (e) => {
      const { clientX, clientY } = e;
      const { height, width, left, top } =
        magnetic.current!.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      xTo(x);
      yTo(y);
    });

    magnetic.current.addEventListener("mousedown", (e) => {
      gsap.to(magnetic.current, {
        scale: 0.95,
        duration: 0.3,
        ease: "power3.out",
      });
    });

    magnetic.current.addEventListener("mouseup", (e) => {
      gsap.to(magnetic.current, {
        scale: 1,
        duration: 0.3,
        ease: "power3.out",
      });
    });

    magnetic.current.addEventListener("mouseleave", (e) => {
      xTo(0);
      yTo(0);
    });
  }, []);

  return React.cloneElement(children, { ref: magnetic });
}
