"use client";

import BlurFade from "@/components/magicui/blur-fade";
import Image from "next/image";
import { DATA } from "@/data/resume";
import { motion } from "framer-motion";
import ScrollDownUI from "@/components/ScrollDownUI";

const BLUR_FADE_DELAY = 0.25;

export default function Home() {
  return (
    <main className="bg-background text-foreground py-12 px-4 sm:px-6 lg:px-8">
      <Introduce />
    </main>
  );
}

function Introduce() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center">
      <div className="max-w-3xl w-full">
        <div className="text-center mb-12">
          <div>
            <BlurFade
              delay={BLUR_FADE_DELAY + 0.3}
              className="flex justify-center"
            >
              <div className="size-[150px] relative">
                <Image
                  src={`/images${DATA.avatarUrl}`}
                  alt={`${DATA.initials}'s avatar`}
                  fill
                  priority
                  sizes="(max-width: 640px) 100px, 150px"
                  className="rounded-full object-cover object-[center_top] sepia-[0.6]"
                />
              </div>
            </BlurFade>
          </div>
          <div className="grid place-content-center my-4">
            <motion.div
              initial={{ scaleY: 0.05 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="h-[100px] w-1 bg-primary-foreground/50 rounded-full origin-bottom"
            />
          </div>
          <BlurFade delay={BLUR_FADE_DELAY + 0.6}>
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              Hello, {DATA.name}! 👋🏼
            </h1>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY + 0.7}>
            <p className="mt-3 text-lg text-muted-foreground sm:mt-5 sm:text-xl lg:text-2xl">
              {DATA.description}
            </p>
          </BlurFade>
        </div>
        <div className="flex justify-center">
          <ScrollDownUI />
        </div>
      </div>
    </section>
  );
}
