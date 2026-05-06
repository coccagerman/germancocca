import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { formatBlogDate } from '@/lib/blog'
import { getAllHashnodePosts, getHashnodePostBySlug } from '@/lib/hashnode'

type BlogDetailPageProps = {
    params: Promise<{
        slug: string
    }>
}

export async function generateStaticParams() {
    try {
        const posts = await getAllHashnodePosts()

        return posts.map(post => ({ slug: post.slug }))
    } catch {
        return []
    }
}

export async function generateMetadata({ params }: BlogDetailPageProps): Promise<Metadata> {
    const { slug } = await params

    try {
        const post = await getHashnodePostBySlug(slug)

        if (!post) {
            return {
                title: 'Post not found',
                robots: {
                    follow: true,
                    index: false
                }
            }
        }

        return {
            title: post.title,
            description: post.summary,
            alternates: {
                canonical: post.originalUrl
            },
            openGraph: {
                type: 'article',
                title: post.title,
                description: post.summary,
                url: post.originalUrl,
                publishedTime: post.publishedAt,
                images: post.coverImage ? [{ url: post.coverImage }] : undefined
            }
        }
    } catch {
        return {
            title: 'Blog',
            description: 'Article detail page.'
        }
    }
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
    const { slug } = await params
    let post: Awaited<ReturnType<typeof getHashnodePostBySlug>> | null = null

    try {
        post = await getHashnodePostBySlug(slug)
    } catch {
        return (
            <section className='max-w-3xl space-y-6'>
                <p className='text-sm font-medium uppercase tracking-[0.28em] text-accent'>Blog detail</p>
                <h1 className='text-4xl font-semibold tracking-tight text-foreground sm:text-5xl'>
                    This article is temporarily unavailable.
                </h1>
                <p className='text-base leading-8 text-muted sm:text-lg'>
                    The source could not be reached right now. Please try again shortly.
                </p>
                <Link
                    href='/blog'
                    className='inline-flex rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground transition hover:bg-surface'
                >
                    Back to blog
                </Link>
            </section>
        )
    }

    if (!post) {
        notFound()
    }

    return (
        <article className='mx-auto max-w-4xl space-y-8'>
            <div className='space-y-5'>
                <Link
                    href='/blog'
                    className='inline-flex rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground transition hover:bg-surface'
                >
                    Back to blog
                </Link>
                <p className='text-sm font-medium uppercase tracking-[0.28em] text-accent'>Blog detail</p>
                <h1 className='text-4xl font-semibold tracking-tight text-foreground sm:text-5xl'>{post.title}</h1>
                <div className='flex flex-wrap items-center gap-3 text-sm text-muted'>
                    <span>{formatBlogDate(post.publishedAt)}</span>
                    <span>Originally published on freeCodeCamp</span>
                </div>
                <p className='max-w-3xl text-base leading-8 text-muted sm:text-lg'>{post.summary}</p>
                <a
                    href={post.originalUrl}
                    target='_blank'
                    rel='noreferrer'
                    className='inline-flex rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition hover:opacity-90'
                >
                    Originally published on freeCodeCamp
                </a>
            </div>

            {post.coverImage ? (
                <div className='overflow-hidden rounded-[2rem] border border-border bg-surface'>
                    <Image
                        src={post.coverImage}
                        alt={post.title}
                        width={1600}
                        height={900}
                        sizes='(max-width: 1024px) 100vw, 64rem'
                        className='h-auto w-full object-cover'
                    />
                </div>
            ) : null}

            {post.tags.length > 0 ? (
                <div className='flex flex-wrap gap-2'>
                    {post.tags.map(tag => (
                        <span
                            key={tag}
                            className='rounded-full border border-border px-3 py-1 text-xs font-medium text-muted'
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            ) : null}

            <div
                className='blog-prose rounded-[2rem] border border-border bg-surface p-6 sm:p-8'
                dangerouslySetInnerHTML={{ __html: post.contentHtml || `<p>${post.summary}</p>` }}
            />
        </article>
    )
}
