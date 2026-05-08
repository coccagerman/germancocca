import type { Metadata } from 'next'
import { HomeContent } from '@/components/sections/home-content'

export const metadata: Metadata = {
    title: 'Germán Cocca',
    description:
        'Personal website of Germán Cocca, an AI, Cloud & Fullstack Developer focused on useful products and clear engineering.'
}

export default function Home() {
    return <HomeContent />
}
