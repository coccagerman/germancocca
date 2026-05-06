const HASHNODE_ENDPOINT = 'https://gql.hashnode.com'
const HASHNODE_USERNAME = 'GerCocca'
const HASHNODE_PAGE_SIZE = 20

export const BLOG_REVALIDATE_SECONDS = 3600

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
    const response = await fetch(HASHNODE_ENDPOINT, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({ query, variables }),
        next: {
            revalidate: BLOG_REVALIDATE_SECONDS
        }
    })

    if (!response.ok) {
        throw new Error(`Hashnode request failed with status ${response.status}`)
    }

    const payload = (await response.json()) as {
        data?: T
        errors?: Array<{ message: string }>
    }

    if (payload.errors?.length) {
        throw new Error(payload.errors.map(error => error.message).join(', '))
    }

    if (!payload.data) {
        throw new Error('Hashnode request returned no data')
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
