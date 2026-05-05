type SiteShellProps = {
    children: React.ReactNode
}

export function SiteShell({ children }: SiteShellProps) {
    return <div className='mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 sm:px-10 lg:px-12'>{children}</div>
}
