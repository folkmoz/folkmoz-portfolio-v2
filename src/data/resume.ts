export const DATA = {
  name: "folkmoz",
  personal: {
    bod: new Date("2002-05-19"),
    email: "jiran.folk@gmail.com",
    phone: "+6697-347-7811",
    location: "Pathum Thani, Thailand",
    socials: {
      ig: "folk_moz",
      linkedin: "jiran-folk",
      github: "https://www.github.com/folkmoz",
    },
  },
  initials: "JK",
  url: "https://folkmoz.me",
  description:
    "I’m passionate about\nbuilding stuff and using\nprogramming to solve\nthe problems.",
  summary:
    "At the end of 2022, I quit my job as a software engineer to go fulltime into building and scaling my own SaaS businesses. In the past, [I pursued a double degree in computer science and business](/#education), [interned at big tech companies in Silicon Valley](https://www.youtube.com/watch?v=d-LJ2e5qKdE), and [competed in over 21 hackathons for fun](/#hackathons). I also had the pleasure of being a part of the first ever in-person cohort of buildspace called [buildspace sf1](https://buildspace.so/sf1).",
  avatarUrl: "/me.jpeg",
  skills: [
    "React",
    "Next.js",
    "Typescript",
    "Node.js",
    "Swift(UI)",
    "MySQL",
    "Postgres",
    "Docker",
  ],
  projects: {
    fullDev: [
      {
        title: "Roommatch",
        description:
          "A platform for finding a room or dormitory near the university. It allows users to search for available rooms, view detailed information about each listing, and contact landlords directly through the platform. The project aims to simplify the process of finding accommodation for students and university staff.",
        url: "https://roommatch.vercel.app",
        image: "/images/projects/roommatch.png",
        stacks: [
          "Next.js",
          "Typescript",
          "Tailwind CSS",
          "Framer Motion",
          "MySQL",
          "Prisma",
          "Zustand",
          "NextAuth.js",
          "Vercel",
          "Google Maps API",
          "Cloudinary",
        ],
      },
      {
        title: "AI Chat",
        description:
          "A chatbot that uses Google Gemini as a backend to generate responses. It leverages advanced natural language processing to provide accurate and context-aware replies. The chatbot is designed to assist users with various queries, offering a seamless conversational experience. It includes features like sentiment analysis, multi-turn conversations, and integration with external APIs for enhanced functionality.",
        url: "https://ai.folkmoz.me",
        image: "/images/projects/aichat.png",
        stacks: [
          "Next.js",
          "Typescript",
          "Tailwind CSS",
          "MySQL (for storing chat history)",
          "Drizzle",
          "Google AI (Gemini)",
        ],
      },
      {
        title: "TalkTrek",
        description:
          "A web board for discussing, inspired by Pantip, a popular Thai discussion webapp similar to Reddit. I recreated the look and feel of Pantip for educational purposes, copying the idea and redesign them.",
        url: "",
        image: "/images/projects/talktrek.png",
        stacks: [
          "Next.js",
          "Typescript",
          "NextAuth.js",
          "Google Login",
          "Tailwind CSS",
          "MySQL",
          "Redis",
          "Drizzle",
          "Azure App Service",
          "Azure API Management",
          "Websockets (for real-time notifications)",
        ],
      },
      {
        title: "Search countries",
        description:
          "A website that shows the countries of the world and their details. (course project)",
        url: "https://search-countries-folkmoz.vercel.app/",
        image: "/images/projects/searchcountries.png",
        stacks: [
          "Next.js",
          "Typescript",
          "Tailwind CSS",
          "MySQL",
          "Redis",
          "Drizzle",
          "Azure App Service",
          "Azure API Management",
        ],
      },
    ],
  },
};
