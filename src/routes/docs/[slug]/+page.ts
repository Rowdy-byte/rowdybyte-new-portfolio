export async function load({ params, url }) {

    const article = await import(`../${params.slug}.md`)

    return {
        content: article.default,
        meta: article.metadata,
        url
    }
}
