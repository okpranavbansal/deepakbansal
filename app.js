let currentTab = "diet";
let manifest = null;
let dietData = null;
let reportsData = {};

async function init() {
  try {
    const manifestRes = await fetch("data/manifest.json");
    manifest = await manifestRes.json();

    const dietRes = await fetch("data/diet.json");
    dietData = await dietRes.json();

    setupEventListeners();
    render();
  } catch (err) {
    console.error("Initialization failed:", err);
    document.getElementById("content-area").innerHTML = "Failed to load data.";
  }
}

function setupEventListeners() {
  document.querySelectorAll(".nav-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      // Update UI
      document
        .querySelectorAll(".nav-tab")
        .forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");

      // Update State
      currentTab = tab.getAttribute("data-tab");
      render();
      window.scrollTo(0, 0);
    });
  });
}

async function getReport(index) {
  const reportInfo = manifest.reports[index];
  if (!reportsData[reportInfo.date]) {
    const res = await fetch(`data/reports/${reportInfo.file}`);
    reportsData[reportInfo.date] = await res.json();
  }
  return reportsData[reportInfo.date];
}

async function render() {
  const content = document.getElementById("content-area");
  content.innerHTML = ""; // Clear existing

  if (currentTab === "diet") {
    renderDietChart(content);
  } else if (currentTab === "categories") {
    renderCategories(content);
  } else if (currentTab === "guidelines") {
    renderGuidelines(content);
  } else if (currentTab === "reports") {
    await renderReports(content);
  }
}

function renderDietChart(container) {
  let html = `
    <!-- GOALS -->
    ${
      dietData.goals
        ? `
    <div class="section">
      <div class="section-title">🎯 Primary Goals</div>
      <div style="background: white; padding: 20px; border-radius: 12px; margin-bottom: 30px; border: 2px solid #E2E8F0; box-shadow: 0 10px 30px rgba(0,0,0,0.05);">
        <ul style="list-style: none; padding: 0; margin: 0;">
          ${dietData.goals.map(g => `<li style="padding: 10px 0; border-bottom: 1px solid var(--border); font-size: 14px; color: var(--navy); font-weight: 500;">${g}</li>`).join("")}
        </ul>
      </div>
    </div>
    `
        : ""
    }

    <!-- 4-WEEK PRIORITY PLAN -->
    ${
      dietData.priorityPlan
        ? `
    <div class="section">
      <div class="section-title">🎯 4-Week Priority Plan</div>
      <div class="priority-timeline">
        ${dietData.priorityPlan
          .map(
            (p) => `
          <div class="priority-card priority-${p.priority === "🔴" ? "red" : p.priority === "🟡" ? "yellow" : p.priority === "🟢" ? "green" : "blue"}">
            <div class="priority-header">
              <span class="priority-dot">${p.priority}</span>
              <strong>${p.week}</strong>
              <span class="priority-start">${p.start}</span>
            </div>
            <div class="priority-body">${p.items}</div>
          </div>
        `,
          )
          .join("")}
      </div>
    </div>
    `
        : ""
    }

    <!-- DAILY SCHEDULE -->
    <div class="section">
      <div class="section-title">📅 Daily Schedule</div>
      <div class="meal-day">
        <div class="meal-rows">
          ${dietData.schedule
            .map(
              (item) => `
            <div class="meal-row ${item.label.startsWith("✨") ? "meal-row-new" : ""}">
              <div class="meal-time">${item.time}<br>${item.label}</div>
              <div class="meal-food">${item.food}</div>
            </div>
          `,
            )
            .join("")}
        </div>
      </div>
    </div>
  `;
  container.innerHTML = html;
}

function renderCategories(container) {
  let html = `
    <!-- FATHER-FRIENDLY SIMPLE GUIDE -->
    ${
      dietData.simpleGuide
        ? `
    <div class="section">
      <div class="section-title">🌟 Simple Guide: What to Eat & What to Avoid</div>
      <div style="background: white; padding: 20px; border-radius: 12px; margin-bottom: 30px; font-size: 15px; border: 2px solid #E2E8F0; box-shadow: 0 10px 30px rgba(0,0,0,0.05);">
        <p style="margin-bottom: 20px; color: var(--slate); text-align: center; font-weight: 500;">
          <em>This list is custom-made to be safe for <strong>Diabetes</strong>, <strong>Fatty Liver</strong>, <strong>Prostate</strong>, and <strong>Digestion</strong> all at once.</em>
        </p>
        <div class="simple-guide-grid">
          <!-- EATABLES -->
          <div class="sg-column sg-eat">
            <h3 class="sg-header sg-header-eat">✅ Safe to Eat</h3>
            <ul class="sg-list">
              ${dietData.simpleGuide.eatables
                .map(
                  (item) => `
                <li>
                  <div class="sg-emoji">${item.emoji}</div>
                  <div>
                    <strong>${item.item}</strong>
                    <p>${item.reason}</p>
                  </div>
                </li>
              `,
                )
                .join("")}
            </ul>
          </div>
          <!-- AVOIDABLES -->
          <div class="sg-column sg-avoid">
            <h3 class="sg-header sg-header-avoid">❌ Strictly Avoid</h3>
            <ul class="sg-list">
              ${dietData.simpleGuide.avoidables
                .map(
                  (item) => `
                <li>
                  <div class="sg-emoji">${item.emoji}</div>
                  <div>
                    <strong>${item.item}</strong>
                    <p>${item.reason}</p>
                  </div>
                </li>
              `,
                )
                .join("")}
            </ul>
          </div>
        </div>
      </div>
    </div>
    `
        : ""
    }

    <!-- DALS & LEGUMES -->
    <div class="section">
      <div class="section-title">🥣 Best Dals & Legumes</div>
      <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap:15px; margin-bottom: 30px;">
        ${dietData.dalsAndLegumes.map(dal => `
          <div class="lifestyle-card">
            <div style="font-size:28px; margin-bottom:8px;">${dal.emoji}</div>
            <div style="font-weight:700; font-size:16px; color:var(--navy); margin-bottom:5px;">${dal.name}</div>
            <div style="font-size:13px; color:var(--slate); margin-bottom:8px;">${dal.benefit}</div>
            <div style="font-size:12px; color:var(--info); font-weight:600;">Best for: ${dal.bestFor}</div>
          </div>
        `).join("")}
      </div>
    </div>

    <!-- VEGETABLES CATEGORIES -->
    <div class="section">
      <div class="section-title">🥦 Healing Vegetables</div>
      <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap:20px;">
        ${dietData.vegetableCategories.map(cat => `
          <div class="recipe-card" style="padding: 15px;">
            <div class="recipe-title" style="font-size:15px; border-bottom: 1px solid var(--border); padding-bottom:8px; margin-bottom:10px;">${cat.category}</div>
            <ul style="list-style: none; padding: 0;">
              ${cat.items.map(v => `
                <li style="margin-bottom:10px; font-size:13px;">
                  <strong style="color:var(--navy); display:block;">${v.name}</strong>
                  <span style="color:var(--slate); font-style:italic;">${v.reason}</span>
                </li>
              `).join("")}
            </ul>
          </div>
        `).join("")}
      </div>
    </div>

    <!-- PROTECTIVE DRINKS -->
    ${
      dietData.protectiveDrinks
        ? `
    <div class="section">
      <div class="section-title">🥤 Protective Drinks</div>
      <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap:15px;">
        ${dietData.protectiveDrinks
          .map(
            (d) => `
          <div class="drink-card">
            <div style="font-size:28px; margin-bottom:8px;">${d.emoji}</div>
            <div style="font-weight:700; font-size:15px; margin-bottom:4px; color:var(--navy);">${d.name}</div>
            <div style="font-size:12px; color:var(--info); margin-bottom:6px; font-weight:600;">${d.when}</div>
            <div style="font-size:13px; color:var(--slate);">${d.note}</div>
          </div>
        `,
          )
          .join("")}
      </div>
    </div>
    `
        : ""
    }

    <!-- SNACKS -->
    ${
      dietData.snacks
        ? `
    <div class="section">
      <div class="section-title">🍿 Healthy Snacks</div>
      <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap:15px;">
        ${dietData.snacks
          .map(
            (s) => `
          <div class="lifestyle-card" style="position:relative;">
            <div style="position:absolute; top:8px; right:8px;">
              <span class="badge badge-${s.target === "prostate" ? "monitor" : "ok"}" style="font-size:10px; text-transform:uppercase;">${s.target}</span>
            </div>
            <div style="font-size:28px; margin-bottom:8px;">${s.emoji}</div>
            <div style="font-weight:700; font-size:15px; margin-bottom:4px; color:var(--navy);">${s.name}</div>
            <div style="font-size:12px; color:var(--info); margin-bottom:6px; font-weight:600;">${s.when}</div>
            <div style="font-size:13px; color:var(--slate);">${s.benefit}</div>
          </div>
        `,
          )
          .join("")}
      </div>
    </div>
    `
        : ""
    }

    <!-- LIVER PROTOCOL -->
    ${
      dietData.liverProtocol
        ? `
    <div class="section">
      <div class="section-title">🌿 Liver Recovery Protocol</div>
      <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap:12px;">
        ${dietData.liverProtocol
          .map(
            (p) => `
          <div class="lifestyle-card">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
              <div style="font-weight:700; font-size:15px; color:var(--navy);">${p.item}</div>
              <span class="badge badge-monitor" style="font-size:10px;">${p.phase}</span>
            </div>
            <div style="font-size:13px; color:var(--slate);">${p.note}</div>
          </div>
        `,
          )
          .join("")}
      </div>
    </div>
    `
        : ""
    }
    <!-- LIVER HEALING FOODS -->
    ${
      dietData.liverHealingFoods
        ? `
    <div class="section">
      <div class="section-title">🥑 Liver Healing Foods</div>
      <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap:15px;">
        ${dietData.liverHealingFoods
          .map(
            (f) => `
          <div class="lifestyle-card">
            <div style="font-size:28px; margin-bottom:8px;">${f.emoji}</div>
            <div style="font-weight:700; font-size:15px; margin-bottom:4px; color:var(--navy);">${f.name}</div>
            <div style="font-size:12px; color:var(--info); margin-bottom:6px; font-weight:600;">${f.how}</div>
            <div style="font-size:13px; color:var(--slate);">${f.evidence}</div>
          </div>
        `,
          )
          .join("")}
      </div>
    </div>
    `
        : ""
    }

    <!-- SPICE PROTOCOL -->
    ${
      dietData.spiceProtocol
        ? `
    <div class="section">
      <div class="section-title">🌶️ Anti-Cancer Spice Protocol</div>
      <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap:15px;">
        ${dietData.spiceProtocol
          .map(
            (s) => `
          <div class="lifestyle-card" style="position:relative;">
            <div style="position:absolute; top:8px; right:8px;">
              <span class="badge badge-monitor" style="font-size:10px;">${s.compound}</span>
            </div>
            <div style="font-weight:700; font-size:15px; margin-bottom:4px; color:var(--navy);">${s.spice}</div>
            <div style="font-size:12px; color:var(--info); margin-bottom:6px; font-weight:600;">Action: ${s.action}</div>
            <div style="font-size:13px; color:var(--slate);">${s.usage}</div>
          </div>
        `,
          )
          .join("")}
      </div>
    </div>
    `
        : ""
    }

    <!-- RECIPES -->
    <div class="section">
      <div class="section-title">🍳 Recipes</div>
      <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap:15px;">
        ${
          dietData.recipes
            ? dietData.recipes
                .map(
                  (recipe) => `
          <div class="recipe-card">
            <div class="recipe-title">${recipe.title}</div>
            <div class="recipe-details">${recipe.details}</div>
            <ul class="recipe-ingredients">
              ${recipe.ingredients.map((ing) => `<li>${ing}</li>`).join("")}
            </ul>
          </div>
        `,
                )
                .join("")
            : ""
        }
      </div>
    </div>

    <!-- WEEKLY CHECKLIST -->
    ${
      dietData.weeklyChecklist
        ? `
    <div class="section">
      <div class="section-title">✅ Weekly Checklist</div>
      <div class="checklist-table-wrap">
        <table class="checklist-table">
          <thead>
            <tr>
              <th>Day</th>
              <th>Haldi 2x</th>
              <th>Amla/Giloy</th>
              <th>Jamun</th>
              <th>Cruciferous</th>
              <th>Salad</th>
              <th>Omega-3</th>
              <th>Karela</th>
            </tr>
          </thead>
          <tbody>
            ${dietData.weeklyChecklist
              .map(
                (row) => `
              <tr>
                <td><strong>${row.day}</strong></td>
                ${row.items.map((item) => `<td class="checklist-cell">${item.startsWith("—") ? '<span style="color:var(--slate);">—</span>' : `<span class="check-item">☐ ${item}</span>`}</td>`).join("")}
              </tr>
            `,
              )
              .join("")}
          </tbody>
        </table>
      </div>
    </div>
    `
        : ""
    }
  `;
  container.innerHTML = html;
}

function renderGuidelines(container) {
  let html = `
    <!-- DIETARY PRECAUTIONS -->
    <div class="section">
      <div class="section-title">⚠️ Dietary Precautions</div>
      <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap:15px;">
        ${
          dietData.precautions
            ? dietData.precautions
                .map(
                  (p) => `
          <div class="lifestyle-card">
            <div style="font-size:28px; margin-bottom:8px;">${p.icon}</div>
            <div style="font-weight:700; font-size:15px; margin-bottom:10px; color:var(--navy);">${p.title}</div>
            <ul style="list-style: none; padding: 0;">
              ${p.rules
                .map(
                  (rule) => `
                <li style="padding: 6px 0; border-bottom: 1px solid var(--border); font-size: 13px; display: flex; align-items: flex-start; gap: 8px;">
                  <span style="color: var(--attention);">•</span>
                  <span style="color:var(--slate);">${rule}</span>
                </li>
              `,
                )
                .join("")}
            </ul>
          </div>
        `,
                )
                .join("")
            : ""
        }
      </div>
    </div>

    <!-- FRUITS GUIDE -->
    <div class="section">
      <div class="section-title">🍎 Fruits Guide</div>
      ${
        dietData.fruitsGuide
          ? `
      <div class="simple-guide-grid">
        <div class="sg-column sg-eat">
          <h3 class="sg-header sg-header-eat">✅ Safe Fruits</h3>
          <ul class="sg-list">
            ${dietData.fruitsGuide.eatable
              .map(
                (item) => `
              <li>
                <div class="sg-emoji">${item.emoji}</div>
                <div><strong>${item.name}</strong><p>${item.reason}</p></div>
              </li>
            `,
              )
              .join("")}
          </ul>
        </div>
        <div class="sg-column sg-avoid">
          <h3 class="sg-header sg-header-avoid">❌ Avoid</h3>
          <ul class="sg-list">
            ${dietData.fruitsGuide.nonEatable
              .map(
                (item) => `
              <li>
                <div class="sg-emoji">${item.emoji}</div>
                <div><strong>${item.name}</strong><p>${item.reason}</p></div>
              </li>
            `,
              )
              .join("")}
          </ul>
        </div>
      </div>
      `
          : ""
      }
    </div>

    <!-- STRICT AVOIDANCES -->
    ${
      dietData.avoidFoods
        ? `
    <div class="section">
      <div class="section-title">❌ Strictly Avoid</div>
      <table class="marker-table">
        <thead>
          <tr><th>❌ Avoid</th><th>Reason (Allopathy)</th><th>Reason (Ayurveda)</th></tr>
        </thead>
        <tbody>
          ${dietData.avoidFoods
            .map(
              (a) => `
            <tr>
              <td><strong>${a.item}</strong></td>
              <td style="font-size:13px; color:#C62828;">${a.allopathy}</td>
              <td style="font-size:13px; color:var(--slate);">${a.ayurveda}</td>
            </tr>
          `,
            )
            .join("")}
        </tbody>
      </table>
    </div>
    `
        : ""
    }

    <!-- MEDICATIONS -->
    ${
      dietData.medications
        ? `
    <div class="section">
      <div class="section-title">💊 Current Medications</div>
      <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap:15px;">
        ${dietData.medications
          .map(
            (m) => `
          <div class="lifestyle-card">
            <div style="font-size:28px; margin-bottom:8px;">${m.icon}</div>
            <div style="font-weight:700; font-size:15px; margin-bottom:4px; color:var(--navy);">${m.name}</div>
            <div style="font-size:13px; color:var(--slate);">${m.purpose}</div>
          </div>
        `,
          )
          .join("")}
      </div>
    </div>
    `
        : ""
    }

    <!-- SAFETY NOTES -->
    ${
      dietData.safetyNotes
        ? `
    <div class="section">
      <div class="section-title">🛡️ Medication Safety</div>
      <div class="safety-warning">
        <strong>⚠️ Interaction Alert:</strong> Giloy and Karela lower blood sugar. Monitor fasting sugar closely with Huminsulin.
      </div>
      <table class="marker-table">
        <thead>
          <tr><th>Item</th><th>Huminsulin</th><th>Daparyl M</th><th>Panlipase</th></tr>
        </thead>
        <tbody>
          ${dietData.safetyNotes
            .map(
              (s) => `
            <tr>
              <td><strong>${s.item}</strong></td>
              <td>${s.insulin}</td>
              <td>${s.daparylM}</td>
              <td>${s.panlipase}</td>
            </tr>
          `,
            )
            .join("")}
        </tbody>
      </table>
    </div>
    `
        : ""
    }

    <!-- LIFESTYLE -->
    <div class="section">
      <div class="section-title">🚶 Lifestyle Rules</div>
      <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap:15px;">
        ${dietData.lifestyle
          .map(
            (item) => `
          <div class="lifestyle-card">
            <div style="font-size:24px; margin-bottom:8px;">${item.emoji}</div>
            <div style="font-weight:600; font-size:15px; margin-bottom:5px; color:var(--navy);">${item.title}</div>
            <div style="font-size:13px; color:var(--slate);">${item.note}</div>
          </div>
        `,
          )
          .join("")}
      </div>
    </div>
  `;
  container.innerHTML = html;
}

async function renderReports(container) {
  let html = "";

  // Render all reports from manifest
  for (let i = 0; i < manifest.reports.length; i++) {
    const report = await getReport(i);
    html += `
      <div class="section">
        <div class="section-title">📊 Report: ${report.label}</div>
        <p style="margin-bottom:20px; color:var(--slate); font-size:14px;">${report.summary}</p>
        <div class="summary-grid" style="margin-bottom:20px;">
          ${report.keyMarkers
            .map(
              (m) => `
            <div class="summary-card card-${m.status}">
              <div class="card-status status-${m.status}">${m.status}</div>
              <div class="card-title" style="font-weight:600; font-size:12px;">${m.title}</div>
              <div class="card-value status-${m.status}" style="font-size:18px;">${m.value}</div>
            </div>
          `,
            )
            .join("")}
        </div>

        ${report.sections
          .map(
            (s) => `
          <div style="margin-bottom:30px;">
            <div style="font-weight:700; font-size:15px; margin-bottom:10px;">${s.icon} ${s.title}</div>
            ${
              s.type === "table"
                ? `
              <div class="checklist-table-wrap">
                <table class="marker-table">
                  <thead><tr>${s.headers.map((h) => `<th>${h}</th>`).join("")}</tr></thead>
                  <tbody>
                    ${s.rows
                      .map(
                        (row) => `
                      <tr>
                        <td>${row[0]}</td>
                        <td style="font-family: 'DM Mono', monospace; font-weight:600;">${row[1]}</td>
                        <td style="font-size:12px;">${row[2]}</td>
                        <td><span class="badge badge-${row[3]}">${row[3]}</span></td>
                      </tr>
                    `,
                      )
                      .join("")}
                  </tbody>
                </table>
              </div>
            `
                : s.type === "list"
                  ? `
              <ul style="list-style: none; padding: 0;">
                ${s.items
                  .map(
                    (item) => `
                  <li style="padding: 8px 0; border-bottom: 1px solid var(--border); font-size: 13px; display: flex; align-items: flex-start; gap: 8px;">
                    <span style="color: var(--attention);">•</span>
                    <span>${item}</span>
                  </li>
                `,
                  )
                  .join("")}
              </ul>
            `
                  : ""
            }
          </div>
        `,
          )
          .join("")}
      </div>
      <hr style="border: 0; border-top: 1px solid var(--border); margin: 40px 0;">
    `;
  }

  // Pending Tests
  if (dietData.pendingTests) {
    html += `
      <div class="section">
        <div class="section-title">🧪 Pending Tests</div>
        <table class="marker-table">
          <thead><tr><th>Test</th><th>Order</th><th>Reveals</th></tr></thead>
          <tbody>
            ${dietData.pendingTests
              .map(
                (t) => `
              <tr>
                <td><strong>${t.test}</strong></td>
                <td><span class="badge badge-monitor">${t.orderedBy}</span></td>
                <td style="font-size:13px;">${t.reveals}</td>
              </tr>
            `,
              )
              .join("")}
          </tbody>
        </table>
      </div>
    `;
  }

  container.innerHTML = html;
}

init();
