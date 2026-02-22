export type Project = {
  title: string;
  description: string;
  url: string;
  tags?: string[];
};

export const projects: Project[] = [
  {
    title: "Example Project",
    description: "A short description of what this does",
    url: "https://github.com/ihabib/example",
    tags: ["open source"],
  },
  {
    title: "Another Project",
    description: "Another one-liner about the project",
    url: "https://youtube.com/@habib",
    tags: ["video"],
  },
  {
    title: "iOS App",
    description: "A cool app on the App Store",
    url: "https://apps.apple.com/app/example",
    tags: ["mobile"],
  },
];
