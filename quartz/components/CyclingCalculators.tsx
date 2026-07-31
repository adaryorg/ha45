import { QuartzComponent, QuartzComponentConstructor } from "./types"

const CyclingCalculators: QuartzComponent = () => (
  <section class="fitness-calculators cycling-calculators" aria-label="Cycling calculators">
    <div class="tool-grid">
      <section class="tool-card">
        <h2>Cycling Speed</h2>
        <p>
          Enter the distance and elapsed time to calculate average speed. Descents and heroic
          tailwinds are included at no extra charge.
        </p>
        <div class="calculator-inputs compact-inputs running-input-layout">
          <label class="calculator-field distance-field">
            Distance
            <div class="input-with-unit">
              <input id="cycle-distance" type="number" min="0" step="0.01" inputMode="decimal" />
              <select id="cycle-distance-unit" aria-label="Distance unit">
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
                  <input id="cycle-hours" type="number" min="0" step="1" inputMode="numeric" />
                  <span>hr</span>
                </div>
              </label>
              <label class="calculator-field">
                Minutes
                <div class="input-with-unit">
                  <input
                    id="cycle-minutes"
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
                    id="cycle-seconds"
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
            <span>Average speed</span>
            <output id="cycle-speed-kmh">—</output>
          </div>
          <div>
            <span>Average speed</span>
            <output id="cycle-speed-mph">—</output>
          </div>
          <div>
            <span>Time per kilometre</span>
            <output id="cycle-time-km">—</output>
          </div>
        </div>
      </section>

      <section class="tool-card">
        <h2>Bike Gear Ratio</h2>
        <p>
          See what a chainring and sprocket combination actually means before buying more
          components. A radical concept, admittedly.
        </p>
        <div class="calculator-inputs compact-inputs gear-inputs">
          <label class="calculator-field">
            Front chainring
            <div class="input-with-unit">
              <input
                id="gear-chainring"
                type="number"
                min="20"
                max="70"
                step="1"
                value="50"
                inputMode="numeric"
              />
              <span>teeth</span>
            </div>
          </label>
          <label class="calculator-field">
            Rear sprocket
            <div class="input-with-unit">
              <input
                id="gear-sprocket"
                type="number"
                min="9"
                max="52"
                step="1"
                value="17"
                inputMode="numeric"
              />
              <span>teeth</span>
            </div>
          </label>
          <label class="calculator-field">
            Wheel size
            <select id="gear-wheel">
              <option value="2105">700 × 25C</option>
              <option value="2136">700 × 28C</option>
              <option value="2168">700 × 32C</option>
              <option value="2288">29 × 2.2″</option>
              <option value="2090">27.5 × 2.1″</option>
              <option value="2050">26 × 2.0″</option>
              <option value="custom">Custom</option>
            </select>
          </label>
          <label class="calculator-field custom-wheel-field" hidden>
            Wheel circumference
            <div class="input-with-unit">
              <input
                id="gear-wheel-custom"
                type="number"
                min="500"
                max="3000"
                step="1"
                inputMode="numeric"
              />
              <span>mm</span>
            </div>
          </label>
          <label class="calculator-field">
            Cadence
            <div class="input-with-unit">
              <input
                id="gear-cadence"
                type="number"
                min="1"
                max="200"
                step="1"
                value="90"
                inputMode="numeric"
              />
              <span>rpm</span>
            </div>
          </label>
        </div>
        <div class="metric-results" aria-live="polite">
          <div>
            <span>Gear ratio</span>
            <output id="gear-ratio">—</output>
          </div>
          <div>
            <span>Gear inches</span>
            <output id="gear-inches">—</output>
          </div>
          <div>
            <span>Distance per revolution</span>
            <output id="gear-development">—</output>
          </div>
          <div>
            <span>Speed at selected cadence</span>
            <output id="gear-speed">—</output>
          </div>
        </div>
        <p class="calculator-footnote">
          Tyre sizes are nominal and real circumference varies with tyre, pressure, rim, load, and
          whichever mood the measuring tape is in.
        </p>
      </section>
    </div>
  </section>
)

export default (() => CyclingCalculators) satisfies QuartzComponentConstructor
