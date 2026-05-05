import { render, screen } from '@testing-library/react'
import { HomeHero } from './home-hero'

describe('HomeHero', () => {
    it('renders the developer identity and key navigation links', () => {
        render(<HomeHero />)

        expect(screen.getByRole('heading', { name: 'Germán Cocca' })).toBeInTheDocument()
        expect(screen.getByText('AI, Cloud & Fullstack Developer')).toBeInTheDocument()
        expect(screen.getByAltText('Portrait of Germán Cocca')).toBeInTheDocument()
        expect(screen.getByRole('link', { name: 'View projects' })).toHaveAttribute('href', '/projects')
        expect(screen.getByRole('link', { name: 'Contact' })).toHaveAttribute('href', '/contact')
        expect(screen.getByRole('link', { name: 'LinkedIn' })).toHaveAttribute(
            'href',
            'https://www.linkedin.com/in/germancocca'
        )
    })
})
