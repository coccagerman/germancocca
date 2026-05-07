import type { Metadata } from 'next'
import { ProjectsShowcase } from '@/components/sections/projects-showcase'
import { projects } from '@/lib/projects'

export const metadata: Metadata = {
    title: 'Projects',
    description: 'Case studies of real products designed and developed to solve concrete operational problems.'
}

export default function ProjectsPage() {
    return <ProjectsShowcase projects={projects} />
}
