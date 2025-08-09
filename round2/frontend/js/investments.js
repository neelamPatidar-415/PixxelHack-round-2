
    // Global game state
    let gameState = {
      portfolio: 100000,
      initialValue: 100000,
      investments: [],
      totalGames: 0
    };

    // Investment details data
    const investmentData = {
      savings: {
        title: '🏦 Savings Account',
        description: 'A savings account is the safest place to keep your money.',
        features: ['No risk of losing money', 'Easy to access anytime', 'FDIC insured up to ₹5 lakhs', 'Low but guaranteed returns'],
        returns: '3-4% annually',
        bestFor: 'Emergency funds, short-term goals',
        example: 'If you put ₹10,000 in a savings account at 4% interest, after 1 year you\'ll have ₹10,400.'
      },
      fd: {
        title: '🏛️ Fixed Deposits',
        description: 'Fixed deposits offer guaranteed returns for a fixed period.',
        features: ['Guaranteed returns', 'Higher interest than savings', 'Various tenure options', 'Penalty for early withdrawal'],
        returns: '5-7% annually',
        bestFor: 'Medium-term goals (1-5 years)',
        example: 'A ₹50,000 FD at 6% for 3 years will give you ₹59,550 at maturity.'
      },
      mutual: {
        title: '📊 Mutual Funds',
        description: 'Mutual funds pool money from many investors to buy diversified portfolios.',
        features: ['Professional management', 'Diversification', 'Various types available', 'SIP options available'],
        returns: '10-15% annually (historically)',
        bestFor: 'Long-term wealth creation',
        example: 'A ₹5,000 monthly SIP in equity mutual funds for 15 years could grow to ₹25-30 lakhs.'
      },
      stocks: {
        title: '📈 Stocks',
        description: 'Buying stocks means owning a piece of a company.',
        features: ['High growth potential', 'Dividend income possible', 'Voting rights', 'High volatility'],
        returns: '15-20%+ annually (long-term)',
        bestFor: 'Experienced investors, long-term growth',
        example: 'If you bought ₹10,000 of Infosys stock 10 years ago, it could be worth ₹50,000+ today.'
      },
      gold: {
        title: '🥇 Gold',
        description: 'Gold has been a store of value for thousands of years.',
        features: ['Inflation hedge', 'Physical or digital options', 'Cultural significance in India', 'No regular income'],
        returns: '8-10% annually (long-term)',
        bestFor: 'Portfolio diversification, inflation protection',
        example: 'Gold prices have grown from ₹15,000/10g to ₹50,000/10g over the past 15 years.'
      },
      sip: {
        title: '🔄 SIP (Systematic Investment Plan)',
        description: 'SIP lets you invest a fixed amount regularly in mutual funds.',
        features: ['Disciplined investing', 'Rupee cost averaging', 'Start with ₹500/month', 'Flexible amounts'],
        returns: '10-15% annually (market-linked)',
        bestFor: 'Beginners, regular income earners',
        example: 'A ₹1,000 monthly SIP for 20 years at 12% returns could create ₹99 lakhs!'
      }
    };

    // Update display functions
    function updateRateDisplay() {
      document.getElementById('rateDisplay').innerText = document.getElementById('interestRate').value;
    }

    function updateTimeDisplay() {
      document.getElementById('timeDisplay').innerText = document.getElementById('timePeriod').value;
    }

    function updateSIPDisplay() {
      const amount = document.getElementById('sipAmount').value;
      document.getElementById('sipAmountDisplay').innerText = parseInt(amount).toLocaleString('en-IN');
    }

    function updateSIPReturnDisplay() {
      document.getElementById('sipReturnDisplay').innerText = document.getElementById('sipReturn').value;
    }

    function updateSIPPeriodDisplay() {
      document.getElementById('sipPeriodDisplay').innerText = document.getElementById('sipPeriod').value;
    }

    // Compound interest calculator
    function calculateCompound() {
      const initial = parseFloat(document.getElementById('initialAmount').value) || 0;
      const monthly = parseFloat(document.getElementById('monthlyAmount').value) || 0;
      const rate = parseFloat(document.getElementById('interestRate').value) / 100;
      const years = parseInt(document.getElementById('timePeriod').value);

      // Calculate compound interest with monthly contributions
      const monthlyRate = rate / 12;
      const totalMonths = years * 12;
      
      // Future value of initial investment
      const futureValueInitial = initial * Math.pow(1 + rate, years);
      
      // Future value of monthly contributions (annuity)
      const futureValueMonthly = monthly * ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate);
      
      const totalFutureValue = futureValueInitial + futureValueMonthly;
      const totalInvested = initial + (monthly * totalMonths);
      const totalGains = totalFutureValue - totalInvested;

      // Display results
      const resultsDiv = document.getElementById('compoundResults');
      resultsDiv.innerHTML = `
        <div style="text-align: center;">
          <div style="margin-bottom: 20px;">
            <div style="background: linear-gradient(135deg, #27ae60, #2ecc71); color: white; padding: 15px; border-radius: 10px; margin-bottom: 10px;">
              <strong>Final Amount</strong><br>
              <span style="font-size: 1.8em;">₹${Math.round(totalFutureValue).toLocaleString('en-IN')}</span>
            </div>
            <div style="background: linear-gradient(135deg, #3498db, #2980b9); color: white; padding: 15px; border-radius: 10px; margin-bottom: 10px;">
              <strong>Total Invested</strong><br>
              <span style="font-size: 1.3em;">₹${Math.round(totalInvested).toLocaleString('en-IN')}</span>
            </div>
            <div style="background: linear-gradient(135deg, #f39c12, #d68910); color: white; padding: 15px; border-radius: 10px;">
              <strong>Total Gains</strong><br>
              <span style="font-size: 1.3em;">₹${Math.round(totalGains).toLocaleString('en-IN')}</span>
            </div>
          </div>
          <div style="background: #f8f9fa; padding: 15px; border-radius: 10px; color: #666;">
            <strong>Growth Factor:</strong> ${(totalFutureValue / totalInvested).toFixed(2)}x<br>
            <small>Your money will grow ${(totalFutureValue / totalInvested).toFixed(2)} times!</small>
          </div>
        </div>
      `;

      // Draw simple chart
      drawCompoundChart(initial, monthly, rate, years);
    }

    // SIP Calculator
    function calculateSIP() {
      const monthly = parseFloat(document.getElementById('sipAmount').value);
      const rate = parseFloat(document.getElementById('sipReturn').value) / 100;
      const years = parseInt(document.getElementById('sipPeriod').value);

      const monthlyRate = rate / 12;
      const totalMonths = years * 12;
      
      const futureValue = monthly * ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate) * (1 + monthlyRate);
      const totalInvested = monthly * totalMonths;
      const totalReturns = futureValue - totalInvested;

      const resultsDiv = document.getElementById('sipResults');
      resultsDiv.innerHTML = `
        <div style="text-align: center;">
          <div style="background: linear-gradient(135deg, #9b59b6, #8e44ad); color: white; padding: 20px; border-radius: 15px; margin-bottom: 15px;">
            <h3>SIP Maturity Value</h3>
            <div style="font-size: 2em; margin: 10px 0;">₹${Math.round(futureValue).toLocaleString('en-IN')}</div>
          </div>
          
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
            <div style="background: #e8f5e8; padding: 15px; border-radius: 10px; color: #27ae60;">
              <strong>Invested</strong><br>
              ₹${totalInvested.toLocaleString('en-IN')}
            </div>
            <div style="background: #fff3e0; padding: 15px; border-radius: 10px; color: #f39c12;">
              <strong>Returns</strong><br>
              ₹${Math.round(totalReturns).toLocaleString('en-IN')}
            </div>
          </div>
          
          <div style="margin-top: 15px; padding: 15px; background: #f0f8ff; border-radius: 10px; color: #666;">
            <strong>Monthly Goal Achievement:</strong><br>
            After ${years} years, you could withdraw ₹${Math.round(futureValue * 0.005).toLocaleString('en-IN')} monthly (assuming 6% withdrawal rate)
          </div>
        </div>
      `;
    }

    // Simple chart drawing function
    function drawCompoundChart(initial, monthly, rate, years) {
      const canvas = document.getElementById('chartCanvas');
      const ctx = canvas.getContext('2d');
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Chart dimensions
      const padding = 40;
      const chartWidth = canvas.width - padding * 2;
      const chartHeight = canvas.height - padding * 2;
      
      // Calculate data points
      const dataPoints = [];
      for (let year = 0; year <= years; year++) {
        const yearlyValue = initial * Math.pow(1 + rate, year) + 
                           monthly * 12 * year * (1 + rate/2); // Simplified calculation for chart
        dataPoints.push(yearlyValue);
      }
      
      const maxValue = Math.max(...dataPoints);
      const minValue = Math.min(...dataPoints);
      
      // Draw axes
      ctx.strokeStyle = '#ddd';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(padding, padding);
      ctx.lineTo(padding, canvas.height - padding);
      ctx.lineTo(canvas.width - padding, canvas.height - padding);
      ctx.stroke();
      
      // Draw growth curve
      ctx.strokeStyle = '#27ae60';
      ctx.lineWidth = 3;
      ctx.beginPath();
      
      for (let i = 0; i <= years; i++) {
        const x = padding + (i / years) * chartWidth;
        const y = canvas.height - padding - ((dataPoints[i] - minValue) / (maxValue - minValue)) * chartHeight;
        
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();
      
      // Add labels
      ctx.fillStyle = '#666';
      ctx.font = '12px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('0', padding, canvas.height - padding + 20);
      ctx.fillText(years + ' years', canvas.width - padding, canvas.height - padding + 20);
      
      ctx.textAlign = 'right';
      ctx.fillText('₹' + Math.round(maxValue/1000) + 'k', padding - 5, padding + 5);
    }

    // Investment details modal
    function showInvestmentDetails(type) {
      const data = investmentData[type];
      const modal = document.getElementById('investmentModal');
      const content = document.getElementById('modalContent');
      
      content.innerHTML = `
        <h2>${data.title}</h2>
        <p style="font-size: 1.1em; margin-bottom: 20px; color: #666;">${data.description}</p>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin: 20px 0;">
          <h3 style="color: #27ae60; margin-bottom: 15px;">Key Features:</h3>
          <ul style="margin-left: 20px;">
            ${data.features.map(feature => `<li style="margin-bottom: 8px;">${feature}</li>`).join('')}
          </ul>
        </div>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0;">
          <div style="background: #e8f5e8; padding: 15px; border-radius: 10px;">
            <strong style="color: #27ae60;">Expected Returns:</strong><br>
            ${data.returns}
          </div>
          <div style="background: #e3f2fd; padding: 15px; border-radius: 10px;">
            <strong style="color: #2196f3;">Best For:</strong><br>
            ${data.bestFor}
          </div>
        </div>
        
        <div style="background: linear-gradient(135deg, #667eea, #764ba2); color: white; padding: 20px; border-radius: 10px; margin-top: 20px;">
          <h4 style="margin-bottom: 10px;">💡 Example:</h4>
          <p>${data.example}</p>
        </div>
      `;
      
      modal.style.display = 'block';
    }

    function closeInvestmentModal() {
      document.getElementById('investmentModal').style.display = 'none';
    }

    // Risk vs Reward Game
    function makeInvestment(riskLevel, amount) {
      if (gameState.portfolio < amount) {
        alert('Not enough money in portfolio!');
        return;
      }

      let returnRate;
      let riskFactor;
      let outcome;

      switch(riskLevel) {
        case 'safe':
          returnRate = 0.05 + (Math.random() * 0.03); // 5-8%
          riskFactor = 0.02; // Very low risk
          break;
        case 'moderate':
          returnRate = 0.08 + (Math.random() * 0.07); // 8-15%
          riskFactor = 0.1; // Moderate risk
          break;
        case 'risky':
          returnRate = 0.10 + (Math.random() * 0.15); // 10-25%
          riskFactor = 0.3; // High risk
          break;
      }

      // Simulate risk (chance of loss)
      const riskEvent = Math.random();
      let finalReturn;

      if (riskEvent < riskFactor) {
        // Loss scenario
        finalReturn = -(Math.random() * 0.2); // Up to 20% loss
        outcome = 'loss';
      } else {
        // Gain scenario
        finalReturn = returnRate;
        outcome = 'gain';
      }

      const investmentReturn = amount * finalReturn;
      const newValue = amount + investmentReturn;
      
      gameState.portfolio = gameState.portfolio - amount + newValue;
      gameState.totalGames++;
      
      gameState.investments.push({
        type: riskLevel,
        amount: amount,
        return: investmentReturn,
        outcome: outcome
      });

      updateGameDisplay(riskLevel, amount, investmentReturn, outcome);
      updateGameStats();
    }

    function updateGameDisplay(riskLevel, amount, investmentReturn, outcome) {
      const resultsDiv = document.getElementById('gameResults');
      const isPositive = investmentReturn >= 0;
      
      const resultHTML = `
        <div class="result-display ${isPositive ? 'result-positive' : 'result-negative'}" style="animation: slideIn 0.5s ease;">
          <h4>${getRiskEmoji(riskLevel)} ${riskLevel.charAt(0).toUpperCase() + riskLevel.slice(1)} Investment Result</h4>
          <p>Invested: ₹${amount.toLocaleString('en-IN')}</p>
          <p>Return: ${isPositive ? '+' : ''}₹${Math.round(investmentReturn).toLocaleString('en-IN')} (${(investmentReturn/amount*100).toFixed(1)}%)</p>
          <p><strong>New Value: ₹${Math.round(amount + investmentReturn).toLocaleString('en-IN')}</strong></p>
          <small>${getOutcomeMessage(outcome, riskLevel)}</small>
        </div>
      `;
      
      resultsDiv.innerHTML = resultHTML + resultsDiv.innerHTML;
    }

    function updateGameStats() {
      const totalReturn = ((gameState.portfolio - gameState.initialValue) / gameState.initialValue) * 100;
      
      document.getElementById('portfolioValue').innerText = Math.round(gameState.portfolio).toLocaleString('en-IN');
      document.getElementById('totalReturn').innerText = (totalReturn >= 0 ? '+' : '') + totalReturn.toFixed(1) + '%';
      
      // Update risk level based on recent investments
      const recentInvestments = gameState.investments.slice(-3);
      const riskyCount = recentInvestments.filter(inv => inv.type === 'risky').length;
      const moderateCount = recentInvestments.filter(inv => inv.type === 'moderate').length;
      
      let riskLevel = 'Conservative';
      if (riskyCount >= 2) riskLevel = 'Aggressive';
      else if (moderateCount >= 2) riskLevel = 'Moderate';
      
      document.getElementById('riskLevel').innerText = riskLevel;
    }

    function getRiskEmoji(riskLevel) {
      switch(riskLevel) {
        case 'safe': return '🏦';
        case 'moderate': return '📊';
        case 'risky': return '🚀';
        default: return '💰';
      }
    }

    function getOutcomeMessage(outcome, riskLevel) {
      if (outcome === 'gain') {
        return riskLevel === 'risky' ? 'Great timing! High risk paid off.' : 
               riskLevel === 'moderate' ? 'Steady growth with balanced approach.' : 
               'Safe and steady wins the race!';
      } else {
        return riskLevel === 'risky' ? 'Market volatility caused losses.' : 
               riskLevel === 'moderate' ? 'Temporary setback in moderate investment.' : 
               'Even safe investments can have small losses.';
      }
    }

    function resetGame() {
      gameState = {
        portfolio: 100000,
        initialValue: 100000,
        investments: [],
        totalGames: 0
      };
      
      updateGameStats();
      document.getElementById('gameResults').innerHTML = '';
    }

    // Close modal when clicking outside
    document.getElementById('investmentModal').addEventListener('click', function(e) {
      if (e.target === this) {
        closeInvestmentModal();
      }
    });

    // Initialize calculations on page load
    document.addEventListener('DOMContentLoaded', function() {
      calculateCompound();
      calculateSIP();
      updateGameStats();
    });

    // Add CSS animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes slideIn {
        from {
          transform: translateY(-20px);
          opacity: 0;
        }
        to {
          transform: translateY(0);
          opacity: 1;
        }
      }
    `;
    document.head.appendChild(style);
  
