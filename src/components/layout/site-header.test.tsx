import { render, screen } from '@testing-library/react'
import { SiteHeader } from './site-header'

describe('SiteHeader', () => {
    it('renders the primary navigation links', () => {
        render(<SiteHeader />)

        expect(screen.getByRole('link', { name: 'Germán Cocca' })).toHaveAttribute('href', '/')
        expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/')
        expect(screen.getByRole('link', { name: 'Projects' })).toHaveAttribute('href', '/projects')
        expect(screen.getByRole('link', { name: 'Blog' })).toHaveAttribute('href', '/blog')
        expect(screen.getByRole('link', { name: 'Contact' })).toHaveAttribute('href', '/contact')
    })
})
