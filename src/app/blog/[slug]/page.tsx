import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
    title: 'Post in progress',
    description: 'Placeholder blog detail page until the external blog integration is implemented.'
}

export default function BlogDetailPage() {
    return (
        <section className='max-w-3xl space-y-6'>
            <p className='text-sm font-medium uppercase tracking-[0.28em] text-accent'>Blog detail</p>
            <h1 className='text-4xl font-semibold tracking-tight text-foreground sm:text-5xl'>Post in progress</h1>
            <p className='text-base leading-8 text-muted sm:text-lg'>
                This route is already connected to the final URL structure. Real content will be added once the blog
                source is integrated.
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
