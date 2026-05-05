export function ContactCard() {
    return (
        <section className='max-w-3xl space-y-10'>
            <div className='space-y-4'>
                <p className='text-sm font-medium uppercase tracking-[0.28em] text-accent'>Contact</p>
                <h1 className='text-4xl font-semibold tracking-tight text-foreground sm:text-5xl'>Let&apos;s talk</h1>
            </div>

            <div className='grid gap-5 sm:grid-cols-2'>
                <article className='rounded-3xl border border-border bg-surface p-6'>
                    <p className='text-xs font-medium uppercase tracking-[0.24em] text-muted'>Email</p>
                    <p className='mt-4 text-lg font-semibold text-foreground'>coccagerman@gmail.com</p>
                </article>

                <article className='rounded-3xl border border-border bg-surface p-6'>
                    <p className='text-xs font-medium uppercase tracking-[0.24em] text-muted'>LinkedIn</p>
                    <a
                        href='https://www.linkedin.com/in/germancocca'
                        target='_blank'
                        rel='noreferrer'
                        className='mt-4 inline-flex text-lg font-semibold text-foreground transition hover:text-accent'
                    >
                        linkedin.com/in/germancocca
                    </a>
                </article>
            </div>
        </section>
    )
}
