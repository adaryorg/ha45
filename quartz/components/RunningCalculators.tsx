import { QuartzComponent, QuartzComponentConstructor } from "./types"

const RunningCalculators: QuartzComponent = () => (
  <section class="fitness-calculators running-calculators" aria-label="Running calculators">
    <div class="tool-grid">
      <section class="tool-card">
        <h2>Pace &amp; Speed</h2>
        <p>
          Enter a distance and finish time. The useful numbers appear without ceremonial
          button-clicking.
        </p>
        <div class="calculator-inputs compact-inputs running-input-layout">
          <label class="calculator-field distance-field">
            Distance
            <div class="input-with-unit">
              <input id="run-distance" type="number" min="0" step="0.01" inputMode="decimal" />
              <select id="run-distance-unit" aria-label="Distance unit">
                <option value="km">km</option>
                <option value="mi">mi</option>
              </select>
            </div>
          </label>
          <div class="time-row">
            <span class="input-group-label">Time</span>
            <div class="time-fields">
              <label class="calculator-field">
                Hours
                <div class="input-with-unit">
                  <input id="run-hours" type="number" min="0" step="1" inputMode="numeric" />
                  <span>hr</span>
                </div>
              </label>
              <label class="calculator-field">
                Minutes
                <div class="input-with-unit">
                  <input
                    id="run-minutes"
                    type="number"
                    min="0"
                    max="59"
                    step="1"
                    inputMode="numeric"
                  />
                  <span>min</span>
                </div>
              </label>
              <label class="calculator-field">
                Seconds
                <div class="input-with-unit">
                  <input
                    id="run-seconds"
                    type="number"
                    min="0"
                    max="59"
                    step="1"
                    inputMode="numeric"
                  />
                  <span>sec</span>
                </div>
              </label>
            </div>
          </div>
        </div>
        <div class="metric-results" aria-live="polite">
          <div>
            <span>Pace / km</span>
            <output id="run-pace-km">—</output>
          </div>
          <div>
            <span>Pace / mile</span>
            <output id="run-pace-mi">—</output>
          </div>
          <div>
            <span>Speed</span>
            <output id="run-speed">—</output>
          </div>
        </div>
      </section>

      <section class="tool-card">
        <h2>Race-Time Predictor</h2>
        <p>
          Use a recent result to estimate another distance. It is maths, not a binding contract with
          your legs.
        </p>
        <div class="calculator-inputs compact-inputs running-input-layout">
          <div class="distance-fields">
            <label class="calculator-field">
              Completed distance
              <select id="race-source-distance">
                <option value="5">5K</option>
                <option value="10">10K</option>
                <option value="21.0975">Half marathon</option>
                <option value="42.195">Marathon</option>
              </select>
            </label>
            <label class="calculator-field">
              Target distance
              <select id="race-target-distance">
                <option value="5">5K</option>
                <option value="10" selected>
                  10K
                </option>
                <option value="21.0975">Half marathon</option>
                <option value="42.195">Marathon</option>
              </select>
            </label>
          </div>
          <div class="time-row">
            <span class="input-group-label">Time</span>
            <div class="time-fields">
              <label class="calculator-field">
                Hours
                <div class="input-with-unit">
                  <input id="race-hours" type="number" min="0" step="1" inputMode="numeric" />
                  <span>hr</span>
                </div>
              </label>
              <label class="calculator-field">
                Minutes
                <div class="input-with-unit">
                  <input
                    id="race-minutes"
                    type="number"
                    min="0"
                    max="59"
                    step="1"
                    inputMode="numeric"
                  />
                  <span>min</span>
                </div>
              </label>
              <label class="calculator-field">
                Seconds
                <div class="input-with-unit">
                  <input
                    id="race-seconds"
                    type="number"
                    min="0"
                    max="59"
                    step="1"
                    inputMode="numeric"
                  />
                  <span>sec</span>
                </div>
              </label>
            </div>
          </div>
        </div>
        <div class="featured-result" aria-live="polite">
          <span>Estimated finish</span>
          <output id="race-prediction">—</output>
        </div>
        <p class="calculator-footnote">
          Uses the <a href="https://pubmed.ncbi.nlm.nih.gov/27570626/">Riegel formula</a>.
          Longer-distance predictions assume the training and fuelling needed to survive the
          distance, which is quite an assumption.
        </p>
      </section>
    </div>
  </section>
)

export default (() => RunningCalculators) satisfies QuartzComponentConstructor
