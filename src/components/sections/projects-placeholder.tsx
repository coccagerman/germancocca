const projectPlaceholders = [
    {
        title: 'Project highlight 01',
        description: 'A future case study for product strategy, architecture choices, and delivery outcomes.',
        stack: 'Stack placeholder'
    },
    {
        title: 'Project highlight 02',
        description: 'Reserved for a project where technical depth and business value can be shown together.',
        stack: 'Stack placeholder'
    },
    {
        title: 'Project highlight 03',
        description: 'A slot for experiments, tools, or cloud-native work worth featuring publicly.',
        stack: 'Stack placeholder'
    }
]

export function ProjectsPlaceholder() {
    return (
        <section className='space-y-10'>
            <div className='max-w-3xl space-y-4'>
                <p className='text-sm font-medium uppercase tracking-[0.28em] text-accent'>Portfolio</p>
                <h1 className='text-4xl font-semibold tracking-tight text-foreground sm:text-5xl'>
                    Selected projects will live here.
                </h1>
                <p className='text-base leading-8 text-muted sm:text-lg'>
                    This section is ready for curated project entries with descriptions, stack notes, visuals, and
                    links. For now it stays intentionally lightweight.
                </p>
            </div>

            <div className='grid gap-5 md:grid-cols-2 xl:grid-cols-3'>
                {projectPlaceholders.map(project => (
                    <article key={project.title} className='rounded-3xl border border-border bg-surface p-6'>
                        <p className='text-xs font-medium uppercase tracking-[0.24em] text-muted'>Coming soon</p>
                        <h2 className='mt-4 text-xl font-semibold text-foreground'>{project.title}</h2>
                        <p className='mt-3 text-sm leading-7 text-muted'>{project.description}</p>
                        <p className='mt-6 text-sm font-medium text-foreground'>{project.stack}</p>
                    </article>
                ))}
            </div>
        </section>
    )
}
