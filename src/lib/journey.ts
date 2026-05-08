export type JourneyEntry = {
    kind: 'experience' | 'education'
    period: string
    role: string
    organization: string
    story: string
    lesson: string
    highlights: string[]
    url?: string
    logoSrc?: string
    logoAlt?: string
    logoLabel?: string
}

export const journeyIntro = {
    eyebrow: 'My journey',
    title: 'A path shaped by engineering, people work, and business context.',
    description:
        'I did not arrive at software through a single straight line. Each role added a different lens: building products, mentoring people, writing clearly, working with stakeholders, and understanding how businesses actually operate under pressure.',
    bridge: 'That mix now shapes how I work: I can go deep on frontend, cloud, and product implementation, while still keeping communication, collaboration, and business context very close to the work.'
} as const

export const journeyEntries: JourneyEntry[] = [
    {
        kind: 'experience',
        period: '2022 - Present',
        role: 'Senior Full Stack Developer',
        organization: 'Comafi',
        story: 'I work on a financial platform used every day by banking teams and enterprise clients, where reliability, clarity, and delivery discipline matter as much as the code itself.',
        lesson: 'This stage sharpened my ability to modernize large systems, coordinate across architecture, backend, and product, and ship software that operates under real operational pressure.',
        highlights: ['Next.js migration at scale', 'AWS serverless architecture', 'Cross-team technical leadership'],
        url: 'https://www.comafi.com.ar/',
        logoSrc: '/banco_comafi_logo.jpeg',
        logoAlt: 'Banco Comafi logo'
    },
    {
        kind: 'experience',
        period: '2023 - 2025',
        role: 'Frontend Consultant',
        organization: 'Groovinads',
        story: 'While working in finance, I also partnered with an AdTech company to help modernize several internal and client-facing platforms with a faster frontend delivery cadence.',
        lesson: 'Consulting across products strengthened my adaptability, prioritization, and ability to turn messy requirements into reusable implementation patterns.',
        highlights: ['Multiple products in parallel', 'Faster delivery systems', 'Mentoring junior developers'],
        url: 'https://www.groovinads.com/',
        logoSrc: '/groovinads_logo.jpeg',
        logoAlt: 'Groovinads logo'
    },
    {
        kind: 'experience',
        period: '2022 - 2024',
        role: 'Technical Author',
        organization: 'freeCodeCamp',
        story: 'Writing 36 technical articles forced me to slow down, understand fundamentals deeply, and explain complex frontend ideas to a global audience of developers.',
        lesson: 'Teaching through writing made my communication sharper and made me better at designing solutions that are easier for other engineers to understand and maintain.',
        highlights: ['Clear technical communication', 'Developer education', 'Structured thinking'],
        url: 'https://www.freecodecamp.org/news/author/GerCocca/',
        logoSrc: '/free_code_camp_logo.jpeg',
        logoAlt: 'freeCodeCamp logo'
    },
    {
        kind: 'experience',
        period: '2022 - 2023',
        role: 'Frontend Consultant',
        organization: 'Tecla',
        story: 'At Tecla, I helped build recruiting workflows for candidates, recruiters, and clients, where product clarity and empathy for different user groups were essential.',
        lesson: 'This reinforced how good frontend work sits at the intersection of product understanding, collaboration, and careful execution.',
        highlights: ['User-centered workflows', 'Stakeholder collaboration', 'Product-minded frontend delivery'],
        url: 'https://www.tecla.io/',
        logoSrc: '/tecla_io_logo.jpeg',
        logoAlt: 'Tecla logo'
    },
    {
        kind: 'education',
        period: '2022 - 2024',
        role: 'Systems Analyst',
        organization: 'UAI - Universidad Abierta Interamericana',
        story: 'Formal studies gave more structure to the hands-on path I was already building in product teams, especially around analysis, systems thinking, and communication.',
        lesson: 'It reinforced the value of connecting practical delivery with a stronger conceptual foundation.',
        highlights: ['Systems thinking', 'Formal analysis', 'Structured learning'],
        url: 'https://uai.edu.ar/',
        logoSrc: '/universidad_abierta_interamericana_2_logo.jpeg',
        logoAlt: 'Universidad Abierta Interamericana logo'
    },
    {
        kind: 'experience',
        period: '2021 - 2022',
        role: 'Frontend Developer',
        organization: 'Avature',
        story: 'Building recruiting portals for multinational companies was my first close exposure to enterprise software, distributed teams, and the reality of shipping for demanding clients.',
        lesson: 'This was where I learned to operate inside large product environments, respect delivery processes, and build with consistency rather than improvisation.',
        highlights: ['Enterprise product discipline', 'Distributed teamwork', 'Client-specific delivery'],
        url: 'https://www.avature.net/',
        logoSrc: '/avature_logo.jpeg',
        logoAlt: 'Avature logo'
    },
    {
        kind: 'experience',
        period: '2022 - 2023',
        role: 'Assistant Teacher',
        organization: 'Coderhouse',
        story: 'Mentoring dozens of students in JavaScript, React, and Node.js gave me repeated practice in turning confusion into momentum and helping people grow with confidence.',
        lesson: 'It strengthened patience, feedback skills, and the ability to guide others without losing technical rigor.',
        highlights: ['Live mentoring', 'Technical feedback', 'Empathy under pressure'],
        url: 'https://www.coderhouse.com/',
        logoSrc: '/coderhouse_logo.jpeg',
        logoAlt: 'Coderhouse logo'
    },
    {
        kind: 'education',
        period: '2020 - 2022',
        role: 'Full Stack Developer Bootcamp',
        organization: 'Coderhouse',
        story: 'During the pandemic, I wanted to learn something completely new and felt motivated to try my luck with programming. The bootcamp gave that curiosity a concrete path and a fast feedback loop.',
        lesson: 'It accelerated execution speed and helped turn curiosity into a disciplined building habit.',
        highlights: ['Fast iteration', 'Project-based learning', 'Career transition'],
        url: 'https://www.coderhouse.com/',
        logoSrc: '/coderhouse_logo.jpeg',
        logoAlt: 'Coderhouse logo'
    },
    {
        kind: 'experience',
        period: '2015 - 2021',
        role: 'People, recruiting, and business roles',
        organization: 'YPF, Talently, and R/GA',
        story: 'Before software became the center of my work, I spent years in HR, talent, and recruiting roles, learning how organizations hire, communicate, and make decisions around people and business priorities.',
        lesson: 'Those years gave me a durable business lens: I naturally think about relationships, trust, incentives, and the human side of delivery, not just the implementation layer.',
        highlights: ['Business context', 'Communication across functions', 'People-first decision making'],
        url: 'https://ypf.com/',
        logoSrc: '/ypf_s_a__logo.jpeg',
        logoAlt: 'YPF logo'
    },
    {
        kind: 'education',
        period: '2011 - 2017',
        role: 'Labour Relations degree',
        organization: 'Universidad Nacional de La Matanza',
        story: 'Long before working in software, this academic path deepened my understanding of organizations, labour dynamics, and the human systems behind business decisions.',
        lesson: 'It remains part of why I naturally pay attention to incentives, communication, and people dynamics while building software.',
        highlights: ['Organizational understanding', 'People dynamics', 'Business perspective'],
        url: 'https://www.unlam.edu.ar/',
        logoSrc: '/universidad_nacional_de_la_matanza_logo.jpeg',
        logoAlt: 'Universidad Nacional de La Matanza logo'
    }
]
