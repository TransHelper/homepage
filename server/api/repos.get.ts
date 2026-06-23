import { siteConfig } from "../../config/site"

interface GitHubRepo {
  name: string
  description: string | null
  html_url: string
  language: string | null
  stargazers_count: number
  topics: string[]
  homepage: string | null
  fork: boolean
}

export default defineEventHandler(async (event) => {
  const org = "Trans-Helper"
  const allowed = new Set(siteConfig.repos)
  const url = `https://api.github.com/orgs/${encodeURIComponent(org)}/repos?per_page=100&sort=updated`

  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Trans-Helper/1.0",
        Accept: "application/vnd.github+json",
      },
    })
    if (!res.ok) throw new Error(`GitHub returned ${res.status}`)
    const repos: GitHubRepo[] = await res.json()

    const data = repos
      .filter((r) => allowed.has(r.name))
      .map((r) => ({
        name: r.name,
        description: r.description ?? "",
        url: r.html_url,
        language: r.language ?? "",
        stars: r.stargazers_count,
        topics: r.topics ?? [],
        homepage: r.homepage ?? "",
      }))
      .sort((a, b) => b.stars - a.stars)

    setResponseHeader(event, "Cache-Control", "public, max-age=300, s-maxage=3600")
    setResponseHeader(event, "CDN-Cache-Control", "public, max-age=3600")
    return data
  } catch (err) {
    throw createError({ statusCode: 502, statusMessage: `Failed to fetch repos: ${err}` })
  }
})
