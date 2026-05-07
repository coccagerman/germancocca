import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { SiteHeader } from '@/components/layout/site-header'
import { SiteShell } from '@/components/layout/site-shell'
import './globals.css'

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin']
})

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin']
})

const faviconVersion = '20260507-1626'

export const metadata: Metadata = {
    title: {
        default: 'Germán Cocca',
        template: '%s | Germán Cocca'
    },
    description:
        'AI, Cloud & Fullstack Developer building useful products with JavaScript, TypeScript, React, Node.js, and AWS.',
    icons: {
        icon: `/ico.png?v=${faviconVersion}`,
        shortcut: `/ico.png?v=${faviconVersion}`,
        apple: `/ico.png?v=${faviconVersion}`
    }
}

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html
            lang='en'
            data-scroll-behavior='smooth'
            className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
        >
            <body className='min-h-full bg-background text-foreground'>
                <SiteShell>
                    <SiteHeader />
                    <main className='flex-1 py-16 sm:py-20'>{children}</main>
                </SiteShell>
            </body>
        </html>
    )
}
