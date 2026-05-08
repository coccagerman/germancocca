'use client'

import Image from 'next/image'
import { useEffect, useId, useState } from 'react'
import { projectsCopy, type ProjectCaseStudy } from '@/lib/projects'

type ProjectsShowcaseProps = {
    projects: ProjectCaseStudy[]
}

type ProjectTab = 'general' | 'technical'

export function ProjectsShowcase({ projects }: ProjectsShowcaseProps) {
    return (
        <section className='space-y-10'>
            <div className='w-full space-y-4'>
                <p className='text-sm font-medium uppercase tracking-[0.28em] text-accent'>{projectsCopy.title}</p>
                <h1 className='text-4xl font-semibold tracking-tight text-foreground sm:text-5xl'>
                    Selected work that shows how I design, architect, and ship useful software as a developer.
                </h1>
                <p className='text-base leading-8 text-muted sm:text-lg'>{projectsCopy.subtitle}</p>
                <p className='text-sm leading-7 text-muted sm:text-base'>
                    Each project is presented to highlight product thinking, implementation depth, reliability, and the
                    engineering decisions behind the final experience.
                </p>
            </div>

            <div className='space-y-8'>
                {projects.map(project => (
                    <ProjectCaseStudyCard key={project.slug} project={project} />
                ))}
            </div>
        </section>
    )
}

function ProjectCaseStudyCard({ project }: { project: ProjectCaseStudy }) {
    const [isExpanded, setIsExpanded] = useState(true)
    const [activeTab, setActiveTab] = useState<ProjectTab>('general')
    const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null)
    const tabsId = useId()
    const accordionId = useId()

    const sections = activeTab === 'general' ? project.general : project.technical
    const activeScreenshot = activeImageIndex === null ? null : project.screenshots[activeImageIndex]

    useEffect(() => {
        if (activeImageIndex === null) {
            document.body.style.removeProperty('overflow')

            return
        }

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setActiveImageIndex(null)
            }

            if (event.key === 'ArrowRight') {
                setActiveImageIndex(current => (current === null ? 0 : (current + 1) % project.screenshots.length))
            }

            if (event.key === 'ArrowLeft') {
                setActiveImageIndex(current =>
                    current === null ? 0 : (current - 1 + project.screenshots.length) % project.screenshots.length
                )
            }
        }

        document.body.style.overflow = 'hidden'
        window.addEventListener('keydown', onKeyDown)

        return () => {
            document.body.style.removeProperty('overflow')
            window.removeEventListener('keydown', onKeyDown)
        }
    }, [activeImageIndex, project.screenshots.length])

    return (
        <article className='overflow-hidden rounded-4xl border border-border bg-surface shadow-[0_18px_45px_rgba(31,29,23,0.08)]'>
            <div className='border-b border-border/70 bg-[linear-gradient(135deg,rgba(255,253,249,0.96),rgba(246,241,232,0.72))] px-5 py-6 sm:px-8 sm:py-7'>
                <div className='flex flex-col gap-5 md:flex-row md:items-start md:justify-between'>
                    <button
                        type='button'
                        aria-expanded={isExpanded}
                        aria-controls={`${accordionId}-content`}
                        id={`${accordionId}-trigger`}
                        onClick={() => setIsExpanded(current => !current)}
                        className='flex w-full cursor-pointer items-start text-left md:flex-1'
                    >
                        <div className='space-y-2'>
                            <p className='text-xs font-semibold uppercase tracking-[0.32em] text-accent'>
                                {projectsCopy.projectLabel}
                            </p>
                            <h2 className='text-3xl font-semibold tracking-tight text-foreground sm:text-4xl'>
                                {project.name}
                            </h2>
                        </div>
                    </button>

                    <div className='flex items-start justify-end gap-3 self-end md:self-start'>
                        <a
                            href={project.url}
                            target='_blank'
                            rel='noreferrer'
                            className='inline-flex items-center justify-center rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition hover:opacity-90'
                        >
                            {projectsCopy.liveCta}
                        </a>

                        <a
                            href={project.repositoryUrl}
                            target='_blank'
                            rel='noreferrer'
                            className='inline-flex items-center justify-center rounded-full border border-border/90 bg-background/80 px-6 py-3 text-sm font-semibold text-foreground transition duration-300 ease-out hover:border-foreground/20 hover:bg-background'
                        >
                            {projectsCopy.repositoryCta}
                        </a>

                        <button
                            type='button'
                            aria-label={isExpanded ? `Collapse ${project.name}` : `Expand ${project.name}`}
                            aria-expanded={isExpanded}
                            aria-controls={`${accordionId}-content`}
                            onClick={() => setIsExpanded(current => !current)}
                            className='inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-border/90 bg-background/80 text-foreground transition duration-300 ease-out hover:border-foreground/20 hover:bg-background'
                        >
                            <svg
                                aria-hidden='true'
                                viewBox='0 0 20 20'
                                className={[
                                    'h-4 w-4 transition-transform duration-300 ease-out',
                                    isExpanded ? 'rotate-180' : 'rotate-0'
                                ].join(' ')}
                                fill='none'
                            >
                                <path
                                    d='M6 12l4-5 4 5'
                                    stroke='currentColor'
                                    strokeWidth='1.6'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <div
                id={`${accordionId}-content`}
                role='region'
                aria-labelledby={`${accordionId}-trigger`}
                aria-hidden={!isExpanded}
                className={[
                    'grid overflow-hidden transition-[grid-template-rows,opacity] duration-400 ease-out',
                    isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                ].join(' ')}
            >
                <div className={['overflow-hidden px-5 sm:px-8', isExpanded ? 'py-6 sm:py-8' : 'py-0'].join(' ')}>
                    <div className='space-y-8'>
                        <div
                            role='tablist'
                            aria-label={`Case study sections for ${project.name}`}
                            className='relative mx-auto grid w-full max-w-140 grid-cols-2 rounded-full border border-border bg-background/70 p-1.5'
                        >
                            <span
                                aria-hidden='true'
                                className={[
                                    'pointer-events-none absolute inset-y-1.5 left-1.5 w-[calc(50%-0.375rem)] rounded-full bg-foreground shadow-[0_10px_30px_rgba(31,29,23,0.16)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]',
                                    activeTab === 'general' ? 'translate-x-0' : 'translate-x-full'
                                ].join(' ')}
                            />
                            <TabButton
                                controls={`${tabsId}-general-panel`}
                                id={`${tabsId}-general-tab`}
                                isActive={activeTab === 'general'}
                                onClick={() => setActiveTab('general')}
                            >
                                {projectsCopy.generalTitle}
                            </TabButton>
                            <TabButton
                                controls={`${tabsId}-technical-panel`}
                                id={`${tabsId}-technical-tab`}
                                isActive={activeTab === 'technical'}
                                onClick={() => setActiveTab('technical')}
                            >
                                {projectsCopy.technicalTitle}
                            </TabButton>
                        </div>

                        <div
                            id={`${tabsId}-${activeTab}-panel`}
                            role='tabpanel'
                            aria-labelledby={`${tabsId}-${activeTab}-tab`}
                            className='grid gap-4 lg:grid-cols-2'
                        >
                            {sections.map(section => (
                                <div
                                    key={section.title}
                                    className='rounded-3xl border border-border bg-background/55 p-5'
                                >
                                    <h3 className='text-lg font-semibold text-foreground'>{section.title}</h3>
                                    <p className='mt-3 text-sm leading-7 text-muted sm:text-base'>
                                        {section.description}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className='mx-auto max-w-6xl space-y-5 border-t border-border/70 pt-7'>
                            <h3 className='text-2xl font-semibold tracking-tight text-foreground'>
                                {projectsCopy.screenshotsTitle}
                            </h3>
                            <div className='flex flex-wrap justify-center gap-4'>
                                {project.screenshots.map((screenshot, index) => (
                                    <button
                                        key={screenshot.src}
                                        type='button'
                                        onClick={() => setActiveImageIndex(index)}
                                        className='group w-full max-w-md flex-none cursor-pointer overflow-hidden rounded-3xl border border-border bg-surface text-left shadow-[0_14px_34px_rgba(31,29,23,0.08)] transition hover:-translate-y-1 hover:border-foreground/15 hover:shadow-[0_18px_42px_rgba(31,29,23,0.12)] sm:w-[calc(50%-0.5rem)] xl:w-[calc(33.333%-0.75rem)]'
                                        aria-label={`Open screenshot ${screenshot.label}`}
                                    >
                                        <div className='relative aspect-16/10 overflow-hidden bg-background'>
                                            <Image
                                                src={screenshot.src}
                                                alt={screenshot.alt}
                                                fill
                                                sizes='(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw'
                                                className='object-cover object-top transition duration-300 group-hover:scale-[1.02]'
                                            />
                                        </div>
                                        <div className='space-y-2 px-4 py-4'>
                                            <p className='text-sm font-semibold text-foreground'>{screenshot.label}</p>
                                            <p className='text-sm leading-6 text-muted'>{screenshot.description}</p>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {activeScreenshot ? (
                <div
                    className='fixed inset-0 z-50 flex items-center justify-center bg-foreground/80 px-3 py-6 backdrop-blur-sm sm:px-6'
                    role='dialog'
                    aria-modal='true'
                    aria-label={`Gallery viewer for ${project.name}`}
                >
                    <button
                        type='button'
                        onClick={() => setActiveImageIndex(null)}
                        className='absolute right-3 top-3 inline-flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-white/12 text-2xl text-white transition hover:bg-white/20 sm:right-6 sm:top-6'
                        aria-label={projectsCopy.closeViewer}
                    >
                        ×
                    </button>

                    <div className='flex w-full max-w-7xl items-center gap-3 sm:gap-5'>
                        <GalleryArrow
                            direction='previous'
                            onClick={() =>
                                setActiveImageIndex(current =>
                                    current === null
                                        ? 0
                                        : (current - 1 + project.screenshots.length) % project.screenshots.length
                                )
                            }
                        />

                        <div className='w-full overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#1f1d17] shadow-[0_30px_80px_rgba(0,0,0,0.45)]'>
                            <div className='relative aspect-16/10 w-full bg-[#1f1d17]'>
                                <Image
                                    src={activeScreenshot.src}
                                    alt={activeScreenshot.alt}
                                    fill
                                    sizes='100vw'
                                    className='object-contain'
                                    priority
                                />
                            </div>
                            <div className='space-y-2 px-5 py-5 text-white sm:px-7'>
                                <p className='text-lg font-semibold'>{activeScreenshot.label}</p>
                                <p className='max-w-3xl text-sm leading-7 text-white/75'>
                                    {activeScreenshot.description}
                                </p>
                            </div>
                        </div>

                        <GalleryArrow
                            direction='next'
                            onClick={() =>
                                setActiveImageIndex(current =>
                                    current === null ? 0 : (current + 1) % project.screenshots.length
                                )
                            }
                        />
                    </div>
                </div>
            ) : null}
        </article>
    )
}

function TabButton({
    children,
    controls,
    id,
    isActive,
    onClick
}: {
    children: React.ReactNode
    controls: string
    id: string
    isActive: boolean
    onClick: () => void
}) {
    return (
        <button
            type='button'
            role='tab'
            aria-controls={controls}
            aria-selected={isActive}
            id={id}
            onClick={onClick}
            className={[
                'relative z-10 flex-1 cursor-pointer rounded-full px-4 py-3 text-sm font-semibold transition-[color,transform] duration-300 ease-out sm:text-base',
                isActive ? 'text-background' : 'text-muted hover:text-foreground'
            ].join(' ')}
        >
            {children}
        </button>
    )
}

function GalleryArrow({ direction, onClick }: { direction: 'previous' | 'next'; onClick: () => void }) {
    return (
        <button
            type='button'
            onClick={onClick}
            className='hidden h-14 w-14 shrink-0 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-white/12 text-2xl text-white transition hover:bg-white/20 sm:inline-flex'
            aria-label={direction === 'previous' ? projectsCopy.previousImage : projectsCopy.nextImage}
        >
            {direction === 'previous' ? '‹' : '›'}
        </button>
    )
}
