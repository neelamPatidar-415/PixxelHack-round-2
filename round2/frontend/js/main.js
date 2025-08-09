// ===== MAIN JAVASCRIPT FOR HOMEPAGE ===== 

// Daily tips data
const tips = [
  "Track all your expenses for a week to see where your money goes.",
  "Always save at least 10% of what you earn or receive.",
  "Avoid impulse buying — wait 24 hours before any big purchase.",
  "Use UPI apps wisely — set spending limits to avoid overspending.",
  "Start an emergency fund even if it's just ₹10 per week.",
  "Buy used or borrow things you rarely use like textbooks.",
  "Compare prices online before buying anything costly.",
  "Invest early — time matters more than the amount you invest.",
  "Avoid paying only the minimum on credit cards — interest adds up fast.",
  "Don't be ashamed to ask for a student discount — many places offer them!",
  "Use the 50-30-20 rule: 50% needs, 30% wants, 20% savings.",
  "Cook at home more often — eating out frequently drains your budget.",
  "Sell things you no longer use instead of just storing them.",
  "Always check for coupon codes before making online purchases.",
  "Learn the difference between good debt (education) and bad debt (shopping)."
];

// Show random tip function
function showRandomTip() {
  const randomIndex = Math.floor(Math.random() * tips.length);
  const tipElement = document.getElementById("tipText");
  
  if (tipElement) {
    // Add fade effect
    tipElement.style.opacity = "0";
    
    setTimeout(() => {
      tipElement.innerText = tips[randomIndex];
      tipElement.style.opacity = "1";
    }, 200);
  }
}

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
  // Add smooth scrolling to all links with # in href
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
  
  // Highlight active navigation link
  highlightActiveNav();
});

// Function to highlight active navigation link
function highlightActiveNav() {
  const currentPage = window.location.pathname.split('/').pop();
  const navLinks = document.querySelectorAll('.nav-links a');
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    
    // Check if link matches current page
    const linkPage = link.getAttribute('href').split('/').pop();
    if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
      link.classList.add('active');
    }
  });
}

// Add animation to feature cards on scroll
function animateOnScroll() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  });

  const featureCards = document.querySelectorAll('.feature-card');
  featureCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
  });
}

// Initialize animations when page loads
window.addEventListener('load', function() {
  animateOnScroll();
});

// Utility functions for other pages to use
const FinLitUtils = {
  // Format currency
  formatCurrency: function(amount) {
    return '₹' + parseFloat(amount).toLocaleString('en-IN');
  },
  
  // Validate number input
  validateNumber: function(input, min = 0, max = null) {
    const num = parseFloat(input);
    if (isNaN(num)) return false;
    if (num < min) return false;
    if (max !== null && num > max) return false;
    return true;
  },
  
  // Show alert message
  showAlert: function(message, type = 'info') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.innerText = message;
    
    // Find container to add alert
    const container = document.querySelector('.container') || document.body;
    container.insertBefore(alertDiv, container.firstChild);
    
    // Remove alert after 5 seconds
    setTimeout(() => {
      if (alertDiv.parentNode) {
        alertDiv.parentNode.removeChild(alertDiv);
      }
    }, 5000);
  },
  
  // Update progress bar
  updateProgressBar: function(progressId, percentage) {
    const progressBar = document.getElementById(progressId);
    if (progressBar) {
      progressBar.style.width = Math.min(percentage, 100) + '%';
      progressBar.innerText = Math.round(Math.min(percentage, 100)) + '%';
    }
  },
  
  // Local storage helpers
  storage: {
    set: function(key, value) {
      try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
      } catch (e) {
        console.error('Failed to save to localStorage:', e);
        return false;
      }
    },
    
    get: function(key) {
      try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
      } catch (e) {
        console.error('Failed to read from localStorage:', e);
        return null;
      }
    },
    
    remove: function(key) {
      try {
        localStorage.removeItem(key);
        return true;
      } catch (e) {
        console.error('Failed to remove from localStorage:', e);
        return false;
      }
    }
  }
};

// Make utility functions available globally
window.FinLitUtils = FinLitUtils;