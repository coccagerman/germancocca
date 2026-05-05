import type { Metadata } from 'next'
import { ContactCard } from '@/components/sections/contact-card'

export const metadata: Metadata = {
    title: 'Contact',
    description: 'Contact details for Germán Cocca, including email and LinkedIn.'
}

export default function ContactPage() {
    return <ContactCard />
}
