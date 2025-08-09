// /* -------------------------
//    State (kept same names)
//    ------------------------- */
// let currentPage = 'onboarding';
// let selectedStock = null;
// let quantity = 1;
// let portfolio = [];
// let balance = 100000; // ₹1,00,000
// let missions = [
//   { id: 1, title: "Make your first trade", completed: false, reward: "₹500 bonus" },
//   { id: 2, title: "Buy 5 different stocks", completed: false, reward: "Diversification Badge" },
//   { id: 3, title: "Hold stocks for 24 hours", completed: false, reward: "Patient Investor Badge" }
// ];

// let stocks = [
//   { symbol: 'RELIANCE', name: 'Reliance Industries', price: 2456.75, change: 2.34, changePercent: 0.95 },
//   { symbol: 'TCS', name: 'Tata Consultancy Services', price: 3892.50, change: -45.25, changePercent: -1.15 },
//   { symbol: 'HDFCBANK', name: 'HDFC Bank', price: 1678.90, change: 15.80, changePercent: 0.95 },
//   { symbol: 'INFY', name: 'Infosys', price: 1834.25, change: 12.45, changePercent: 0.68 },
//   { symbol: 'ICICIBANK', name: 'ICICI Bank', price: 1245.60, change: -8.90, changePercent: -0.71 },
//   { symbol: 'HINDUNILVR', name: 'Hindustan Unilever', price: 2567.30, change: 21.75, changePercent: 0.85 },
//   { symbol: 'ITC', name: 'ITC Limited', price: 456.80, change: 3.20, changePercent: 0.70 },
//   { symbol: 'BAJFINANCE', name: 'Bajaj Finance', price: 7234.50, change: -89.25, changePercent: -1.22 }
// ];

// const coachTips = [
//   "💡 Start with blue-chip stocks for safer investments",
//   "📊 Always check the company's fundamentals before buying",
//   "⏰ Don't panic sell during market dips - stay calm!",
//   "🎯 Diversify your portfolio across different sectors",
//   "📈 Long-term investing often beats short-term trading",
//   "💰 Never invest money you can't afford to lose",
//   "🔍 Research before you invest - knowledge is power!",
//   "📉 Market volatility is normal - don't fear it",
//   "🏦 Consider the company's debt-to-equity ratio",
//   "📱 Keep learning - the market rewards educated investors"
// ];

// let currentTip = 0;

// /* -------------------------
//    DOM references
//    ------------------------- */
// const pageOnboarding = document.getElementById('page-onboarding');
// const pageSimulator = document.getElementById('page-simulator');
// const pageResult = document.getElementById('page-result');

// const startSimBtn = document.getElementById('start-sim');
// const stockListEl = document.getElementById('stock-list');
// const tradingPanelEl = document.getElementById('trading-panel');
// const coachTipEl = document.getElementById('coach-tip');
// const missionsListEl = document.getElementById('missions-list');
// const balanceBadge = document.getElementById('balance-badge');
// const portfolioBadge = document.getElementById('portfolio-badge');
// const portfolioPanelPlaceholder = document.getElementById('portfolio-panel-placeholder');

// const resCash = document.getElementById('res-cash');
// const resPortfolio = document.getElementById('res-portfolio');
// const resPnl = document.getElementById('res-pnl');
// const resLearnings = document.getElementById('res-learnings');
// const resultEmoji = document.getElementById('result-emoji');
// const resultTitle = document.getElementById('result-title');

// const openRealBtn = document.getElementById('open-real');
// const practiceMoreBtn = document.getElementById('practice-more');

// /* -------------------------
//    Helper utilities
//    ------------------------- */
// function formatINR(n) {
//   try {
//     return n.toLocaleString('en-IN', { maximumFractionDigits: 2, minimumFractionDigits: 2 });
//   } catch (e) {
//     return Number(n).toFixed(2);
//   }
// }

// function showPage(page) {
//   currentPage = page;
//   pageOnboarding.classList.toggle('hidden', page !== 'onboarding');
//   pageSimulator.classList.toggle('hidden', page !== 'simulator');
//   pageResult.classList.toggle('hidden', page !== 'result');
//   // render UI parts appropriate to page
//   if (page === 'simulator') {
//     renderAll();
//   }
//   if (page === 'result') {
//     renderResult();
//   }
// }

// /* -------------------------
//    Renderers
//    ------------------------- */
// function renderStockList() {
//   stockListEl.innerHTML = '';
//   stocks.forEach(stock => {
//     const el = document.createElement('div');
//     el.className = `p-3 rounded-lg cursor-pointer transition-colors ${selectedStock?.symbol === stock.symbol ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50 border border-transparent'}`;
//     el.innerHTML = `
//       <div class="flex justify-between items-center">
//         <div>
//           <div class="font-semibold text-sm">${stock.symbol}</div>
//           <div class="text-xs text-gray-500 truncate">${stock.name}</div>
//         </div>
//         <div class="text-right">
//           <div class="font-semibold">₹${stock.price.toFixed(2)}</div>
//           <div class="text-xs ${stock.change >= 0 ? 'text-green-600' : 'text-red-600'}">
//             ${stock.change >= 0 ? '+' : ''}${stock.changePercent.toFixed(2)}%
//           </div>
//         </div>
//       </div>
//     `;
//     el.addEventListener('click', () => {
//       selectedStock = stock;
//       quantity = 1;
//       renderAll();
//     });
//     stockListEl.appendChild(el);
//   });
// }

// function renderTradingPanel() {
//   if (!selectedStock) {
//     tradingPanelEl.innerHTML = `
//       <div class="text-center py-12 text-gray-500">
//         <i data-lucide="bar-chart-3" class="w-12 h-12 mx-auto mb-4 text-gray-300"></i>
//         <p>Select a stock from the left panel to start trading</p>
//       </div>
//     `;
//     lucide.createIcons();
//     return;
//   }

//   tradingPanelEl.innerHTML = `
//     <div class="space-y-6">
//       <div class="bg-gray-50 rounded-lg p-4">
//         <div class="flex justify-between items-center">
//           <div>
//             <h3 class="text-lg font-bold">${selectedStock.symbol}</h3>
//             <p class="text-sm text-gray-600">${selectedStock.name}</p>
//           </div>
//           <div class="text-right">
//             <div class="text-2xl font-bold">₹${selectedStock.price.toFixed(2)}</div>
//             <div class="text-sm ${selectedStock.change >= 0 ? 'text-green-600' : 'text-red-600'}">
//               ${selectedStock.change >= 0 ? '+' : ''}${selectedStock.change.toFixed(2)} (${selectedStock.changePercent.toFixed(2)}%)
//             </div>
//           </div>
//         </div>
//       </div>

//       <div>
//         <label class="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
//         <input id="qty-input" type="number" value="${quantity}" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" min="1" />
//       </div>

//       <div class="bg-blue-50 p-4 rounded-lg">
//         <div class="flex justify-between text-sm">
//           <span>Total Amount:</span>
//           <span class="font-semibold">₹${(selectedStock.price * quantity).toLocaleString('en-IN')}</span>
//         </div>
//       </div>

//       <div class="flex gap-4">
//         <button id="buy-btn" class="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2">
//           <i data-lucide="trending-up" class="w-5 h-5"></i> BUY
//         </button>
//         <button id="sell-btn" class="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2">
//           <i data-lucide="trending-down" class="w-5 h-5"></i> SELL
//         </button>
//       </div>
//     </div>
//   `;

//   // re-init icons inside
//   lucide.createIcons();

//   // quantity input handler
//   const qtyInput = document.getElementById('qty-input');
//   qtyInput.addEventListener('input', (e) => {
//     const val = Math.max(1, parseInt(e.target.value) || 1);
//     quantity = val;
//     renderTradingPanel(); // update total amount display
//   });

//   document.getElementById('buy-btn').addEventListener('click', () => executeTrade('buy'));
//   document.getElementById('sell-btn').addEventListener('click', () => executeTrade('sell'));
// }

// function renderMissions() {
//   missionsListEl.innerHTML = '';
//   missions.forEach(m => {
//     const div = document.createElement('div');
//     div.className = `p-3 rounded-lg ${m.completed ? 'bg-green-50 border border-green-200' : 'bg-gray-50'}`;
//     div.innerHTML = `
//       <div class="flex items-center gap-2 mb-1">
//         <div class="w-4 h-4 rounded-full ${m.completed ? 'bg-green-500' : 'bg-gray-300'}"></div>
//         <span class="text-sm font-medium">${m.title}</span>
//       </div>
//       <p class="text-xs text-gray-600">${m.reward}</p>
//     `;
//     missionsListEl.appendChild(div);
//   });
// }

// function renderPortfolioPanel() {
//   // show portfolio panel only if portfolio has items
//   if (portfolio.length === 0) {
//     portfolioPanelPlaceholder.innerHTML = '';
//     return;
//   }

//   let html = `<div class="bg-white rounded-xl shadow-sm border p-4">
//     <h3 class="text-lg font-semibold mb-3">Your Portfolio</h3>
//     <div class="space-y-2">`;

//   portfolio.forEach(holding => {
//     const currentStock = stocks.find(s => s.symbol === holding.symbol);
//     const currentValue = currentStock ? currentStock.price * holding.quantity : 0;
//     const investedValue = holding.avgPrice * holding.quantity;
//     const pnl = currentValue - investedValue;

//     html += `
//       <div class="p-2 bg-gray-50 rounded">
//         <div class="flex justify-between items-center">
//           <div>
//             <div class="text-sm font-medium">${holding.symbol}</div>
//             <div class="text-xs text-gray-500">${holding.quantity} shares</div>
//           </div>
//           <div class="text-right">
//             <div class="text-sm font-semibold">₹${currentValue.toFixed(2)}</div>
//             <div class="text-xs ${pnl >= 0 ? 'text-green-600' : 'text-red-600'}">
//               ${pnl >= 0 ? '+' : ''}₹${pnl.toFixed(2)}
//             </div>
//           </div>
//         </div>
//       </div>
//     `;
//   });

//   html += `</div></div>`;
//   portfolioPanelPlaceholder.innerHTML = html;
// }

// function renderAll() {
//   // update badges
//   balanceBadge.textContent = `Balance: ₹${formatINR(balance)}`;
//   portfolioBadge.textContent = `Portfolio: ${portfolio.length} stocks`;

//   // stock list & trading panel
//   renderStockList();
//   renderTradingPanel();
//   renderMissions();
//   renderPortfolioPanel();
// }

// /* -------------------------
//    Trade logic (kept identical)
//    ------------------------- */
// function executeTrade(action) {
//   if (!selectedStock || quantity <= 0) return;

//   const totalAmount = selectedStock.price * quantity;

//   if (action === 'buy' && totalAmount > balance) {
//     alert('Insufficient balance!');
//     return;
//   }

//   const trade = {
//     id: Date.now(),
//     stock: selectedStock,
//     quantity,
//     action,
//     price: selectedStock.price,
//     amount: totalAmount,
//     timestamp: new Date()
//   };

//   if (action === 'buy') {
//     balance = balance - totalAmount;

//     // update portfolio
//     const existing = portfolio.find(p => p.symbol === selectedStock.symbol);
//     if (existing) {
//       // find and update existing
//       portfolio = portfolio.map(p =>
//         p.symbol === selectedStock.symbol
//           ? { ...p, quantity: p.quantity + quantity, avgPrice: ((p.avgPrice * p.quantity) + totalAmount) / (p.quantity + quantity) }
//           : p
//       );
//     } else {
//       portfolio = [...portfolio, { ...selectedStock, quantity, avgPrice: selectedStock.price }];
//     }
//   } else {
//     const holding = portfolio.find(p => p.symbol === selectedStock.symbol);
//     if (!holding || holding.quantity < quantity) {
//       alert('Insufficient shares to sell!');
//       return;
//     }

//     balance = balance + totalAmount;
//     portfolio = portfolio
//       .map(p => p.symbol === selectedStock.symbol ? { ...p, quantity: p.quantity - quantity } : p)
//       .filter(p => p.quantity > 0);
//   }

//   // Check missions (note: keeps original logic; uses current portfolio length)
//   missions = missions.map(mission => {
//     if (mission.id === 1 && !mission.completed) {
//       return { ...mission, completed: true };
//     }
//     if (mission.id === 2 && portfolio.length >= 4 && !mission.completed) {
//       return { ...mission, completed: true };
//     }
//     return mission;
//   });

//   // go to result page
//   showPage('result');
// }

// /* -------------------------
//    Result render (same calculations)
//    ------------------------- */
// function renderResult() {
//   const totalPortfolioValue = portfolio.reduce((sum, holding) => {
//     const currentStock = stocks.find(s => s.symbol === holding.symbol);
//     return sum + (currentStock ? currentStock.price * holding.quantity : 0);
//   }, 0);

//   const totalInvestment = 100000 - balance;
//   const totalPnL = (balance + totalPortfolioValue) - 100000;

//   resCash.textContent = `₹${formatINR(balance)}`;
//   resPortfolio.textContent = `₹${formatINR(totalPortfolioValue)}`;
//   resPnl.textContent = `${totalPnL >= 0 ? '+' : ''}₹${totalPnL.toFixed(2)}`;
//   resPnl.className = `text-2xl font-bold ${totalPnL >= 0 ? 'text-green-400' : 'text-red-400'}`;

//   resultEmoji.textContent = totalPnL >= 0 ? '🎉' : '📊';
//   resultTitle.textContent = totalPnL >= 0 ? 'Great Job!' : 'Learning Experience!';

//   // key learning points
//   resLearnings.innerHTML = '';
//   if (totalPnL >= 0) {
//     resLearnings.innerHTML = `
//       <li>✅ You made profitable trades! This shows good stock selection.</li>
//       <li>✅ Remember: Past performance doesn't guarantee future results.</li>
//       <li>✅ Consider diversifying across different sectors for lower risk.</li>
//     `;
//   } else {
//     resLearnings.innerHTML = `
//       <li>📖 Market volatility is normal - losses are part of learning.</li>
//       <li>📖 Research companies thoroughly before investing real money.</li>
//       <li>📖 Consider long-term investing instead of short-term trading.</li>
//     `;
//   }
// }

// /* -------------------------
//    Simulate price updates
//    (keeps the same randomness and 5s interval)
//    ------------------------- */
// setInterval(() => {
//   stocks = stocks.map(stock => ({
//     ...stock,
//     price: stock.price + (Math.random() - 0.5) * 10,
//     change: (Math.random() - 0.5) * 20,
//     changePercent: (Math.random() - 0.5) * 2
//   }));
//   // update UI if on simulator or result (portfolio values change)
//   if (currentPage === 'simulator') renderAll();
//   if (currentPage === 'result') renderResult();
// }, 5000);

// /* -------------------------
//    Rotate coach tips every 8s
//    ------------------------- */
// setInterval(() => {
//   currentTip = (currentTip + 1) % coachTips.length;
//   coachTipEl.textContent = coachTips[currentTip];
// }, 8000);

// /* -------------------------
//    Event bindings
//    ------------------------- */
// startSimBtn.addEventListener('click', () => showPage('simulator'));

// // open real account (keeps original link)
// openRealBtn.addEventListener('click', () => {
//   window.open('https://zerodha.com/open-account?c=ZXARJD', '_blank');
// });

// // practice more -> return to simulator and reset selection and qty
// practiceMoreBtn.addEventListener('click', () => {
//   selectedStock = null;
//   quantity = 1;
//   showPage('simulator');
// });

// // initial tip
// coachTipEl.textContent = coachTips[currentTip];

// // initial render (onboarding visible)
// lucide.createIcons();
// renderAll();


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