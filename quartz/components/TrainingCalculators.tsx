import { QuartzComponent, QuartzComponentConstructor } from "./types"

const TrainingCalculators: QuartzComponent = () => (
  <section class="fitness-calculators training-calculators" aria-label="Training calculators">
    <div class="tool-grid">
      <section class="tool-card">
        <h2>Heart-Rate Zones</h2>
        <p>Five simple training zones based on estimated or measured maximum heart rate.</p>
        <div class="calculator-inputs compact-inputs">
          <label class="calculator-field">
            Age
            <div class="input-with-unit">
              <input id="zone-age" type="number" min="18" max="100" step="1" inputMode="numeric" />
              <span>years</span>
            </div>
          </label>
          <label class="calculator-field">
            Measured max (optional)
            <div class="input-with-unit">
              <input id="zone-max" type="number" min="80" max="240" step="1" inputMode="numeric" />
              <span>bpm</span>
            </div>
          </label>
        </div>
        <p class="small-status" id="zone-basis">
          Enter your age, or use a measured maximum.
        </p>
        <div class="zone-list" aria-live="polite">
          {[1, 2, 3, 4, 5].map((zone) => (
            <div>
              <span>Zone {zone}</span>
              <output id={`zone-${zone}`}>—</output>
            </div>
          ))}
        </div>
        <p class="calculator-footnote">
          The{" "}
          <a href="https://www.heart.org/en/healthy-living/fitness-and-exercise/fitness-basics/target-heart-rates">
            age formula
          </a>{" "}
          is a rough training estimate. Medication, heat, fatigue and ordinary human chaos can all
          move heart rate around.
        </p>
      </section>

      <section class="tool-card">
        <h2>One-Rep Max</h2>
        <p>
          Estimate your maximum lift from a submaximal set. There is no need to prove anything to a
          barbell today.
        </p>
        <div class="calculator-inputs compact-inputs">
          <label class="calculator-field">
            Weight lifted
            <div class="input-with-unit">
              <input id="orm-weight" type="number" min="0" step="0.5" inputMode="decimal" />
              <select id="orm-unit" aria-label="Weight unit">
                <option value="kg">kg</option>
                <option value="lb">lb</option>
              </select>
            </div>
          </label>
          <label class="calculator-field">
            Repetitions
            <div class="input-with-unit">
              <input id="orm-reps" type="number" min="1" max="12" step="1" inputMode="numeric" />
              <span>reps</span>
            </div>
          </label>
        </div>
        <div class="featured-result" aria-live="polite">
          <span>Estimated 1RM</span>
          <output id="orm-result">—</output>
        </div>
        <div class="percentage-table table-container">
          <table>
            <thead>
              <tr>
                <th>Training load</th>
                <th>Weight</th>
              </tr>
            </thead>
            <tbody>
              {[90, 80, 70, 60, 50].map((percent) => (
                <tr>
                  <td>{percent}%</td>
                  <td>
                    <output id={`orm-${percent}`}>—</output>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p class="calculator-footnote">
          An estimate using the average of the Epley and Brzycki formulas; most useful for sets of
          10 reps or fewer.
        </p>
      </section>
    </div>
  </section>
)

export default (() => TrainingCalculators) satisfies QuartzComponentConstructor
