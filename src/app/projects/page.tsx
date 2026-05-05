import type { Metadata } from 'next'
import { ProjectsPlaceholder } from '@/components/sections/projects-placeholder'

export const metadata: Metadata = {
    title: 'Projects',
    description: 'A placeholder portfolio section for selected work, case studies, and future project highlights.'
}

export default function ProjectsPage() {
    return <ProjectsPlaceholder />
}
