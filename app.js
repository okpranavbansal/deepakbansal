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
  nextBtn.disabled = (currentPage === manifest.reports.length + 2);

  if (currentPage === 0) {
    indicator.innerText = "Page 1: Diet Plan";
    renderDiet(content);
  } else if (currentPage === 1) {
    indicator.innerText = "Page 2: Dietary Precautions";
    renderPrecautions(content);
  } else if (currentPage === 2) {
    indicator.innerText = "Page 3: Fruits Guide";
    renderFruits(content);
  } else {
    const reportIndex = currentPage - 3;
    const report = await getReport(reportIndex);
    indicator.innerText = `Page ${currentPage + 1}: Report — ${report.label}`;
    renderReport(content, report);
  }
}

function renderDiet(container) {
  let html = `
    <!-- FATHER-FRIENDLY SIMPLE GUIDE -->
    ${dietData.simpleGuide ? `
    <div class="section">
      <div class="section-title">🌟 Simple Guide: What to Eat & What to Avoid</div>
      <div style="background: white; padding: 20px; border-radius: 12px; margin-bottom: 30px; font-size: 15px; border: 2px solid #E2E8F0; box-shadow: 0 10px 30px rgba(0,0,0,0.05);">
        <p style="margin-bottom: 20px; color: var(--slate); text-align: center; font-weight: 500;">
          <em>This list is custom-made to be safe for <strong>Diabetes</strong>, <strong>Fatty Liver</strong>, <strong>Prostate</strong>, and <strong>Digestion</strong> all at once.</em>
        </p>
        <div class="simple-guide-grid">
          <!-- EATABLES -->
          <div class="sg-column sg-eat">
            <h3 class="sg-header sg-header-eat">✅ Safe to Eat (Superfoods)</h3>
            <ul class="sg-list">
              ${dietData.simpleGuide.eatables.map(item => `
                <li>
                  <div class="sg-emoji">${item.emoji}</div>
                  <div>
                    <strong>${item.item}</strong>
                    <p>${item.reason}</p>
                  </div>
                </li>
              `).join('')}
            </ul>
          </div>
          <!-- AVOIDABLES -->
          <div class="sg-column sg-avoid">
            <h3 class="sg-header sg-header-avoid">❌ Strictly Avoid (Poison for Liver/Sugar)</h3>
            <ul class="sg-list">
              ${dietData.simpleGuide.avoidables.map(item => `
                <li>
                  <div class="sg-emoji">${item.emoji}</div>
                  <div>
                    <strong>${item.item}</strong>
                    <p>${item.reason}</p>
                  </div>
                </li>
              `).join('')}
            </ul>
          </div>
        </div>
      </div>
    </div>
    ` : ''}

    <div class="section">
      <div class="section-title">🛡️ Protective Diet Shield</div>
      <div style="background: linear-gradient(135deg, var(--navy) 0%, var(--navy-mid) 100%); color:white; padding:24px; border-radius:12px; margin-bottom:20px; font-size:14px; box-shadow: 0 10px 20px rgba(26,38,57,0.2);">
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

    <!-- SNACKS -->
    ${dietData.snacks ? `
    <div class="section">
      <div class="section-title">🍿 Healthy Snacks — Liver + Prostate + Sugar Safe</div>
      <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap:15px;">
        ${dietData.snacks.map(s => `
          <div class="lifestyle-card" style="position:relative; overflow:hidden;">
            <div style="position:absolute; top:8px; right:8px;">
              <span class="badge badge-${s.target === 'prostate' ? 'monitor' : 'ok'}" style="font-size:10px; text-transform:uppercase;">${s.target}</span>
            </div>
            <div style="font-size:28px; margin-bottom:8px;">${s.emoji}</div>
            <div style="font-weight:700; font-size:15px; margin-bottom:4px; color:var(--navy);">${s.name}</div>
            <div style="font-size:12px; color:var(--info); margin-bottom:6px; font-weight:600;">${s.when}</div>
            <div style="font-size:13px; color:var(--slate); margin-bottom:8px; font-style:italic;">${s.recipe}</div>
            <div style="font-size:12px; color:var(--navy); background:rgba(26,54,93,0.05); padding:8px; border-radius:6px;">${s.benefit}</div>
          </div>
        `).join('')}
      </div>
    </div>
    ` : ''}

    <!-- LIVER HEALING FOODS -->
    ${dietData.liverHealingFoods ? `
    <div class="section">
      <div class="section-title">🫁 Liver-Healing Additions (Evidence-Based)</div>
      <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap:14px;">
        ${dietData.liverHealingFoods.map(f => `
          <div class="lifestyle-card" style="border-left:4px solid #27AE60;">
            <div style="font-size:28px; margin-bottom:8px;">${f.emoji}</div>
            <div style="font-weight:700; font-size:15px; margin-bottom:6px; color:var(--navy);">${f.name}</div>
            <div style="font-size:12px; color:var(--shield); background:#E8F5E9; padding:6px 10px; border-radius:6px; margin-bottom:8px; font-weight:500;">${f.evidence}</div>
            <div style="font-size:13px; color:var(--slate);"><strong>How:</strong> ${f.how}</div>
          </div>
        `).join('')}
      </div>
    </div>
    ` : ''}

    <!-- LIVER PROTOCOL -->
    ${dietData.liverProtocol ? `
    <div class="section">
      <div class="section-title">🌿 Liver Recovery Protocol — Phased Introduction</div>
      <div style="background: linear-gradient(135deg, #FFF3E0, #FFF8E1); padding:15px; border-radius:10px; margin-bottom:15px; font-size:13px; border-left:4px solid #FF9800;">
        <strong>⚠️ Rule:</strong> Introduce ONE new item per week. Monitor fasting sugar daily. Stop immediately if sugar drops below 100 mg/dL.
      </div>
      <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap:12px;">
        ${dietData.liverProtocol.map(p => `
          <div class="lifestyle-card">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
              <div style="font-weight:700; font-size:15px; color:var(--navy);">${p.item}</div>
              <span class="badge badge-monitor" style="font-size:10px;">${p.phase}</span>
            </div>
            <div style="font-size:13px; color:var(--slate);">${p.note}</div>
          </div>
        `).join('')}
      </div>
    </div>
    ` : ''}

    <!-- FOODS TO STRICTLY AVOID -->
    ${dietData.avoidFoods ? `
    <div class="section">
      <div class="section-title">❌ Foods to Strictly Avoid</div>
      <div style="background:#FFEBEE; border:1px solid #EF9A9A; border-left:5px solid #C62828; padding:14px 18px; border-radius:8px; margin-bottom:16px; font-size:14px; color:#B71C1C;">
        <strong>❌ Critical:</strong> These foods directly worsen fatty liver, spike blood sugar, or interfere with the treatment plan. Zero exceptions.
      </div>
      <table class="marker-table">
        <thead>
          <tr>
            <th>❌ Avoid</th>
            <th>Allopathy (Why)</th>
            <th>Ayurveda (Why)</th>
          </tr>
        </thead>
        <tbody>
          ${dietData.avoidFoods.map(a => `
            <tr>
              <td><strong>${a.item}</strong></td>
              <td style="font-size:13px; color:#C62828;">${a.allopathy}</td>
              <td style="font-size:13px; color:var(--slate);">${a.ayurveda}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
    ` : ''}

    <!-- PENDING TESTS -->
    ${dietData.pendingTests ? `
    <div class="section">
      <div class="section-title">🧪 Pending Tests — What to Expect</div>
      <div style="background: linear-gradient(135deg, #E3F2FD, #EDE7F6); padding:14px 18px; border-radius:8px; margin-bottom:16px; font-size:13px; border-left:4px solid #1565C0; color:#0D47A1;">
        <strong>💡 Tip:</strong> Share Fecal Elastase result when available — if < 200 µg/g, it confirms Panlipase dose (currently 10,000 units) needs to be increased to 40,000–50,000 units.
      </div>
      <table class="marker-table">
        <thead>
          <tr>
            <th>Test</th>
            <th>Ordered By</th>
            <th>What It Reveals</th>
          </tr>
        </thead>
        <tbody>
          ${dietData.pendingTests.map(t => `
            <tr>
              <td><strong>${t.test}</strong></td>
              <td><span class="badge badge-monitor">${t.orderedBy}</span></td>
              <td style="font-size:13px;">${t.reveals}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
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

function renderPrecautions(container) {
  let html = `
    <div class="section">
      <div class="section-title">⚠️ Dietary Precautions</div>
      <p style="margin-bottom:20px; color:var(--slate); font-size:14px;">Important rules for portion control, meal timings, and cooking methods to protect the liver and pancreas.</p>
      
      <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap:15px;">
        ${dietData.precautions ? dietData.precautions.map(p => `
          <div class="lifestyle-card">
            <div style="font-size:28px; margin-bottom:8px;">${p.icon}</div>
            <div style="font-weight:700; font-size:15px; margin-bottom:10px; color:var(--navy);">${p.title}</div>
            <ul style="list-style: none; padding: 0;">
              ${p.rules.map(rule => `
                <li style="padding: 6px 0; border-bottom: 1px solid var(--border); font-size: 13px; display: flex; align-items: flex-start; gap: 8px;">
                  <span style="color: var(--attention);">•</span>
                  <span style="color:var(--slate);">${rule}</span>
                </li>
              `).join('')}
            </ul>
          </div>
        `).join('') : ''}
      </div>
    </div>
  `;
  container.innerHTML = html;
}

function renderFruits(container) {
  let html = `
    <div class="section">
      <div class="section-title">🍎 Fruits Guide: Safe vs Unsafe</div>
      <p style="margin-bottom:20px; color:var(--slate); font-size:14px;">Carefully selected fruits that are safe for both diabetes and fatty liver. Strict avoidance is needed for high-sugar fruits.</p>
      
      ${dietData.fruitsGuide ? `
      <div class="simple-guide-grid">
        <!-- EATABLES -->
        <div class="sg-column sg-eat">
          <h3 class="sg-header sg-header-eat">✅ Safe Fruits</h3>
          <ul class="sg-list">
            ${dietData.fruitsGuide.eatable.map(item => `
              <li>
                <div class="sg-emoji">${item.emoji}</div>
                <div>
                  <strong>${item.name}</strong>
                  <p>${item.reason}</p>
                </div>
              </li>
            `).join('')}
          </ul>
        </div>
        <!-- AVOIDABLES -->
        <div class="sg-column sg-avoid">
          <h3 class="sg-header sg-header-avoid">❌ Strictly Avoid</h3>
          <ul class="sg-list">
            ${dietData.fruitsGuide.nonEatable.map(item => `
              <li>
                <div class="sg-emoji">${item.emoji}</div>
                <div>
                  <strong>${item.name}</strong>
                  <p>${item.reason}</p>
                </div>
              </li>
            `).join('')}
          </ul>
        </div>
      </div>
      ` : ''}
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

    ${report.impression ? `
    <div class="section">
      <div class="section-title">📋 Impression</div>
      <ul style="list-style: none; padding: 0;">
        ${report.impression.map(item => `
          <li style="padding: 10px 15px; margin-bottom:8px; background: linear-gradient(135deg, #FFF3E0, #FFF8E1); border-radius:8px; font-size: 14px; font-weight:500; border-left:4px solid var(--attention);">
            ${item}
          </li>
        `).join('')}
      </ul>
    </div>
    ` : ''}

    ${report.consultationPlan ? `
    <div class="section">
      <div class="section-title">🩺 Recommended Consultations</div>
      <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap:15px;">
        ${report.consultationPlan.map(c => `
          <div class="lifestyle-card">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
              <div style="font-weight:700; font-size:15px; color:var(--navy);">${c.specialist}</div>
              <span class="badge badge-${c.when === 'Soon' || c.when === 'Ongoing' ? 'attention' : 'monitor'}" style="font-size:11px;">${c.when}</span>
            </div>
            <div style="font-size:13px; color:var(--slate);">${c.note}</div>
          </div>
        `).join('')}
      </div>
    </div>
    ` : ''}

    ${report.targets ? `
    <div class="section">
      <div class="section-title">🎯 Recovery Targets</div>
      <table class="marker-table">
        <thead>
          <tr>
            <th>Marker</th>
            <th>Current</th>
            <th>3-Month Target</th>
            <th>6-Month Target</th>
          </tr>
        </thead>
        <tbody>
          ${report.targets.map(t => `
            <tr>
              <td><strong>${t.marker}</strong></td>
              <td style="font-family: 'DM Mono', monospace; font-weight:600; color:var(--attention);">${t.current}</td>
              <td style="font-family: 'DM Mono', monospace;">${t.target3}</td>
              <td style="font-family: 'DM Mono', monospace; color:var(--ok);">${t.target6}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
    ` : ''}

    ${report.limitationsNoted ? `
    <div class="section">
      <div style="background:#FFF3E0; padding:15px; border-radius:8px; font-size:13px; border-left:4px solid #FF9800;">
        <strong>⚠️ Scan Limitations:</strong> ${report.limitationsNoted}
      </div>
    </div>
    ` : ''}
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
  if (currentPage < manifest.reports.length + 2) {
    currentPage++;
    render();
    window.scrollTo(0, 0);
  }
});

init();
