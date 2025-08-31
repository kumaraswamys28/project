// DOM Elements
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const menuItems = document.querySelector('nav ul.menu');
const socialItems = document.querySelector('nav ul.social');
const contactForm = document.querySelector('.contact-form form');
const navLinks = document.querySelectorAll('nav a');
const projectCards = document.querySelectorAll('.project-card');
const skillTags = document.querySelectorAll('.skill-tag');
const profileImage = document.querySelector('.img-wrapper .img');

// Mobile menu toggle with animation
function toggleMobileMenu() {
    const isMenuDisplayed = menuItems.style.display === 'flex';
    
    // Toggle menu display
    menuItems.style.display = isMenuDisplayed ? 'none' : 'flex';
    socialItems.style.display = isMenuDisplayed ? 'none' : 'flex';
    
    if (!isMenuDisplayed) {
        // Set up mobile menu styling
        menuItems.style.position = 'absolute';
        menuItems.style.flexDirection = 'column';
        menuItems.style.top = '70px';
        menuItems.style.left = '0';
        menuItems.style.width = '100%';
        menuItems.style.background = 'rgba(15, 23, 42, 0.95)';
        menuItems.style.padding = '20px 0';
        menuItems.style.zIndex = '99';
        menuItems.style.opacity = '0';
        
        socialItems.style.position = 'absolute';
        socialItems.style.top = '200px';
        socialItems.style.left = '0';
        socialItems.style.width = '100%';
        socialItems.style.justifyContent = 'center';
        socialItems.style.background = 'rgba(15, 23, 42, 0.95)';
        socialItems.style.padding = '20px 0';
        socialItems.style.zIndex = '99';
        socialItems.style.opacity = '0';
        
        // Animate menu appearance
        setTimeout(() => {
            menuItems.style.opacity = '1';
            menuItems.style.transition = 'opacity 0.3s ease';
            
            socialItems.style.opacity = '1';
            socialItems.style.transition = 'opacity 0.3s ease';
        }, 10);
    }
}

// Smooth scrolling with active link tracking
function setupSmoothScrolling() {
    navLinks.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            
            if (href !== '#') {
                const targetSection = document.querySelector(href);
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
                
                // Update URL without reloading the page
                history.pushState(null, null, href);
            }
            
            // Update active link
            navLinks.forEach(link => link.classList.remove('active'));
            this.classList.add('active');
            
            // Close mobile menu if open
            if (window.innerWidth <= 768) {
                menuItems.style.display = 'none';
                socialItems.style.display = 'none';
            }
        });
    });
}

// Form validation and submission
function setupFormHandling() {
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Simple form validation
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            
            if (!nameInput.value.trim()) {
                showFormError(nameInput, 'Please enter your name');
                return;
            }
            
            if (!emailInput.value.trim()) {
                showFormError(emailInput, 'Please enter your email');
                return;
            }
            
            if (!isValidEmail(emailInput.value)) {
                showFormError(emailInput, 'Please enter a valid email address');
                return;
            }
            
            if (!messageInput.value.trim()) {
                showFormError(messageInput, 'Please enter your message');
                return;
            }
            
            // Display success message with animation
            const formContainer = contactForm.parentElement;
            formContainer.innerHTML = `
                <div class="success-message">
                    <i class="fas fa-check-circle"></i>
                    <h3>Thank you for your message!</h3>
                    <p>I will get back to you soon.</p>
                </div>
            `;
            
            const successMessage = document.querySelector('.success-message');
            successMessage.style.opacity = '0';
            successMessage.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                successMessage.style.opacity = '1';
                successMessage.style.transform = 'translateY(0)';
                successMessage.style.transition = 'all 0.5s ease';
            }, 10);
        });
    }
}

// Form validation helpers
function showFormError(inputElement, message) {
    const errorMessage = document.createElement('div');
    errorMessage.className = 'error-message';
    errorMessage.textContent = message;
    
    // Remove any existing error messages
    const existingError = inputElement.parentElement.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    inputElement.parentElement.appendChild(errorMessage);
    inputElement.style.borderColor = '#ff4757';
    
    // Focus on the input
    inputElement.focus();
    
    // Remove error when input changes
    inputElement.addEventListener('input', function() {
        const existingError = this.parentElement.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
            this.style.borderColor = '';
        }
    }, { once: true });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Project card hover effects
function setupProjectCardEffects() {
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
            card.style.boxShadow = '0 10px 20px rgba(162, 0, 255, 0.3)';
            card.style.transition = 'all 0.3s ease';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = 'none';
        });
    });
}

// Skill tag animation
function setupSkillTagAnimations() {
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', () => {
            tag.style.transform = 'scale(1.1)';
            tag.style.backgroundColor = 'rgba(162, 0, 255, 0.4)';
            tag.style.transition = 'all 0.3s ease';
        });
        
        tag.addEventListener('mouseleave', () => {
            tag.style.transform = 'scale(1)';
            tag.style.backgroundColor = 'rgba(162, 0, 255, 0.2)';
        });
    });
}

// Scroll-based animations
function handleScrollAnimations() {
    const sections = document.querySelectorAll('section > div');
    const windowHeight = window.innerHeight;
    
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        
        if (sectionTop < windowHeight - 100) {
            section.classList.add('visible');
        }
    });
}

// Theme switcher
function createThemeSwitcher() {
    const header = document.querySelector('header nav');
    const themeToggle = document.createElement('div');
    themeToggle.className = 'theme-toggle';
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    themeToggle.title = 'Switch theme';
    
    header.appendChild(themeToggle);
    
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        
        const icon = themeToggle.querySelector('i');
        if (document.body.classList.contains('light-theme')) {
            icon.className = 'fas fa-sun';
        } else {
            icon.className = 'fas fa-moon';
        }
    });
}

// Typing effect for the title
function createTypingEffect() {
    const title = document.querySelector('.content .title');
    const titleText = title.textContent;
    
    title.textContent = '';
    
    let i = 0;
    const typeInterval = setInterval(() => {
        if (i < titleText.length) {
            title.textContent += titleText.charAt(i);
            i++;
        } else {
            clearInterval(typeInterval);
        }
    }, 100);
}

// Page load animation
function pageLoadAnimation() {
    const mainContent = document.querySelector('.main');
    
    mainContent.style.opacity = '0';
    mainContent.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        mainContent.style.opacity = '1';
        mainContent.style.transform = 'translateY(0)';
        mainContent.style.transition = 'all 0.8s ease';
    }, 200);
}

// Scroll tracking for active navigation
function updateActiveNavOnScroll() {
    const sections = document.querySelectorAll('section > div[id]');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Initialize all functions
function init() {
    // Set up event listeners
    mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    window.addEventListener('scroll', handleScrollAnimations);
    
    // Initialize features
    setupSmoothScrolling();
    setupFormHandling();
    setupProjectCardEffects();
    setupSkillTagAnimations();
    createThemeSwitcher();
    updateActiveNavOnScroll();
    
    // Run animations
    pageLoadAnimation();
    createTypingEffect();
}

// Run initialization when DOM is fully loaded
document.addEventListener('DOMContentLoaded', init);

// Particle background animation for hero section
function createParticleBackground() {
    const canvas = document.createElement('canvas');
    canvas.id = 'particles-canvas';
    document.querySelector('.main').prepend(canvas);
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    const particleCount = 50;
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 5 + 1;
            this.speedX = Math.random() * 3 - 1.5;
            this.speedY = Math.random() * 3 - 1.5;
            this.color = `rgba(162, 0, 255, ${Math.random() * 0.5})`;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            if (this.size > 0.2) this.size -= 0.1;
            
            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }
        
        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    function init() {
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
            
            // Connect particles with lines if they're close enough
            for (let j = i; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(162, 0, 255, ${0.2 - distance/500})`;
                    ctx.lineWidth = 1;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        
        requestAnimationFrame(animate);
    }
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
    
    init();
    animate();
}

// Interactive skill progress bars
function createSkillProgressBars() {
    const skillCategories = document.querySelectorAll('.skill-category');
    
    skillCategories.forEach(category => {
        const skillList = category.querySelector('.skill-list');
        const skills = skillList.querySelectorAll('.skill-tag');
        
        // Replace skill tags with progress bars
        skills.forEach(skill => {
            const skillName = skill.textContent;
            const randomProgress = Math.floor(Math.random() * 30) + 70; // Between 70-100%
            
            const progressContainer = document.createElement('div');
            progressContainer.className = 'skill-progress';
            progressContainer.innerHTML = `
                <div class="skill-info">
                    <span>${skillName}</span>
                    <span class="percentage">0%</span>
                </div>
                <div class="progress-bar">
                    <div class="progress" data-value="${randomProgress}"></div>
                </div>
            `;
            
            skillList.appendChild(progressContainer);
            skill.remove();
        });
    });
    
    // Add CSS class to switch from flex to block display
    document.querySelectorAll('.skill-list').forEach(list => {
        list.classList.add('progress-list');
    });
    
    // Animate progress bars when scrolled into view
    const progressBars = document.querySelectorAll('.progress');
    const animateProgress = () => {
        progressBars.forEach(bar => {
            const position = bar.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (position < screenPosition) {
                const targetValue = bar.getAttribute('data-value');
                let currentValue = 0;
                const increment = targetValue / 40; // Animate over 40 frames
                
                const progressAnimation = setInterval(() => {
                    currentValue += increment;
                    if (currentValue >= targetValue) {
                        currentValue = targetValue;
                        clearInterval(progressAnimation);
                    }
                    
                    bar.style.width = `${currentValue}%`;
                    const percentText = bar.parentElement.previousElementSibling.querySelector('.percentage');
                    percentText.textContent = `${Math.floor(currentValue)}%`;
                }, 20);
                
                // Remove from animation targets
                bar.removeAttribute('data-value');
            }
        });
    };
    
    window.addEventListener('scroll', animateProgress);
    // Run once to check initial view
    setTimeout(animateProgress, 500);
}

// 3D Tilt effect for project cards
function addTiltEffectToCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const cardRect = card.getBoundingClientRect();
            const cardCenterX = cardRect.left + cardRect.width / 2;
            const cardCenterY = cardRect.top + cardRect.height / 2;
            
            const mouseX = e.clientX - cardCenterX;
            const mouseY = e.clientY - cardCenterY;
            
            // Calculate rotation values based on mouse position
            const rotateX = (mouseY / (cardRect.height / 2)) * -8;
            const rotateY = (mouseX / (cardRect.width / 2)) * 8;
            
            // Apply 3D effects
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
            card.style.boxShadow = `0 15px 35px rgba(162, 0, 255, 0.3)`;
            
            // Add shine effect
            const shine = card.querySelector('.shine') || document.createElement('div');
            if (!card.querySelector('.shine')) {
                shine.className = 'shine';
                card.appendChild(shine);
            }
            
            // Calculate shine position
            const shineX = (mouseX / cardRect.width) * 100 + 50;
            const shineY = (mouseY / cardRect.height) * 100 + 50;
            shine.style.background = `radial-gradient(circle at ${shineX}% ${shineY}%, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0) 80%)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            card.style.boxShadow = 'none';
            
            const shine = card.querySelector('.shine');
            if (shine) shine.style.background = 'none';
        });
    });
}

// Interactive floating navigation on scroll
function createFloatingNavigation() {
    const mainNav = document.querySelector('header nav');
    const floatingNav = document.createElement('div');
    floatingNav.className = 'floating-nav';
    
    // Create dot navigation
    const sections = ['home', 'skills', 'projects', 'contact'];
    const dotsHtml = sections.map(section => `
        <a href="#${section}" class="nav-dot" data-section="${section}">
            <span class="tooltip">${section.charAt(0).toUpperCase() + section.slice(1)}</span>
        </a>
    `).join('');
    
    floatingNav.innerHTML = dotsHtml;
    document.body.appendChild(floatingNav);
    
    // Highlight active section
    const updateActiveDot = () => {
        const scrollPosition = window.scrollY;
        
        sections.forEach(section => {
            const element = document.getElementById(section);
            if (!element) return;
            
            const offsetTop = element.offsetTop - 100;
            const offsetBottom = offsetTop + element.offsetHeight;
            
            const dot = document.querySelector(`.nav-dot[data-section="${section}"]`);
            
            if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    };
    
    // Smooth scroll for dot navigation
    document.querySelectorAll('.nav-dot').forEach(dot => {
        dot.addEventListener('click', e => {
            e.preventDefault();
            const section = document.getElementById(dot.getAttribute('data-section'));
            window.scrollTo({
                top: section.offsetTop - 80,
                behavior: 'smooth'
            });
        });
    });
    
    window.addEventListener('scroll', updateActiveDot);
    // Run once on load
    setTimeout(updateActiveDot, 100);
}

// Animated counter for stats
function createAnimatedCounters() {
    // Create stats section after skills section
    const statsSection = document.createElement('div');
    statsSection.className = 'stats-section';
    statsSection.innerHTML = `
        <h2 class="section-title">My Numbers</h2>
        <div class="stats-container">
            <div class="stat-item">
                <i class="fas fa-code"></i>
                <div class="stat-counter" data-target="50000">0</div>
                <div class="stat-label">Lines of Code</div>
            </div>
            <div class="stat-item">
                <i class="fas fa-project-diagram"></i>
                <div class="stat-counter" data-target="32">0</div>
                <div class="stat-label">Projects Completed</div>
            </div>
            <div class="stat-item">
                <i class="fas fa-users"></i>
                <div class="stat-counter" data-target="25">0</div>
                <div class="stat-label">Happy Clients</div>
            </div>
            <div class="stat-item">
                <i class="fas fa-clock"></i>
                <div class="stat-counter" data-target="6">0</div>
                <div class="stat-label">Years Experience</div>
            </div>
        </div>
    `;
    
    const skillsSection = document.getElementById('skills');
    skillsSection.parentNode.insertBefore(statsSection, skillsSection.nextSibling);
    
    // Animate counters when scrolled into view
    const animateCounters = () => {
        const counters = document.querySelectorAll('.stat-counter');
        
        counters.forEach(counter => {
            const position = counter.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (position < screenPosition && !counter.classList.contains('animated')) {
                counter.classList.add('animated');
                
                const target = parseInt(counter.getAttribute('data-target'));
                let count = 0;
                const duration = 2000; // 2 seconds
                const frameDuration = 1000 / 60; // 60fps
                const totalFrames = Math.ceil(duration / frameDuration);
                const increment = target / totalFrames;
                
                const updateCount = () => {
                    count += increment;
                    if (count >= target) {
                        count = target;
                        counter.textContent = target.toLocaleString();
                    } else {
                        counter.textContent = Math.floor(count).toLocaleString();
                        requestAnimationFrame(updateCount);
                    }
                };
                
                updateCount();
            }
        });
    };
    
    window.addEventListener('scroll', animateCounters);
    // Run once on load
    setTimeout(animateCounters, 1000);
}

// Interactive typing effect
function createTypingEffect() {
    const heading = document.querySelector('.content h1');
    const originalText = heading.textContent;
    heading.textContent = '';
    
    // Create cursor element
    const cursor = document.createElement('span');
    cursor.className = 'cursor';
    cursor.textContent = '|';
    heading.after(cursor);
    
    let charIndex = 0;
    
    const typeText = () => {
        if (charIndex < originalText.length) {
            heading.textContent += originalText.charAt(charIndex);
            charIndex++;
            setTimeout(typeText, 100);
        } else {
            // Start blinking cursor
            cursor.classList.add('blink');
            
            // After typing the name, start typing the title
            setTimeout(() => {
                const titleElem = document.querySelector('.content .title');
                const titleText = titleElem.textContent;
                titleElem.textContent = '';
                typeSubtitle(titleElem, titleText);
            }, 500);
        }
    };
    
    const typeSubtitle = (element, text) => {
        let subIndex = 0;
        
        const typeSubText = () => {
            if (subIndex < text.length) {
                element.textContent += text.charAt(subIndex);
                subIndex++;
                setTimeout(typeSubText, 50);
            }
        };
        
        typeSubText();
    };
    
    // Start typing animation
    setTimeout(typeText, 500);
}

// Animated mobile menu
function setupMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const menu = document.querySelector('nav ul.menu');
    const social = document.querySelector('nav ul.social');
    
    mobileMenuToggle.addEventListener('click', () => {
        const isOpen = menu.classList.contains('open');
        
        if (isOpen) {
            menu.classList.remove('open');
            social.classList.remove('open');
            mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        } else {
            menu.classList.add('open');
            social.classList.add('open');
            mobileMenuToggle.innerHTML = '<i class="fas fa-times"></i>';
            
            // Stagger animation for menu items
            const menuItems = menu.querySelectorAll('li');
            menuItems.forEach((item, index) => {
                item.style.animationDelay = `${0.1 * index}s`;
            });
        }
    });
    
    // Close menu when clicking a link
    document.querySelectorAll('nav ul.menu li a').forEach(link => {
        link.addEventListener('click', () => {
            if (menu.classList.contains('open')) {
                menu.classList.remove('open');
                social.classList.remove('open');
                mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    });
}

// Interactive contact form with validation and animations
function enhanceContactForm() {
    const form = document.querySelector('.contact-form form');
    const inputs = form.querySelectorAll('input, textarea');
    
    // Add floating labels
    inputs.forEach(input => {
        const wrapper = document.createElement('div');
        wrapper.className = 'input-wrapper';
        
        const label = input.previousElementSibling;
        input.parentNode.insertBefore(wrapper, label);
        
        wrapper.appendChild(label);
        wrapper.appendChild(input);
        
        // Add focus/blur events for animation
        input.addEventListener('focus', () => {
            wrapper.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            if (input.value === '') {
                wrapper.classList.remove('focused');
            }
        });
        
        // Check if input already has value (e.g. on page reload)
        if (input.value !== '') {
            wrapper.classList.add('focused');
        }
    });
    
    // Form validation
    form.addEventListener('submit', e => {
        e.preventDefault();
        let isValid = true;
        
        inputs.forEach(input => {
            const wrapper = input.parentNode;
            const errorMessage = wrapper.querySelector('.error-message') || document.createElement('div');
            errorMessage.className = 'error-message';
            
            if (input.value.trim() === '') {
                isValid = false;
                errorMessage.textContent = `${input.previousElementSibling.textContent} is required`;
                if (!wrapper.querySelector('.error-message')) {
                    wrapper.appendChild(errorMessage);
                }
                input.classList.add('error');
                
                // Shake animation
                wrapper.classList.add('shake');
                setTimeout(() => wrapper.classList.remove('shake'), 500);
            } else if (input.type === 'email' && !/\S+@\S+\.\S+/.test(input.value)) {
                isValid = false;
                errorMessage.textContent = 'Please enter a valid email address';
                if (!wrapper.querySelector('.error-message')) {
                    wrapper.appendChild(errorMessage);
                }
                input.classList.add('error');
                
                wrapper.classList.add('shake');
                setTimeout(() => wrapper.classList.remove('shake'), 500);
            } else {
                if (wrapper.querySelector('.error-message')) {
                    wrapper.removeChild(errorMessage);
                }
                input.classList.remove('error');
            }
        });
        
        if (isValid) {
            // Show success animation
            form.classList.add('submitted');
            
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.innerHTML = `
                <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                    <circle class="checkmark-circle" cx="26" cy="26" r="25" fill="none"/>
                    <path class="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                </svg>
                <h3>Thank you!</h3>
                <p>Your message has been sent successfully.</p>
            `;
            
            form.innerHTML = '';
            form.appendChild(successMessage);
        }
    });
}

// Dark/Light theme toggle with animation
function createThemeToggle() {
    const nav = document.querySelector('nav');
    const toggleBtn = document.createElement('div');
    toggleBtn.className = 'theme-toggle';
    toggleBtn.innerHTML = `
        <div class="toggle-track">
            <div class="toggle-thumb"></div>
            <div class="toggle-icon light"><i class="fas fa-sun"></i></div>
            <div class="toggle-icon dark"><i class="fas fa-moon"></i></div>
        </div>
    `;
    
    nav.appendChild(toggleBtn);
    
    toggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        toggleBtn.classList.toggle('active');
        
        // Save theme preference
        const isDarkTheme = !document.body.classList.contains('light-theme');
        localStorage.setItem('darkTheme', isDarkTheme);
    });
    
    // Check for saved theme preference
    const savedDarkTheme = localStorage.getItem('darkTheme');
    if (savedDarkTheme === 'false') {
        document.body.classList.add('light-theme');
        toggleBtn.classList.add('active');
    }
}

// Scroll reveal animation for sections
function initScrollReveal() {
    const sections = document.querySelectorAll('section > div');
    
    const revealSection = () => {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight - 150) {
                section.classList.add('revealed');
            }
        });
    };
    
    window.addEventListener('scroll', revealSection);
    // Initial check
    setTimeout(revealSection, 300);
}

// Initialize all dynamic features
document.addEventListener('DOMContentLoaded', () => {
    createParticleBackground();
    createSkillProgressBars();
    addTiltEffectToCards();
    createFloatingNavigation();
    createAnimatedCounters();
    createTypingEffect();
    setupMobileMenu();
    enhanceContactForm();
    createThemeToggle();
    initScrollReveal();
});