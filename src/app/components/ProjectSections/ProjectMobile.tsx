import SectionDescribe from "@/app/components/SectionDescribe";
import React from "react";

export default function ProjectMobile() {
  return (
    <section className="relative -mb-1 flex h-svh flex-col bg-foreground pb-[20vh]">
      <div className="px-4 md:px-8 lg:px-16">
        <SectionDescribe title="selected works" />
      </div>
    </section>
  );
}
