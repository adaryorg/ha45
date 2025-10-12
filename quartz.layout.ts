import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"
import { SimpleSlug } from "./quartz/util/path"

const recentNotes = [
  Component.RecentNotes({
    title: "Recent Articles",
    limit: 3,
    filter: (f) =>
      f.slug!.startsWith("Articles/") && f.slug! !== "Articles/index" && !f.frontmatter?.noindex,
    linkToMore: "Articles/" as SimpleSlug,
    showTags: false,
  }),
  Component.RecentNotes({
    title: "Recent nutrition data",
    limit: 2,
    filter: (f) => f.slug!.startsWith("nutrition_log"),
    linkToMore: "nutrition_logi/" as SimpleSlug,
    showTags: false,
  }),
  Component.RecentNotes({
    title: "Recent execrise data",
    limit: 2,
    filter: (f) => f.slug!.startsWith("daily_logs/"),
    linkToMore: "daily_logs/" as SimpleSlug,
    showTags: false,
  }),
]

export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [...recentNotes.map((c) => Component.MobileOnly(c))],
  Component.Comments({
    provider: 'giscus',
    options: {
      // from data-repo
      repo: 'adaryorg/ha45',
      // from data-repo-id
      repoId: 'R_kgDOONKu_A',
      // from data-category
      category: 'Announcements',
      // from data-category-id
      categoryId: 'DIC_kwDOONKu_M4CojWn',
    }
  }),
  ],
  footer: Component.Footer({
    links: {
      Email: "mailto:ha45@ha45.org",
      "Discord Community": "https://discord.gg/fPEUghFU",
    },
  }),
}

const left = [
  Component.PageTitle(),
  Component.MobileOnly(Component.Spacer()),
  Component.Flex({
    components: [
      {
        Component: Component.Search(),
        grow: true,
      },
      { Component: Component.Darkmode() },
    ],
  }),
  ...recentNotes.map((c) => Component.DesktopOnly(c)),
]

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [Component.ArticleTitle(), Component.ContentMeta(), Component.TagList()],
  left,
  right: [
    Component.Graph({
      localGraph: {
        showTags: false,
      },
      globalGraph: {
        showTags: false,
      },
    }),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.ArticleTitle(), Component.ContentMeta()],
  left,
  right: [],
}

