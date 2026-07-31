import { PageFrame, PageFrameProps } from "./types"
import HeaderConstructor from "../Header"
import HealthCalculatorsConstructor from "../HealthCalculators"
import RunningCalculatorsConstructor from "../RunningCalculators"
import SiteFooterConstructor from "../SiteFooter"
import SiteHeaderConstructor from "../SiteHeader"
import TrainingCalculatorsConstructor from "../TrainingCalculators"

const Header = HeaderConstructor()
const HealthCalculators = HealthCalculatorsConstructor()
const RunningCalculators = RunningCalculatorsConstructor()
const SiteFooter = SiteFooterConstructor()
const SiteHeader = SiteHeaderConstructor()
const TrainingCalculators = TrainingCalculatorsConstructor()

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
          {componentData.fileData.slug === "calculators/body-stats" && (
            <HealthCalculators {...componentData} />
          )}
          {componentData.fileData.slug === "calculators/running" && (
            <RunningCalculators {...componentData} />
          )}
          {componentData.fileData.slug === "calculators/training" && (
            <TrainingCalculators {...componentData} />
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
