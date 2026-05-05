import type { Metadata } from 'next'
import { BlogPlaceholder } from '@/components/sections/blog-placeholder'

export const metadata: Metadata = {
    title: 'Blog',
    description: 'A placeholder blog index prepared for future Hashnode content and static-first publishing.'
}

export default function BlogPage() {
    return <BlogPlaceholder />
}
