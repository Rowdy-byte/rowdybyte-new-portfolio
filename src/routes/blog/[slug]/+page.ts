export async function load({ params, url, data }) {

    const article = await import(`../${params.slug}.md`)

    return {
        content: article.default,
        meta: article.metadata,
        url,
        data
    }
}

