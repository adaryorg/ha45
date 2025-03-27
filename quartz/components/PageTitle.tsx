import { pathToRoot } from "../util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import { joinSegments } from "../util/path"
import { i18n } from "../i18n"

const PageTitle: QuartzComponent = ({ fileData, cfg, displayClass }: QuartzComponentProps) => {
  const title = cfg?.pageTitle ?? i18n(cfg.locale).propertyDefaults.title
  const baseDir = pathToRoot(fileData.slug!)
  const iconPath = joinSegments(baseDir, "static/Logo.png")
  return (
    <h2 class={classNames(displayClass, "page-title")}>
      <a href={baseDir}>
          <img class="Logo" src={iconPath} alt={title}/>
      </a>
    </h2>
  )
}

PageTitle.css = `
.page-title {
  text-align: center;
  font-size: 1.75rem;
  margin: 0;
  font-family: var(--titleFont);
}
.Logo {
 max-height: 650px;
 min-height: 50px;
 max-width: 240px;
 min-width: 50px;
 object-fit: cover;
 }
`

export default (() => PageTitle) satisfies QuartzComponentConstructor
