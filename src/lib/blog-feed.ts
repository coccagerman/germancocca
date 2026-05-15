const FREECODECAMP_AUTHOR_FEED_URL = 'https://www.freecodecamp.org/news/author/GerCocca/rss/'
const FEED_BODY_PREVIEW_LENGTH = 500

export const BLOG_REVALIDATE_SECONDS = 3600

type BlogFeedErrorKind = 'network' | 'http' | 'invalid-feed' | 'empty-feed'

type SerializedError = {
    name: string
    message: string
    code?: string
    errno?: number
    syscall?: string
    hostname?: string
    cause?: SerializedError
}

type BlogFeedItem = {
    title: string
    description: string
    link: string
    pubDate: string
    categories: string[]
    contentHtml: string
    coverImage: string | null
}

export type BlogPost = {
    title: string
    slug: string
    summary: string
    publishedAt: string
    originalUrl: string
    coverImage: string | null
    tags: string[]
    contentHtml: string
    sourceLabel: 'freeCodeCamp'
}

type BlogFeedRequestErrorDetails = {
    kind: BlogFeedErrorKind
    endpoint: string
    endpointHostname: string
    operationName: string
    requestId: string
    durationMs: number
    status?: number
    statusText?: string
    responseBodyPreview?: string
    causeMessage?: string
    cause?: SerializedError
}

class BlogFeedRequestError extends Error {
    readonly details: BlogFeedRequestErrorDetails

    constructor(message: string, details: BlogFeedRequestErrorDetails, options?: ErrorOptions) {
        super(message, options)
        this.name = 'BlogFeedRequestError'
        this.details = details
    }
}

function getBodyPreview(body: string) {
    if (!body) {
        return ''
    }

    return body.length > FEED_BODY_PREVIEW_LENGTH ? `${body.slice(0, FEED_BODY_PREVIEW_LENGTH)}...` : body
}

function serializeError(error: unknown, depth = 0): SerializedError | undefined {
    if (!(error instanceof Error)) {
        return undefined
    }

    const serialized: SerializedError = {
        name: error.name,
        message: error.message
    }

    const maybeCode = 'code' in error ? error.code : undefined
    const maybeErrno = 'errno' in error ? error.errno : undefined
    const maybeSyscall = 'syscall' in error ? error.syscall : undefined
    const maybeHostname = 'hostname' in error ? error.hostname : undefined

    if (typeof maybeCode === 'string') {
        serialized.code = maybeCode
    }

    if (typeof maybeErrno === 'number') {
        serialized.errno = maybeErrno
    }

    if (typeof maybeSyscall === 'string') {
        serialized.syscall = maybeSyscall
    }

    if (typeof maybeHostname === 'string') {
        serialized.hostname = maybeHostname
    }

    if (depth < 3 && 'cause' in error) {
        const nestedCause = serializeError(error.cause, depth + 1)

        if (nestedCause) {
            serialized.cause = nestedCause
        }
    }

    return serialized
}

function decodeXmlEntities(value: string) {
    return value
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
}

function stripCdata(value: string) {
    const trimmedValue = value.trim()
    const cdataMatch = trimmedValue.match(/^<!\[CDATA\[([\s\S]*?)\]\]>$/)

    return decodeXmlEntities(cdataMatch?.[1] ?? trimmedValue)
}

function getTagValue(block: string, tagName: string) {
    const pattern = new RegExp(`<${tagName}[^>]*>([\\s\\S]*?)<\\/${tagName}>`, 'i')
    const match = block.match(pattern)

    return match ? stripCdata(match[1]) : null
}

function getTagValues(block: string, tagName: string) {
    const pattern = new RegExp(`<${tagName}[^>]*>([\\s\\S]*?)<\\/${tagName}>`, 'gi')

    return Array.from(block.matchAll(pattern), match => stripCdata(match[1])).filter(Boolean)
}

function getMediaContentUrl(block: string) {
    const match = block.match(/<media:content[^>]*url="([^"]+)"/i)

    return match?.[1] ?? null
}

function getSlugFromUrl(url: string) {
    const pathnameSegments = new URL(url).pathname.split('/').filter(Boolean)

    return pathnameSegments[pathnameSegments.length - 1] ?? ''
}

function parseFreeCodeCampFeed(xml: string) {
    const itemPattern = /<item>([\s\S]*?)<\/item>/gi

    return Array.from(xml.matchAll(itemPattern), match => {
        const block = match[1]
        const title = getTagValue(block, 'title')
        const description = getTagValue(block, 'description')
        const link = getTagValue(block, 'link')
        const pubDate = getTagValue(block, 'pubDate')

        if (!title || !description || !link || !pubDate) {
            return null
        }

        return {
            title,
            description,
            link,
            pubDate,
            categories: getTagValues(block, 'category'),
            contentHtml: getTagValue(block, 'content:encoded') ?? '',
            coverImage: getMediaContentUrl(block)
        } satisfies BlogFeedItem
    }).filter((item): item is BlogFeedItem => item !== null)
}

function logBlogFeedRequestError(error: BlogFeedRequestError) {
    console.error('[blog-feed] request failed', {
        ...error.details,
        message: error.message,
        vercelEnv: process.env.VERCEL_ENV ?? 'local',
        runtime: process.env.NEXT_RUNTIME ?? 'nodejs'
    })
}

function normalizeBlogFeedPost(item: BlogFeedItem): BlogPost {
    return {
        title: item.title,
        slug: getSlugFromUrl(item.link),
        summary: item.description,
        publishedAt: new Date(item.pubDate).toISOString(),
        originalUrl: item.link,
        coverImage: item.coverImage,
        tags: item.categories,
        contentHtml: item.contentHtml,
        sourceLabel: 'freeCodeCamp'
    }
}

async function fetchBlogFeed() {
    const startedAt = Date.now()
    const requestId = crypto.randomUUID()
    const endpointHostname = new URL(FREECODECAMP_AUTHOR_FEED_URL).hostname
    const operationName = 'FreeCodeCampAuthorFeed'

    let response: Response

    try {
        response = await fetch(FREECODECAMP_AUTHOR_FEED_URL, {
            headers: {
                accept: 'application/rss+xml, application/xml, text/xml;q=0.9, */*;q=0.8'
            },
            next: {
                revalidate: BLOG_REVALIDATE_SECONDS
            }
        })
    } catch (cause) {
        const error = new BlogFeedRequestError(
            `Blog feed request failed for ${operationName}`,
            {
                kind: 'network',
                endpoint: FREECODECAMP_AUTHOR_FEED_URL,
                endpointHostname,
                operationName,
                requestId,
                durationMs: Date.now() - startedAt,
                causeMessage: cause instanceof Error ? cause.message : String(cause),
                cause: serializeError(cause)
            },
            { cause: cause instanceof Error ? cause : undefined }
        )

        logBlogFeedRequestError(error)
        throw error
    }

    const durationMs = Date.now() - startedAt
    const rawBody = await response.text()
    const bodyPreview = getBodyPreview(rawBody)

    if (!response.ok) {
        const error = new BlogFeedRequestError(`Blog feed request failed with status ${response.status}`, {
            kind: 'http',
            endpoint: FREECODECAMP_AUTHOR_FEED_URL,
            endpointHostname,
            operationName,
            requestId,
            durationMs,
            status: response.status,
            statusText: response.statusText,
            responseBodyPreview: bodyPreview
        })

        logBlogFeedRequestError(error)
        throw error
    }

    if (!/^\s*(<\?xml|<rss)/i.test(rawBody)) {
        const error = new BlogFeedRequestError(`Blog feed returned invalid XML for ${operationName}`, {
            kind: 'invalid-feed',
            endpoint: FREECODECAMP_AUTHOR_FEED_URL,
            endpointHostname,
            operationName,
            requestId,
            durationMs,
            status: response.status,
            statusText: response.statusText,
            responseBodyPreview: bodyPreview
        })

        logBlogFeedRequestError(error)
        throw error
    }

    const items = parseFreeCodeCampFeed(rawBody)

    if (items.length === 0) {
        const error = new BlogFeedRequestError('Blog feed returned no items', {
            kind: 'empty-feed',
            endpoint: FREECODECAMP_AUTHOR_FEED_URL,
            endpointHostname,
            operationName,
            requestId,
            durationMs,
            status: response.status,
            statusText: response.statusText,
            responseBodyPreview: bodyPreview
        })

        logBlogFeedRequestError(error)
        throw error
    }

    return items
}

export async function getAllBlogPosts() {
    const items = await fetchBlogFeed()

    return items
        .map(normalizeBlogFeedPost)
        .sort((left, right) => new Date(right.publishedAt).getTime() - new Date(left.publishedAt).getTime())
}

export async function getBlogPostBySlug(slug: string) {
    const posts = await getAllBlogPosts()

    return posts.find(post => post.slug === slug) ?? null
}

export { normalizeBlogFeedPost, parseFreeCodeCampFeed }