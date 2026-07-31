import { QuartzComponent, QuartzComponentConstructor } from "./types"

const SiteFooter: QuartzComponent = () => {
  const year = new Date().getFullYear()

  return (
    <footer class="site-footer">
      <p>&copy; {year} Healthy After 45</p>
      <a href="https://discord.gg/Jn3c7rbAg">Healthy After 45 Discord</a>
    </footer>
  )
}

export default (() => SiteFooter) satisfies QuartzComponentConstructor
