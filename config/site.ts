export const siteConfig = {
  title: 'Trans-Helper',
  description:
    'Building practical open-source software and infrastructure for the transgender community.',

  email: '',

  social: {
    github: 'Trans-Helper',
    twitter: undefined as string | undefined,
    discord: 'DjjztJKFuw' as string | undefined,
  },

  repos: ['Trans-Search', 'homepage', 'trans-search-coming-soon-page', 'icon'],
}

export type SiteConfig = typeof siteConfig
