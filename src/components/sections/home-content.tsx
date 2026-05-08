'use client'

import { useEffect, useRef, useState } from 'react'
import { HomeHero } from '@/components/sections/home-hero'
import { MyJourney } from '@/components/sections/my-journey'

export function HomeContent() {
    const journeyRef = useRef<HTMLElement | null>(null)
    const [showTeaser, setShowTeaser] = useState(true)

    useEffect(() => {
        const updateTeaserVisibility = () => {
            setShowTeaser(window.scrollY < 40)
        }

        updateTeaserVisibility()
        window.addEventListener('scroll', updateTeaserVisibility, { passive: true })

        return () => window.removeEventListener('scroll', updateTeaserVisibility)
    }, [])

    const scrollToJourney = () => {
        journeyRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

    return (
        <div className='space-y-0'>
            <section
                className='min-h-[calc(100svh-8rem)]'
                onWheel={event => {
                    if (window.scrollY > 24 || event.deltaY <= 0) {
                        return
                    }

                    event.preventDefault()
                    scrollToJourney()
                }}
            >
                <HomeHero />
            </section>

            <div
                className={[
                    'pointer-events-none fixed inset-x-0 bottom-4 z-20 flex justify-center px-6 transition duration-300 ease-out sm:bottom-6',
                    showTeaser ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                ].join(' ')}
            >
                <button
                    type='button'
                    onClick={scrollToJourney}
                    className='pointer-events-auto group inline-flex cursor-pointer items-center gap-4 rounded-full border border-border/90 bg-[rgba(255,253,249,0.92)] px-5 py-3 shadow-[0_12px_34px_rgba(31,29,23,0.12)] backdrop-blur'
                    aria-label='Scroll to My journey'
                >
                    <span className='text-sm font-medium uppercase tracking-[0.28em] text-accent'>My journey</span>
                    <span className='inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface text-foreground transition duration-300 group-hover:translate-y-0.5 group-hover:border-foreground/20'>
                        <svg aria-hidden='true' viewBox='0 0 24 24' className='h-4.5 w-4.5' fill='none'>
                            <path
                                d='M12 5v14M6 13l6 6 6-6'
                                stroke='currentColor'
                                strokeWidth='1.7'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                            />
                        </svg>
                    </span>
                </button>
            </div>

            <MyJourney sectionRef={journeyRef} />
        </div>
    )
}
