import Image from 'next/image'
import Link from 'next/link'

const sectionLinks = [
    {
        href: '/projects',
        label: 'Browse projects',
        description:
            'Personal projects where I apply new ideas, explore what I am learning, and show how I build as a developer.'
    },
    {
        href: '/blog',
        label: 'Read the blog',
        description:
            'Technical articles I write to capture what I am learning and share knowledge with other developers.'
    },
    {
        href: '/contact',
        label: 'Go to contact',
        description: 'A direct way to reach out through email or LinkedIn.'
    }
]

export function HomeHero() {
    return (
        <section className='grid gap-12 lg:grid-cols-[minmax(0,1.5fr)_minmax(18rem,1fr)] lg:gap-16'>
            <div className='space-y-8'>
                <div className='space-y-5'>
                    <p className='text-sm font-medium uppercase tracking-[0.28em] text-accent'>Personal website</p>
                    <div className='flex flex-col gap-5 sm:flex-row sm:items-start'>
                        <div className='w-full max-w-[10rem] overflow-hidden rounded-[1.75rem] border border-border bg-surface p-2 shadow-[0_12px_30px_rgba(31,29,23,0.06)] sm:shrink-0'>
                            <Image
                                src='/myself.jpeg'
                                alt='Portrait of Germán Cocca'
                                width={1196}
                                height={1197}
                                preload
                                sizes='(max-width: 640px) 10rem, 10rem'
                                className='h-auto w-full rounded-[1.2rem] object-cover'
                            />
                        </div>

                        <div className='space-y-4'>
                            <h1 className='max-w-3xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl'>
                                Germán Cocca
                            </h1>
                            <p className='text-lg leading-8 text-muted sm:text-xl'>
                                AI, Cloud &amp; Fullstack Developer
                            </p>
                        </div>
                    </div>
                    <p className='max-w-3xl text-base leading-8 text-muted sm:text-lg'>
                        I&apos;m a full stack developer focused on AI, cloud, and product-minded engineering. I work
                        across JavaScript, TypeScript, React, Node.js, and AWS, communicate fluently in English, and
                        enjoy turning curiosity into tools that are genuinely useful for other people.
                    </p>
                </div>

                <div className='flex flex-col gap-4 sm:flex-row'>
                    <Link
                        href='/projects'
                        className='inline-flex items-center justify-center rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition hover:opacity-90'
                    >
                        View projects
                    </Link>
                    <Link
                        href='/contact'
                        className='inline-flex items-center justify-center rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition hover:bg-surface'
                    >
                        Contact
                    </Link>
                    <a
                        href='https://www.linkedin.com/in/germancocca'
                        target='_blank'
                        rel='noreferrer'
                        className='inline-flex items-center justify-center rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition hover:bg-surface'
                    >
                        LinkedIn
                    </a>
                    <a
                        href='/GermanCoccaCV.pdf'
                        target='_blank'
                        rel='noreferrer'
                        className='inline-flex items-center justify-center rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition hover:bg-surface'
                    >
                        Download Resume
                    </a>
                </div>
            </div>

            <div className='grid gap-4 self-start'>
                {sectionLinks.map(item => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className='rounded-3xl border border-border bg-surface p-6 transition hover:-translate-y-0.5 hover:border-foreground/20'
                    >
                        <p className='text-base font-semibold text-foreground'>{item.label}</p>
                        <p className='mt-3 text-sm leading-7 text-muted'>{item.description}</p>
                    </Link>
                ))}
            </div>
        </section>
    )
}
