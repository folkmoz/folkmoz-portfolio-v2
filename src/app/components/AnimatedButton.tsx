import React, { forwardRef, useEffect } from "react";
import MagneticButton from "./MagneticButton";

type AnimatedButtonProps = {
  text: string;
  onClick?: () => void;
};

export default function AnimatedButton(props: AnimatedButtonProps) {
  const { text, onClick = () => {} } = props;

  return (
    <MagneticButton>
      <button
        onClick={onClick}
        className="group relative origin-center rounded-full border-2 border-white px-8 py-2 text-lg text-white shadow-lg transition-colors hover:bg-white hover:text-foreground md:text-2xl"
      >
        <span className="absolute left-6 top-1/2 size-2 -translate-y-1/2 rounded-full bg-white transition-all group-hover:bg-foreground"></span>
        <span className="ml-2">{text}</span>
      </button>
    </MagneticButton>
  );
}
