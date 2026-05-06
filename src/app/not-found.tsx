import Link from 'next/link'

export default function NotFound() {
    return (
        <section className='max-w-3xl space-y-6'>
            <p className='text-sm font-medium uppercase tracking-[0.28em] text-accent'>404</p>
            <h1 className='text-4xl font-semibold tracking-tight text-foreground sm:text-5xl'>Page not found.</h1>
            <p className='text-base leading-8 text-muted sm:text-lg'>
                The page you requested does not exist, or the article slug is no longer available from the source.
            </p>
            <div className='flex flex-wrap gap-3'>
                <Link
                    href='/blog'
                    className='inline-flex rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition hover:opacity-90'
                >
                    Back to blog
                </Link>
                <Link
                    href='/'
                    className='inline-flex rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground transition hover:bg-surface'
                >
                    Back home
                </Link>
            </div>
        </section>
    )
}
