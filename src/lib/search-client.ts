export interface SearchPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  readingTime: number;
}

let cachedIndex: SearchPost[] | null = null;

export async function loadSearchIndex(): Promise<SearchPost[]> {
  if (cachedIndex) return cachedIndex;

  try {
    const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
    const res = await fetch(`${basePath}/data/search-index.json`);
    cachedIndex = await res.json();
    return cachedIndex!;
  } catch {
    return [];
  }
}

export function searchPostsLocal(posts: SearchPost[], query: string): SearchPost[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];

  return posts.filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.excerpt.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q))
  );
}
