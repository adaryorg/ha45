const KG_PER_LB = 0.45359237
const CM_PER_INCH = 2.54
const ACTIVITY_FACTORS = {
  "calories-sedentary": 1.2,
  "calories-light": 1.375,
  "calories-moderate": 1.55,
  "calories-very-active": 1.725,
  "calories-extreme": 1.9,
}

function numericValue(input: HTMLInputElement | null): number | null {
  if (!input || input.value.trim() === "") return null
  const value = Number(input.value)
  return Number.isFinite(value) && value > 0 ? value : null
}

function setNumericValue(input: HTMLInputElement | null, value: number, precision = 1) {
  if (input) input.value = value.toFixed(precision).replace(/\.0$/, "")
}

function bmiCategory(bmi: number): string {
  if (bmi < 18.5) return "Underweight range"
  if (bmi < 25) return "Healthy weight range"
  if (bmi < 30) return "Overweight range"
  return "Obesity range"
}

function setupHealthCalculators() {
  const calculatorRoot = document.querySelector<HTMLElement>(".health-calculators")
  if (!calculatorRoot) return
  const root: HTMLElement = calculatorRoot

  const metricHeight = root.querySelector<HTMLInputElement>("#calculator-height-cm")
  const feetHeight = root.querySelector<HTMLInputElement>("#calculator-height-ft")
  const inchHeight = root.querySelector<HTMLInputElement>("#calculator-height-in")
  const metricWeight = root.querySelector<HTMLInputElement>("#calculator-weight-kg")
  const imperialWeight = root.querySelector<HTMLInputElement>("#calculator-weight-lb")
  const ageInput = root.querySelector<HTMLInputElement>("#calculator-age")
  const sexInput = root.querySelector<HTMLSelectElement>("#calculator-sex")
  const bmiOutput = root.querySelector<HTMLOutputElement>("#calculator-bmi")
  const bmiCategoryOutput = root.querySelector<HTMLElement>("#calculator-bmi-category")
  const bmiGauge = root.querySelector<HTMLElement>("#calculator-bmi-gauge")
  const bmiMarker = root.querySelector<HTMLElement>("#calculator-bmi-marker")

  function currentUnits() {
    return (
      root.querySelector<HTMLInputElement>('input[name="calculator-units"]:checked')?.value ??
      "metric"
    )
  }

  function measurements(): { heightCm: number | null; weightKg: number | null } {
    if (currentUnits() === "metric") {
      return { heightCm: numericValue(metricHeight), weightKg: numericValue(metricWeight) }
    }

    const feet = numericValue(feetHeight)
    const inches = inchHeight?.value.trim() === "" ? 0 : Number(inchHeight?.value)
    const pounds = numericValue(imperialWeight)
    const totalInches = feet === null || !Number.isFinite(inches) ? null : feet * 12 + inches

    return {
      heightCm: totalInches && totalInches > 0 ? totalInches * CM_PER_INCH : null,
      weightKg: pounds === null ? null : pounds * KG_PER_LB,
    }
  }

  function calculate() {
    const { heightCm, weightKg } = measurements()

    if (heightCm !== null && weightKg !== null) {
      const heightMeters = heightCm / 100
      const bmi = weightKg / (heightMeters * heightMeters)
      if (bmiOutput) bmiOutput.value = bmi.toFixed(1)
      if (bmiCategoryOutput) bmiCategoryOutput.textContent = bmiCategory(bmi)
      if (bmiGauge) {
        const gaugePosition = Math.min(100, Math.max(0, ((bmi - 15) / 25) * 100))
        bmiGauge.style.setProperty("--bmi-position", `${gaugePosition}%`)
        bmiGauge.setAttribute("aria-valuenow", bmi.toFixed(1))
        bmiGauge.setAttribute("aria-valuetext", `${bmi.toFixed(1)}, ${bmiCategory(bmi)}`)
      }
      if (bmiMarker) bmiMarker.hidden = false
    } else {
      if (bmiOutput) bmiOutput.value = "—"
      if (bmiCategoryOutput) bmiCategoryOutput.textContent = "Enter your height and weight"
      if (bmiGauge) {
        bmiGauge.removeAttribute("aria-valuenow")
        bmiGauge.removeAttribute("aria-valuetext")
      }
      if (bmiMarker) bmiMarker.hidden = true
    }

    const age = numericValue(ageInput)
    if (heightCm !== null && weightKg !== null && age !== null) {
      const sexAdjustment = sexInput?.value === "female" ? -161 : 5
      const bmr = 10 * weightKg + 6.25 * heightCm - 5 * age + sexAdjustment
      for (const [outputId, factor] of Object.entries(ACTIVITY_FACTORS)) {
        const output = root.querySelector<HTMLOutputElement>(`#${outputId}`)
        if (output) output.value = Math.round(bmr * factor).toLocaleString()
      }
    } else {
      for (const outputId of Object.keys(ACTIVITY_FACTORS)) {
        const output = root.querySelector<HTMLOutputElement>(`#${outputId}`)
        if (output) output.value = "—"
      }
    }
  }

  function switchUnits(nextUnits: string) {
    const previousUnits = root.dataset.units ?? "metric"
    if (previousUnits !== nextUnits) {
      if (nextUnits === "imperial") {
        const heightCm = numericValue(metricHeight)
        const weightKg = numericValue(metricWeight)
        if (heightCm !== null) {
          const totalInches = heightCm / CM_PER_INCH
          const feet = Math.floor(totalInches / 12)
          setNumericValue(feetHeight, feet, 0)
          setNumericValue(inchHeight, totalInches - feet * 12)
        }
        if (weightKg !== null) setNumericValue(imperialWeight, weightKg / KG_PER_LB)
      } else {
        const feet = numericValue(feetHeight)
        const inches = inchHeight?.value.trim() === "" ? 0 : Number(inchHeight?.value)
        const pounds = numericValue(imperialWeight)
        if (feet !== null && Number.isFinite(inches)) {
          setNumericValue(metricHeight, (feet * 12 + inches) * CM_PER_INCH)
        }
        if (pounds !== null) setNumericValue(metricWeight, pounds * KG_PER_LB)
      }
    }

    root.dataset.units = nextUnits
    root.querySelector<HTMLElement>(".metric-height")!.hidden = nextUnits !== "metric"
    root.querySelector<HTMLElement>(".metric-weight")!.hidden = nextUnits !== "metric"
    root.querySelector<HTMLElement>(".imperial-height")!.hidden = nextUnits !== "imperial"
    root.querySelector<HTMLElement>(".imperial-weight")!.hidden = nextUnits !== "imperial"
    calculate()
  }

  if (root.dataset.initialized !== "true") {
    root.dataset.initialized = "true"
    root.dataset.units = currentUnits()
    root.addEventListener("input", calculate)
    root.addEventListener("change", (event) => {
      const target = event.target as HTMLInputElement
      if (target.name === "calculator-units") switchUnits(target.value)
      else calculate()
    })
  }

  switchUnits(currentUnits())
}

document.addEventListener("nav", setupHealthCalculators)
setupHealthCalculators()
