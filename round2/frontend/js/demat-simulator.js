let currentPage = 'onboarding';
let selectedStock = null;
let quantity = 1;
let portfolio = [];
let balance = 100000;

let missions = [
  { id: 1, title: "Make your first trade", completed: false, reward: "₹500 bonus" },
  { id: 2, title: "Buy 4+ different stocks", completed: false, reward: "Diversification Badge" }
];

let stocks = [
  { symbol: 'RELIANCE', name: 'Reliance Industries', price: 2456.75, change: 2.34, changePercent: 0.95 },
  { symbol: 'TCS', name: 'Tata Consultancy Services', price: 3892.50, change: -45.25, changePercent: -1.15 },
  { symbol: 'HDFCBANK', name: 'HDFC Bank', price: 1678.90, change: 15.80, changePercent: 0.95 },
  { symbol: 'INFY', name: 'Infosys', price: 1834.25, change: 12.45, changePercent: 0.68 }
];

const coachTips = [
  "Start with blue-chip stocks.",
  "Diversify your portfolio.",
  "Don't panic sell on dips.",
  "Long-term investing pays off."
];
let currentTip = 0;

// DOM references
const pageOnboarding = document.getElementById('page-onboarding');
const pageSimulator = document.getElementById('page-simulator');
const pageResult = document.getElementById('page-result');
const startSimBtn = document.getElementById('start-sim');
const stockListEl = document.getElementById('stock-list');
const tradingPanelEl = document.getElementById('trading-panel');
const missionsListEl = document.getElementById('missions-list');
const balanceBadge = document.getElementById('balance-badge');
const portfolioBadge = document.getElementById('portfolio-badge');
const portfolioPanelPlaceholder = document.getElementById('portfolio-panel-placeholder');
const coachTipEl = document.getElementById('coach-tip');

const resCash = document.getElementById('res-cash');
const resPortfolio = document.getElementById('res-portfolio');
const resPnl = document.getElementById('res-pnl');
const resLearnings = document.getElementById('res-learnings');
const resultEmoji = document.getElementById('result-emoji');
const resultTitle = document.getElementById('result-title');
const openRealBtn = document.getElementById('open-real');
const practiceMoreBtn = document.getElementById('practice-more');

function showPage(page) {
  currentPage = page;
  pageOnboarding.classList.toggle('hidden', page !== 'onboarding');
  pageSimulator.classList.toggle('hidden', page !== 'simulator');
  pageResult.classList.toggle('hidden', page !== 'result');
  if (page === 'simulator') renderAll();
  if (page === 'result') renderResult();
}

function renderStockList() {
  stockListEl.innerHTML = '';
  stocks.forEach(stock => {
    const el = document.createElement('div');
    el.className = 'stock' + (selectedStock?.symbol === stock.symbol ? ' selected' : '');
    el.innerHTML = `<strong>${stock.symbol}</strong> - ₹${stock.price.toFixed(2)} (${stock.changePercent.toFixed(2)}%)`;
    el.onclick = () => { selectedStock = stock; quantity = 1; renderAll(); };
    stockListEl.appendChild(el);
  });
}

function renderTradingPanel() {
  if (!selectedStock) {
    tradingPanelEl.innerHTML = '<p>Select a stock to start trading.</p>';
    return;
  }
  tradingPanelEl.innerHTML = `
    <h3>${selectedStock.name} (${selectedStock.symbol})</h3>
    <p>Price: ₹${selectedStock.price.toFixed(2)}</p>
    <label>Quantity: <input type="number" id="qty-input" value="${quantity}" min="1"/></label>
    <p>Total: ₹${(selectedStock.price * quantity).toFixed(2)}</p>
    <button class="buy" id="buy-btn">BUY</button>
    <button class="sell" id="sell-btn">SELL</button>
  `;
  document.getElementById('qty-input').oninput = e => { quantity = Math.max(1, +e.target.value); renderTradingPanel(); };
  document.getElementById('buy-btn').onclick = () => executeTrade('buy');
  document.getElementById('sell-btn').onclick = () => executeTrade('sell');
}

function renderMissions() {
  missionsListEl.innerHTML = '';
  missions.forEach(m => {
    const div = document.createElement('div');
    div.className = 'mission' + (m.completed ? ' done' : '');
    div.innerHTML = `${m.title} - ${m.reward}`;
    missionsListEl.appendChild(div);
  });
}

function renderPortfolioPanel() {
  portfolioPanelPlaceholder.innerHTML = '';
  portfolio.forEach(p => {
    const currentStock = stocks.find(s => s.symbol === p.symbol);
    const value = currentStock.price * p.quantity;
    const pnl = value - (p.avgPrice * p.quantity);
    const div = document.createElement('div');
    div.className = 'portfolio-item';
    div.innerHTML = `${p.symbol} - ${p.quantity} shares | ₹${value.toFixed(2)} (${pnl >=0 ? '+' : ''}${pnl.toFixed(2)})`;
    portfolioPanelPlaceholder.appendChild(div);
  });
}

function renderAll() {
  balanceBadge.textContent = `Balance: ₹${balance.toFixed(2)}`;
  portfolioBadge.textContent = `Portfolio: ${portfolio.length} stocks`;
  renderStockList();
  renderTradingPanel();
  renderMissions();
  renderPortfolioPanel();
}

function executeTrade(action) {
  const total = selectedStock.price * quantity;
  if (action === 'buy') {
    if (total > balance) return alert('Not enough balance!');
    balance -= total;
    const existing = portfolio.find(p => p.symbol === selectedStock.symbol);
    if (existing) {
      existing.avgPrice = ((existing.avgPrice * existing.quantity) + total) / (existing.quantity + quantity);
      existing.quantity += quantity;
    } else {
      portfolio.push({ symbol: selectedStock.symbol, avgPrice: selectedStock.price, quantity });
    }
  } else {
    const existing = portfolio.find(p => p.symbol === selectedStock.symbol);
    if (!existing || existing.quantity < quantity) return alert('Not enough shares!');
    balance += total;
    existing.quantity -= quantity;
    if (existing.quantity === 0) portfolio = portfolio.filter(p => p.symbol !== selectedStock.symbol);
  }
  // Missions
  if (!missions[0].completed) missions[0].completed = true;
  if (!missions[1].completed && portfolio.length >= 4) missions[1].completed = true;
  showPage('result');
}

function renderResult() {
  const portfolioValue = portfolio.reduce((sum, p) => {
    const s = stocks.find(st => st.symbol === p.symbol);
    return sum + (s.price * p.quantity);
  }, 0);
  const pnl = (balance + portfolioValue) - 100000;
  resCash.textContent = `₹${balance.toFixed(2)}`;
  resPortfolio.textContent = `₹${portfolioValue.toFixed(2)}`;
  resPnl.textContent = `${pnl >=0 ? '+' : ''}₹${pnl.toFixed(2)}`;
  resPnl.style.color = pnl >= 0 ? 'green' : 'red';
  resultEmoji.textContent = pnl >= 0 ? '🎉' : '📊';
  resultTitle.textContent = pnl >= 0 ? 'Great Job!' : 'Learning Experience!';
  resLearnings.innerHTML = pnl >=0
    ? '<li>Good selection of stocks</li><li>Diversify for stability</li>'
    : '<li>Losses are learning opportunities</li><li>Research before investing</li>';
}

// Price update every 5s
setInterval(() => {
  stocks.forEach(s => {
    s.price += (Math.random() - 0.5) * 10;
    s.changePercent = (Math.random() - 0.5) * 2;
  });
  if (currentPage === 'simulator') renderAll();
  if (currentPage === 'result') renderResult();
}, 5000);

// Tips rotation
setInterval(() => {
  currentTip = (currentTip + 1) % coachTips.length;
  coachTipEl.textContent = coachTips[currentTip];
}, 8000);

startSimBtn.onclick = () => showPage('simulator');
openRealBtn.onclick = () => window.open('https://zerodha.com/open-account', '_blank');
practiceMoreBtn.onclick = () => { selectedStock=null; quantity=1; showPage('simulator'); };

coachTipEl.textContent = coachTips[currentTip];