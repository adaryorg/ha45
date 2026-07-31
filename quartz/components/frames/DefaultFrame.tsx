import { PageFrame, PageFrameProps } from "./types"
import HeaderConstructor from "../Header"
import HealthCalculatorsConstructor from "../HealthCalculators"
import SiteFooterConstructor from "../SiteFooter"
import SiteHeaderConstructor from "../SiteHeader"

const Header = HeaderConstructor()
const HealthCalculators = HealthCalculatorsConstructor()
const SiteFooter = SiteFooterConstructor()
const SiteHeader = SiteHeaderConstructor()

/**
 * The default page frame — three-column layout with left sidebar, center
 * content (header + body + afterBody), and right sidebar, followed by a footer.
 *
 * This is the original Quartz layout, extracted from renderPage.tsx.
 */
export const DefaultFrame: PageFrame = {
  name: "default",
  render({
    componentData,
    header,
    beforeBody,
    pageBody: Content,
    afterBody,
    left,
  }: PageFrameProps) {
    return (
      <>
        <div class="site-header-shell">
          <SiteHeader {...componentData} />
        </div>
        <div class="left sidebar">
          {left.map((BodyComponent) => (
            <BodyComponent {...componentData} />
          ))}
        </div>
        <div class="center">
          <div class="page-header">
            <Header {...componentData}>
              {header.map((HeaderComponent) => (
                <HeaderComponent {...componentData} />
              ))}
            </Header>
            <div class="popover-hint">
              {beforeBody.map((BodyComponent) => (
                <BodyComponent {...componentData} />
              ))}
            </div>
          </div>
          <Content {...componentData} />
          {componentData.fileData.slug === "calculators" && (
            <HealthCalculators {...componentData} />
          )}
          <hr />
          <div class="page-footer">
            {afterBody.map((BodyComponent) => (
              <BodyComponent {...componentData} />
            ))}
          </div>
        </div>
        <SiteFooter {...componentData} />
      </>
    )
  },
}
