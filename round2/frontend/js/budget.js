// ===== BUDGET CALCULATOR JAVASCRIPT =====

// Simple Budget Calculator
function calculateSimpleBudget() {
  const income = parseFloat(document.getElementById('income').value) || 0;
  const expenses = parseFloat(document.getElementById('expenses').value) || 0;
  
  if (income === 0 && expenses === 0) {
    FinLitUtils.showAlert("Please enter your income and expenses", "warning");
    return;
  }
  
  const balance = income - expenses;
  const resultDiv = document.getElementById('simpleResult');
  
  resultDiv.style.display = 'block';
  
  let message = `Your monthly balance: ${FinLitUtils.formatCurrency(balance)}`;
  let className = 'result-neutral';
  
  if (balance > 0) {
    className = 'result-positive';
    message += `\n✅ Great! You have money left over to save.`;
  } else if (balance < 0) {
    className = 'result-negative';
    message += `\n⚠️ You're spending more than you earn. Consider reducing expenses.`;
  } else {
    message += `\n⚖️ You're breaking even. Try to save something for emergencies.`;
  }
  
  resultDiv.className = `result-display ${className}`;
  resultDiv.innerText = message;
  
  // Save to localStorage
  FinLitUtils.storage.set('lastBudgetCheck', {
    income: income,
    expenses: expenses,
    balance: balance,
    date: new Date().toISOString()
  });
}

// Detailed Budget Calculator
function calculateDetailedBudget() {
  // Get income values
  const salary = parseFloat(document.getElementById('salary').value) || 0;
  const otherIncome = parseFloat(document.getElementById('otherIncome').value) || 0;
  const totalIncome = salary + otherIncome;
  
  // Get expense values
  const food = parseFloat(document.getElementById('food').value) || 0;
  const transport = parseFloat(document.getElementById('transport').value) || 0;
  const education = parseFloat(document.getElementById('education').value) || 0;
  const entertainment = parseFloat(document.getElementById('entertainment').value) || 0;
  const shopping = parseFloat(document.getElementById('shopping').value) || 0;
  const miscellaneous = parseFloat(document.getElementById('miscellaneous').value) || 0;
  
  const totalExpenses = food + transport + education + entertainment + shopping + miscellaneous;
  const balance = totalIncome - totalExpenses;
  
  if (totalIncome === 0 && totalExpenses === 0) {
    FinLitUtils.showAlert("Please enter at least some income and expense values", "warning");
    return;
  }
  
  // Display results
  displayDetailedResults(totalIncome, totalExpenses, balance, {
    food, transport, education, entertainment, shopping, miscellaneous
  });
  
  // Generate recommendations
  generateRecommendations(totalIncome, totalExpenses, balance, {
    food, transport, education, entertainment, shopping, miscellaneous
  });
  
  // Save detailed budget
  FinLitUtils.storage.set('detailedBudget', {
    income: { salary, otherIncome, total: totalIncome },
    expenses: { food, transport, education, entertainment, shopping, miscellaneous, total: totalExpenses },
    balance: balance,
    date: new Date().toISOString()
  });
}

function displayDetailedResults(income, expenses, balance, expenseBreakdown) {
  // Show results section
  document.getElementById('detailedResults').style.display = 'block';
  
  // Update summary displays
  document.getElementById('totalIncomeDisplay').innerText = FinLitUtils.formatCurrency(income);
  document.getElementById('totalExpensesDisplay').innerText = FinLitUtils.formatCurrency(expenses);
  document.getElementById('balanceDisplay').innerText = FinLitUtils.formatCurrency(balance);
  
  // Style balance alert based on result
  const balanceAlert = document.getElementById('balanceAlert');
  if (balance > 0) {
    balanceAlert.className = 'alert alert-success';
  } else if (balance < 0) {
    balanceAlert.className = 'alert alert-danger';
  } else {
    balanceAlert.className = 'alert alert-warning';
  }
  
  // Create expense breakdown chart (simple text-based)
  createExpenseChart(expenseBreakdown, expenses);
}

function createExpenseChart(expenses, total) {
  const chartDiv = document.getElementById('expenseChart');
  
  if (total === 0) {
    chartDiv.innerHTML = '<p>No expenses recorded</p>';
    return;
  }
  
  const categories = [
    { name: 'Food & Dining', value: expenses.food, emoji: '🍽️' },
    { name: 'Transportation', value: expenses.transport, emoji: '🚌' },
    { name: 'Education', value: expenses.education, emoji: '📚' },
    { name: 'Entertainment', value: expenses.entertainment, emoji: '🎬' },
    { name: 'Shopping', value: expenses.shopping, emoji: '🛍️' },
    { name: 'Miscellaneous', value: expenses.miscellaneous, emoji: '📦' }
  ].filter(cat => cat.value > 0).sort((a, b) => b.value - a.value);
  
  let chartHTML = '<div style="margin: 20px 0;">';
  
  categories.forEach(category => {
    const percentage = (category.value / total * 100).toFixed(1);
    chartHTML += `
      <div style="margin: 15px 0;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px;">
          <span><strong>${category.emoji} ${category.name}</strong></span>
          <span>${FinLitUtils.formatCurrency(category.value)} (${percentage}%)</span>
        </div>
        <div class="progress-bar">
          <div class="progress" style="width: ${percentage}%"></div>
        </div>
      </div>
    `;
  });
  
  chartHTML += '</div>';
  chartDiv.innerHTML = chartHTML;
}

function generateRecommendations(income, expenses, balance, expenseBreakdown) {
  const recommendationsDiv = document.getElementById('recommendations');
  let recommendations = [];
  
  if (income === 0) {
    recommendations.push("💡 Consider finding a part-time job or freelance work to increase your income.");
  }
  
  if (balance < 0) {
    recommendations.push("⚠️ You're spending more than you earn. Priority: reduce expenses immediately.");
  }
  
  if (balance >= 0 && balance < income * 0.1) {
    recommendations.push("💰 Try to save at least 10% of your income for emergencies.");
  }
  
  // Category-specific recommendations
  if (expenseBreakdown.food > income * 0.3) {
    recommendations.push("🍽️ Food expenses are high. Try cooking at home more often.");
  }
  
  if (expenseBreakdown.entertainment > income * 0.2) {
    recommendations.push("🎬 Entertainment spending is quite high. Look for free or cheaper alternatives.");
  }
  
  if (expenseBreakdown.shopping > income * 0.15) {
    recommendations.push("🛍️ Shopping expenses are high. Implement the 24-hour rule before purchases.");
  }
  
  if (balance > income * 0.3) {
    recommendations.push("🌟 Excellent! You have good savings potential. Consider investing some money.");
  }
  
  if (recommendations.length === 0) {
    recommendations.push("✅ Your budget looks balanced! Keep tracking your expenses regularly.");
  }
  
  // Display recommendations
  let recHTML = '<ul>';
  recommendations.forEach(rec => {
    recHTML += `<li style="margin: 10px 0; padding: 10px; background: rgba(39, 174, 96, 0.1); border-radius: 8px;">${rec}</li>`;
  });
  recHTML += '</ul>';
  
  recommendationsDiv.innerHTML = recHTML;
}

// 50-30-20 Rule Calculator
function calculate50_30_20() {
  const income = parseFloat(document.getElementById('ruleIncome').value) || 0;
  
  if (income <= 0) {
    FinLitUtils.showAlert("Please enter a valid income amount", "warning");
    return;
  }
  
  const needs = income * 0.5;
  const wants = income * 0.3;
  const savings = income * 0.2;
  
  // Display results
  document.getElementById('ruleResults').style.display = 'block';
  document.getElementById('needsAmount').innerText = FinLitUtils.formatCurrency(needs);
  document.getElementById('wantsAmount').innerText = FinLitUtils.formatCurrency(wants);
  document.getElementById('savingsAmount').innerText = FinLitUtils.formatCurrency(savings);
  
  // Save 50-30-20 calculation
  FinLitUtils.storage.set('fiftyThirtyTwenty', {
    income: income,
    needs: needs,
    wants: wants,
    savings: savings,
    date: new Date().toISOString()
  });
  
  // Scroll to results
  document.getElementById('ruleResults').scrollIntoView({ 
    behavior: 'smooth', 
    block: 'center' 
  });
}

// Load saved data when page loads
document.addEventListener('DOMContentLoaded', function() {
  // Load last budget check
  const lastBudget = FinLitUtils.storage.get('lastBudgetCheck');
  if (lastBudget) {
    document.getElementById('income').value = lastBudget.income || '';
    document.getElementById('expenses').value = lastBudget.expenses || '';
  }
  
  // Load detailed budget
  const detailedBudget = FinLitUtils.storage.get('detailedBudget');
  if (detailedBudget && detailedBudget.income) {
    document.getElementById('salary').value = detailedBudget.income.salary || 0;
    document.getElementById('otherIncome').value = detailedBudget.income.otherIncome || 0;
    
    if (detailedBudget.expenses) {
      document.getElementById('food').value = detailedBudget.expenses.food || 0;
      document.getElementById('transport').value = detailedBudget.expenses.transport || 0;
      document.getElementById('education').value = detailedBudget.expenses.education || 0;
      document.getElementById('entertainment').value = detailedBudget.expenses.entertainment || 0;
      document.getElementById('shopping').value = detailedBudget.expenses.shopping || 0;
      document.getElementById('miscellaneous').value = detailedBudget.expenses.miscellaneous || 0;
    }
  }
  
  // Load 50-30-20 rule
  const fiftyThirtyTwenty = FinLitUtils.storage.get('fiftyThirtyTwenty');
  if (fiftyThirtyTwenty) {
    document.getElementById('ruleIncome').value = fiftyThirtyTwenty.income || '';
  }
});

// Auto-calculate as user types (debounced)
let calculationTimeout;

function setupAutoCalculation() {
  const inputs = ['salary', 'otherIncome', 'food', 'transport', 'education', 'entertainment', 'shopping', 'miscellaneous'];
  
  inputs.forEach(inputId => {
    const input = document.getElementById(inputId);
    if (input) {
      input.addEventListener('input', function() {
        clearTimeout(calculationTimeout);
        calculationTimeout = setTimeout(() => {
          // Only auto-calculate if user has entered some data
          const hasData = inputs.some(id => parseFloat(document.getElementById(id).value) > 0);
          if (hasData) {
            calculateDetailedBudget();
          }
        }, 1000); // Wait 1 second after user stops typing
      });
    }
  });
}

// Initialize auto-calculation
setupAutoCalculation();