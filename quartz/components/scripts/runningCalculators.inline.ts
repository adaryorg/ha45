function positiveNumber(root: ParentNode, selector: string): number | null {
  const value = Number(root.querySelector<HTMLInputElement>(selector)?.value)
  return Number.isFinite(value) && value > 0 ? value : null
}

function elapsedSeconds(root: ParentNode, prefix: string): number | null {
  const hours = Number(root.querySelector<HTMLInputElement>(`#${prefix}-hours`)?.value || 0)
  const minutes = Number(root.querySelector<HTMLInputElement>(`#${prefix}-minutes`)?.value || 0)
  const seconds = Number(root.querySelector<HTMLInputElement>(`#${prefix}-seconds`)?.value || 0)
  const total = hours * 3600 + minutes * 60 + seconds
  return Number.isFinite(total) && total > 0 ? total : null
}

function clock(seconds: number, pace = false): string {
  const rounded = Math.round(seconds)
  const h = Math.floor(rounded / 3600)
  const m = Math.floor((rounded % 3600) / 60)
  const s = rounded % 60
  return h > 0 && !pace
    ? `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`
    : `${h > 0 ? h * 60 + m : m}:${String(s).padStart(2, "0")}`
}

function setupRunningCalculators() {
  const root = document.querySelector<HTMLElement>(".running-calculators")
  if (!root) return
  const calculate = () => {
    const distance = positiveNumber(root, "#run-distance")
    const unit = root.querySelector<HTMLSelectElement>("#run-distance-unit")?.value ?? "km"
    const seconds = elapsedSeconds(root, "run")
    const distanceKm = distance === null ? null : distance * (unit === "mi" ? 1.609344 : 1)
    const paceKm = root.querySelector<HTMLOutputElement>("#run-pace-km")
    const paceMi = root.querySelector<HTMLOutputElement>("#run-pace-mi")
    const speed = root.querySelector<HTMLOutputElement>("#run-speed")
    if (distanceKm && seconds) {
      if (paceKm) paceKm.value = `${clock(seconds / distanceKm, true)} /km`
      if (paceMi) paceMi.value = `${clock((seconds / distanceKm) * 1.609344, true)} /mi`
      if (speed) speed.value = `${(distanceKm / (seconds / 3600)).toFixed(1)} km/h`
    } else {
      if (paceKm) paceKm.value = "—"
      if (paceMi) paceMi.value = "—"
      if (speed) speed.value = "—"
    }

    const source = Number(root.querySelector<HTMLSelectElement>("#race-source-distance")?.value)
    const target = Number(root.querySelector<HTMLSelectElement>("#race-target-distance")?.value)
    const raceSeconds = elapsedSeconds(root, "race")
    const prediction = root.querySelector<HTMLOutputElement>("#race-prediction")
    if (prediction)
      prediction.value = raceSeconds ? clock(raceSeconds * Math.pow(target / source, 1.06)) : "—"
  }
  if (root.dataset.initialized !== "true") {
    root.dataset.initialized = "true"
    root.addEventListener("input", calculate)
    root.addEventListener("change", calculate)
  }
  calculate()
}

document.addEventListener("nav", setupRunningCalculators)
setupRunningCalculators()
