export type JourneyEntry = {
    kind: 'experience' | 'education'
    period: string
    role: string
    organization: string
    story: string
    focus: string
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
        focus: "I lead frontend modernization for a banking platform used by 150+ internal users and 1,500+ enterprise clients, including a 130k+ line migration to Next.js and one of the bank's first microfrontend integrations.",
        lesson: 'This stage strengthened my ability to lead high-stakes frontend work, align technical decisions with enterprise constraints, and deliver with consistency in operationally sensitive environments.',
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
        focus: 'I led frontend implementation across five internal and client-facing AdTech products, helping the team accelerate delivery while mentoring junior developers and keeping multiple product tracks moving at once.',
        lesson: 'That consulting work sharpened my adaptability, prioritization, and ability to turn fragmented requirements into repeatable frontend systems.',
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
        focus: 'I published 36 technical articles on JavaScript, React, frontend development, and software engineering for a global developer audience, translating complex topics into practical learning material.',
        lesson: 'That work made my technical communication sharper and pushed me toward solutions that other engineers can understand, review, and maintain more easily.',
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
        focus: 'I built frontend workflows for candidates, recruiters, and clients in a recruiting platform serving LATAM talent and international hiring teams, balancing product clarity across very different user needs.',
        lesson: 'It reinforced that strong frontend delivery depends on product understanding, cross-functional collaboration, and careful execution across every user touchpoint.',
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
        focus: 'This degree gave formal structure to the practical work I was already doing in product teams, especially around systems analysis, problem framing, and communication.',
        lesson: 'It reinforced the value of pairing practical delivery experience with a stronger analytical and conceptual foundation.',
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
        focus: 'I built customizable recruiting portals for multinational clients such as HSBC, DHL, KPMG, McLaren, and Philip Morris, working inside a mature enterprise product and distributed delivery model.',
        lesson: 'It taught me how to operate inside large product environments, respect delivery processes, and build with consistency instead of improvisation.',
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
        focus: 'I mentored cohorts of 50 to 80 students in JavaScript, React, and Node.js through live classes, project reviews, and ongoing technical guidance.',
        lesson: 'It strengthened my patience, feedback skills, and ability to help others move forward without lowering technical rigor.',
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
        focus: 'This was the point where a career transition became tangible: intensive project-based learning turned curiosity about programming into a concrete path I could practice every day.',
        lesson: 'It accelerated my execution speed and helped turn curiosity into a disciplined habit of building and learning by shipping.',
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
        focus: 'Before moving into software, I worked across HR, talent, and recruiting roles in companies like YPF, Talently, and R/GA, gaining direct exposure to how teams hire, communicate, and make business decisions.',
        lesson: 'Those years gave me a durable business lens: I naturally think about relationships, trust, incentives, and the human side of delivery alongside the implementation layer.',
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
        focus: 'This degree deepened my understanding of organizations, labour dynamics, and the human systems that shape business decisions long before software became my day-to-day work.',
        lesson: 'It still influences how I pay attention to incentives, communication, and people dynamics while building software.',
        highlights: ['Organizational understanding', 'People dynamics', 'Business perspective'],
        url: 'https://www.unlam.edu.ar/',
        logoSrc: '/universidad_nacional_de_la_matanza_logo.jpeg',
        logoAlt: 'Universidad Nacional de La Matanza logo'
    }
]
