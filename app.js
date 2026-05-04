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
      <div class="section-title">🥗 Personalized Diet Plan</div>
      <div style="background:var(--navy); color:white; padding:20px; border-radius:12px; margin-bottom:20px; font-size:14px;">
        <strong style="display:block; margin-bottom:8px; color:#AED6F1;">Dietary Goals</strong>
        ${dietData.goals.join(' · ')}
      </div>
      
      <div class="meal-day">
        <div class="meal-day-header">Daily Schedule</div>
        <div class="meal-rows">
          ${dietData.schedule.map(item => `
            <div class="meal-row">
              <div class="meal-time">${item.time}<br>${item.label}</div>
              <div class="meal-food">${item.food}</div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>

    <div class="section">
      <div class="section-title">🍳 Recipes & Preparation</div>
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
