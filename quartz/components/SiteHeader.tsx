import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { FullSlug, joinSegments, pathToRoot } from "../util/path"

const navigation = [
  { label: "Home", path: "", matches: (slug: string) => slug === "index" },
  { label: "Blog", path: "articles", matches: (slug: string) => slug.startsWith("articles") },
  { label: "Recipes", path: "recipes", matches: (slug: string) => slug.startsWith("recipes") },
  { label: "About", path: "about", matches: (slug: string) => slug === "about" },
]

const calculatorNavigation = [
  { label: "Overview", path: "calculators" },
  { label: "Body Stats", path: "calculators/body-stats" },
  { label: "Running", path: "calculators/running" },
  { label: "Cycling", path: "calculators/cycling" },
  { label: "Training", path: "calculators/training" },
]

const SiteHeader: QuartzComponent = ({ fileData, cfg }: QuartzComponentProps) => {
  const slug = fileData.slug ?? ("index" as FullSlug)
  const baseDir = pathToRoot(slug)

  return (
    <div class="site-nav">
      <a class="site-nav-brand" href={baseDir} aria-label={`${cfg.pageTitle} home`}>
        <img
          src={joinSegments(baseDir, "static/ha45-logo-header-v3.png")}
          alt=""
          width="84"
          height="84"
        />
        <span class="site-nav-name">
          Healthy After <strong>45</strong>
        </span>
      </a>
      <p class="site-nav-tagline">
        No miracles. <strong>No nonsense.</strong> Just the work.
      </p>
      <nav aria-label="Main navigation">
        <ul>
          {navigation.map((item) => {
            const active = item.matches(slug)
            const href = item.path === "" ? baseDir : joinSegments(baseDir, item.path)

            return (
              <li>
                <a href={href} aria-current={active ? "page" : undefined}>
                  {item.label}
                </a>
              </li>
            )
          })}
          <li class="nav-dropdown">
            <details>
              <summary aria-current={slug.startsWith("calculators") ? "page" : undefined}>
                Calculators <span aria-hidden="true">▾</span>
              </summary>
              <ul class="nav-submenu">
                {calculatorNavigation.map((item) => (
                  <li>
                    <a
                      href={joinSegments(baseDir, item.path)}
                      aria-current={
                        slug === item.path ||
                        (item.path === "calculators" && slug === "calculators/index")
                          ? "page"
                          : undefined
                      }
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </details>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default (() => SiteHeader) satisfies QuartzComponentConstructor
