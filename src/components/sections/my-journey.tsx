'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState, type RefObject } from 'react'
import { journeyEntries, journeyIntro, type JourneyEntry } from '@/lib/journey'

type MyJourneyProps = {
    sectionRef?: RefObject<HTMLElement | null>
}

export function MyJourney({ sectionRef }: MyJourneyProps) {
    const [activeIndex, setActiveIndex] = useState(0)
    const itemRefs = useRef<Array<HTMLElement | null>>([])

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    useEffect(() => {
        const items = itemRefs.current.filter((item): item is HTMLElement => item !== null)

        if (items.length === 0 || typeof IntersectionObserver === 'undefined') {
            return
        }

        const observer = new IntersectionObserver(
            entries => {
                const visibleEntries = entries
                    .filter(entry => entry.isIntersecting)
                    .sort((entryA, entryB) => entryB.intersectionRatio - entryA.intersectionRatio)

                const activeEntry = visibleEntries[0]

                if (!activeEntry) {
                    return
                }

                const index = Number(activeEntry.target.getAttribute('data-index'))

                if (!Number.isNaN(index)) {
                    setActiveIndex(index)
                }
            },
            {
                rootMargin: '-18% 0px -45% 0px',
                threshold: [0.25, 0.5, 0.75]
            }
        )

        items.forEach(item => observer.observe(item))

        return () => observer.disconnect()
    }, [])

    const activeEntry = journeyEntries[activeIndex] ?? journeyEntries[0]

    return (
        <section
            id='my-journey'
            ref={sectionRef}
            aria-labelledby='my-journey-title'
            className='relative isolate -mx-6 bg-[#f4eee4] px-6 pt-10 pb-12 sm:-mx-10 sm:px-10 sm:pt-14 sm:pb-16 lg:-mx-12 lg:px-12'
        >
            <div className='absolute inset-0 -z-10 bg-[#f4eee4]' aria-hidden='true' />

            <div className='w-full space-y-4'>
                <p className='text-sm font-medium uppercase tracking-[0.28em] text-accent'>{journeyIntro.eyebrow}</p>
                <h2
                    id='my-journey-title'
                    className='w-full text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl'
                >
                    {journeyIntro.title}
                </h2>
                <p className='w-full text-base leading-8 text-muted sm:text-lg'>{journeyIntro.description}</p>
                <p className='w-full text-base leading-8 text-muted sm:text-lg'>{journeyIntro.bridge}</p>
            </div>

            <div className='grid gap-8 lg:grid-cols-[minmax(18rem,0.8fr)_minmax(0,1.2fr)] lg:gap-12 lg:pt-12'>
                <div className='space-y-5'>
                    <div
                        data-testid='journey-focus-card'
                        className='rounded-4xl border border-border bg-[linear-gradient(180deg,rgba(255,253,249,0.96),rgba(246,241,232,0.9))] p-6 shadow-[0_18px_44px_rgba(31,29,23,0.08)] lg:sticky lg:top-28'
                    >
                        <p className='text-xs font-medium uppercase tracking-[0.24em] text-muted'>Currently in focus</p>
                        <p className='mt-4 text-sm font-medium uppercase tracking-[0.18em] text-accent'>
                            {activeEntry.period}
                        </p>
                        <h3 className='mt-3 text-2xl font-semibold tracking-tight text-foreground'>
                            {activeEntry.role}
                        </h3>
                        <p className='mt-1 text-base font-medium text-muted'>{activeEntry.organization}</p>
                        <p className='mt-5 text-sm leading-7 text-muted sm:text-base'>{activeEntry.lesson}</p>

                        <div className='mt-6 flex flex-wrap gap-2'>
                            {activeEntry.highlights.map(highlight => (
                                <span
                                    key={highlight}
                                    className='rounded-full border border-border bg-background/80 px-3 py-1.5 text-xs font-medium uppercase tracking-[0.12em] text-foreground'
                                >
                                    {highlight}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className='space-y-5'>
                    {journeyEntries.map((entry, index) => {
                        const isActive = index === activeIndex
                        const isCompleted = index < activeIndex
                        const distanceFromActive = Math.abs(index - activeIndex)
                        const translateX = Math.min(distanceFromActive * 22, 64)

                        return (
                            <div
                                key={`${entry.organization}-${entry.role}`}
                                className='grid gap-4 lg:grid-cols-[3.5rem_minmax(0,1fr)] lg:items-center'
                            >
                                <div className='hidden lg:flex lg:justify-center'>
                                    <span
                                        aria-hidden='true'
                                        className={[
                                            'flex h-11 w-11 items-center justify-center rounded-full border bg-background/70 transition duration-500 ease-out',
                                            isActive
                                                ? 'border-accent/40 shadow-[0_0_0_10px_rgba(31,111,104,0.1)]'
                                                : isCompleted
                                                  ? 'border-foreground/14 opacity-90'
                                                  : 'border-border opacity-65'
                                        ].join(' ')}
                                    >
                                        <span
                                            className={[
                                                'h-3.5 w-3.5 rounded-full transition duration-500 ease-out',
                                                isActive ? 'bg-accent' : isCompleted ? 'bg-foreground/55' : 'bg-border'
                                            ].join(' ')}
                                        />
                                    </span>
                                </div>

                                <article
                                    ref={element => {
                                        itemRefs.current[index] = element
                                    }}
                                    data-testid='journey-entry'
                                    data-index={index}
                                    aria-current={isActive ? 'step' : undefined}
                                    className={[
                                        'relative rounded-4xl border p-6 shadow-[0_18px_44px_rgba(31,29,23,0.06)] transition duration-500 ease-out will-change-transform sm:p-7',
                                        isActive
                                            ? 'border-foreground/18 bg-surface opacity-100'
                                            : isCompleted
                                              ? 'border-border/80 bg-surface/90 opacity-100'
                                              : 'border-border bg-surface/70 opacity-72'
                                    ].join(' ')}
                                    style={{
                                        transform:
                                            distanceFromActive === 0
                                                ? 'translate3d(0px, 0px, 0px)'
                                                : `translate3d(${translateX}px, ${isCompleted ? '0px' : '12px'}, 0px)`
                                    }}
                                >
                                    <div className='space-y-4'>
                                        <div className='flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between'>
                                            <div className='space-y-2'>
                                                <p className='text-xs font-medium uppercase tracking-[0.24em] text-accent'>
                                                    {entry.kind === 'education'
                                                        ? `${entry.period} • Education`
                                                        : entry.period}
                                                </p>
                                                <h3 className='text-2xl font-semibold tracking-tight text-foreground'>
                                                    {entry.role}
                                                </h3>
                                                <p className='text-base font-medium text-muted'>{entry.organization}</p>
                                            </div>

                                            <OrganizationLogo entry={entry} />
                                        </div>

                                        <p className='text-sm leading-7 text-muted sm:text-base'>{entry.story}</p>

                                        <div className='rounded-3xl border border-border/80 bg-background/70 p-5'>
                                            <p className='text-xs font-medium uppercase tracking-[0.22em] text-muted'>
                                                What this added
                                            </p>
                                            <p className='mt-3 text-sm leading-7 text-foreground/90 sm:text-base'>
                                                {entry.lesson}
                                            </p>
                                        </div>
                                    </div>
                                </article>
                            </div>
                        )
                    })}
                </div>
            </div>

            <div className='rounded-4xl border border-border bg-[linear-gradient(135deg,rgba(255,253,249,0.96),rgba(246,241,232,0.88))] p-7 shadow-[0_18px_44px_rgba(31,29,23,0.08)] sm:p-8'>
                <div className='flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between'>
                    <div className='max-w-2xl space-y-3'>
                        <p className='text-sm font-medium uppercase tracking-[0.28em] text-accent'>Next step</p>
                        <h3 className='text-3xl font-semibold tracking-tight text-foreground sm:text-4xl'>
                            If this mix is useful for what you are building, let&apos;s talk.
                        </h3>
                        <p className='text-sm leading-7 text-muted sm:text-base'>
                            Download my resume for the full timeline, or go straight to contact if you want to discuss a
                            role, a product, or a collaboration.
                        </p>
                    </div>

                    <div className='flex flex-col gap-4 sm:flex-row xl:shrink-0'>
                        <a
                            href='/GermanCoccaCV.pdf'
                            target='_blank'
                            rel='noreferrer'
                            className='inline-flex min-w-44 items-center justify-center rounded-full bg-foreground px-7 py-3.5 text-sm font-medium whitespace-nowrap text-background transition hover:opacity-90'
                        >
                            Download Resume
                        </a>
                        <Link
                            href='/contact'
                            className='inline-flex min-w-40 items-center justify-center rounded-full border border-border px-7 py-3.5 text-sm font-medium whitespace-nowrap text-foreground transition hover:bg-surface'
                        >
                            Contact me
                        </Link>
                    </div>
                </div>
            </div>

            <div className='flex justify-center pt-2'>
                <button
                    type='button'
                    onClick={scrollToTop}
                    className='inline-flex cursor-pointer items-center gap-3 rounded-full border border-border bg-surface px-5 py-3 text-sm font-medium text-foreground transition hover:-translate-y-0.5 hover:border-foreground/20 hover:bg-background'
                >
                    <svg aria-hidden='true' viewBox='0 0 24 24' className='h-4.5 w-4.5' fill='none'>
                        <path
                            d='M12 19V5M6 11l6-6 6 6'
                            stroke='currentColor'
                            strokeWidth='1.7'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                        />
                    </svg>
                    Back to top
                </button>
            </div>
        </section>
    )
}

function OrganizationLogo({ entry }: { entry: JourneyEntry }) {
    const commonClassName =
        'group inline-flex h-16 w-16 items-center justify-center overflow-hidden rounded-[1rem] transition duration-300 ease-out hover:-translate-y-0.5 sm:h-[4.5rem] sm:w-[4.5rem]'

    if (entry.logoSrc) {
        const image = (
            <span className={commonClassName}>
                <Image
                    src={entry.logoSrc}
                    alt={entry.logoAlt ?? `${entry.organization} logo`}
                    width={96}
                    height={96}
                    className='h-full w-full rounded-2xl object-cover grayscale transition duration-300 ease-out group-hover:scale-105 group-hover:grayscale-0'
                />
            </span>
        )

        if (!entry.url) {
            return image
        }

        return (
            <a
                href={entry.url}
                target='_blank'
                rel='noreferrer'
                aria-label={`Open ${entry.organization}`}
                className='cursor-pointer'
            >
                {image}
            </a>
        )
    }

    const fallback = (
        <span
            className={`${commonClassName} bg-[linear-gradient(135deg,rgba(31,111,104,0.12),rgba(31,29,23,0.03))] text-sm font-semibold tracking-[0.14em] text-foreground uppercase group-hover:text-accent`}
        >
            {entry.logoLabel ?? entry.organization.slice(0, 3)}
        </span>
    )

    if (!entry.url) {
        return fallback
    }

    return (
        <a
            href={entry.url}
            target='_blank'
            rel='noreferrer'
            aria-label={`Open ${entry.organization}`}
            className='cursor-pointer'
        >
            {fallback}
        </a>
    )
}
