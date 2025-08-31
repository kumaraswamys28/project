// Wait for document to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add the necessary HTML elements
    addDynamicElements();
    
    // Initialize dynamic features
    initTypewriter();
    initScrollProgress();
    initParallaxEffect();
    initTiltEffect();
    initThemeToggle();
    
    // Show page after initialization
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 1000);
});

// Add necessary HTML elements to the page
function addDynamicElements() {
    // Add scroll progress bar
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.prepend(progressBar);
    
    // Add theme toggle button
    const themeToggle = document.createElement('div');
    themeToggle.className = 'theme-toggle';
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    document.body.appendChild(themeToggle);
    
    // Convert main heading to typewriter
    const mainHeading = document.querySelector('.content h1');
    if (mainHeading) {
        const headingText = mainHeading.textContent;
        const typewriterDiv = document.createElement('div');
        typewriterDiv.className = 'typewriter';
        
        // Replace original heading with typewriter version
        mainHeading.textContent = '';
        typewriterDiv.innerHTML = `<h1>${headingText}</h1>`;
        mainHeading.parentNode.replaceChild(typewriterDiv, mainHeading);
    }
    
    // Add parallax background
    const parallaxBg = document.createElement('div');
    parallaxBg.className = 'parallax-bg';
    document.body.prepend(parallaxBg);
}

// Initialize typewriter effect
function initTypewriter() {
    // Code is in CSS for the typewriter animation
}

// Initialize scroll progress bar
function initScrollProgress() {
    window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercentage = (scrollTop / scrollHeight) * 100;
        
        document.querySelector('.scroll-progress').style.width = scrollPercentage + '%';
        
        // Update active menu item based on scroll position
        updateActiveMenuOnScroll();
    });
}

// Update the active menu item based on current scroll position
function updateActiveMenuOnScroll() {
    const sections = ['home', 'skills', 'projects', 'contact'];
    const navLinks = document.querySelectorAll('nav ul.menu li a');
    
    let currentSection = '';
    
    sections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section) {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const scrollPosition = window.scrollY + 100; // Adding offset for better UX
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = sectionId;
            }
        }
    });
    
    // Update active class
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === '#' + currentSection || (href === '#' && currentSection === 'home')) {
            link.classList.add('active');
        }
    });
}

// Initialize parallax scrolling effect
function initParallaxEffect() {
    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        document.querySelector('.parallax-bg').style.transform = `translateY(${scrollPosition * 0.5}px)`;
    });
}

// Initialize tilt effect for testimonials
function initTiltEffect() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    
    testimonialCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const cardRect = card.getBoundingClientRect();
            const cardCenterX = cardRect.left + cardRect.width / 2;
            const cardCenterY = cardRect.top + cardRect.height / 2;
            
            const mouseX = e.clientX - cardCenterX;
            const mouseY = e.clientY - cardCenterY;
            
            const rotateX = (mouseY / cardRect.height) * 10; // Max 10 degrees rotation
            const rotateY = -(mouseX / cardRect.width) * 10; // Max 10 degrees rotation
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    });
}

// Initialize theme toggle functionality
function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    let darkMode = true; // Start with dark mode on
    
    themeToggle.addEventListener('click', () => {
        darkMode = !darkMode;
        
        if (darkMode) {
            document.documentElement.style.setProperty('--bg-color', '#0f172a');
            document.documentElement.style.setProperty('--text-color', '#ffffff');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        } else {
            document.documentElement.style.setProperty('--bg-color', '#f8fafc');
            document.documentElement.style.setProperty('--text-color', '#0f172a');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
        
        // Toggle classes for theme change
        document.body.classList.toggle('light-mode');
    });
}

// Animate projects on hover
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseover', () => {
        // Random rotation effect
        const randomRotation = Math.random() * 5 - 2.5; // Between -2.5 and 2.5 degrees
        card.style.transform = `translateY(-10px) rotate(${randomRotation}deg)`;
    });
    
    card.addEventListener('mouseout', () => {
        card.style.transform = 'translateY(0) rotate(0)';
    });
});

// Make form inputs more interactive
document.querySelectorAll('.contact-form input, .contact-form textarea').forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.classList.add('active-input');
    });
    
    input.addEventListener('blur', () => {
        if (!input.value) {
            input.parentElement.classList.remove('active-input');
        }
    });
});

// Add particles background effect
function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    particlesContainer.style.position = 'fixed';
    particlesContainer.style.top = '0';
    particlesContainer.style.left = '0';
    particlesContainer.style.width = '100%';
    particlesContainer.style.height = '100%';
    particlesContainer.style.zIndex = '-5';
    particlesContainer.style.pointerEvents = 'none';
    document.body.appendChild(particlesContainer);
    
    // Create particles
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 5 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = 'rgba(162, 0, 255, 0.5)';
        particle.style.borderRadius = '50%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animation = `float ${Math.random() * 10 + 10}s linear infinite`;
        particlesContainer.appendChild(particle);
    }
    
    // Add animation for particles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0% {
                transform: translateY(0) translateX(0);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Call the particles creation function
createParticles();