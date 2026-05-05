import { render, screen } from '@testing-library/react'
import { ContactCard } from './contact-card'

describe('ContactCard', () => {
    it('renders the direct contact details', () => {
        render(<ContactCard />)

        expect(screen.getByText('coccagerman@gmail.com')).toBeInTheDocument()

        const linkedinLink = screen.getByRole('link', {
            name: 'linkedin.com/in/germancocca'
        })

        expect(linkedinLink).toHaveAttribute('href', 'https://www.linkedin.com/in/germancocca')
        expect(linkedinLink).toHaveAttribute('target', '_blank')
    })
})
