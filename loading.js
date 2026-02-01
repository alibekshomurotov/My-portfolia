// Loading Screen Script
class LoadingScreen {
    constructor() {
        this.loadingScreen = document.getElementById('loading-screen');
        this.progressFill = document.querySelector('.progress-fill');
        this.progressPercent = document.querySelector('.progress-percent');
        this.progressStatus = document.querySelector('.progress-status');
        this.progressSteps = document.querySelectorAll('.step');
        this.statNumbers = document.querySelectorAll('.stat-number');
        this.isLoading = true;
        this.currentProgress = 0;
        this.totalSteps = 5;
        this.currentStep = 0;
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.startLoading();
    }
    
    bindEvents() {
        // Skip loading with Space key
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space' && this.isLoading) {
                e.preventDefault();
                this.skipLoading();
            }
        });
        
        // Skip loading with click on tip
        const tip = document.querySelector('.tip');
        if (tip) {
            tip.addEventListener('click', (e) => {
                e.stopPropagation();
                this.skipLoading();
            });
        }
        
        // Skip loading with double click anywhere
        let clickCount = 0;
        let clickTimer;
        this.loadingScreen.addEventListener('click', (e) => {
            clickCount++;
            if (clickCount === 1) {
                clickTimer = setTimeout(() => {
                    clickCount = 0;
                }, 300);
            } else if (clickCount === 2) {
                clearTimeout(clickTimer);
                clickCount = 0;
                this.skipLoading();
            }
        });
    }
    
    startLoading() {
        const loadingStates = [
            { percent: 5, status: "Initializing..." },
            { percent: 10, status: "Loading Assets..." },
            { percent: 25, status: "Processing Data..." },
            { percent: 50, status: "Building Interface..." },
            { percent: 75, status: "Finalizing..." },
            { percent: 100, status: "Ready!" }
        ];
        
        let stepIndex = 0;
        const simulateLoading = () => {
            if (stepIndex < loadingStates.length) {
                const state = loadingStates[stepIndex];
                this.updateProgress(state.percent, state.status);
                
                if (stepIndex > 0 && stepIndex <= this.totalSteps) {
                    this.progressSteps[stepIndex - 1].classList.add('active');
                }
                
                stepIndex++;
                
                if (state.percent === 100) {
                    setTimeout(() => this.completeLoading(), 1000);
                } else {
                    // Random delay to simulate real loading
                    const delay = Math.random() * 300 + 200;
                    setTimeout(simulateLoading, delay);
                }
            }
        };
        
        simulateLoading();
        this.animateStats();
    }
    
    updateProgress(percent, status) {
        this.currentProgress = percent;
        this.progressFill.style.width = percent + '%';
        this.progressPercent.textContent = percent + '%';
        this.progressStatus.textContent = status;
    }
    
    animateStats() {
        this.statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;
            
            const updateStat = () => {
                current += increment;
                if (current < target) {
                    stat.textContent = Math.floor(current);
                    requestAnimationFrame(updateStat);
                } else {
                    stat.textContent = target + (target >= 100 ? '+' : '+');
                }
            };
            
            setTimeout(updateStat, 500);
        });
    }
    
    completeLoading() {
        this.isLoading = false;
        
        // Add confetti effect
        this.triggerConfetti();
        
        // Hide loading screen with animation
        setTimeout(() => {
            this.loadingScreen.classList.add('hidden');
            
            // Remove loading screen from DOM after animation
            setTimeout(() => {
                this.loadingScreen.style.display = 'none';
                
                // Add loaded class to body
                document.body.classList.add('loaded');
                
                // Trigger main content animations
                this.triggerContentAnimations();
            }, 1000);
        }, 500);
    }
    
    skipLoading() {
        if (!this.isLoading) return;
        
        this.updateProgress(100, "Skipping...");
        setTimeout(() => this.completeLoading(), 300);
    }
    
    triggerConfetti() {
        const colors = ['#dc143c', '#6366f1', '#10b981', '#f59e0b', '#8b5cf6'];
        
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.borderRadius = '50%';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.top = '-20px';
            confetti.style.zIndex = '9998';
            confetti.style.opacity = '0.8';
            confetti.style.pointerEvents = 'none';
            
            document.body.appendChild(confetti);
            
            // Animation
            const animation = confetti.animate([
                { 
                    transform: 'translateY(0) rotate(0deg)', 
                    opacity: 1 
                },
                { 
                    transform: `translateY(${window.innerHeight + 100}px) rotate(${Math.random() * 360}deg)`, 
                    opacity: 0 
                }
            ], {
                duration: Math.random() * 2000 + 1000,
                easing: 'cubic-bezier(0.215, 0.610, 0.355, 1)'
            });
            
            animation.onfinish = () => confetti.remove();
        }
    }
    
    triggerContentAnimations() {
        // Add animations to main content sections
        const sections = document.querySelectorAll('section');
        sections.forEach((section, index) => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(30px)';
            section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, index * 200 + 300);
        });
        
        // Add animation to hero section
        const hero = document.querySelector('#hero');
        if (hero) {
            hero.style.animation = 'none';
            setTimeout(() => {
                hero.style.animation = 'fadeIn 1s ease forwards';
            }, 100);
        }
    }
}

// Initialize loading screen when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = new LoadingScreen();
    
    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from {
                opacity: 0;
            }
            to {
                opacity: 1;
            }
        }
        
        .loaded #hero h1 {
            animation-duration: 0.8s;
        }
        
        .loaded .section-title {
            animation: fadeIn 1s ease forwards;
        }
        
        .loaded .modern-card {
            animation: fadeIn 0.8s ease forwards;
        }
        
        .loaded .modern-project {
            animation: fadeIn 0.8s ease forwards;
        }
    `;
    document.head.appendChild(style);
});
