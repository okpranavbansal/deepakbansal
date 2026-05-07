let currentPage = 0; // 0 is Diet, 1+ are reports
let manifest = null;
let dietData = null;
let reportsData = {};

async function init() {
  try {
    const manifestRes = await fetch('data/manifest.json');
    manifest = await manifestRes.json();
    
    const dietRes = await fetch('data/diet.json');
    dietData = await dietRes.json();
    
    render();
  } catch (err) {
    console.error("Initialization failed:", err);
    document.getElementById('content-area').innerHTML = "Failed to load data.";
  }
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
  const content = document.getElementById('content-area');
  const indicator = document.getElementById('page-indicator');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');

  // Update Buttons
  prevBtn.disabled = (currentPage === 0);
  nextBtn.disabled = (currentPage === manifest.reports.length);

  if (currentPage === 0) {
    indicator.innerText = "Page 1: Diet Plan";
    renderDiet(content);
  } else {
    const reportIndex = currentPage - 1;
    const report = await getReport(reportIndex);
    indicator.innerText = `Page ${currentPage + 1}: Report — ${report.label}`;
    renderReport(content, report);
  }
}

function renderDiet(container) {
  let html = `
    <div class="section">
      <div class="section-title">🛡️ Protective Diet Shield</div>
      <div style="background: linear-gradient(135deg, var(--navy) 0%, var(--navy-mid) 100%); color:white; padding:24px; border-radius:12px; margin-bottom:20px; font-size:14px;">
        <strong style="display:block; margin-bottom:10px; color:#AED6F1; font-size:16px;">Dietary Goals</strong>
        <div style="display:flex; flex-wrap:wrap; gap:8px;">
          ${dietData.goals.map(g => `<span style="background:rgba(255,255,255,0.1); padding:6px 12px; border-radius:20px; font-size:13px; border:1px solid rgba(255,255,255,0.15);">${g}</span>`).join('')}
        </div>
      </div>
    </div>

    <!-- 4-WEEK PRIORITY PLAN -->
    ${dietData.priorityPlan ? `
    <div class="section">
      <div class="section-title">🎯 4-Week Priority Plan — Start Here</div>
      <div class="priority-timeline">
        ${dietData.priorityPlan.map(p => `
          <div class="priority-card priority-${p.priority === '🔴' ? 'red' : p.priority === '🟡' ? 'yellow' : p.priority === '🟢' ? 'green' : 'blue'}">
            <div class="priority-header">
              <span class="priority-dot">${p.priority}</span>
              <strong>${p.week}</strong>
              <span class="priority-start">Start: ${p.start}</span>
            </div>
            <div class="priority-body">${p.items}</div>
          </div>
        `).join('')}
      </div>
    </div>
    ` : ''}

    <!-- DAILY SCHEDULE -->
    <div class="section">
      <div class="section-title">📅 Enhanced Daily Schedule</div>
      <div class="meal-day">
        <div class="meal-day-header">Daily Schedule — With Protective Additions ✨</div>
        <div class="meal-rows">
          ${dietData.schedule.map(item => `
            <div class="meal-row ${item.label.startsWith('✨') ? 'meal-row-new' : ''}">
              <div class="meal-time">${item.time}<br>${item.label}</div>
              <div class="meal-food">${item.food}</div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>

    <!-- SPICE PROTOCOL -->
    ${dietData.spiceProtocol ? `
    <div class="section">
      <div class="section-title">🌿 Anti-Cancer Spice Protocol</div>
      <div class="spice-note">Daily Minimum: <strong>Haldi + Kali Mirch + Adrak + Lahsun</strong> — these four should touch every meal, every day.</div>
      <div class="spice-grid">
        ${dietData.spiceProtocol.map(s => `
          <div class="spice-card">
            <div class="spice-name">${s.spice}</div>
            <div class="spice-compound">${s.compound}</div>
            <div class="spice-action">${s.action}</div>
            <div class="spice-usage">${s.usage}</div>
          </div>
        `).join('')}
      </div>
    </div>
    ` : ''}

    <!-- PROTECTIVE DRINKS -->
    ${dietData.protectiveDrinks ? `
    <div class="section">
      <div class="section-title">🥤 Protective Drinks</div>
      <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap:15px;">
        ${dietData.protectiveDrinks.map(d => `
          <div class="drink-card">
            <div style="font-size:28px; margin-bottom:8px;">${d.emoji}</div>
            <div style="font-weight:700; font-size:15px; margin-bottom:4px; color:var(--navy);">${d.name}</div>
            <div style="font-size:12px; color:var(--info); margin-bottom:6px; font-weight:600;">${d.when}</div>
            <div style="font-size:13px; color:var(--slate);">${d.note}</div>
          </div>
        `).join('')}
      </div>
    </div>
    ` : ''}

    <!-- RECIPES -->
    <div class="section">
      <div class="section-title">🍳 Protective Recipes</div>
      <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap:15px;">
        ${dietData.recipes ? dietData.recipes.map(recipe => `
          <div class="recipe-card">
            <div class="recipe-title">${recipe.title}</div>
            <div class="recipe-details">${recipe.details}</div>
            <ul class="recipe-ingredients">
              ${recipe.ingredients.map(ing => `<li>${ing}</li>`).join('')}
            </ul>
          </div>
        `).join('') : ''}
      </div>
    </div>

    <!-- WEEKLY CHECKLIST -->
    ${dietData.weeklyChecklist ? `
    <div class="section">
      <div class="section-title">✅ Weekly Cancer-Prevention Checklist</div>
      <div class="checklist-note">Print this and check daily. Items marked with ☐ are daily targets.</div>
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
            ${dietData.weeklyChecklist.map(row => `
              <tr>
                <td><strong>${row.day}</strong></td>
                ${row.items.map(item => `<td class="checklist-cell">${item.startsWith('—') ? '<span style="color:var(--slate);">—</span>' : `<span class="check-item">☐ ${item}</span>`}</td>`).join('')}
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
    ` : ''}

    <!-- SAFETY NOTES -->
    ${dietData.safetyNotes ? `
    <div class="section">
      <div class="section-title">⚠️ Safety — Medication Interactions</div>
      <div class="safety-warning">
        <strong>⚠️ Important:</strong> Giloy and Karela both lower blood sugar. Since Deepak ji is on Huminsulin (insulin), adding these means blood sugar could drop too low. <strong>Start small, monitor fasting sugar for 1 week, and inform the doctor.</strong>
      </div>
      <table class="marker-table">
        <thead>
          <tr>
            <th>Addition</th>
            <th>Huminsulin</th>
            <th>Daparyl M</th>
            <th>Panlipase</th>
          </tr>
        </thead>
        <tbody>
          ${dietData.safetyNotes.map(s => `
            <tr>
              <td><strong>${s.item}</strong></td>
              <td>${s.insulin}</td>
              <td>${s.daparylM}</td>
              <td>${s.panlipase}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
    ` : ''}

    <!-- LIFESTYLE -->
    <div class="section">
      <div class="section-title">🚶 Lifestyle Rules</div>
      <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap:15px;">
        ${dietData.lifestyle.map(item => `
          <div class="lifestyle-card">
            <div style="font-size:24px; margin-bottom:8px;">${item.emoji}</div>
            <div style="font-weight:600; font-size:15px; margin-bottom:5px; color:var(--navy);">${item.title}</div>
            <div style="font-size:13px; color:var(--slate);">${item.note}</div>
          </div>
        `).join('')}
      </div>
    </div>

    ${dietData.medications ? `
    <div class="section">
      <div class="section-title">🩺 Clinical Therapy</div>
      <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap:15px;">
        ${dietData.medications.map(med => `
          <div class="lifestyle-card">
            <div style="font-size:24px; margin-bottom:8px;">${med.icon}</div>
            <div style="font-weight:600; font-size:15px; margin-bottom:5px; color:var(--navy);">${med.name}</div>
            <div style="font-size:13px; color:var(--slate);">${med.purpose}</div>
          </div>
        `).join('')}
      </div>
    </div>
    ` : ''}

    <!-- DISCLAIMER -->
    <div class="section">
      <div class="disclaimer">
        <strong>⚕️ Disclaimer:</strong> This is NOT medical advice. All additions should be discussed with the treating physician before starting, especially the herbal supplements, to avoid interactions with Huminsulin, Daparyl M, and Panlipase. Sources: NIH/PubMed, Cleveland Clinic, Johns Hopkins, Pancreatic Cancer Action Network, Charaka Samhita.
      </div>
    </div>
  `;
  container.innerHTML = html;
}

function renderReport(container, report) {
  let html = `
    <div class="section">
      <div class="section-title">📊 Health Summary — ${report.label}</div>
      <p style="margin-bottom:20px; color:var(--slate); font-size:14px;">${report.summary}</p>
      
      <div class="summary-grid">
        ${report.keyMarkers.map(m => `
          <div class="summary-card card-${m.status}">
            <div class="card-status status-${m.status}">${m.status}</div>
            <div class="card-title" style="font-weight:600; font-size:14px;">${m.title}</div>
            <div class="card-value status-${m.status}">${m.value}</div>
            <div style="font-size:11px; color:var(--slate); margin-top:5px;">${m.normal}</div>
          </div>
        `).join('')}
      </div>
    </div>

    ${report.sections.map(s => `
      <div class="section">
        <div class="section-title"><span>${s.icon}</span> ${s.title}</div>
        
        ${s.type === 'table' ? `
          <table class="marker-table">
            <thead>
              <tr>${s.headers.map(h => `<th>${h}</th>`).join('')}</tr>
            </thead>
            <tbody>
              ${s.rows.map(row => `
                <tr>
                  <td>${row[0]}</td>
                  <td style="font-family: 'DM Mono', monospace; font-weight:600;">${row[1]}</td>
                  <td style="font-size:12px;">${row[2]}</td>
                  <td><span class="badge badge-${row[3]}">${row[3]}</span></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        ` : ''}

        ${s.type === 'list' ? `
          <ul style="list-style: none; padding: 0;">
            ${s.items.map(item => `
              <li style="padding: 10px 0; border-bottom: 1px solid var(--border); font-size: 14px; display: flex; align-items: flex-start; gap: 10px;">
                <span style="color: var(--attention);">•</span>
                <span>${item}</span>
              </li>
            `).join('')}
          </ul>
        ` : ''}

        ${s.note ? `<div style="background:#F8F9FA; padding:15px; border-radius:8px; margin-top:15px; font-size:13px; border-left:4px solid var(--info);">${s.note}</div>` : ''}
      </div>
    `).join('')}
  `;
  container.innerHTML = html;
}

document.getElementById('prev-btn').addEventListener('click', () => {
  if (currentPage > 0) {
    currentPage--;
    render();
    window.scrollTo(0, 0);
  }
});

document.getElementById('next-btn').addEventListener('click', () => {
  if (currentPage < manifest.reports.length) {
    currentPage++;
    render();
    window.scrollTo(0, 0);
  }
});

init();
