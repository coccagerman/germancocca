import { render, screen } from '@testing-library/react'
import { MyJourney } from './my-journey'

describe('MyJourney', () => {
    it('renders the narrative timeline and final calls to action', () => {
        render(<MyJourney />)

        expect(
            screen.getByRole('heading', { name: 'A path shaped by engineering, people work, and business context.' })
        ).toBeInTheDocument()
        expect(screen.getAllByText('Senior Full Stack Developer')).toHaveLength(2)
        expect(screen.getAllByText('Comafi')).toHaveLength(2)
        expect(screen.getByText('Technical Author')).toBeInTheDocument()
        expect(screen.getByText('freeCodeCamp')).toBeInTheDocument()
        expect(screen.getByText('Systems Analyst')).toBeInTheDocument()
        expect(screen.getByText('Labour Relations degree')).toBeInTheDocument()
        expect(screen.getByRole('button', { name: 'Back to top' })).toBeInTheDocument()
        expect(screen.getByRole('link', { name: 'Open Comafi' })).toHaveAttribute('href', 'https://www.comafi.com.ar/')
        expect(screen.getByRole('link', { name: 'Open UAI - Universidad Abierta Interamericana' })).toHaveAttribute(
            'href',
            'https://uai.edu.ar/'
        )
        expect(screen.getByRole('link', { name: 'Download Resume' })).toHaveAttribute('href', '/GermanCoccaCV.pdf')
        expect(screen.getByRole('link', { name: 'Download Resume' })).toHaveAttribute('target', '_blank')
        expect(screen.getByRole('link', { name: 'Contact me' })).toHaveAttribute('href', '/contact')
    })
})
