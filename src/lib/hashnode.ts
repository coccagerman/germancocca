const HASHNODE_ENDPOINT = 'https://gql.hashnode.com'
const HASHNODE_USERNAME = 'GerCocca'
const HASHNODE_PAGE_SIZE = 20
const HASHNODE_ERROR_BODY_PREVIEW_LENGTH = 500

export const BLOG_REVALIDATE_SECONDS = 3600

type HashnodeErrorKind = 'network' | 'http' | 'invalid-json' | 'graphql' | 'empty-data'

type HashnodePostNode = {
    title: string
    slug: string
    url: string
    publishedAt: string
    brief: string
    coverImage: { url: string } | null
    tags: Array<{ name: string; slug: string }> | null
    content: {
        html: string | null
    } | null
}

type HashnodePostsResponse = {
    user: {
        posts: {
            nodes: HashnodePostNode[]
            pageInfo: {
                hasNextPage: boolean
            }
        }
    } | null
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

const POSTS_QUERY = `
    query UserPosts($username: String!, $page: Int!, $pageSize: Int!) {
        user(username: $username) {
            posts(page: $page, pageSize: $pageSize) {
                nodes {
                    title
                    slug
                    url
                    publishedAt
                    brief
                    coverImage {
                        url
                    }
                    tags {
                        name
                        slug
                    }
                    content {
                        html
                    }
                }
                pageInfo {
                    hasNextPage
                }
            }
        }
    }
`

type HashnodeRequestErrorDetails = {
    kind: HashnodeErrorKind
    endpoint: string
    operationName: string
    requestId: string
    durationMs: number
    username: string | null
    page: number | null
    pageSize: number | null
    status?: number
    statusText?: string
    responseBodyPreview?: string
    graphqlErrors?: string[]
    causeMessage?: string
}

class HashnodeRequestError extends Error {
    readonly details: HashnodeRequestErrorDetails

    constructor(message: string, details: HashnodeRequestErrorDetails, options?: ErrorOptions) {
        super(message, options)
        this.name = 'HashnodeRequestError'
        this.details = details
    }
}

function getHashnodeOperationName(query: string) {
    const match = query.match(/query\s+([A-Za-z0-9_]+)/)

    return match?.[1] ?? 'anonymous'
}

function getHashnodeBodyPreview(body: string) {
    if (!body) {
        return ''
    }

    return body.length > HASHNODE_ERROR_BODY_PREVIEW_LENGTH
        ? `${body.slice(0, HASHNODE_ERROR_BODY_PREVIEW_LENGTH)}...`
        : body
}

function getHashnodeVariableContext(variables: Record<string, unknown>) {
    return {
        username: typeof variables.username === 'string' ? variables.username : null,
        page: typeof variables.page === 'number' ? variables.page : null,
        pageSize: typeof variables.pageSize === 'number' ? variables.pageSize : null
    }
}

function logHashnodeRequestError(error: HashnodeRequestError) {
    console.error('[hashnode] request failed', {
        ...error.details,
        message: error.message,
        vercelEnv: process.env.VERCEL_ENV ?? 'local',
        runtime: process.env.NEXT_RUNTIME ?? 'nodejs'
    })
}

function normalizeHashnodePost(node: HashnodePostNode): BlogPost {
    return {
        title: node.title,
        slug: node.slug,
        summary: node.brief,
        publishedAt: node.publishedAt,
        originalUrl: node.url,
        coverImage: node.coverImage?.url ?? null,
        tags: node.tags?.map(tag => tag.name).filter(Boolean) ?? [],
        contentHtml: node.content?.html ?? '',
        sourceLabel: 'freeCodeCamp'
    }
}

async function fetchHashnode<T>(query: string, variables: Record<string, unknown>) {
    const startedAt = Date.now()
    const requestId = crypto.randomUUID()
    const operationName = getHashnodeOperationName(query)
    const variableContext = getHashnodeVariableContext(variables)

    let response: Response

    try {
        response = await fetch(HASHNODE_ENDPOINT, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ query, variables }),
            next: {
                revalidate: BLOG_REVALIDATE_SECONDS
            }
        })
    } catch (cause) {
        const error = new HashnodeRequestError(
            `Hashnode network request failed for ${operationName}`,
            {
                kind: 'network',
                endpoint: HASHNODE_ENDPOINT,
                operationName,
                requestId,
                durationMs: Date.now() - startedAt,
                ...variableContext,
                causeMessage: cause instanceof Error ? cause.message : String(cause)
            },
            { cause: cause instanceof Error ? cause : undefined }
        )

        logHashnodeRequestError(error)
        throw error
    }

    const durationMs = Date.now() - startedAt
    const rawBody = await response.text()
    const bodyPreview = getHashnodeBodyPreview(rawBody)

    let payload: {
        data?: T
        errors?: Array<{ message: string }>
    }

    try {
        payload = rawBody
            ? ((JSON.parse(rawBody) as {
                  data?: T
                  errors?: Array<{ message: string }>
              }) ?? {})
            : {}
    } catch (cause) {
        const error = new HashnodeRequestError(
            `Hashnode returned invalid JSON for ${operationName}`,
            {
                kind: 'invalid-json',
                endpoint: HASHNODE_ENDPOINT,
                operationName,
                requestId,
                durationMs,
                ...variableContext,
                status: response.status,
                statusText: response.statusText,
                responseBodyPreview: bodyPreview,
                causeMessage: cause instanceof Error ? cause.message : String(cause)
            },
            { cause: cause instanceof Error ? cause : undefined }
        )

        logHashnodeRequestError(error)
        throw error
    }

    if (!response.ok) {
        const error = new HashnodeRequestError(`Hashnode request failed with status ${response.status}`, {
            kind: 'http',
            endpoint: HASHNODE_ENDPOINT,
            operationName,
            requestId,
            durationMs,
            ...variableContext,
            status: response.status,
            statusText: response.statusText,
            responseBodyPreview: bodyPreview
        })

        logHashnodeRequestError(error)
        throw error
    }

    if (payload.errors?.length) {
        const graphqlErrors = payload.errors.map(error => error.message)
        const error = new HashnodeRequestError(graphqlErrors.join(', '), {
            kind: 'graphql',
            endpoint: HASHNODE_ENDPOINT,
            operationName,
            requestId,
            durationMs,
            ...variableContext,
            status: response.status,
            statusText: response.statusText,
            graphqlErrors,
            responseBodyPreview: bodyPreview
        })

        logHashnodeRequestError(error)
        throw error
    }

    if (!payload.data) {
        const error = new HashnodeRequestError('Hashnode request returned no data', {
            kind: 'empty-data',
            endpoint: HASHNODE_ENDPOINT,
            operationName,
            requestId,
            durationMs,
            ...variableContext,
            status: response.status,
            statusText: response.statusText,
            responseBodyPreview: bodyPreview
        })

        logHashnodeRequestError(error)
        throw error
    }

    return payload.data
}

export async function getAllHashnodePosts() {
    const posts: BlogPost[] = []
    let page = 1
    let hasNextPage = true

    while (hasNextPage) {
        const data = await fetchHashnode<HashnodePostsResponse>(POSTS_QUERY, {
            page,
            pageSize: HASHNODE_PAGE_SIZE,
            username: HASHNODE_USERNAME
        })

        const result = data.user?.posts

        if (!result) {
            break
        }

        posts.push(...result.nodes.map(normalizeHashnodePost))
        hasNextPage = result.pageInfo.hasNextPage
        page += 1
    }

    return posts.sort((left, right) => new Date(right.publishedAt).getTime() - new Date(left.publishedAt).getTime())
}

export async function getHashnodePostBySlug(slug: string) {
    const posts = await getAllHashnodePosts()

    return posts.find(post => post.slug === slug) ?? null
}

export { normalizeHashnodePost }
