import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { site } from '~/data/site';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = await getCollection('blog', ({ data }) => data.lang === 'fr' && !data.draft);
  posts.sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());

  return rss({
    title: `${site.name} — Blog`,
    description: 'Notes techniques et retours d\'expérience.',
    site: context.site ?? site.url,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/blog/${post.id.replace(/^fr\//, '')}/`,
      categories: post.data.tags,
    })),
    customData: '<language>fr-FR</language>',
  });
}
