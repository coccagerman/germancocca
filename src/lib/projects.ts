export type ProjectSection = {
    title: string
    description: string
}

export type ProjectScreenshot = {
    src: string
    alt: string
    label: string
    description: string
}

export type ProjectCaseStudy = {
    slug: string
    name: string
    url: string
    repositoryUrl: string
    general: ProjectSection[]
    technical: ProjectSection[]
    screenshots: ProjectScreenshot[]
}

export const projectsCopy = {
    title: 'Projects',
    subtitle: '',
    projectLabel: '',
    liveCta: 'Open live project',
    repositoryCta: 'View source code',
    generalTitle: 'General',
    technicalTitle: 'Technical',
    screenshotsTitle: 'Screenshots',
    closeViewer: 'Close gallery',
    previousImage: 'Previous image',
    nextImage: 'Next image'
} as const

export const projects: ProjectCaseStudy[] = [
    {
        slug: 'aggendia',
        name: 'Aggendia',
        url: 'https://turnosapp-beta.vercel.app/',
        repositoryUrl: 'https://github.com/coccagerman/aggendia',
        general: [
            {
                title: 'What it is',
                description:
                    'A web-based appointment management platform for businesses and professionals that want to move away from WhatsApp scheduling and organize daily operations.'
            },
            {
                title: 'Problem it solves',
                description:
                    'Prevents chaos, delays, and double bookings by centralizing services, resources, availability, and calendar into one simple flow.'
            },
            {
                title: 'How it works',
                description:
                    'The business configures services and schedules, then shares a public link. Customers book in a few steps: service, resource, time slot, and confirmation.'
            },
            {
                title: 'Impact',
                description:
                    'Less operational overhead, fewer no-shows through automated reminders, more confirmed bookings, and a more professional customer experience.'
            },
            {
                title: 'UX differentiator',
                description:
                    'Mobile-first flow, clear wording, and minimal steps to complete a booking in under one minute.'
            }
        ],
        technical: [
            {
                title: 'Architecture',
                description:
                    'Next.js App Router with layered separation (transport API, domain rules, data persistence) to keep the codebase maintainable and scalable.'
            },
            {
                title: 'Stack',
                description:
                    'TypeScript, Tailwind + shadcn/ui, Prisma on Postgres (Supabase), authentication with Supabase Auth.'
            },
            {
                title: 'Business model',
                description:
                    'Strict multi-tenant model by business_id, with data isolation per business and access validation in private endpoints.'
            },
            {
                title: 'Scheduling engine',
                description:
                    'Slot calculation by duration/interval, weekly resource availability, one-off blocks, and minimum lead-time rules.'
            },
            {
                title: 'Reliability',
                description:
                    'Double-booking prevention through domain validations and DB constraints; asynchronous notifications (email/WhatsApp) with idempotency.'
            }
        ],
        screenshots: [
            {
                src: '/projects/aggendia/landing.png',
                alt: 'Aggendia public landing page',
                label: 'Public landing',
                description: 'Main marketing page where users understand the product and start booking.'
            },
            {
                src: '/projects/aggendia/dashboard.png',
                alt: 'Aggendia dashboard',
                label: 'Business dashboard',
                description: 'Operational back-office dashboard with schedule visibility and quick actions.'
            },
            {
                src: '/projects/aggendia/createServiceModal.png',
                alt: 'Aggendia create service modal',
                label: 'Service setup',
                description: 'Modal to create a new service with duration, resources, and booking rules.'
            },
            {
                src: '/projects/aggendia/reservationFlowStep1.png',
                alt: 'Aggendia booking flow step 1',
                label: 'Booking · Step 1',
                description: 'Customer starts by choosing the desired service in the public booking flow.'
            },
            {
                src: '/projects/aggendia/reservationFlowStep2.png',
                alt: 'Aggendia booking flow step 2',
                label: 'Booking · Step 2',
                description: 'Customer selects the available resource or professional for the appointment.'
            },
            {
                src: '/projects/aggendia/reservationFlowStep3.png',
                alt: 'Aggendia booking flow step 3',
                label: 'Booking · Step 3',
                description: 'Date and time slot selection based on live availability constraints.'
            },
            {
                src: '/projects/aggendia/reservationFlowStep4.png',
                alt: 'Aggendia booking flow step 4',
                label: 'Booking · Step 4',
                description: 'Final booking confirmation screen with a summary before submission.'
            },
            {
                src: '/projects/aggendia/notificationsConfig.png',
                alt: 'Aggendia notifications configuration',
                label: 'Notifications',
                description: 'Configuration area for automated reminders via email and WhatsApp.'
            }
        ]
    }
]
