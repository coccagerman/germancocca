import type { BlogPost } from '@/lib/hashnode'

export const BLOG_POSTS_PER_PAGE = 6

export function normalizeBlogQuery(value: string | string[] | undefined) {
    if (Array.isArray(value)) {
        return value[0]?.trim() ?? ''
    }

    return value?.trim() ?? ''
}

export function normalizePageParam(value: string | string[] | undefined) {
    const candidate = Array.isArray(value) ? value[0] : value
    const page = Number(candidate)

    if (!Number.isInteger(page) || page < 1) {
        return 1
    }

    return page
}

export function filterBlogPosts(posts: BlogPost[], query: string) {
    const normalizedQuery = query.trim().toLowerCase()

    if (!normalizedQuery) {
        return posts
    }

    return posts.filter(post => {
        const haystack = [post.title, post.summary, post.tags.join(' '), post.sourceLabel].join(' ').toLowerCase()

        return haystack.includes(normalizedQuery)
    })
}

export function paginateBlogPosts(posts: BlogPost[], page: number, pageSize = BLOG_POSTS_PER_PAGE) {
    const totalPages = Math.max(1, Math.ceil(posts.length / pageSize))
    const currentPage = Math.min(Math.max(page, 1), totalPages)
    const startIndex = (currentPage - 1) * pageSize

    return {
        currentPage,
        totalPages,
        items: posts.slice(startIndex, startIndex + pageSize)
    }
}

export function formatBlogDate(date: string) {
    return new Intl.DateTimeFormat('en', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    }).format(new Date(date))
}

export function buildBlogPageHref(page: number, query: string) {
    const params = new URLSearchParams()

    if (query) {
        params.set('q', query)
    }

    if (page > 1) {
        params.set('page', String(page))
    }

    const queryString = params.toString()

    return queryString ? `/blog?${queryString}` : '/blog'
}
