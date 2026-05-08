import { render, screen } from '@testing-library/react'
import Home from './page'

describe('Home page', () => {
    it('renders both the hero and the journey section', () => {
        render(<Home />)

        expect(screen.getByRole('heading', { name: 'Germán Cocca' })).toBeInTheDocument()
        expect(screen.getByRole('button', { name: 'Scroll to My journey' })).toBeInTheDocument()
        expect(
            screen.getByRole('heading', { name: 'A path shaped by engineering, people work, and business context.' })
        ).toBeInTheDocument()
    })
})
