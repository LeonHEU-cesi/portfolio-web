import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { site } from '~/data/site';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = await getCollection('blog', ({ data }) => data.lang === 'en' && !data.draft);
  posts.sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());

  return rss({
    title: `${site.name} — Blog`,
    description: 'Technical notes and experience reports.',
    site: context.site ?? site.url,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/en/blog/${post.id.replace(/^en\//, '')}/`,
      categories: post.data.tags,
    })),
    customData: '<language>en-US</language>',
  });
}
