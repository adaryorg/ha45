import { QuartzComponent, QuartzComponentConstructor } from "./types"

const SiteFooter: QuartzComponent = () => {
  const year = new Date().getFullYear()

  return (
    <footer class="site-footer">
      <div class="site-footer-credits">
        <p>&copy; {year} Healthy After 45</p>
        <p>
          Created with{" "}
          <a href="https://quartz.jzhao.xyz/">
            <strong>Quartz v5.0.0</strong>
          </a>{" "}
          &copy; 2026
        </p>
      </div>
      <a href="https://discord.gg/Jn3c7rbAg">Healthy After 45 Discord</a>
    </footer>
  )
}

export default (() => SiteFooter) satisfies QuartzComponentConstructor
