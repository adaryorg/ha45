function cyclingNumber(root: ParentNode, selector: string): number | null {
  const input = root.querySelector<HTMLInputElement>(selector)
  if (!input || input.value.trim() === "") return null
  const value = Number(input.value)
  return Number.isFinite(value) && value > 0 ? value : null
}

function cyclingTime(root: ParentNode): number | null {
  const hours = Number(root.querySelector<HTMLInputElement>("#cycle-hours")?.value || 0)
  const minutes = Number(root.querySelector<HTMLInputElement>("#cycle-minutes")?.value || 0)
  const seconds = Number(root.querySelector<HTMLInputElement>("#cycle-seconds")?.value || 0)
  const total = hours * 3600 + minutes * 60 + seconds
  return Number.isFinite(total) && total > 0 ? total : null
}

function minuteClock(seconds: number): string {
  const rounded = Math.round(seconds)
  return `${Math.floor(rounded / 60)}:${String(rounded % 60).padStart(2, "0")}`
}

function setupCyclingCalculators() {
  const root = document.querySelector<HTMLElement>(".cycling-calculators")
  if (!root) return

  const calculate = () => {
    const distance = cyclingNumber(root, "#cycle-distance")
    const distanceUnit =
      root.querySelector<HTMLSelectElement>("#cycle-distance-unit")?.value ?? "km"
    const seconds = cyclingTime(root)
    const distanceKm = distance === null ? null : distance * (distanceUnit === "mi" ? 1.609344 : 1)
    const speedKmh = root.querySelector<HTMLOutputElement>("#cycle-speed-kmh")
    const speedMph = root.querySelector<HTMLOutputElement>("#cycle-speed-mph")
    const timeKm = root.querySelector<HTMLOutputElement>("#cycle-time-km")
    if (distanceKm && seconds) {
      const kmh = distanceKm / (seconds / 3600)
      if (speedKmh) speedKmh.value = `${kmh.toFixed(1)} km/h`
      if (speedMph) speedMph.value = `${(kmh / 1.609344).toFixed(1)} mph`
      if (timeKm) timeKm.value = `${minuteClock(seconds / distanceKm)} min/km`
    } else {
      if (speedKmh) speedKmh.value = "—"
      if (speedMph) speedMph.value = "—"
      if (timeKm) timeKm.value = "—"
    }

    const chainring = cyclingNumber(root, "#gear-chainring")
    const sprocket = cyclingNumber(root, "#gear-sprocket")
    const cadence = cyclingNumber(root, "#gear-cadence")
    const wheelSelect = root.querySelector<HTMLSelectElement>("#gear-wheel")
    const customField = root.querySelector<HTMLElement>(".custom-wheel-field")
    const customWheel = cyclingNumber(root, "#gear-wheel-custom")
    const custom = wheelSelect?.value === "custom"
    if (customField) customField.hidden = !custom
    const circumferenceMm = custom ? customWheel : Number(wheelSelect?.value)
    const ratio = chainring && sprocket ? chainring / sprocket : null
    const wheelMm =
      typeof circumferenceMm === "number" && Number.isFinite(circumferenceMm) && circumferenceMm > 0
        ? circumferenceMm
        : null
    const development = ratio && wheelMm ? (ratio * wheelMm) / 1000 : null
    const wheelDiameterInches = wheelMm ? wheelMm / Math.PI / 25.4 : null
    const gearInches = ratio && wheelDiameterInches ? ratio * wheelDiameterInches : null
    const gearSpeed = development && cadence ? (development * cadence * 60) / 1000 : null
    const values: Record<string, string> = {
      "gear-ratio": ratio ? `${ratio.toFixed(2)} : 1` : "—",
      "gear-inches": gearInches ? `${gearInches.toFixed(1)}″` : "—",
      "gear-development": development ? `${development.toFixed(2)} m` : "—",
      "gear-speed": gearSpeed
        ? `${gearSpeed.toFixed(1)} km/h · ${(gearSpeed / 1.609344).toFixed(1)} mph`
        : "—",
    }
    Object.entries(values).forEach(([id, value]) => {
      const output = root.querySelector<HTMLOutputElement>(`#${id}`)
      if (output) output.value = value
    })
  }

  if (root.dataset.initialized !== "true") {
    root.dataset.initialized = "true"
    root.addEventListener("input", calculate)
    root.addEventListener("change", calculate)
  }
  calculate()
}

document.addEventListener("nav", setupCyclingCalculators)
setupCyclingCalculators()
