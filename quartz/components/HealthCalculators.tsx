import { QuartzComponent, QuartzComponentConstructor } from "./types"

const HealthCalculators: QuartzComponent = () => {
  return (
    <section class="health-calculators" aria-label="Body statistics calculators">
      <div class="calculator-toolbar">
        <span class="calculator-toolbar-label">Units</span>
        <div class="unit-switch" role="radiogroup" aria-label="Measurement system">
          <label>
            <input type="radio" name="calculator-units" value="metric" checked />
            <span>Metric</span>
          </label>
          <label>
            <input type="radio" name="calculator-units" value="imperial" />
            <span>Imperial</span>
          </label>
        </div>
      </div>

      <div class="calculator-inputs">
        <div class="calculator-field metric-height">
          <label for="calculator-height-cm">Height</label>
          <div class="input-with-unit">
            <input id="calculator-height-cm" type="number" min="1" step="0.1" inputMode="decimal" />
            <span>cm</span>
          </div>
        </div>

        <div class="calculator-field imperial-height" hidden>
          <label>Height</label>
          <div class="height-pair">
            <div class="input-with-unit">
              <input
                id="calculator-height-ft"
                aria-label="Height in feet"
                type="number"
                min="1"
                step="1"
                inputMode="numeric"
              />
              <span>ft</span>
            </div>
            <div class="input-with-unit">
              <input
                id="calculator-height-in"
                aria-label="Additional height in inches"
                type="number"
                min="0"
                max="11.9"
                step="0.1"
                inputMode="decimal"
              />
              <span>in</span>
            </div>
          </div>
        </div>

        <div class="calculator-field metric-weight">
          <label for="calculator-weight-kg">Weight</label>
          <div class="input-with-unit">
            <input id="calculator-weight-kg" type="number" min="1" step="0.1" inputMode="decimal" />
            <span>kg</span>
          </div>
        </div>

        <div class="calculator-field imperial-weight" hidden>
          <label for="calculator-weight-lb">Weight</label>
          <div class="input-with-unit">
            <input id="calculator-weight-lb" type="number" min="1" step="0.1" inputMode="decimal" />
            <span>lb</span>
          </div>
        </div>

        <div class="calculator-field">
          <label for="calculator-age">Age</label>
          <div class="input-with-unit">
            <input
              id="calculator-age"
              type="number"
              min="18"
              max="120"
              step="1"
              inputMode="numeric"
            />
            <span>years</span>
          </div>
        </div>

        <div class="calculator-field">
          <label for="calculator-sex">Sex used in BMR formula</label>
          <select id="calculator-sex">
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
      </div>

      <div class="calculator-results" aria-live="polite">
        <section class="result-card">
          <p class="result-label">Body mass index</p>
          <p class="result-value">
            <output id="calculator-bmi">—</output>
          </p>
          <p class="result-detail" id="calculator-bmi-category">
            Enter your height and weight
          </p>
          <div
            class="bmi-gauge"
            id="calculator-bmi-gauge"
            role="meter"
            aria-label="BMI range"
            aria-valuemin={15}
            aria-valuemax={40}
          >
            <div class="bmi-gauge-track" aria-hidden="true">
              <span class="bmi-range bmi-underweight"></span>
              <span class="bmi-range bmi-healthy"></span>
              <span class="bmi-range bmi-overweight"></span>
              <span class="bmi-range bmi-obesity"></span>
              <span class="bmi-gauge-marker" id="calculator-bmi-marker" hidden></span>
            </div>
            <div class="bmi-gauge-labels" aria-hidden="true">
              <span>15</span>
              <span>18.5</span>
              <span>25</span>
              <span>30</span>
              <span>40+</span>
            </div>
            <div class="bmi-gauge-legend">
              <span>
                <i class="bmi-underweight"></i>Underweight
              </span>
              <span>
                <i class="bmi-healthy"></i>Healthy
              </span>
              <span>
                <i class="bmi-overweight"></i>Overweight
              </span>
              <span>
                <i class="bmi-obesity"></i>Obesity
              </span>
            </div>
          </div>
          <p class="result-note">BMI uses height and weight only; age and sex do not affect it.</p>
        </section>

        <section class="result-card result-card-accent calorie-estimates">
          <p class="result-label">Estimated daily calorie use</p>
          <div class="activity-values table-container">
            <table>
              <thead>
                <tr>
                  <th>Activity level</th>
                  <th>Daily calories</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Sedentary</td>
                  <td>
                    <output id="calories-sedentary">—</output> kcal
                  </td>
                </tr>
                <tr>
                  <td>Lightly active</td>
                  <td>
                    <output id="calories-light">—</output> kcal
                  </td>
                </tr>
                <tr>
                  <td>Moderately active</td>
                  <td>
                    <output id="calories-moderate">—</output> kcal
                  </td>
                </tr>
                <tr>
                  <td>Very active</td>
                  <td>
                    <output id="calories-very-active">—</output> kcal
                  </td>
                </tr>
                <tr>
                  <td>Extremely active</td>
                  <td>
                    <output id="calories-extreme">—</output> kcal
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p class="result-note">
            Estimates use the{" "}
            <a href="https://en.wikipedia.org/wiki/Basal_metabolic_rate">Mifflin–St Jeor</a> resting
            value with standard activity multipliers from 1.2 to 1.9. Actual needs vary.
          </p>
        </section>
      </div>

      <section class="activity-guide">
        <h2>Activity level guide</h2>
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>Level</th>
                <th>Typical activity</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Sedentary</td>
                <td>Little or no structured exercise</td>
              </tr>
              <tr>
                <td>Lightly active</td>
                <td>Light exercise 1–3 days per week</td>
              </tr>
              <tr>
                <td>Moderately active</td>
                <td>Moderate exercise 3–5 days per week</td>
              </tr>
              <tr>
                <td>Very active</td>
                <td>Hard exercise 6–7 days per week</td>
              </tr>
              <tr>
                <td>Extremely active</td>
                <td>Physical job, intense training, or professional sport</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </section>
  )
}

export default (() => HealthCalculators) satisfies QuartzComponentConstructor
