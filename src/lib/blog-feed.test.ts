import { getAllBlogPosts, getBlogPostBySlug, normalizeBlogFeedPost, parseFreeCodeCampFeed } from './blog-feed'

describe('blog feed helpers', () => {
    it('normalizes freeCodeCamp feed items into the local blog model', async () => {
        expect(
            normalizeBlogFeedPost({
                title: 'How to Create an npm Library',
                description: 'Build and publish a package.',
                link: 'https://www.freecodecamp.org/news/how-to-create-an-npm-library/',
                pubDate: 'Fri, 07 Feb 2025 15:33:19 +0000',
                categories: ['npm'],
                contentHtml: '<p>Library</p>',
                coverImage: 'https://cdn.hashnode.com/image.png'
            })
        ).toEqual({
            title: 'How to Create an npm Library',
            slug: 'how-to-create-an-npm-library',
            summary: 'Build and publish a package.',
            publishedAt: '2025-02-07T15:33:19.000Z',
            originalUrl: 'https://www.freecodecamp.org/news/how-to-create-an-npm-library/',
            coverImage: 'https://cdn.hashnode.com/image.png',
            tags: ['npm'],
            contentHtml: '<p>Library</p>',
            sourceLabel: 'freeCodeCamp'
        })
    })

    it('parses RSS items including content, tags, and cover images', () => {
        const items = parseFreeCodeCampFeed(`<?xml version="1.0" encoding="UTF-8"?>
            <rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:media="http://search.yahoo.com/mrss/">
                <channel>
                    <item>
                        <title><![CDATA[Older post]]></title>
                        <description><![CDATA[Older summary]]></description>
                        <link>https://www.freecodecamp.org/news/older-post/</link>
                        <pubDate>Wed, 01 Jan 2025 00:00:00 +0000</pubDate>
                        <category><![CDATA[Architecture]]></category>
                        <media:content url="https://cdn.hashnode.com/older.png" medium="image" />
                        <content:encoded><![CDATA[<p>Older</p>]]></content:encoded>
                    </item>
                </channel>
            </rss>`)

        expect(items).toEqual([
            {
                title: 'Older post',
                description: 'Older summary',
                link: 'https://www.freecodecamp.org/news/older-post/',
                pubDate: 'Wed, 01 Jan 2025 00:00:00 +0000',
                categories: ['Architecture'],
                contentHtml: '<p>Older</p>',
                coverImage: 'https://cdn.hashnode.com/older.png'
            }
        ])
    })

    it('collects, sorts, and resolves posts from the public author RSS feed', async () => {
        const originalFetch = global.fetch

        global.fetch = jest.fn().mockResolvedValue({
            ok: true,
            status: 200,
            statusText: 'OK',
            text: async () => `<?xml version="1.0" encoding="UTF-8"?>
                <rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:media="http://search.yahoo.com/mrss/">
                    <channel>
                        <item>
                            <title><![CDATA[Older post]]></title>
                            <description><![CDATA[Older summary]]></description>
                            <link>https://www.freecodecamp.org/news/older-post/</link>
                            <pubDate>Wed, 01 Jan 2025 00:00:00 +0000</pubDate>
                            <content:encoded><![CDATA[<p>Older</p>]]></content:encoded>
                        </item>
                        <item>
                            <title><![CDATA[Newer post]]></title>
                            <description><![CDATA[Newer summary]]></description>
                            <link>https://www.freecodecamp.org/news/newer-post/</link>
                            <pubDate>Sat, 01 Feb 2025 00:00:00 +0000</pubDate>
                            <category><![CDATA[Node.js]]></category>
                            <content:encoded><![CDATA[<p>Newer</p>]]></content:encoded>
                        </item>
                    </channel>
                </rss>`
        }) as typeof fetch

        await expect(getAllBlogPosts()).resolves.toMatchObject([
            {
                title: 'Newer post',
                slug: 'newer-post',
                tags: ['Node.js']
            },
            {
                title: 'Older post',
                slug: 'older-post'
            }
        ])

        await expect(getBlogPostBySlug('newer-post')).resolves.toMatchObject({
            title: 'Newer post',
            slug: 'newer-post'
        })

        expect(global.fetch).toHaveBeenCalledTimes(2)

        global.fetch = originalFetch
    })

    it('logs structured details when the feed request fails at network level', async () => {
        const originalFetch = global.fetch
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => undefined)
        const fetchError = new TypeError('fetch failed', {
            cause: Object.assign(new Error('getaddrinfo ENOTFOUND www.freecodecamp.org'), {
                code: 'ENOTFOUND',
                errno: -3008,
                syscall: 'getaddrinfo',
                hostname: 'www.freecodecamp.org'
            })
        })

        global.fetch = jest.fn().mockRejectedValue(fetchError) as typeof fetch

        await expect(getAllBlogPosts()).rejects.toMatchObject({
            name: 'BlogFeedRequestError',
            details: expect.objectContaining({
                kind: 'network',
                endpoint: 'https://www.freecodecamp.org/news/author/GerCocca/rss/',
                endpointHostname: 'www.freecodecamp.org',
                operationName: 'FreeCodeCampAuthorFeed',
                causeMessage: 'fetch failed',
                cause: expect.objectContaining({
                    name: 'TypeError',
                    message: 'fetch failed'
                })
            })
        })

        expect(consoleErrorSpy).toHaveBeenCalledWith(
            '[blog-feed] request failed',
            expect.objectContaining({
                kind: 'network',
                endpointHostname: 'www.freecodecamp.org',
                operationName: 'FreeCodeCampAuthorFeed'
            })
        )

        consoleErrorSpy.mockRestore()
        global.fetch = originalFetch
    })

    it('logs a preview when the feed returns html instead of xml', async () => {
        const originalFetch = global.fetch
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => undefined)

        global.fetch = jest.fn().mockResolvedValue({
            ok: true,
            status: 200,
            statusText: 'OK',
            text: async () => '<!DOCTYPE html><html><head><title>Oops</title></head><body>Not XML</body></html>'
        }) as typeof fetch

        await expect(getAllBlogPosts()).rejects.toMatchObject({
            name: 'BlogFeedRequestError',
            details: expect.objectContaining({
                kind: 'invalid-feed',
                endpointHostname: 'www.freecodecamp.org',
                status: 200,
                responseBodyPreview: '<!DOCTYPE html><html><head><title>Oops</title></head><body>Not XML</body></html>'
            })
        })

        expect(consoleErrorSpy).toHaveBeenCalledWith(
            '[blog-feed] request failed',
            expect.objectContaining({
                kind: 'invalid-feed',
                endpointHostname: 'www.freecodecamp.org',
                status: 200
            })
        )

        consoleErrorSpy.mockRestore()
        global.fetch = originalFetch
    })
})