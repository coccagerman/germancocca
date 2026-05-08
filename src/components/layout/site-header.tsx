import Link from 'next/link'

const navigationItems = [
    { href: '/', label: 'Home' },
    { href: '/projects', label: 'Projects' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' }
]

export function SiteHeader() {
    return (
        <header className='sticky top-0 z-10 border-b border-border/80 bg-background/90 backdrop-blur'>
            <div className='mx-auto flex w-full max-w-6xl flex-col gap-5 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-10 lg:px-12'>
                <Link href='/' className='text-sm font-semibold tracking-[0.24em] text-foreground uppercase'>
                    Germán Cocca
                </Link>

                <nav aria-label='Primary' className='flex flex-wrap gap-3 text-sm text-muted'>
                    {navigationItems.map(item => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className='rounded-full border border-transparent px-3 py-1.5 transition hover:border-border hover:bg-surface hover:text-foreground'
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>
            </div>
        </header>
    )
}
