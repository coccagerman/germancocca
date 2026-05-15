import Link from 'next/link'

const postPlaceholders = [
    {
        title: 'Writing pipeline placeholder',
        description: 'A temporary slot for articles that will later be pulled from the public blog feed.',
        href: '/blog/post-placeholder'
    },
    {
        title: 'Cloud notes placeholder',
        description: 'Reserved for essays on delivery, infrastructure, and engineering tradeoffs.',
        href: '/blog/post-placeholder'
    },
    {
        title: 'AI product thinking placeholder',
        description: 'A space for practical writing about AI features, systems, and user value.',
        href: '/blog/post-placeholder'
    }
]

export function BlogPlaceholder() {
    return (
        <section className='space-y-10'>
            <div className='max-w-3xl space-y-4'>
                <p className='text-sm font-medium uppercase tracking-[0.28em] text-accent'>Blog</p>
                <h1 className='text-4xl font-semibold tracking-tight text-foreground sm:text-5xl'>
                    Articles will be listed here.
                </h1>
                <p className='text-base leading-8 text-muted sm:text-lg'>
                    The route structure is ready for a feed-backed archive while keeping the current version simple,
                    static, and fast.
                </p>
            </div>

            <div className='grid gap-5'>
                {postPlaceholders.map(post => (
                    <article key={post.title} className='rounded-3xl border border-border bg-surface p-6'>
                        <p className='text-xs font-medium uppercase tracking-[0.24em] text-muted'>Placeholder post</p>
                        <h2 className='mt-4 text-2xl font-semibold text-foreground'>{post.title}</h2>
                        <p className='mt-3 max-w-3xl text-sm leading-7 text-muted'>{post.description}</p>
                        <Link
                            href={post.href}
                            className='mt-6 inline-flex text-sm font-medium text-accent transition hover:text-foreground'
                        >
                            Open post placeholder
                        </Link>
                    </article>
                ))}
            </div>
        </section>
    )
}
