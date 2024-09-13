import { useRef } from "react";
import useScreen from "@/app/hooks/useScreen";
import { gsap } from "gsap";

export default function Contact() {
  return (
    <section
      className="relative z-10 h-screen bg-white"
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
    >
      <div className="relative -top-[100vh] h-[200vh]">
        <div className="sticky top-0 h-screen">
          <div className="flex h-full w-full flex-col items-center justify-center divide-y p-4 font-body font-bold lg:items-start lg:p-16">
            <div>
              <h1 className="font-body text-5xl font-bold">
                Let&apos;s <span className="text-[#8C2029]">connect</span>
              </h1>
            </div>
            <a
              href="mailto:jiran.folk@gmail.com"
              target="_blank"
              className="lg:w-full"
            >
              <Channel channelName={"Email"} value={"Jiran.folk@gmail.com"} />
            </a>
            <a
              href="https://github.com/folkmoz"
              target="_blank"
              className="lg:w-full"
            >
              <Channel channelName={"GitHub"} value={"github.com/folkmoz"} />
            </a>
            <a
              href="https://www.linkedin.com/in/jiran-folk/"
              target="_blank"
              className="lg:w-full"
            >
              <Channel
                channelName={"LinkedIn"}
                value={"linkedin.com/in/jirantanapat"}
              />
            </a>
            <Channel channelName={"Phone"} value={"+6697-347-7811"} />
          </div>

          <div className="pointer-events-none absolute bottom-0 left-0 right-0">
            <div className="flex justify-center">
              <div>
                made with{" "}
                <span role="img" aria-label="heart">
                  ❤️
                </span>{" "}
                by folkmoz
              </div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const Channel = ({
  channelName,
  value,
}: {
  channelName: string;
  value: string;
}) => {
  const containerRef = useRef(null);
  const { isMobile } = useScreen();

  const onMouseEnter = () => {
    if (isMobile) return;
    gsap.to(containerRef.current, {
      duration: 0.4,
      rotateX: "90deg",
      ease: "power3.inOut",
    });
  };

  const onMouseLeave = () => {
    if (isMobile) return;
    gsap.to(containerRef.current, {
      duration: 0.4,
      rotateX: "0deg",
      ease: "power4.inOut",
    });
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        transformStyle: "preserve-3d",
      }}
      className="group relative cursor-pointer py-3 text-5xl lg:w-full lg:text-[6vw] lg:leading-[6vw]"
    >
      <div className="skew-x-6 text-foreground/20 transition-all lg:group-hover:opacity-0">
        {channelName}
      </div>
      <div
        style={{
          transform: "rotateX(-90deg) skewX(6deg) translateY(3.5vw)",
          transformOrigin: "center bottom",
        }}
        className="absolute top-0 w-full items-center justify-between text-foreground transition-all delay-75 group-hover:opacity-100"
      >
        {value}
      </div>
    </div>
  );
};
