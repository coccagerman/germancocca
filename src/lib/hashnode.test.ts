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
                status: 200,
                statusText: 'OK',
                text: async () =>
                    JSON.stringify({
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
                    }),
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
                status: 200,
                statusText: 'OK',
                text: async () =>
                    JSON.stringify({
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
                    }),
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

    it('logs structured details when the network request fails', async () => {
        const originalFetch = global.fetch
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => undefined)

        global.fetch = jest.fn().mockRejectedValue(new Error('getaddrinfo ENOTFOUND gql.hashnode.com')) as typeof fetch

        await expect(getAllHashnodePosts()).rejects.toMatchObject({
            name: 'HashnodeRequestError',
            details: expect.objectContaining({
                kind: 'network',
                endpoint: 'https://gql.hashnode.com',
                operationName: 'UserPosts',
                username: 'GerCocca',
                page: 1,
                pageSize: 20,
                causeMessage: 'getaddrinfo ENOTFOUND gql.hashnode.com'
            })
        })

        expect(consoleErrorSpy).toHaveBeenCalledWith(
            '[hashnode] request failed',
            expect.objectContaining({
                kind: 'network',
                endpoint: 'https://gql.hashnode.com',
                operationName: 'UserPosts',
                username: 'GerCocca',
                page: 1,
                pageSize: 20,
                causeMessage: 'getaddrinfo ENOTFOUND gql.hashnode.com'
            })
        )

        consoleErrorSpy.mockRestore()
        global.fetch = originalFetch
    })

    it('logs the response payload preview when Hashnode returns a non-ok response', async () => {
        const originalFetch = global.fetch
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => undefined)

        global.fetch = jest.fn().mockResolvedValue({
            ok: false,
            status: 403,
            statusText: 'Forbidden',
            text: async () => '{"errors":[{"message":"Forbidden"}]}'
        }) as typeof fetch

        await expect(getAllHashnodePosts()).rejects.toMatchObject({
            name: 'HashnodeRequestError',
            details: expect.objectContaining({
                kind: 'http',
                status: 403,
                statusText: 'Forbidden',
                responseBodyPreview: '{"errors":[{"message":"Forbidden"}]}'
            })
        })

        expect(consoleErrorSpy).toHaveBeenCalledWith(
            '[hashnode] request failed',
            expect.objectContaining({
                kind: 'http',
                status: 403,
                statusText: 'Forbidden',
                responseBodyPreview: '{"errors":[{"message":"Forbidden"}]}'
            })
        )

        consoleErrorSpy.mockRestore()
        global.fetch = originalFetch
    })
})
