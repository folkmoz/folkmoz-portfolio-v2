import React from "react";

export default function AnimatedButton({
  href,
  text,
}: {
  href: string;
  text: string;
}) {
  return (
    <button className="group relative rounded-full border-2 border-white px-8 py-2 text-2xl text-white shadow-lg transition-colors hover:bg-white hover:text-foreground">
      <span className="absolute left-6 top-1/2 size-2 -translate-y-1/2 rounded-full bg-white transition-all group-hover:bg-foreground"></span>
      <span className="ml-2">{text}</span>
    </button>
  );
}
