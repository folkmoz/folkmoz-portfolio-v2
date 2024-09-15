export default function ProjectMobile() {
  return (
    <section className="relative -mb-1 flex h-[50svh] flex-col rounded-t-[2rem] bg-foreground lg:min-h-screen lg:scale-[0.95] lg:pb-[20vh]">
      <div className="flex h-full flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-center text-2xl font-bold text-primary">
            My Projects
          </h2>
          <p className="text-center text-sm text-secondary">
            Here are some of my projects that I have worked on.
          </p>
        </div>
      </div>
    </section>
  );
}
