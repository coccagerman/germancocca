import type { Metadata } from 'next'
import { HomeHero } from '@/components/sections/home-hero'

export const metadata: Metadata = {
    title: 'Germán Cocca',
    description:
        'Personal website of Germán Cocca, an AI, Cloud & Fullstack Developer focused on useful products and clear engineering.'
}

export default function Home() {
    return <HomeHero />
}
