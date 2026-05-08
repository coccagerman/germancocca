import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { BlogSearch } from '@/components/sections/blog-search'
import {
    buildBlogPaginationControls,
    filterBlogPosts,
    formatBlogDate,
    normalizeBlogQuery,
    normalizePageParam,
    paginateBlogPosts
} from '@/lib/blog'
import { getAllHashnodePosts } from '@/lib/hashnode'

type BlogPageProps = {
    searchParams: Promise<{
        page?: string | string[]
        q?: string | string[]
    }>
}

export async function generateMetadata({ searchParams }: BlogPageProps): Promise<Metadata> {
    const query = await searchParams
    const normalizedQuery = normalizeBlogQuery(query.q)
    const currentPage = normalizePageParam(query.page)
    const shouldNoIndex = Boolean(normalizedQuery) || currentPage > 1

    return {
        title: normalizedQuery ? `Blog search: ${normalizedQuery}` : 'Blog',
        description: 'Articles by Germán Cocca on AI, cloud, full-stack engineering, and practical software design.',
        robots: shouldNoIndex
            ? {
                  follow: true,
                  index: false
              }
            : undefined
    }
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
    const query = await searchParams
    const normalizedQuery = normalizeBlogQuery(query.q)
    const requestedPage = normalizePageParam(query.page)
    let allPosts: Awaited<ReturnType<typeof getAllHashnodePosts>> | null = null

    try {
        allPosts = await getAllHashnodePosts()
    } catch {
        return (
            <section className='space-y-8'>
                <div className='max-w-3xl space-y-4'>
                    <p className='text-sm font-medium uppercase tracking-[0.28em] text-accent'>Blog</p>
                    <h1 className='text-4xl font-semibold tracking-tight text-foreground sm:text-5xl'>
                        Articles are temporarily unavailable.
                    </h1>
                    <p className='text-base leading-8 text-muted sm:text-lg'>
                        The Hashnode source could not be reached right now. Please try again shortly.
                    </p>
                </div>
            </section>
        )
    }

    const filteredPosts = filterBlogPosts(allPosts, normalizedQuery)
    const pagination = paginateBlogPosts(filteredPosts, requestedPage)
    const paginationControls = buildBlogPaginationControls(
        pagination.currentPage,
        pagination.totalPages,
        normalizedQuery
    )

    return (
        <section className='space-y-10'>
            <div className='max-w-3xl space-y-4'>
                <p className='text-sm font-medium uppercase tracking-[0.28em] text-accent'>Blog</p>
                <h1 className='text-4xl font-semibold tracking-tight text-foreground sm:text-5xl'>
                    Articles and handbooks published on freeCodeCamp.
                </h1>
                <p className='text-base leading-8 text-muted sm:text-lg'>
                    A server-rendered archive of my writing, sourced from Hashnode and republished here with clean URLs,
                    search, and paginated navigation.
                </p>
            </div>

            <BlogSearch key={normalizedQuery} initialQuery={normalizedQuery} />

            <div className='flex flex-wrap items-center justify-between gap-3 text-sm text-muted'>
                <p>
                    {filteredPosts.length} article{filteredPosts.length === 1 ? '' : 's'}
                    {normalizedQuery ? ` for “${normalizedQuery}”` : ''}
                </p>
                <p>
                    Page {pagination.currentPage} of {pagination.totalPages}
                </p>
            </div>

            {filteredPosts.length === 0 ? (
                <article className='rounded-3xl border border-border bg-surface p-8'>
                    <h2 className='text-2xl font-semibold text-foreground'>No articles match this search.</h2>
                    <p className='mt-3 max-w-2xl text-sm leading-7 text-muted'>
                        Try a different keyword or clear the search to browse the full archive.
                    </p>
                </article>
            ) : (
                <div className='grid gap-5'>
                    {pagination.items.map(post => (
                        <article
                            key={post.slug}
                            className='overflow-hidden rounded-3xl border border-border bg-surface'
                        >
                            <div className='flex flex-col gap-5 p-5 sm:p-6 md:flex-row md:items-start md:gap-7'>
                                {post.coverImage ? (
                                    <Link
                                        href={`/blog/${post.slug}`}
                                        className='group relative block aspect-16/10 w-full overflow-hidden rounded-[1.6rem] bg-[rgba(54,39,20,0.08)] md:w-[18rem] md:flex-none'
                                        aria-label={`Open ${post.title}`}
                                    >
                                        <Image
                                            src={post.coverImage}
                                            alt={`${post.title} cover image`}
                                            fill
                                            sizes='(min-width: 1024px) 18rem, (min-width: 768px) 18rem, 100vw'
                                            className='object-cover object-top-left transition duration-500 group-hover:scale-[1.03]'
                                        />
                                    </Link>
                                ) : null}

                                <div className='min-w-0 flex-1 py-1'>
                                    <div className='flex flex-wrap items-center gap-3 text-xs font-medium uppercase tracking-[0.18em] text-muted'>
                                        <span>{formatBlogDate(post.publishedAt)}</span>
                                        <span>{post.sourceLabel}</span>
                                    </div>
                                    <h2 className='mt-4 text-2xl font-semibold text-foreground sm:text-3xl'>
                                        <Link href={`/blog/${post.slug}`} className='transition hover:text-accent'>
                                            {post.title}
                                        </Link>
                                    </h2>
                                    <p className='mt-3 max-w-3xl text-sm leading-7 text-muted sm:text-base'>
                                        {post.summary}
                                    </p>
                                    {post.tags.length > 0 ? (
                                        <div className='mt-5 flex flex-wrap gap-2'>
                                            {post.tags.slice(0, 4).map(tag => (
                                                <span
                                                    key={tag}
                                                    className='rounded-full border border-border px-3 py-1 text-xs font-medium text-muted'
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    ) : null}
                                    <div className='mt-6 flex flex-wrap gap-4'>
                                        <Link
                                            href={`/blog/${post.slug}`}
                                            className='inline-flex text-sm font-medium text-accent transition hover:text-foreground'
                                        >
                                            Read article
                                        </Link>
                                        <a
                                            href={post.originalUrl}
                                            target='_blank'
                                            rel='noreferrer'
                                            className='inline-flex text-sm font-medium text-muted transition hover:text-foreground'
                                        >
                                            Open original
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            )}

            {filteredPosts.length > 0 && pagination.totalPages > 1 ? (
                <nav aria-label='Pagination' className='flex justify-center'>
                    <div className='flex flex-wrap items-center justify-center gap-3'>
                        {[
                            paginationControls.first,
                            paginationControls.previous,
                            ...paginationControls.pages,
                            paginationControls.next,
                            paginationControls.last
                        ].map(control => {
                            const className = `inline-flex min-w-11 justify-center rounded-full px-4 py-2 text-sm font-medium transition ${
                                control.isCurrent
                                    ? 'bg-foreground text-background'
                                    : control.href
                                      ? 'border border-border text-foreground hover:bg-surface'
                                      : 'border border-border text-muted opacity-45'
                            }`

                            if (!control.href) {
                                return (
                                    <span
                                        key={`${control.ariaLabel}-${control.label}`}
                                        aria-label={control.ariaLabel}
                                        aria-disabled={control.isEllipsis ? undefined : 'true'}
                                        className={
                                            control.isEllipsis
                                                ? 'px-1 text-sm font-medium tracking-[0.2em] text-muted'
                                                : className
                                        }
                                    >
                                        {control.label}
                                    </span>
                                )
                            }

                            return (
                                <Link
                                    key={control.ariaLabel}
                                    href={control.href}
                                    aria-current={control.isCurrent ? 'page' : undefined}
                                    aria-label={control.ariaLabel}
                                    className={className}
                                >
                                    {control.label}
                                </Link>
                            )
                        })}
                    </div>
                </nav>
            ) : null}
        </section>
    )
}
