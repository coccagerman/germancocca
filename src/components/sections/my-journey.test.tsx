import { act, render, screen, within } from '@testing-library/react'
import { MyJourney } from './my-journey'

class IntersectionObserverMock {
    static instances: IntersectionObserverMock[] = []

    readonly observe = jest.fn()
    readonly disconnect = jest.fn()
    readonly unobserve = jest.fn()

    constructor(public readonly callback: IntersectionObserverCallback) {
        IntersectionObserverMock.instances.push(this)
    }
}

describe('MyJourney', () => {
    beforeEach(() => {
        IntersectionObserverMock.instances = []
        window.IntersectionObserver = IntersectionObserverMock as unknown as typeof IntersectionObserver
    })

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

    it('updates the focus card when a later journey entry becomes active', () => {
        const { container } = render(<MyJourney />)

        const observer = IntersectionObserverMock.instances[0]
        const journeyEntries = container.querySelectorAll('[data-testid="journey-entry"]')
        const focusCard = screen.getByTestId('journey-focus-card')

        expect(observer).toBeDefined()
        expect(journeyEntries).toHaveLength(10)

        act(() => {
            observer.callback(
                [
                    {
                        isIntersecting: true,
                        intersectionRatio: 0.9,
                        target: journeyEntries[2]
                    } as IntersectionObserverEntry
                ],
                observer as unknown as IntersectionObserver
            )
        })

        expect(within(focusCard).getByText('Technical Author')).toBeInTheDocument()
        expect(within(focusCard).getByText('freeCodeCamp')).toBeInTheDocument()
        expect(
            within(focusCard).getByText(
                'I published 36 technical articles on JavaScript, React, frontend development, and software engineering for a global developer audience, translating complex topics into practical learning material.'
            )
        ).toBeInTheDocument()
        expect(
            screen.getByText(
                'That work made my technical communication sharper and pushed me toward solutions that other engineers can understand, review, and maintain more easily.'
            )
        ).toBeInTheDocument()
        expect(within(focusCard).getByText('Clear technical communication')).toBeInTheDocument()
    })

    it('colors only the logo that belongs to the active journey entry', () => {
        const { container } = render(<MyJourney />)

        const observer = IntersectionObserverMock.instances[0]
        const journeyEntries = container.querySelectorAll('[data-testid="journey-entry"]')
        const comafiLogo = screen.getByAltText('Banco Comafi logo')
        const groovinadsLogo = screen.getByAltText('Groovinads logo')

        expect(comafiLogo).toHaveClass('grayscale-0')
        expect(groovinadsLogo).toHaveClass('grayscale')

        act(() => {
            observer.callback(
                [
                    {
                        isIntersecting: true,
                        intersectionRatio: 0.9,
                        target: journeyEntries[1]
                    } as IntersectionObserverEntry
                ],
                observer as unknown as IntersectionObserver
            )
        })

        expect(comafiLogo).toHaveClass('grayscale')
        expect(groovinadsLogo).toHaveClass('grayscale-0')
    })
})
