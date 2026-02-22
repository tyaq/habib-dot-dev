export type Project = {
  title: string;
  description: string;
  url: string;
  tags?: string[];
};

export const projects: Project[] = [
  {
    title: "Sticker Dream",
    description: "Turn any image into a sticker",
    url: "https://aaqibhabib.github.io/sticker-dream/",
    tags: ["web app"],
  },
];
