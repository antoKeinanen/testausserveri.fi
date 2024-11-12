// app/rss/route.js
import posts from '@/utils/posts';
import { NextResponse } from 'next/server';
import escape from 'escape-html';

export const dynamicParams = false;
export const dynamic = 'force-static';

export const GET = async () => {
    const { posts: list } = await posts.list();

    /*
    const data = await Promise.allSettled(list.map(async (item) => {
        const filepath = path.join(process.cwd(), 'posts', item.slug, 'post.mdx');
        const raw = await fs.readFile(filepath, 'utf-8');
        const { content } = await compileMDX<PostDetails>({
            source: raw,
            options: { parseFrontmatter: true, mdxOptions: {remarkPlugins: [remarkGfm]} },
            components: mdxComponents(item.slug)
        })
        return { item, content };
    }))

    const allPosts = data
        .filter(result => result.status === 'fulfilled')
        .map(result => result.value);
    */

    const feed = `<?xml version="1.0" encoding="UTF-8" ?>
    <rss version="2.0" xmlns:media="http://search.yahoo.com/mrss/">
        <channel>
        <title>Testausserveri Syslog</title>
        <link>https://testausserveri.fi/syslog</link>
        ${list.map(post => (`
        <item>
            <title>${escape(post.title)}</title>
            <link>https://testausserveri.fi/syslog/${post.slug}</link>
            <description>${escape(post.excerpt)}</description>
            <author>${escape((post.authorsResolved || []).map(member => member.name).join("; "))}</author>
            <category>${escape(post.category)}</category>
            <pubDate>${escape(post.datetime.toString())}</pubDate>
            <guid>${post.slug}</guid>
            <media:content url="${post.imageUrl}" />
        </item>`
        )).join('')}
        </channel>
    </rss>`;

    return new NextResponse(feed, {
        headers: {
        'Content-Type': 'application/xml',
        },
    });
};
