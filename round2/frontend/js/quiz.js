// ===== FINANCIAL LITERACY QUIZ JAVASCRIPT =====

// Quiz data organized by categories
const quizData = {
  budgeting: {
    title: "💰 Budgeting Basics",
    difficulty: "Easy",
    questions: [
      {
        question: "What is the best way to avoid overspending?",
        options: ["Spend more than you earn", "Track your expenses regularly", "Use credit cards often", "Ignore budgeting completely"],
        correct: 1,
        explanation: "Tracking expenses helps you understand where your money goes and prevents overspending."
      },
      {
        question: "What is the 50-30-20 budgeting rule?",
        options: ["50% savings, 30% needs, 20% wants", "50% needs, 30% wants, 20% savings", "50% wants, 30% savings, 20% needs", "It doesn't matter how you split it"],
        correct: 1,
        explanation: "The 50-30-20 rule allocates 50% for needs, 30% for wants, and 20% for savings and debt repayment."
      },
      {
        question: "Which of these is considered a 'need' rather than a 'want'?",
        options: ["Netflix subscription", "Food and groceries", "Brand new smartphone", "Gaming console"],
        correct: 1,
        explanation: "Food is essential for survival, making it a need. The others are wants that enhance lifestyle."
      },
      {
        question: "How often should you review your budget?",
        options: ["Once a year", "Never, once made", "Monthly", "Only when in financial trouble"],
        correct: 2,
        explanation: "Monthly budget reviews help you stay on track and adjust for changing circumstances."
      },
      {
        question: "What should you do first when creating a budget?",
        options: ["List all expenses", "Calculate total income", "Set savings goals", "Buy budgeting software"],
        correct: 1,
        explanation: "You need to know your income first to determine how much you can allocate to different categories."
      },
      {
        question: "Emergency fund should cover how many months of expenses?",
        options: ["1-2 months", "3-6 months", "12 months", "No emergency fund needed"],
        correct: 1,
        explanation: "Financial experts recommend 3-6 months of expenses for a good emergency fund."
      },
      {
        question: "What percentage of income should ideally go to savings?",
        options: ["5%", "At least 20%", "50%", "Whatever is left over"],
        correct: 1,
        explanation: "Experts recommend saving at least 20% of your income for long-term financial health."
      },
      {
        question: "Which expense should you prioritize paying first?",
        options: ["Entertainment", "Basic necessities (food, shelter)", "Shopping", "Luxury items"],
        correct: 1,
        explanation: "Basic necessities like food and shelter should always be prioritized in your budget."
      },
      {
        question: "What is a budget variance?",
        options: ["A type of budget", "The difference between budgeted and actual amounts", "A budgeting mistake", "Income minus expenses"],
        correct: 1,
        explanation: "Budget variance is the difference between what you planned to spend and what you actually spent."
      },
      {
        question: "When should you adjust your budget?",
        options: ["Never", "Only during emergencies", "When your income or expenses change significantly", "Every day"],
        correct: 2,
        explanation: "Budgets should be adjusted when there are significant changes in income or recurring expenses."
      }
    ]
  },

  saving: {
    title: "🏦 Saving & Banking",
    difficulty: "Medium",
    questions: [
      {
        question: "What is compound interest?",
        options: ["Interest paid only on the principal", "Interest earned on both principal and previously earned interest", "A type of bank account", "Interest that decreases over time"],
        correct: 1,
        explanation: "Compound interest means you earn interest on your principal plus any previously earned interest."
      },
      {
        question: "Which type of account typically offers higher interest rates?",
        options: ["Current account", "Savings account", "Fixed deposit", "Checking account"],
        correct: 2,
        explanation: "Fixed deposits typically offer higher interest rates than regular savings accounts in exchange for locking in your money."
      },
      {
        question: "What is the power of starting to save early?",
        options: ["You can spend more now", "Compound interest has more time to work", "Banks give better rates to young people", "It doesn't matter when you start"],
        correct: 1,
        explanation: "Starting early gives compound interest more time to grow your money exponentially."
      },
      {
        question: "What does APY stand for in banking?",
        options: ["Annual Percentage Yield", "Average Payment Year", "Automatic Payment Yearly", "Annual Principal Year"],
        correct: 0,
        explanation: "APY (Annual Percentage Yield) shows the real rate of return on your savings including compound interest."
      },
      {
        question: "How much should you save before other financial goals?",
        options: ["₹10,000", "1 month of expenses", "₹1,00,000", "6 months of expenses"],
        correct: 1,
        explanation: "Build a basic emergency fund of 1 month's expenses before pursuing other financial goals."
      },
      {
        question: "What is the difference between gross and net income?",
        options: ["No difference", "Gross is before taxes, net is after taxes", "Net is before taxes, gross is after taxes", "Gross is monthly, net is yearly"],
        correct: 1,
        explanation: "Gross income is before taxes and deductions, net income is what you actually take home."
      },
      {
        question: "Which is the safest place to keep emergency funds?",
        options: ["Stock market", "High-yield savings account", "Fixed deposits for 5 years", "Cash at home"],
        correct: 1,
        explanation: "High-yield savings accounts offer safety, liquidity, and some growth for emergency funds."
      },
      {
        question: "What is the main purpose of a savings account?",
        options: ["Daily transactions", "Earning high returns", "Safe storage while earning some interest", "Business transactions"],
        correct: 2,
        explanation: "Savings accounts provide safe storage for money while earning modest interest returns."
      },
      {
        question: "How often is interest typically compounded in savings accounts?",
        options: ["Daily", "Monthly", "Quarterly", "Annually"],
        correct: 1,
        explanation: "Most savings accounts compound interest monthly, though some may compound daily."
      },
      {
        question: "What should you consider when choosing a bank?",
        options: ["Only interest rates", "Only location", "Fees, interest rates, services, and convenience", "Just the bank's reputation"],
        correct: 2,
        explanation: "Consider all factors: fees, interest rates, services offered, convenience, and digital banking options."
      }
    ]
  },

  investing: {
    title: "📈 Investment Basics",
    difficulty: "Hard", 
    questions: [
      {
        question: "What is the relationship between risk and return in investments?",
        options: ["No relationship", "Higher risk usually means potential for higher returns", "Lower risk always gives higher returns", "Risk doesn't affect returns"],
        correct: 1,
        explanation: "Generally, investments with higher risk potential offer higher possible returns to compensate investors."
      },
      {
        question: "What is diversification in investing?",
        options: ["Putting all money in one stock", "Spreading investments across different assets", "Only investing in bonds", "Investing only in your home country"],
        correct: 1,
        explanation: "Diversification means spreading your investments across different types of assets to reduce risk."
      },
      {
        question: "What is a mutual fund?",
        options: ["A loan to companies", "A pool of money from many investors to buy securities", "A type of bank account", "A government bond"],
        correct: 1,
        explanation: "A mutual fund pools money from many investors to buy a diversified portfolio of stocks, bonds, or other securities."
      },
      {
        question: "When should you start investing?",
        options: ["Only after age 30", "As early as possible", "Only when you're rich", "After retirement"],
        correct: 1,
        explanation: "Starting early allows compound growth to work in your favor over longer periods."
      },
      {
        question: "What is the stock market?",
        options: ["A place to buy groceries", "A marketplace where stocks are bought and sold", "A type of bank", "A government institution"],
        correct: 1,
        explanation: "The stock market is a marketplace where shares of publicly-held companies are bought and sold."
      },
      {
        question: "What does it mean to own a stock?",
        options: ["You own the company's debt", "You own a small piece of the company", "You own the company's building", "You work for the company"],
        correct: 1,
        explanation: "Owning stock means you own a small portion (share) of that company and its assets."
      },
      {
        question: "What is inflation's effect on money over time?",
        options: ["Money becomes more valuable", "Money loses purchasing power", "No effect on money", "Money doubles in value"],
        correct: 1,
        explanation: "Inflation reduces the purchasing power of money over time, making things more expensive."
      },
      {
        question: "What is a bond?",
        options: ["Ownership in a company", "A loan you give to a company or government", "A type of stock", "A savings account"],
        correct: 1,
        explanation: "A bond is essentially a loan you give to a company or government in exchange for regular interest payments."
      },
      {
        question: "What should you do before investing?",
        options: ["Invest immediately", "Research and understand what you're investing in", "Follow tips from friends", "Invest in the most expensive stocks"],
        correct: 1,
        explanation: "Always research and understand investments before putting your money at risk."
      },
      {
        question: "What is the power of compounding in investments?",
        options: ["Losses multiply quickly", "Returns generate their own returns over time", "You can withdraw money anytime", "Investments become risk-free"],
        correct: 1,
        explanation: "Compounding means your investment returns generate their own returns, leading to exponential growth over time."
      }
    ]
  },

  digital: {
    title: "📱 Digital Payments",
    difficulty: "Easy",
    questions: [
      {
        question: "What is UPI?",
        options: ["A type of credit card", "Unified Payments Interface for instant money transfers", "A banking app", "A cryptocurrency"],
        correct: 1,
        explanation: "UPI (Unified Payments Interface) is a real-time payment system that allows instant money transfers."
      },
      {
        question: "Which information should you NEVER share?",
        options: ["Your name", "Your UPI PIN", "Your phone number", "Your address"],
        correct: 1,
        explanation: "Your UPI PIN is like your ATM PIN - it should never be shared with anyone."
      },
      {
        question: "What should you do if you receive a suspicious payment request?",
        options: ["Pay immediately", "Ignore and report it", "Share your PIN", "Forward to friends"],
        correct: 1,
        explanation: "Always ignore suspicious payment requests and report them to prevent fraud."
      },
      {
        question: "Which is safer for online payments?",
        options: ["Saving card details on every website", "Using secure payment gateways", "Sharing passwords", "Public WiFi transactions"],
        correct: 1,
        explanation: "Secure payment gateways encrypt your data and provide safer online transaction experiences."
      },
      {
        question: "What is two-factor authentication (2FA)?",
        options: ["Using two phones", "An extra security layer with a second verification step", "Paying twice", "Using two apps"],
        correct: 1,
        explanation: "2FA adds extra security by requiring a second form of verification beyond just your password."
      },
      {
        question: "When using public WiFi, you should:",
        options: ["Make all your payments", "Avoid financial transactions", "Share your passwords", "Download banking apps"],
        correct: 1,
        explanation: "Public WiFi networks are not secure, so avoid financial transactions on them."
      },
      {
        question: "What should you do after making a digital payment?",
        options: ["Forget about it", "Check for confirmation message/email", "Share the receipt", "Delete the app"],
        correct: 1,
        explanation: "Always verify transactions by checking confirmation messages or emails for accuracy."
      },
      {
        question: "How often should you check your bank statements?",
        options: ["Never", "Regularly (at least monthly)", "Only when problems occur", "Once a year"],
        correct: 1,
        explanation: "Regular statement checks help you spot unauthorized transactions and manage your finances better."
      }
    ]
  },

  credit: {
    title: "💳 Credit & Loans",
    difficulty: "Medium",
    questions: [
      {
        question: "What happens if you only pay the minimum amount on a credit card?",
        options: ["Nothing, it's fine", "Interest charges accumulate on remaining balance", "Your credit improves", "The bank waives all fees"],
        correct: 1,
        explanation: "Paying only the minimum means you'll pay interest on the remaining balance, which can grow quickly."
      },
      {
        question: "What is a credit score?",
        options: ["Amount of money you have", "A number representing your creditworthiness", "Number of credit cards you own", "Your bank balance"],
        correct: 1,
        explanation: "A credit score is a numerical rating that represents how likely you are to repay borrowed money."
      },
      {
        question: "What improves your credit score?",
        options: ["Making late payments", "Paying bills on time consistently", "Using maximum credit limit", "Having many credit cards"],
        correct: 1,
        explanation: "Consistent on-time payments are the most important factor in building a good credit score."
      },
      {
        question: "What is the best credit card practice?",
        options: ["Max out your credit limit", "Pay full balance every month", "Make minimum payments only", "Skip some payments"],
        correct: 1,
        explanation: "Paying your full balance every month avoids interest charges and builds good credit history."
      },
      {
        question: "What should you do if you can't make a payment?",
        options: ["Ignore it", "Contact the lender immediately", "Wait until next month", "Apply for more credit"],
        correct: 1,
        explanation: "Contacting your lender early often allows you to work out a payment plan and avoid penalties."
      },
      {
        question: "What is EMI?",
        options: ["Emergency Money Insurance", "Equated Monthly Installment", "Extra Money Interest", "Electronic Money Transfer"],
        correct: 1,
        explanation: "EMI (Equated Monthly Installment) is a fixed payment amount made by a borrower to a lender."
      },
      {
        question: "Before taking a loan, you should:",
        options: ["Take the first offer", "Compare interest rates and terms from multiple lenders", "Borrow the maximum amount", "Not read the terms"],
        correct: 1,
        explanation: "Always compare offers from multiple lenders to get the best rates and terms for your situation."
      },
      {
        question: "What is compound interest on debt?",
        options: ["Good for borrowers", "Interest charged on interest", "A type of loan", "Free money"],
        correct: 1,
        explanation: "Compound interest on debt means you pay interest on the original amount plus previously accumulated interest."
      }
    ]
  },

  scams: {
    title: "🛡️ Fraud Prevention", 
    difficulty: "Easy",
    questions: [
      {
        question: "Someone calls saying your bank account will be closed unless you share your PIN. You should:",
        options: ["Give them the PIN immediately", "Hang up and call your bank directly", "Share your details", "Send money to keep account open"],
        correct: 1,
        explanation: "Banks never ask for PINs over phone calls. Always hang up and contact your bank directly."
      },
      {
        question: "What is a 'get rich quick' scheme?",
        options: ["Legitimate investment", "Usually a scam promising unrealistic returns", "Government program", "Bank service"],
        correct: 1,
        explanation: "Get rich quick schemes typically promise unrealistic returns and are often scams targeting desperate people."
      },
      {
        question: "You receive a text saying you won a lottery you never entered. You should:",
        options: ["Claim the prize immediately", "Delete the message", "Share with friends", "Send money for processing fee"],
        correct: 1,
        explanation: "Lottery scams are common. If you didn't enter, you can't win. Delete such messages."
      },
      {
        question: "What is phishing?",
        options: ["A type of investment", "Attempting to steal personal information through fake communications", "A banking service", "A legitimate email"],
        correct: 1,
        explanation: "Phishing involves fake emails, websites, or messages designed to steal your personal information."
      },
      {
        question: "A website asks for your internet banking password. You should:",
        options: ["Enter it immediately", "Never enter banking passwords on suspicious sites", "Share it with friends first", "Save it for later"],
        correct: 1,
        explanation: "Only enter banking passwords on official bank websites. Always verify the URL first."
      },
      {
        question: "What should you do if you think you've been scammed?",
        options: ["Do nothing", "Report to police and bank immediately", "Keep it secret", "Try to get money back alone"],
        correct: 1,
        explanation: "Quick reporting to authorities and your bank can help limit damage and potentially recover money."
      },
      {
        question: "Someone offers guaranteed returns of 50% per month. This is likely:",
        options: ["A great opportunity", "Too good to be true - probably a scam", "A normal investment", "Government approved"],
        correct: 1,
        explanation: "Guaranteed high returns are usually signs of scams. Legitimate investments always carry risk."
      },
      {
        question: "What is social engineering in fraud?",
        options: ["Building construction", "Manipulating people to reveal confidential information", "Computer programming", "Social media marketing"],
        correct: 1,
        explanation: "Social engineering involves psychologically manipulating people to divulge confidential information or perform actions."
      }
    ]
  }
};

// Badge system
const badges = {
  firstQuiz: { name: "🎯 First Quiz", description: "Completed your first quiz!", condition: "quizzesTaken >= 1" },
  budgetMaster: { name: "💰 Budget Master", description: "Aced the Budgeting quiz!", condition: "category === 'budgeting' && score >= 80" },
  savingsPro: { name: "🏦 Savings Pro", description: "Mastered Savings & Banking!", condition: "category === 'saving' && score >= 80" },
  investmentGuru: { name: "📈 Investment Guru", description: "Conquered Investment Basics!", condition: "category === 'investing' && score >= 80" },
  digitalSafe: { name: "📱 Digital Safety Expert", description: "Mastered Digital Payments!", condition: "category === 'digital' && score >= 80" },
  creditWise: { name: "💳 Credit Wise", description: "Understood Credit & Loans!", condition: "category === 'credit' && score >= 80" },
  scamDetector: { name: "🛡️ Scam Detector", description: "Expert at spotting fraud!", condition: "category === 'scams' && score >= 80" },
  perfectScore: { name: "⭐ Perfect Score", description: "Got 100% on any quiz!", condition: "score === 100" },
  consistent: { name: "🔄 Consistent Learner", description: "Completed 5 quizzes!", condition: "quizzesTaken >= 5" },
  overachiever: { name: "🏆 Overachiever", description: "Average score above 85%!", condition: "averageScore >= 85 && quizzesTaken >= 3" }
};

// Quiz state variables
let currentCategory = '';
let currentQuestions = [];
let currentQuestionIndex = 0;
let userAnswers = [];
let quizStartTime = 0;
let questionStartTime = 0;
let timer = null;
let timePerQuestion = 30; // seconds
let selectedAnswerIndex = -1; // Track selected answer

// User progress data
let userProgress = {
  totalScore: 0,
  quizzesTaken: 0,
  categoryScores: {},
  badges: [],
  personalBests: {}
};

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
  loadUserProgress();
  updateDashboard();
  updateLeaderboard();
});

// Load user progress from memory (can't use localStorage in artifacts)
function loadUserProgress() {
  // In a real implementation, this would load from localStorage
  // For now, we'll keep progress in memory during the session
}

// Save user progress to memory
function saveUserProgress() {
  // In a real implementation, this would save to localStorage
  // For now, progress is kept in memory during the session
}

// Update dashboard display
function updateDashboard() {
  document.getElementById('totalScore').textContent = userProgress.totalScore;
  document.getElementById('quizzesTaken').textContent = userProgress.quizzesTaken;
  
  const averageScore = userProgress.quizzesTaken > 0 
    ? Math.round(userProgress.totalScore / userProgress.quizzesTaken) 
    : 0;
  document.getElementById('averageScore').textContent = averageScore;
  document.getElementById('badgesEarned').textContent = userProgress.badges.length;
  
  updateBadgesDisplay();
}

// Update badges display
function updateBadgesDisplay() {
  const badgesList = document.getElementById('badgesList');
  
  if (userProgress.badges.length === 0) {
    badgesList.innerHTML = '<p style="color: #666; font-style: italic;">Complete quizzes to earn badges!</p>';
    return;
  }
  
  badgesList.innerHTML = '';
  userProgress.badges.forEach(badgeKey => {
    const badge = badges[badgeKey];
    if (badge) {
      const badgeElement = document.createElement('div');
      badgeElement.className = 'badge-item';
      badgeElement.style.cssText = `
        background: linear-gradient(135deg, #667eea, #764ba2);
        color: white;
        padding: 15px;
        border-radius: 10px;
        text-align: center;
        min-width: 120px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.1);
      `;
      badgeElement.innerHTML = `
        <div style="font-size: 2rem;">${badge.name.split(' ')[0]}</div>
        <div style="font-weight: 600; margin: 5px 0;">${badge.name.substring(2)}</div>
        <div style="font-size: 0.8rem; opacity: 0.9;">${badge.description}</div>
      `;
      badgesList.appendChild(badgeElement);
    }
  });
}

// Start quiz function
function startQuiz(category) {
  currentCategory = category;
  
  if (category === 'mixed') {
    // Create mixed quiz from all categories
    currentQuestions = createMixedQuiz();
  } else {
    currentQuestions = [...quizData[category].questions];
  }
  
  // Shuffle questions
  currentQuestions = shuffleArray(currentQuestions);
  
  currentQuestionIndex = 0;
  userAnswers = [];
  selectedAnswerIndex = -1;
  quizStartTime = Date.now();
  
  // Hide category selection, show quiz interface
  document.getElementById('categorySelection').style.display = 'none';
  document.getElementById('quizInterface').style.display = 'block';
  
  // Set quiz title
  const title = category === 'mixed' ? '🔥 Mixed Challenge' : quizData[category].title;
  const difficulty = category === 'mixed' ? 'Mixed' : quizData[category].difficulty;
  
  document.getElementById('quizCategoryTitle').textContent = title;
  document.getElementById('difficultyBadge').textContent = difficulty;
  document.getElementById('difficultyBadge').className = `badge badge-${getDifficultyColor(difficulty)}`;
  
  document.getElementById('totalQuestions').textContent = currentQuestions.length;
  
  showQuestion();
}

// Create mixed quiz
function createMixedQuiz() {
  const mixed = [];
  const categories = Object.keys(quizData);
  
  // Take 2-3 questions from each category
  categories.forEach(cat => {
    const questions = shuffleArray([...quizData[cat].questions]);
    mixed.push(...questions.slice(0, 2));
  });
  
  return shuffleArray(mixed).slice(0, 12); // Limit to 12 questions
}

// Shuffle array function
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Get difficulty color
function getDifficultyColor(difficulty) {
  switch(difficulty) {
    case 'Easy': return 'success';
    case 'Medium': return 'warning';
    case 'Hard': return 'danger';
    default: return 'info';
  }
}

// Show current question
function showQuestion() {
  const question = currentQuestions[currentQuestionIndex];
  selectedAnswerIndex = -1; // Reset selection
  
  // Update question info
  document.getElementById('currentQuestionNumber').textContent = currentQuestionIndex + 1;
  document.getElementById('questionText').textContent = question.question;
  
  // Update progress bar
  const progress = ((currentQuestionIndex) / currentQuestions.length) * 100;
  FinLitUtils.updateProgressBar('quizProgress', progress);
  
  // Create options
  const optionsContainer = document.getElementById('optionsContainer');
  optionsContainer.innerHTML = '';
  
  question.options.forEach((option, index) => {
    const optionElement = document.createElement('button');
    optionElement.className = 'quiz-option';
    optionElement.textContent = option;
    optionElement.onclick = () => selectOption(index);
    optionsContainer.appendChild(optionElement);
  });
  
  // Reset UI state
  document.getElementById('submitAnswer').disabled = true;
  document.getElementById('submitAnswer').style.display = 'block';
  document.getElementById('nextQuestion').style.display = 'none';
  document.getElementById('answerFeedback').style.display = 'none';
  
  // Start question timer
  startQuestionTimer();
}

// Select option function - FIXED
function selectOption(index) {
  selectedAnswerIndex = index;
  
  // Remove previous selections
  document.querySelectorAll('.quiz-option').forEach(opt => {
    opt.classList.remove('selected');
    opt.style.background = '';
    opt.style.borderColor = '';
  });
  
  // Select current option
  const selectedOption = document.querySelectorAll('.quiz-option')[index];
  selectedOption.classList.add('selected');
  selectedOption.style.background = 'rgba(39, 174, 96, 0.1)';
  selectedOption.style.borderColor = '#27ae60';
  
  // Enable submit button
  document.getElementById('submitAnswer').disabled = false;
}

// Submit answer function - FIXED
function submitAnswer() {
  if (selectedAnswerIndex === -1) return;
  
  clearInterval(timer);
  
  const question = currentQuestions[currentQuestionIndex];
  const isCorrect = selectedAnswerIndex === question.correct;
  
  // Store answer
  userAnswers[currentQuestionIndex] = {
    questionIndex: currentQuestionIndex,
    selectedAnswer: selectedAnswerIndex,
    correct: question.correct,
    timeSpent: Math.round((Date.now() - questionStartTime) / 1000)
  };
  
  // Show feedback
  showAnswerFeedback(isCorrect, question);
  
  // Disable all options
  document.querySelectorAll('.quiz-option').forEach(opt => {
    opt.disabled = true;
    opt.style.cursor = 'not-allowed';
    opt.style.opacity = '0.7';
  });
  
  // Hide submit button and show next button
  document.getElementById('submitAnswer').style.display = 'none';
  
  if (currentQuestionIndex < currentQuestions.length - 1) {
    document.getElementById('nextQuestion').textContent = 'Next Question →';
    document.getElementById('nextQuestion').style.display = 'block';
  } else {
    document.getElementById('nextQuestion').textContent = 'View Results';
    document.getElementById('nextQuestion').style.display = 'block';
  }
}

// Show answer feedback
function showAnswerFeedback(isCorrect, question) {
  const feedbackDiv = document.getElementById('answerFeedback');
  const alertDiv = document.getElementById('feedbackAlert');
  const feedbackText = document.getElementById('feedbackText');
  const explanationText = document.getElementById('explanationText');
  
  feedbackText.innerHTML = isCorrect 
    ? '✅ <strong>Correct!</strong> Well done!' 
    : `❌ <strong>Incorrect.</strong> The correct answer is: ${question.options[question.correct]}`;
  
  explanationText.textContent = question.explanation;
  
  alertDiv.className = `alert ${isCorrect ? 'alert-success' : 'alert-danger'}`;
  feedbackDiv.style.display = 'block';
  
  // Highlight correct answer and wrong answer if applicable
  const options = document.querySelectorAll('.quiz-option');
  options.forEach((opt, index) => {
    if (index === question.correct) {
      opt.classList.add('correct');
      opt.style.background = 'rgba(39, 174, 96, 0.2)';
      opt.style.borderColor = '#27ae60';
      opt.style.color = '#1e7c3e';
    } else if (index === selectedAnswerIndex && !isCorrect) {
      opt.classList.add('incorrect');
      opt.style.background = 'rgba(231, 76, 60, 0.2)';
      opt.style.borderColor = '#e74c3c';
      opt.style.color = '#c0392b';
    }
  });
}

// Next question function - FIXED
function nextQuestion() {
  currentQuestionIndex++;
  
  if (currentQuestionIndex < currentQuestions.length) {
    showQuestion();
  } else {
    showResults();
  }
}

// Start question timer - FIXED
function startQuestionTimer() {
  questionStartTime = Date.now();
  let timeLeft = timePerQuestion;
  
  const updateTimer = () => {
    document.getElementById('timeRemaining').textContent = `Time: ${timeLeft}s`;
    document.getElementById('timeRemaining').style.color = timeLeft <= 10 ? '#e74c3c' : '#333';
    timeLeft--;
    
    if (timeLeft < 0) {
      clearInterval(timer);
      // Auto-submit if no answer selected
      if (selectedAnswerIndex === -1) {
        // Select random answer or mark as no answer
        userAnswers[currentQuestionIndex] = {
          questionIndex: currentQuestionIndex,
          selectedAnswer: -1, // No answer
          correct: currentQuestions[currentQuestionIndex].correct,
          timeSpent: timePerQuestion
        };
      }
      
      document.getElementById('timeRemaining').textContent = 'Time Up!';
      document.getElementById('timeRemaining').style.color = '#e74c3c';
      
      // Auto-move to next question after timeout
      setTimeout(() => {
        if (selectedAnswerIndex !== -1) {
          submitAnswer();
        } else {
          // Move to next question without submitting
          nextQuestion();
        }
      }, 2000);
    }
  };
  
  timer = setInterval(updateTimer, 1000);
}

// Show results function
function showResults() {
  // Calculate results
  const totalQuestions = currentQuestions.length;
  const correctAnswers = userAnswers.filter(answer => answer.selectedAnswer === answer.correct).length;
  const wrongAnswers = totalQuestions - correctAnswers;
  const score = Math.round((correctAnswers / totalQuestions) * 100);
  const totalTime = Math.round((Date.now() - quizStartTime) / 1000);
  
  // Update user progress
  userProgress.totalScore += score;
  userProgress.quizzesTaken += 1;
  
  // Update category scores
  if (!userProgress.categoryScores[currentCategory]) {
    userProgress.categoryScores[currentCategory] = [];
  }
  userProgress.categoryScores[currentCategory].push(score);
  
  // Update personal bests
  if (!userProgress.personalBests[currentCategory] || score > userProgress.personalBests[currentCategory]) {
    userProgress.personalBests[currentCategory] = score;
  }
  
  // Check for new badges
  const newBadges = checkForNewBadges(score, correctAnswers, totalQuestions);
  
  // Save progress
  saveUserProgress();
  
  // Hide quiz interface, show results
  document.getElementById('quizInterface').style.display = 'none';
  document.getElementById('quizResults').style.display = 'block';
  
  // Display results
  displayResults(score, correctAnswers, wrongAnswers, totalTime, newBadges);
  
  // Update dashboard
  updateDashboard();
  updateLeaderboard();
}

// Display results function
function displayResults(score, correct, wrong, time, newBadges) {
  // Result emoji based on score
  let emoji = '🎉';
  if (score >= 90) emoji = '🏆';
  else if (score >= 80) emoji = '⭐';
  else if (score >= 70) emoji = '👍';
  else if (score >= 60) emoji = '📚';
  else emoji = '💪';
  
  document.getElementById('resultEmoji').textContent = emoji;
  document.getElementById('scoreDisplay').textContent = `${score}%`;
  
  // Performance stats
  document.getElementById('correctCount').textContent = correct;
  document.getElementById('wrongCount').textContent = wrong;
  document.getElementById('timeTaken').textContent = `${Math.floor(time / 60)}:${(time % 60).toString().padStart(2, '0')}`;
  document.getElementById('accuracyPercent').textContent = `${score}%`;
  
  // Performance message
  const performanceDiv = document.getElementById('performanceMessage');
  let message = '';
  let messageClass = 'alert-info';
  
  if (score >= 90) {
    message = '🏆 Outstanding! You have excellent financial knowledge!';
    messageClass = 'alert-success';
  } else if (score >= 80) {
    message = '⭐ Great job! You have solid financial understanding!';
    messageClass = 'alert-success';
  } else if (score >= 70) {
    message = '👍 Good work! Keep learning to improve further!';
    messageClass = 'alert-info';
  } else if (score >= 60) {
    message = '📚 You\'re on the right track! Review the topics you missed.';
    messageClass = 'alert-warning';
  } else {
    message = '💪 Don\'t give up! Review the material and try again.';
    messageClass = 'alert-warning';
  }
  
  performanceDiv.className = `alert ${messageClass}`;
  document.getElementById('performanceText').textContent = message;
  
  // Show new badges
  if (newBadges.length > 0) {
    showNewBadges(newBadges);
  }
  
  // Show review section for wrong answers
  if (wrong > 0) {
    showReviewSection();
  }
}

// Check for new badges
function checkForNewBadges(score, correct, total) {
  const newBadges = [];
  const averageScore = userProgress.totalScore / userProgress.quizzesTaken;
  
  Object.entries(badges).forEach(([key, badge]) => {
    if (!userProgress.badges.includes(key)) {
      let earned = false;
      
      // Check badge conditions
      if (key === 'firstQuiz' && userProgress.quizzesTaken >= 1) earned = true;
      else if (key === 'perfectScore' && score === 100) earned = true;
      else if (key === 'consistent' && userProgress.quizzesTaken >= 5) earned = true;
      else if (key === 'overachiever' && averageScore >= 85 && userProgress.quizzesTaken >= 3) earned = true;
      else if (key.includes('Master') || key.includes('Pro') || key.includes('Guru') || key.includes('Safe') || key.includes('Wise') || key.includes('Detector')) {
        const categoryMap = {
          'budgetMaster': 'budgeting',
          'savingsPro': 'saving', 
          'investmentGuru': 'investing',
          'digitalSafe': 'digital',
          'creditWise': 'credit',
          'scamDetector': 'scams'
        };
        if (currentCategory === categoryMap[key] && score >= 80) earned = true;
      }
      
      if (earned) {
        userProgress.badges.push(key);
        newBadges.push(key);
      }
    }
  });
  
  return newBadges;
}

// Show new badges
function showNewBadges(newBadges) {
  const newBadgesDiv = document.getElementById('newBadges');
  const newBadgesList = document.getElementById('newBadgesList');
  
  newBadgesList.innerHTML = '';
  newBadges.forEach(badgeKey => {
    const badge = badges[badgeKey];
    const badgeElement = document.createElement('div');
    badgeElement.style.cssText = `
      background: linear-gradient(135deg, #f39c12, #e74c3c);
      color: white;
      padding: 15px;
      border-radius: 10px;
      text-align: center;
      min-width: 120px;
      animation: bounceIn 0.6s ease;
    `;
    badgeElement.innerHTML = `
      <div style="font-size: 2rem;">${badge.name.split(' ')[0]}</div>
      <div style="font-weight: 600;">${badge.name.substring(2)}</div>
    `;
    newBadgesList.appendChild(badgeElement);
  });
  
  newBadgesDiv.style.display = 'block';
}

// Show review section
function showReviewSection() {
  const reviewSection = document.getElementById('reviewSection');
  const reviewList = document.getElementById('reviewList');
  
  reviewList.innerHTML = '';
  userAnswers.forEach((answer, index) => {
    if (answer.selectedAnswer !== answer.correct) {
      const question = currentQuestions[index];
      const reviewItem = document.createElement('div');
      reviewItem.className = 'alert alert-info';
      reviewItem.style.margin = '10px 0';
      reviewItem.innerHTML = `
        <strong>Q${index + 1}:</strong> ${question.question}<br>
        <strong>Your answer:</strong> ${answer.selectedAnswer === -1 ? 'No answer' : question.options[answer.selectedAnswer]}<br>
        <strong>Correct answer:</strong> ${question.options[answer.correct]}<br>
        <strong>Explanation:</strong> ${question.explanation}
      `;
      reviewList.appendChild(reviewItem);
    }
  });
  
  reviewSection.style.display = 'block';
}

// Quiz action functions
function retakeQuiz() {
  startQuiz(currentCategory);
}

function backToCategories() {
  document.getElementById('quizResults').style.display = 'none';
  document.getElementById('categorySelection').style.display = 'block';
}

function shareScore() {
  const score = Math.round((userAnswers.filter(a => a.selectedAnswer === a.correct).length / currentQuestions.length) * 100);
  const text = `I just scored ${score}% on the ${currentCategory === 'mixed' ? 'Mixed Challenge' : quizData[currentCategory].title} quiz at FinLit Portal! 🎉 Test your financial knowledge too!`;
  
  if (navigator.share) {
    navigator.share({
      title: 'FinLit Portal Quiz Result',
      text: text
    });
  } else {
    // Fallback - copy to clipboard
    navigator.clipboard.writeText(text).then(() => {
      alert('Score copied to clipboard!');
    });
  }
}

// Update leaderboard
function updateLeaderboard() {
  const leaderboard = document.getElementById('leaderboard');
  
  if (Object.keys(userProgress.personalBests).length === 0) {
    leaderboard.innerHTML = '<div style="text-align: center; color: #666; font-style: italic; padding: 40px;">Complete some quizzes to see your best scores here!</div>';
    return;
  }
  
  let leaderboardHTML = '<div style="display: grid; gap: 15px;">';
  
  Object.entries(userProgress.personalBests)
    .sort(([,a], [,b]) => b - a)
    .forEach(([category, score]) => {
      const categoryData = quizData[category];
      const title = category === 'mixed' ? '🔥 Mixed Challenge' : categoryData?.title || category;
      
      leaderboardHTML += `
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 15px; background: white; border-radius: 10px; border-left: 4px solid #27ae60;">
          <div>
            <strong>${title}</strong>
            <div style="color: #666; font-size: 0.9rem;">Personal Best</div>
          </div>
          <div style="font-size: 1.5rem; font-weight: 600; color: #27ae60;">
            ${score}%
          </div>
        </div>
      `;
    });
  
  leaderboardHTML += '</div>';
  leaderboard.innerHTML = leaderboardHTML;
}

// Add bounce animation CSS
const bounceStyle = document.createElement('style');
bounceStyle.textContent = `
  @keyframes bounceIn {
    0% { transform: scale(0.3); opacity: 0; }
    50% { transform: scale(1.05); }
    70% { transform: scale(0.9); }
    100% { transform: scale(1); opacity: 1; }
  }
  
  .quiz-option.selected {
    transform: translateX(5px);
    box-shadow: 0 5px 15px rgba(39, 174, 96, 0.3);
  }
  
  .category-card {
    background: white;
    padding: 30px;
    border-radius: 15px;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s ease;
    border: 2px solid transparent;
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  }
  
  .category-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 15px 30px rgba(0,0,0,0.15);
    border-color: #27ae60;
  }
  
  .category-icon {
    font-size: 3rem;
    margin-bottom: 15px;
  }
  
  .category-stats {
    margin-top: 15px;
    display: flex;
    gap: 10px;
    justify-content: center;
  }
`;

document.head.appendChild(bounceStyle);