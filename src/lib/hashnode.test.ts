import { getAllHashnodePosts, normalizeHashnodePost } from './hashnode'

describe('hashnode helpers', () => {
    it('normalizes Hashnode posts into the local blog model', () => {
        expect(
            normalizeHashnodePost({
                title: 'How to Create an npm Library',
                slug: 'how-to-create-an-npm-library',
                url: 'https://freecodecamp.org/news/how-to-create-an-npm-library',
                publishedAt: '2025-02-07T15:33:19.302Z',
                brief: 'Build and publish a package.',
                coverImage: { url: 'https://cdn.hashnode.com/image.png' },
                tags: [{ name: 'npm', slug: 'npm' }],
                content: { html: '<p>Library</p>' }
            })
        ).toEqual({
            title: 'How to Create an npm Library',
            slug: 'how-to-create-an-npm-library',
            summary: 'Build and publish a package.',
            publishedAt: '2025-02-07T15:33:19.302Z',
            originalUrl: 'https://freecodecamp.org/news/how-to-create-an-npm-library',
            coverImage: 'https://cdn.hashnode.com/image.png',
            tags: ['npm'],
            contentHtml: '<p>Library</p>',
            sourceLabel: 'freeCodeCamp'
        })
    })

    it('collects and sorts posts from the Hashnode API', async () => {
        const fetchMock = jest.fn()

        fetchMock
            .mockResolvedValueOnce({
                ok: true,
                json: async () => ({
                    data: {
                        user: {
                            posts: {
                                nodes: [
                                    {
                                        title: 'Older post',
                                        slug: 'older-post',
                                        url: 'https://freecodecamp.org/news/older-post',
                                        publishedAt: '2025-01-01T00:00:00.000Z',
                                        brief: 'Older summary',
                                        coverImage: null,
                                        tags: [],
                                        content: { html: '<p>Older</p>' }
                                    }
                                ],
                                pageInfo: {
                                    hasNextPage: true
                                }
                            }
                        }
                    }
                })
            })
            .mockResolvedValueOnce({
                ok: true,
                json: async () => ({
                    data: {
                        user: {
                            posts: {
                                nodes: [
                                    {
                                        title: 'Newer post',
                                        slug: 'newer-post',
                                        url: 'https://freecodecamp.org/news/newer-post',
                                        publishedAt: '2025-02-01T00:00:00.000Z',
                                        brief: 'Newer summary',
                                        coverImage: null,
                                        tags: [],
                                        content: { html: '<p>Newer</p>' }
                                    }
                                ],
                                pageInfo: {
                                    hasNextPage: false
                                }
                            }
                        }
                    }
                })
            })

        const originalFetch = global.fetch
        global.fetch = fetchMock as typeof fetch

        await expect(getAllHashnodePosts()).resolves.toMatchObject([
            {
                title: 'Newer post',
                slug: 'newer-post'
            },
            {
                title: 'Older post',
                slug: 'older-post'
            }
        ])

        expect(fetchMock).toHaveBeenCalledTimes(2)

        global.fetch = originalFetch
    })
})
