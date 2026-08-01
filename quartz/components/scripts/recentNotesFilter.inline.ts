const RECENT_NOTES_LIMIT = 5
const RECENT_NOTES_EXCLUDED = new Set(["", "404", "index", "about", "disclaimer", "calculators"])

function recentNoteSlug(link: HTMLAnchorElement): string {
  const url = new URL(link.href, window.location.href)
  return url.pathname.replace(/^\/+|\/+$/g, "").toLowerCase()
}

function setupRecentNotesFilter() {
  for (const list of document.querySelectorAll<HTMLUListElement>(".recent-notes .recent-ul")) {
    let included = 0

    for (const item of list.querySelectorAll<HTMLElement>(":scope > .recent-li")) {
      const link = item.querySelector<HTMLAnchorElement>("a.internal")
      const slug = link ? recentNoteSlug(link) : ""
      const excluded = RECENT_NOTES_EXCLUDED.has(slug) || slug.startsWith("calculators/")
      const visible = !excluded && included < RECENT_NOTES_LIMIT

      item.hidden = !visible
      if (visible) included += 1
    }
  }
}

document.addEventListener("nav", setupRecentNotesFilter)
setupRecentNotesFilter()
