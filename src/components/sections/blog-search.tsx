'use client'

import { useEffect, useState, useTransition } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

type BlogSearchProps = {
    initialQuery: string
}

export function BlogSearch({ initialQuery }: BlogSearchProps) {
    const pathname = usePathname()
    const router = useRouter()
    const searchParams = useSearchParams()
    const [value, setValue] = useState(initialQuery)
    const [isPending, startTransition] = useTransition()

    useEffect(() => {
        const timeout = window.setTimeout(() => {
            const normalizedValue = value.trim()
            const params = new URLSearchParams(searchParams.toString())
            const currentQuery = searchParams.get('q')?.trim() ?? ''

            if (normalizedValue === currentQuery) {
                return
            }

            if (normalizedValue) {
                params.set('q', normalizedValue)
                params.delete('page')
            } else {
                params.delete('q')
                params.delete('page')
            }

            const nextUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname

            startTransition(() => {
                router.replace(nextUrl, { scroll: false })
            })
        }, 250)

        return () => window.clearTimeout(timeout)
    }, [pathname, router, searchParams, value])

    return (
        <div className='space-y-3 rounded-3xl border border-border bg-surface p-5 sm:p-6'>
            <label htmlFor='blog-search' className='text-sm font-medium text-foreground'>
                Search articles
            </label>
            <div className='flex flex-col gap-3 sm:flex-row sm:items-center'>
                <input
                    id='blog-search'
                    type='search'
                    value={value}
                    onChange={event => setValue(event.target.value)}
                    placeholder='Search by title, topic, or summary'
                    className='w-full rounded-full border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted focus:border-accent'
                />
                <span className='text-xs uppercase tracking-[0.2em] text-muted' aria-live='polite'>
                    {isPending ? 'Updating' : 'Live'}
                </span>
            </div>
        </div>
    )
}
