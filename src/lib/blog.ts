import type { BlogPost } from '@/lib/hashnode'

export const BLOG_POSTS_PER_PAGE = 6

export type BlogPaginationControl = {
    href: string | null
    label: string
    ariaLabel: string
    isCurrent?: boolean
    isEllipsis?: boolean
}

export type BlogPaginationControls = {
    first: BlogPaginationControl
    previous: BlogPaginationControl
    pages: BlogPaginationControl[]
    next: BlogPaginationControl
    last: BlogPaginationControl
}

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

export function buildBlogPaginationControls(
    currentPage: number,
    totalPages: number,
    query: string
): BlogPaginationControls {
    const hasPreviousPage = currentPage > 1
    const hasNextPage = currentPage < totalPages
    const pagesToShow = buildVisiblePaginationPages(currentPage, totalPages)

    return {
        first: {
            href: hasPreviousPage ? buildBlogPageHref(1, query) : null,
            label: '<<',
            ariaLabel: 'Go to first page'
        },
        previous: {
            href: hasPreviousPage ? buildBlogPageHref(currentPage - 1, query) : null,
            label: '<',
            ariaLabel: 'Go to previous page'
        },
        pages: pagesToShow.map(page => {
            if (page === null) {
                return {
                    href: null,
                    label: '...',
                    ariaLabel: 'More pages',
                    isEllipsis: true
                }
            }

            return {
                href: buildBlogPageHref(page, query),
                label: String(page),
                ariaLabel: `Go to page ${page}`,
                isCurrent: page === currentPage
            }
        }),
        next: {
            href: hasNextPage ? buildBlogPageHref(currentPage + 1, query) : null,
            label: '>',
            ariaLabel: 'Go to next page'
        },
        last: {
            href: hasNextPage ? buildBlogPageHref(totalPages, query) : null,
            label: '>>',
            ariaLabel: 'Go to last page'
        }
    }
}

function buildVisiblePaginationPages(currentPage: number, totalPages: number) {
    if (totalPages <= 7) {
        return Array.from({ length: totalPages }, (_, index) => index + 1)
    }

    const visiblePages = new Set<number>([1, totalPages, currentPage, currentPage - 1, currentPage + 1])
    const sortedPages = Array.from(visiblePages)
        .filter(page => page >= 1 && page <= totalPages)
        .sort((a, b) => a - b)
    const compactPages: Array<number | null> = []

    sortedPages.forEach((page, index) => {
        if (index > 0 && page - sortedPages[index - 1] > 1) {
            compactPages.push(null)
        }

        compactPages.push(page)
    })

    return compactPages
}
