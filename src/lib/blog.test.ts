import type { BlogPost } from '@/lib/hashnode'
import { BLOG_POSTS_PER_PAGE, buildBlogPageHref, filterBlogPosts, paginateBlogPosts } from './blog'

const posts: BlogPost[] = [
    {
        title: 'Event-Driven Systems in JavaScript',
        slug: 'event-driven-systems',
        summary: 'A practical guide to event-based architecture.',
        publishedAt: '2025-11-05T17:21:43.513Z',
        originalUrl: 'https://freecodecamp.org/news/event-driven-systems',
        coverImage: null,
        tags: ['JavaScript', 'Architecture'],
        contentHtml: '<p>Content</p>',
        sourceLabel: 'freeCodeCamp'
    },
    {
        title: 'Learning NestJS',
        slug: 'learning-nestjs',
        summary: 'Patterns for scalable Node applications.',
        publishedAt: '2025-06-13T20:13:49.159Z',
        originalUrl: 'https://freecodecamp.org/news/learning-nestjs',
        coverImage: null,
        tags: ['NestJS', 'Node.js'],
        contentHtml: '<p>Content</p>',
        sourceLabel: 'freeCodeCamp'
    }
]

describe('blog helpers', () => {
    it('filters posts across titles, summaries, tags, and source labels', () => {
        expect(filterBlogPosts(posts, 'architecture')).toEqual([posts[0]])
        expect(filterBlogPosts(posts, 'freecodecamp')).toEqual(posts)
        expect(filterBlogPosts(posts, '')).toEqual(posts)
    })

    it('paginates and clamps to a valid page', () => {
        const expandedPosts = Array.from({ length: BLOG_POSTS_PER_PAGE + 1 }, (_, index) => ({
            ...posts[0],
            slug: `post-${index}`,
            title: `Post ${index}`
        }))

        const page = paginateBlogPosts(expandedPosts, 999)

        expect(page.totalPages).toBe(2)
        expect(page.currentPage).toBe(2)
        expect(page.items).toHaveLength(1)
    })

    it('builds canonical blog URLs for pagination and search', () => {
        expect(buildBlogPageHref(1, '')).toBe('/blog')
        expect(buildBlogPageHref(2, '')).toBe('/blog?page=2')
        expect(buildBlogPageHref(1, 'nestjs')).toBe('/blog?q=nestjs')
        expect(buildBlogPageHref(3, 'nestjs')).toBe('/blog?q=nestjs&page=3')
    })
})
