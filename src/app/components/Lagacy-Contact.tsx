import { gsap } from "gsap";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import AnimatedText from "./AnimatedText";

export default function LegacyContact() {
  return (
    <>
      <section
        className="relative z-10 h-[800px] bg-white lg:h-[100svh]"
        style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
      >
        <div className="relative -top-[100vh] h-[calc(100svh+800px)] lg:h-[200svh]">
          <div className="sticky top-0 flex h-[800px] lg:h-[100svh]">
            <div className="h-[800px] w-full overflow-hidden bg-white px-4 pt-20 md:px-10 md:py-[5vh] lg:h-[100svh]">
              <div className="flex h-full flex-col justify-end lg:justify-center">
                <div className="text-5xl font-bold md:text-8xl 2xl:text-9xl">
                  <h3 className="text-foreground">
                    <AnimatedText
                      words={["Contacts."]}
                      atViewport="start 80%"
                    />
                  </h3>
                </div>
                <div className="mt-8 flex flex-col divide-y-2 divide-foreground border-y-2 border-foreground md:flex-1">
                  <ContactItem
                    title={"Phone"}
                    account={"097-347-7811"}
                    subtitle={"for contact"}
                    href="tel:+66973477811"
                  />
                  <ContactItem
                    title={"Email"}
                    account={"jiran.folk"}
                    subtitle={"for work"}
                    href="mailto:jiran.folk@gmail.com"
                  />
                  <ContactItem
                    title={"GitHub"}
                    account={"folkmoz"}
                    href="https://www.github.com/folkmoz"
                  />
                  <ContactItem
                    title={"LinkedIn"}
                    account={"jirantanapat"}
                    href="https://www.linkedin.com/in/jirantanapat/"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

type ContactItemProps = {
  title: string;
  subtitle?: string;
  account: string;
  bg?: string;
  href: string;
};

const ContactItem = ({ title, account, subtitle, href }: ContactItemProps) => {
  const clipRef = useRef<HTMLDivElement | null>(null);

  const { contextSafe } = useGSAP();

  const onHover = contextSafe((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = clipRef.current!.getBoundingClientRect();
    const y = e.clientY - rect.top;
    const top = y < rect.height / 2;

    // gsap.set(clipRef.current, {
    // clipPath: top ? "inset(0% 0% 100% 0%)" : "inset(100% 0% 0% 0%)",
    // });
    // gsap.to(clipRef.current, {
    //   clipPath: "inset(0 0 0 0)",
    //   duration: 0.1,
    // });

    clipRef.current!.style.clipPath = "inset(0% 0% 0% 0%)";
  });

  const onLeave = contextSafe((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = clipRef.current!.getBoundingClientRect();
    const y = e.clientY - rect.top;
    const bottom = y > rect.height / 2;

    // gsap
    //   .timeline()
    //   .to(clipRef.current, {
    //     clipPath: "inset(0% 0% 0% 0%)",
    //     duration: 0.3,
    //   })
    //   .to(clipRef.current, {
    //     // clipPath: bottom ? "inset(100% 0% 0% 0%)" : "inset(0% 0% 100% 0%)",
    //     clipPath: "inset(100% 0%)",
    //     duration: 0.3,
    //   });
    clipRef.current!.style.clipPath = "inset(100% 0%)";
  });

  return (
    <a href={href} target="_blank" className="group relative md:flex-1">
      <div
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
        data-cursor="link"
        className="h-full py-6 md:py-0"
      >
        <div className="flex h-full items-center justify-between px-4">
          <div className="flex items-end text-4xl text-foreground/30 sm:text-5xl md:text-8xl xl:text-[6vw]">
            <h4>{title}</h4>
            {subtitle && (
              <span className="hidden text-2xl italic sm:block md:text-4xl">
                — {subtitle}
              </span>
            )}
          </div>

          <div className="mr-4 md:mr-12">
            <svg
              className="size-8 md:size-[64px]"
              viewBox="0 0 26 23"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.326857 22.1997C0.555793 22.4717 0.883413 22.6416 1.23764 22.6721C1.59187 22.7025 1.9437 22.591 2.21572 22.3621L22.3042 5.4554L21.607 13.5624C21.583 13.9131 21.6976 14.2592 21.9263 14.5261C22.155 14.7931 22.4793 14.9595 22.8295 14.9897C23.1797 15.0198 23.5278 14.9111 23.7987 14.6871C24.0696 14.4632 24.2416 14.1417 24.2778 13.7921L25.2526 2.45893C25.268 2.2847 25.2489 2.10912 25.1963 1.9423C25.1438 1.77548 25.0587 1.6207 24.9461 1.48686L24.9426 1.48276C24.8304 1.34942 24.6915 1.23853 24.5329 1.15829C24.3771 1.07697 24.2067 1.02739 24.0317 1.01243L12.6985 0.0377126C12.3478 0.0136832 12.0017 0.128349 11.7348 0.357015C11.4678 0.585681 11.3013 0.910051 11.2712 1.26026C11.2411 1.61047 11.3497 1.9585 11.5737 2.22939C11.7977 2.50028 12.1191 2.67236 12.4688 2.70856L20.5778 3.40408L0.48931 20.3108C0.217289 20.5397 0.047354 20.8674 0.0168882 21.2216C-0.0135776 21.5758 0.0979214 21.9276 0.326857 22.1997Z"
                fill="none"
                className="fill-secondary"
              />
            </svg>
          </div>
        </div>
        <div
          style={{
            clipPath: "inset(100% 0)",
            transition: "all cubic-bezier(.1,.5,.5,1) 0.5s",
          }}
          ref={clipRef}
          className="absolute inset-0 flex items-center gap-20 bg-foreground text-2xl font-bold text-white transition-all duration-300 md:text-4xl xl:text-8xl"
        >
          <div className="absolute inset-0 z-[5] flex h-full items-center justify-between">
            <div className="flex h-full w-max items-center bg-gradient-to-r from-foreground from-80% to-transparent pl-4 pr-20 font-normal text-white md:pr-44">
              <h4 className="text-4xl sm:text-5xl md:text-8xl xl:text-[6vw]">
                {title}
              </h4>
            </div>

            <div className="flex h-full items-center bg-gradient-to-l from-foreground from-80% to-transparent px-8 md:px-16">
              <div>
                <svg
                  className="size-8 md:size-[64px]"
                  viewBox="0 0 26 23"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.326857 22.1997C0.555793 22.4717 0.883413 22.6416 1.23764 22.6721C1.59187 22.7025 1.9437 22.591 2.21572 22.3621L22.3042 5.4554L21.607 13.5624C21.583 13.9131 21.6976 14.2592 21.9263 14.5261C22.155 14.7931 22.4793 14.9595 22.8295 14.9897C23.1797 15.0198 23.5278 14.9111 23.7987 14.6871C24.0696 14.4632 24.2416 14.1417 24.2778 13.7921L25.2526 2.45893C25.268 2.2847 25.2489 2.10912 25.1963 1.9423C25.1438 1.77548 25.0587 1.6207 24.9461 1.48686L24.9426 1.48276C24.8304 1.34942 24.6915 1.23853 24.5329 1.15829C24.3771 1.07697 24.2067 1.02739 24.0317 1.01243L12.6985 0.0377126C12.3478 0.0136832 12.0017 0.128349 11.7348 0.357015C11.4678 0.585681 11.3013 0.910051 11.2712 1.26026C11.2411 1.61047 11.3497 1.9585 11.5737 2.22939C11.7977 2.50028 12.1191 2.67236 12.4688 2.70856L20.5778 3.40408L0.48931 20.3108C0.217289 20.5397 0.047354 20.8674 0.0168882 21.2216C-0.0135776 21.5758 0.0979214 21.9276 0.326857 22.1997Z"
                    fill="none"
                    className="fill-white"
                  />
                </svg>
              </div>
            </div>
            {/*<div className="from-brown h-full w-40 bg-gradient-to-r from-80% to-transparent"></div>*/}
          </div>
          <MarqueeText text={account} />
          <MarqueeText text={account} />
        </div>
      </div>
    </a>
  );
};

const MarqueeText = ({ text }: { text: string }) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      gsap.to(ref.current, {
        x: -(ref.current!.offsetWidth + 80),
        duration: 10,
        repeat: -1,
        ease: "linear",
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className="flex gap-20 font-medium italic text-primary">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="whitespace-nowrap">
          {text}
        </div>
      ))}
    </div>
  );
};
