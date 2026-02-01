// Main Portfolio Script
document.addEventListener('DOMContentLoaded', () => {
    // Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navList = document.querySelector('.nav-list ul');
    const header = document.querySelector('#header .header');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navList.classList.toggle('active');
    });
    
    // Close mobile nav when link clicked
    document.querySelectorAll('.nav-list a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navList.classList.remove('active');
        });
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
            }
        });
    });
    
    // Header background on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
        }
        
        if (window.innerWidth <= 768) {
            if (window.scrollY > 50) {
                header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
            } else {
                header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            }
        }
    });
    
    // Dark Mode Toggle
    const darkModeToggle = document.querySelector('.dark-mode-btn');
    const darkModeIcon = document.querySelector('.dark-mode-btn i');
    
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        if (document.body.classList.contains('dark-mode')) {
            darkModeIcon.className = 'fas fa-sun';
            localStorage.setItem('theme', 'dark');
        } else {
            darkModeIcon.className = 'fas fa-moon';
            localStorage.setItem('theme', 'light');
        }
    });
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        darkModeIcon.className = 'fas fa-sun';
    }
    
    // Service Items Hover Effects
    const serviceItems = document.querySelectorAll('.service-item');
    serviceItems.forEach((item, index) => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-10px)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0)';
        });
        
        // Add animation delay
        item.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Project Items Hover Effects
    const projectItems = document.querySelectorAll('.modern-project');
    projectItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.2}s`;
        
        item.addEventListener('mouseenter', () => {
            const img = item.querySelector('.project-img img');
            if (img) {
                img.style.transform = 'scale(1.1)';
            }
        });
        
        item.addEventListener('mouseleave', () => {
            const img = item.querySelector('.project-img img');
            if (img) {
                img.style.transform = 'scale(1)';
            }
        });
    });
    
    // Contact Form Submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form values
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Show success message
            alert('Thank you for your message! I will get back to you soon.');
            
            // Reset form
            contactForm.reset();
        });
    }
    
    // Add animation to elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    // Observe sections
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });
    
    // Add fade-in animation
    const style = document.createElement('style');
    style.textContent = `
        .fade-in {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        .fade-in.animated {
            opacity: 1;
            transform: translateY(0);
        }
        
        #hero {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
    
    // Skill tags animation
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach((tag, index) => {
        tag.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Social icons hover effect
    const socialIcons = document.querySelectorAll('.social-item');
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', () => {
            icon.style.transform = 'translateY(-5px) scale(1.1)';
        });
        
        icon.addEventListener('mouseleave', () => {
            icon.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add current year to footer
    const footerText = document.querySelector('#footer p');
    if (footerText) {
        const currentYear = new Date().getFullYear();
        footerText.textContent = footerText.textContent.replace('2023', currentYear);
    }
});