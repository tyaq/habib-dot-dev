import type { Project } from "../data/projects";

function getFaviconUrl(url: string): string {
  try {
    const domain = new URL(url).hostname;
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=32`;
  } catch {
    return "";
  }
}

export function ProjectCard({ title, description, url, tags }: Project) {
  const faviconUrl = getFaviconUrl(url);

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block rounded-xl bg-surface border border-border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-accent-purple/5 hover:border-accent-purple/30"
    >
      <div className="flex items-center gap-3 mb-3">
        <img
          src={faviconUrl}
          alt=""
          width={20}
          height={20}
          className="rounded-sm"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
        <h2 className="text-lg font-semibold text-white">{title}</h2>
      </div>
      <p className="text-sm text-[#a0a0a0] leading-relaxed">{description}</p>
      {tags && tags.length > 0 && (
        <div className="flex gap-2 mt-4">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-[#808080]"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </a>
  );
}
