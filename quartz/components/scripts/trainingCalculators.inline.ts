function trainingValue(root: ParentNode, selector: string): number | null {
  const value = Number(root.querySelector<HTMLInputElement>(selector)?.value)
  return Number.isFinite(value) && value > 0 ? value : null
}

function setupTrainingCalculators() {
  const root = document.querySelector<HTMLElement>(".training-calculators")
  if (!root) return
  const calculate = () => {
    const age = trainingValue(root, "#zone-age")
    const measuredMax = trainingValue(root, "#zone-max")
    const maxHr = measuredMax ?? (age ? 220 - age : null)
    const basis = root.querySelector<HTMLElement>("#zone-basis")
    if (basis)
      basis.textContent = maxHr
        ? `${measuredMax ? "Measured" : "Estimated"} maximum: ${Math.round(maxHr)} bpm`
        : "Enter your age, or use a measured maximum."
    const bounds = [
      [50, 60],
      [60, 70],
      [70, 80],
      [80, 90],
      [90, 100],
    ]
    bounds.forEach(([low, high], index) => {
      const output = root.querySelector<HTMLOutputElement>(`#zone-${index + 1}`)
      if (output)
        output.value = maxHr
          ? `${Math.round((maxHr * low) / 100)}–${Math.round((maxHr * high) / 100)} bpm`
          : "—"
    })

    const weight = trainingValue(root, "#orm-weight")
    const reps = trainingValue(root, "#orm-reps")
    const unit = root.querySelector<HTMLSelectElement>("#orm-unit")?.value ?? "kg"
    const result = root.querySelector<HTMLOutputElement>("#orm-result")
    const valid = weight && reps && reps <= 12
    const oneRm = valid
      ? reps === 1
        ? weight
        : (weight * (1 + reps / 30) + (weight * 36) / (37 - reps)) / 2
      : null
    if (result) result.value = oneRm ? `${oneRm.toFixed(1)} ${unit}` : "—"
    ;[90, 80, 70, 60, 50].forEach((percent) => {
      const output = root.querySelector<HTMLOutputElement>(`#orm-${percent}`)
      if (output) output.value = oneRm ? `${((oneRm * percent) / 100).toFixed(1)} ${unit}` : "—"
    })
  }
  if (root.dataset.initialized !== "true") {
    root.dataset.initialized = "true"
    root.addEventListener("input", calculate)
    root.addEventListener("change", calculate)
  }
  calculate()
}

document.addEventListener("nav", setupTrainingCalculators)
setupTrainingCalculators()
