import { fireEvent, render, screen, within } from '@testing-library/react'
import { ProjectsShowcase } from './projects-showcase'
import { projects } from '@/lib/projects'

describe('ProjectsShowcase', () => {
    it('renders the Aggendia case study, toggles the accordion, switches tabs, and opens the gallery viewer', () => {
        render(<ProjectsShowcase projects={projects} />)

        expect(screen.getByRole('heading', { name: 'Aggendia' })).toBeInTheDocument()
        expect(screen.getByRole('button', { name: 'Aggendia' })).toHaveAttribute('aria-expanded', 'true')

        const liveLink = screen.getByRole('link', { name: 'Open live project' })
        const repositoryLink = screen.getByRole('link', { name: 'View source code' })

        expect(liveLink).toHaveAttribute('href', projects[0]?.url)
        expect(repositoryLink).toHaveAttribute('href', projects[0]?.repositoryUrl)
        expect(screen.getByRole('tab', { name: 'General' })).toHaveAttribute('aria-selected', 'true')
        expect(screen.getByText('What it is')).toBeInTheDocument()

        fireEvent.click(screen.getByRole('button', { name: 'Aggendia' }))

        expect(screen.getByRole('button', { name: 'Aggendia' })).toHaveAttribute('aria-expanded', 'false')
        expect(screen.queryByRole('tab', { name: 'General' })).not.toBeInTheDocument()

        fireEvent.click(screen.getByRole('button', { name: 'Aggendia' }))

        expect(screen.getByRole('button', { name: 'Aggendia' })).toHaveAttribute('aria-expanded', 'true')
        expect(screen.getByRole('tab', { name: 'General' })).toBeInTheDocument()

        fireEvent.click(screen.getByRole('tab', { name: 'Technical' }))

        expect(screen.getByRole('tab', { name: 'Technical' })).toHaveAttribute('aria-selected', 'true')
        expect(screen.getByText('Architecture')).toBeInTheDocument()

        fireEvent.click(screen.getByRole('button', { name: 'Open screenshot Public landing' }))

        const dialog = screen.getByRole('dialog', { name: 'Gallery viewer for Aggendia' })

        expect(dialog).toBeInTheDocument()
        expect(within(dialog).getByText('Public landing')).toBeInTheDocument()

        fireEvent.click(screen.getByRole('button', { name: 'Close gallery' }))

        expect(screen.queryByRole('dialog', { name: 'Gallery viewer for Aggendia' })).not.toBeInTheDocument()
    })
})
