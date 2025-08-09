// ===== SAVINGS GOAL TRACKER JAVASCRIPT =====

let savingsGoals = [];
let currentFilter = 'all';

// Category icons
const categoryIcons = {
  education: '📚',
  travel: '✈️', 
  gadgets: '📱',
  emergency: '🚨',
  shopping: '🛍️',
  other: '📦'
};

// Savings tips data
const savingsTips = [
  "💡 Start with small amounts - even ₹10 per day adds up to ₹3,650 per year!",
  "🎯 Use the envelope method - allocate specific amounts for different expenses.",
  "📱 Track every expense for a week to identify where your money really goes.",
  "🏦 Open a separate savings account for your goals to avoid temptation.",
  "💰 Save any coins you get throughout the day in a jar - you'll be surprised!",
  "🛍️ Before buying something, calculate how many hours you'd need to work to afford it.",
  "📅 Set up automatic transfers on the day you receive money.",
  "🎉 Reward yourself (within budget) when you reach savings milestones.",
  "👥 Find a savings buddy to keep each other accountable.",
  "📊 Review your goals monthly and adjust if needed."
];

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
  loadSavingsGoals();
  displayGoals();
  updateInsights();
  updateQuickAddDropdown();
  setMinDate();
});

function setMinDate() {
  const today = new Date().toISOString().split('T')[0];
  document.getElementById('goalDeadline').min = today;
}

// Create new goal
function createNewGoal() {
  const name = document.getElementById('goalName').value.trim();
  const amount = parseFloat(document.getElementById('goalAmount').value) || 0;
  const deadline = document.getElementById('goalDeadline').value;
  const category = document.getElementById('goalCategory').value;
  const initialAmount = parseFloat(document.getElementById('initialAmount').value) || 0;
  
  // Validation
  if (!name) {
    FinLitUtils.showAlert("Please enter a goal name", "warning");
    return;
  }
  
  if (amount <= 0) {
    FinLitUtils.showAlert("Please enter a valid target amount", "warning");
    return;
  }
  
  if (!deadline) {
    FinLitUtils.showAlert("Please select a target date", "warning");
    return;
  }
  
  if (initialAmount > amount) {
    FinLitUtils.showAlert("Initial amount cannot be more than target amount", "warning");
    return;
  }
  
  // Check if deadline is in the future
  const today = new Date();
  const targetDate = new Date(deadline);
  if (targetDate <= today) {
    FinLitUtils.showAlert("Please select a future date", "warning");
    return;
  }
  
  // Create goal object
  const goal = {
    id: Date.now(), // Simple ID generation
    name: name,
    targetAmount: amount,
    currentAmount: initialAmount,
    deadline: deadline,
    category: category,
    createdDate: new Date().toISOString(),
    transactions: initialAmount > 0 ? [{
      amount: initialAmount,
      date: new Date().toISOString(),
      note: "Initial amount"
    }] : [],
    isCompleted: initialAmount >= amount
  };
  
  savingsGoals.push(goal);
  saveSavingsGoals();
  
  // Clear form
  clearGoalForm();
  
  // Update displays
  displayGoals();
  updateInsights();
  updateQuickAddDropdown();
  
  // Show success message
  FinLitUtils.showAlert(`Goal "${name}" created successfully!`, "success");
  
  // Check if goal is immediately completed
  if (goal.isCompleted) {
    celebrateGoalCompletion(goal);
  }
}

function clearGoalForm() {
  document.getElementById('goalName').value = '';
  document.getElementById('goalAmount').value = '';
  document.getElementById('goalDeadline').value = '';
  document.getElementById('goalCategory').value = 'education';
  document.getElementById('initialAmount').value = '0';
}

// Display goals
function displayGoals() {
  const container = document.getElementById('goalsContainer');
  
  // Filter goals
  let filteredGoals = savingsGoals;
  if (currentFilter === 'active') {
    filteredGoals = savingsGoals.filter(goal => !goal.isCompleted);
  } else if (currentFilter === 'completed') {
    filteredGoals = savingsGoals.filter(goal => goal.isCompleted);
  }
  
  if (filteredGoals.length === 0) {
    let message = "No goals yet!";
    if (currentFilter === 'active') message = "No active goals!";
    if (currentFilter === 'completed') message = "No completed goals yet!";
    
    container.innerHTML = `
      <div class="no-goals-message" style="text-align: center; padding: 40px; color: #666;">
        <h3>🎯 ${message}</h3>
        <p>${currentFilter === 'all' ? 'Create your first savings goal above to get started.' : 'Keep working on your goals!'}</p>
      </div>
    `;
    return;
  }
  
  let goalsHTML = '';
  
  filteredGoals.forEach(goal => {
    const progress = Math.min((goal.currentAmount / goal.targetAmount) * 100, 100);
    const daysLeft = Math.ceil((new Date(goal.deadline) - new Date()) / (1000 * 60 * 60 * 24));
    const icon = categoryIcons[goal.category] || '📦';
    
    let statusBadge = '';
    let statusClass = '';
    
    if (goal.isCompleted) {
      statusBadge = '<span class="badge badge-success">✅ Completed</span>';
      statusClass = 'completed-goal';
    } else if (daysLeft < 0) {
      statusBadge = '<span class="badge badge-danger">⏰ Overdue</span>';
      statusClass = 'overdue-goal';
    } else if (daysLeft <= 30) {
      statusBadge = '<span class="badge badge-warning">⚡ Urgent</span>';
      statusClass = 'urgent-goal';
    } else {
      statusBadge = '<span class="badge badge-info">🎯 Active</span>';
      statusClass = 'active-goal';
    }
    
    goalsHTML += `
      <div class="goal-card ${statusClass}" style="background: white; padding: 25px; border-radius: 15px; margin: 20px 0; box-shadow: 0 5px 15px rgba(0,0,0,0.1); border-left: 5px solid ${getProgressColor(progress)};">
        
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 15px;">
          <div>
            <h3 style="margin: 0; color: #2c3e50; display: flex; align-items: center; gap: 10px;">
              ${icon} ${goal.name}
            </h3>
            <p style="margin: 5px 0; color: #666;">
              Target: ${FinLitUtils.formatCurrency(goal.targetAmount)} by ${formatDate(goal.deadline)}
            </p>
          </div>
          <div style="text-align: right;">
            ${statusBadge}
            <p style="margin: 5px 0; font-size: 14px; color: #666;">
              ${daysLeft >= 0 ? daysLeft + ' days left' : Math.abs(daysLeft) + ' days overdue'}
            </p>
          </div>
        </div>
        
        <div style="margin: 20px 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <span style="font-weight: 600;">Progress: ${progress.toFixed(1)}%</span>
            <span style="font-weight: 600;">${FinLitUtils.formatCurrency(goal.currentAmount)} / ${FinLitUtils.formatCurrency(goal.targetAmount)}</span>
          </div>
          <div class="progress-bar">
            <div class="progress" style="width: ${progress}%; background: ${getProgressColor(progress)};">
              ${progress.toFixed(0)}%
            </div>
          </div>
        </div>
        
        <div style="display: flex; gap: 10px; flex-wrap: wrap;">
          ${!goal.isCompleted ? `
            <button onclick="showAddSavingModal(${goal.id})" class="btn btn-primary">💰 Add Saving</button>
            <button onclick="viewGoalDetails(${goal.id})" class="btn btn-secondary">📊 Details</button>
          ` : `
            <button onclick="viewGoalDetails(${goal.id})" class="btn btn-secondary">📊 View Details</button>
          `}
          <button onclick="deleteGoal(${goal.id})" class="btn btn-danger">🗑️ Delete</button>
        </div>
      </div>
    `;
  });
  
  container.innerHTML = goalsHTML;
  
  // Show/hide quick add section
  const hasActiveGoals = savingsGoals.some(goal => !goal.isCompleted);
  document.getElementById('quickAddCard').style.display = hasActiveGoals ? 'block' : 'none';
}

function getProgressColor(progress) {
  if (progress >= 100) return '#27ae60';
  if (progress >= 75) return '#2ecc71';
  if (progress >= 50) return '#f39c12';
  if (progress >= 25) return '#e67e22';
  return '#e74c3c';
}

function formatDate(dateString) {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-IN', options);
}

// Filter goals
function filterGoals(filter) {
  currentFilter = filter;
  
  // Update button styles
  document.querySelectorAll('#filterAll, #filterActive, #filterCompleted').forEach(btn => {
    btn.classList.remove('active');
  });
  
  if (filter === 'all') document.getElementById('filterAll').classList.add('active');
  else if (filter === 'active') document.getElementById('filterActive').classList.add('active');
  else if (filter === 'completed') document.getElementById('filterCompleted').classList.add('active');
  
  displayGoals();
}

// Quick add functions
function quickAdd(amount) {
  const selectedGoalId = parseInt(document.getElementById('selectedGoal').value);
  if (!selectedGoalId) {
    FinLitUtils.showAlert("Please select a goal first", "warning");
    return;
  }
  
  addSavingToGoal(selectedGoalId, amount, `Quick add ₹${amount}`);
}

function showCustomAdd() {
  const section = document.getElementById('customAddSection');
  section.style.display = section.style.display === 'none' ? 'block' : 'none';
}

function addCustomSaving() {
  const amount = parseFloat(document.getElementById('customAmount').value) || 0;
  const note = document.getElementById('savingsNote').value.trim();
  const selectedGoalId = parseInt(document.getElementById('selectedGoal').value);
  
  if (amount <= 0) {
    FinLitUtils.showAlert("Please enter a valid amount", "warning");
    return;
  }
  
  if (!selectedGoalId) {
    FinLitUtils.showAlert("Please select a goal", "warning");
    return;
  }
  
  addSavingToGoal(selectedGoalId, amount, note || `Added ₹${amount}`);
  
  // Clear inputs
  document.getElementById('customAmount').value = '';
  document.getElementById('savingsNote').value = '';
  document.getElementById('customAddSection').style.display = 'none';
}

function addSavingToGoal(goalId, amount, note) {
  const goal = savingsGoals.find(g => g.id === goalId);
  if (!goal) return;
  
  if (goal.isCompleted) {
    FinLitUtils.showAlert("This goal is already completed!", "info");
    return;
  }
  
  // Add transaction
  goal.transactions.push({
    amount: amount,
    date: new Date().toISOString(),
    note: note
  });
  
  // Update current amount
  goal.currentAmount += amount;
  
  // Check if goal is completed
  if (goal.currentAmount >= goal.targetAmount) {
    goal.isCompleted = true;
    celebrateGoalCompletion(goal);
  }
  
  saveSavingsGoals();
  displayGoals();
  updateInsights();
  updateQuickAddDropdown();
  
  FinLitUtils.showAlert(`₹${amount} added to "${goal.name}"!`, "success");
}

// Show add saving modal (simplified version)
function showAddSavingModal(goalId) {
  const amount = prompt("Enter amount to add (₹):");
  if (amount && !isNaN(amount) && parseFloat(amount) > 0) {
    const note = prompt("Add a note (optional):") || "Manual addition";
    addSavingToGoal(goalId, parseFloat(amount), note);
  }
}

// View goal details
function viewGoalDetails(goalId) {
  const goal = savingsGoals.find(g => g.id === goalId);
  if (!goal) return;
  
  const transactions = goal.transactions.map(t => 
    `• ${formatDate(t.date)}: +₹${t.amount} - ${t.note}`
  ).join('\n');
  
  const details = `
Goal: ${goal.name}
Category: ${categoryIcons[goal.category]} ${goal.category.charAt(0).toUpperCase() + goal.category.slice(1)}
Target: ${FinLitUtils.formatCurrency(goal.targetAmount)}
Current: ${FinLitUtils.formatCurrency(goal.currentAmount)}
Progress: ${((goal.currentAmount / goal.targetAmount) * 100).toFixed(1)}%
Deadline: ${formatDate(goal.deadline)}
Created: ${formatDate(goal.createdDate)}

Transaction History:
${transactions || "No transactions yet"}
  `;
  
  alert(details);
}

// Delete goal
function deleteGoal(goalId) {
  const goal = savingsGoals.find(g => g.id === goalId);
  if (!goal) return;
  
  if (confirm(`Are you sure you want to delete "${goal.name}"? This action cannot be undone.`)) {
    savingsGoals = savingsGoals.filter(g => g.id !== goalId);
    saveSavingsGoals();
    displayGoals();
    updateInsights();
    updateQuickAddDropdown();
    FinLitUtils.showAlert("Goal deleted successfully", "info");
  }
}

// Update quick add dropdown
function updateQuickAddDropdown() {
  const dropdown = document.getElementById('selectedGoal');
  const activeGoals = savingsGoals.filter(goal => !goal.isCompleted);
  
  dropdown.innerHTML = '<option value="">Select a goal...</option>';
  
  activeGoals.forEach(goal => {
    const option = document.createElement('option');
    option.value = goal.id;
    option.textContent = `${categoryIcons[goal.category]} ${goal.name} (₹${goal.currentAmount}/₹${goal.targetAmount})`;
    dropdown.appendChild(option);
  });
}

// Update insights
function updateInsights() {
  const totalSaved = savingsGoals.reduce((sum, goal) => sum + goal.currentAmount, 0);
  const activeGoals = savingsGoals.filter(goal => !goal.isCompleted).length;
  const completedGoals = savingsGoals.filter(goal => goal.isCompleted).length;
  
  let averageProgress = 0;
  if (savingsGoals.length > 0) {
    const totalProgress = savingsGoals.reduce((sum, goal) => 
      sum + Math.min((goal.currentAmount / goal.targetAmount) * 100, 100), 0
    );
    averageProgress = totalProgress / savingsGoals.length;
  }
  
  document.getElementById('totalSavedAmount').textContent = FinLitUtils.formatCurrency(totalSaved);
  document.getElementById('activeGoalsCount').textContent = activeGoals;
  document.getElementById('completedGoalsCount').textContent = completedGoals;
  document.getElementById('averageProgress').textContent = averageProgress.toFixed(1) + '%';
  
  // Update monthly chart (simplified version)
  updateMonthlySavingsChart();
}

// Simple monthly savings chart
function updateMonthlySavingsChart() {
  const chartDiv = document.getElementById('monthlySavingsChart');
  
  if (savingsGoals.length === 0) {
    chartDiv.innerHTML = '<p style="text-align: center; color: #666;">Start saving to see your progress chart!</p>';
    return;
  }
  
  // Get last 6 months of data
  const monthlyData = {};
  const currentDate = new Date();
  
  // Initialize last 6 months
  for (let i = 5; i >= 0; i--) {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
    const key = date.toISOString().slice(0, 7); // YYYY-MM format
    monthlyData[key] = 0;
  }
  
  // Calculate savings per month
  savingsGoals.forEach(goal => {
    goal.transactions.forEach(transaction => {
      const monthKey = transaction.date.slice(0, 7);
      if (monthlyData.hasOwnProperty(monthKey)) {
        monthlyData[monthKey] += transaction.amount;
      }
    });
  });
  
  // Create simple bar chart
  let chartHTML = '<div style="display: flex; align-items: end; gap: 10px; height: 150px; padding: 20px 0;">';
  const maxAmount = Math.max(...Object.values(monthlyData), 1);
  
  Object.entries(monthlyData).forEach(([month, amount]) => {
    const height = (amount / maxAmount) * 100;
    const monthName = new Date(month + '-01').toLocaleDateString('en-IN', { month: 'short' });
    
    chartHTML += `
      <div style="flex: 1; text-align: center;">
        <div style="background: #27ae60; height: ${height}px; margin-bottom: 5px; border-radius: 4px; min-height: 2px;"></div>
        <small style="font-size: 12px;">${monthName}</small><br>
        <small style="font-size: 10px; color: #666;">₹${amount}</small>
      </div>
    `;
  });
  
  chartHTML += '</div>';
  chartDiv.innerHTML = chartHTML;
}

// Goal celebration
function celebrateGoalCompletion(goal) {
  const modal = document.getElementById('celebrationModal');
  const message = document.getElementById('celebrationMessage');
  
  message.innerHTML = `
    <div style="text-align: center;">
      <div style="font-size: 4rem; margin: 20px 0;">🎊🎉🏆</div>
      <h3>You've completed your goal!</h3>
      <p><strong>"${goal.name}"</strong></p>
      <p>Target: ${FinLitUtils.formatCurrency(goal.targetAmount)}</p>
      <p>You're amazing at saving money! 💪</p>
    </div>
  `;
  
  modal.style.display = 'block';
}

function closeCelebrationModal() {
  document.getElementById('celebrationModal').style.display = 'none';
}

// Random savings tip
function showRandomSavingsTip() {
  const tipIndex = Math.floor(Math.random() * savingsTips.length);
  const tipsContainer = document.getElementById('savingsTipsContainer');
  
  const newTip = `
    <div class="savings-tip" style="background: linear-gradient(135deg, #667eea, #764ba2); color: white; padding: 20px; border-radius: 10px; margin: 10px 0; animation: fadeIn 0.5s ease;">
      <h4>💡 Fresh Tip!</h4>
      <p>${savingsTips[tipIndex]}</p>
    </div>
  `;
  
  tipsContainer.innerHTML = newTip + tipsContainer.innerHTML;
  
  // Remove old tips if more than 3
  const tips = tipsContainer.querySelectorAll('.savings-tip');
  if (tips.length > 3) {
    tips[tips.length - 1].remove();
  }
}

// Storage functions
function saveSavingsGoals() {
  FinLitUtils.storage.set('savingsGoals', savingsGoals);
}

function loadSavingsGoals() {
  const saved = FinLitUtils.storage.get('savingsGoals');
  if (saved && Array.isArray(saved)) {
    savingsGoals = saved;
  }
}

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  .modal {
    position: fixed;
    z-index: 1000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .modal-content {
    background-color: white;
    padding: 40px;
    border-radius: 20px;
    text-align: center;
    max-width: 500px;
    margin: 20px;
    box-shadow: 0 20px 40px rgba(0,0,0,0.3);
    animation: modalAppear 0.3s ease;
  }
  
  @keyframes modalAppear {
    from { opacity: 0; transform: scale(0.8); }
    to { opacity: 1; transform: scale(1); }
  }
  
  .goal-card {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .goal-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0,0,0,0.15) !important;
  }
  
  .completed-goal {
    opacity: 0.8;
    border-left-color: #27ae60 !important;
  }
  
  .overdue-goal {
    border-left-color: #e74c3c !important;
  }
  
  .urgent-goal {
    border-left-color: #f39c12 !important;
  }
  
  .active-goal {
    border-left-color: #3498db !important;
  }
  
  .btn.active {
    background: #27ae60 !important;
    color: white !important;
    transform: scale(1.05);
  }
  
  .progress {
    animation: progressFill 1s ease-out;
  }
  
  @keyframes progressFill {
    from { width: 0% !important; }
  }
`;

document.head.appendChild(style);

// Add click outside modal to close
window.onclick = function(event) {
  const modal = document.getElementById('celebrationModal');
  if (event.target === modal) {
    closeCelebrationModal();
  }
}

// Motivational messages based on progress
function getMotivationalMessage(progress, daysLeft) {
  if (progress >= 100) {
    return "🎉 Goal completed! You're a savings superstar!";
  } else if (progress >= 75) {
    return "🔥 Almost there! You're doing amazing!";
  } else if (progress >= 50) {
    return "💪 Halfway there! Keep up the great work!";
  } else if (progress >= 25) {
    return "🌱 Great start! Every rupee counts!";
  } else if (daysLeft < 30) {
    return "⏰ Time to boost your savings! You can do it!";
  } else {
    return "🎯 Stay focused on your goal!";
  }
}

// Export goal data (for future use)
function exportGoalData() {
  const data = {
    goals: savingsGoals,
    exportDate: new Date().toISOString(),
    totalGoals: savingsGoals.length,
    completedGoals: savingsGoals.filter(g => g.isCompleted).length,
    totalSaved: savingsGoals.reduce((sum, goal) => sum + goal.currentAmount, 0)
  };
  
  const dataStr = JSON.stringify(data, null, 2);
  const dataBlob = new Blob([dataStr], {type: 'application/json'});
  const url = URL.createObjectURL(dataBlob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = 'savings-goals-backup.json';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// Initialize filter buttons as active/inactive
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('filterAll').classList.add('active');
});