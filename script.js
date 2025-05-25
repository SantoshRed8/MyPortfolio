// DOM Elements
document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header');
    const navLinks = document.querySelectorAll('.nav-links a');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.querySelector('.nav-links');
    const closeSidebar = document.getElementById('close-sidebar');
    const colorBtn = document.getElementById('color-btn');
    const colorOptions = document.getElementById('color-options');
    const themeBtn = document.getElementById('theme-btn');
    const colorCircles = document.querySelectorAll('.color-circle');
    const professionText = document.getElementById('profession-text');

    // Create background particles
    createBackgroundElements();

    // Profession Text Animation
    const professions = ['Web Designer', 'UI/UX Designer', 'Frontend Developer'];
    let currentIndex = 0;
    let currentText = '';
    let letterIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeEffect() {
        const profession = professions[currentIndex % professions.length];

        if (isDeleting) {
            currentText = profession.substring(0, letterIndex - 1);
            letterIndex--;
            typingSpeed = 50;
        } else {
            currentText = profession.substring(0, letterIndex + 1);
            letterIndex++;
            typingSpeed = 100;
        }

        professionText.textContent = currentText;

        if (!isDeleting && letterIndex === profession.length) {
            typingSpeed = 2000; // Delay after typing complete
            isDeleting = true;
        } else if (isDeleting && letterIndex === 0) {
            isDeleting = false;
            currentIndex++;
            typingSpeed = 500; // Delay before typing next word
        }

        setTimeout(typeEffect, typingSpeed);
    }

    // Start typing animation
    typeEffect();

    // Header Scroll Effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });

    // Active Navigation Link
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section');

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;
            const id = section.getAttribute('id');

            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    // Mobile Navigation
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.add('active');
        });
    }

    if (closeSidebar) {
        closeSidebar.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    }

    // Close mobile menu when clicking a nav link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });

    // Color Options Toggle
    if (colorBtn) {
        colorBtn.addEventListener('click', () => {
            colorOptions.classList.toggle('hidden');
        });
    }

    // Theme Color Change
    colorCircles.forEach(circle => {
        circle.addEventListener('click', () => {
            const color = circle.getAttribute('data-color');
            document.documentElement.style.setProperty('--primary-color', color);
            document.documentElement.style.setProperty('--gradient', `linear-gradient(135deg, ${color}, ${adjustColor(color, -20)})`);

            // Update background elements to match theme color
            updateBackgroundColor(color);

            colorOptions.classList.add('hidden');
        });
    });

    // Dark/Light Theme Toggle
    let isDark = true;
    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            if (isDark) {
                // Switch to light theme
                document.documentElement.style.setProperty('--dark-bg', '#f5f5f5');
                document.documentElement.style.setProperty('--card-bg', '#ffffff');
                document.documentElement.style.setProperty('--text-color', '#333333');
                document.documentElement.style.setProperty('--secondary-color', '#333333');
                themeBtn.textContent = '☀️';

                // Update grid overlay for light theme
                document.querySelector('.grid-overlay').style.backgroundImage = `
                    linear-gradient(rgba(var(--primary-rgb), 0.1) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(var(--primary-rgb), 0.1) 1px, transparent 1px)
                `;
            } else {
                // Switch to dark theme
                document.documentElement.style.setProperty('--dark-bg', '#121212');
                document.documentElement.style.setProperty('--card-bg', '#1e1e1e');
                document.documentElement.style.setProperty('--text-color', '#f0f0f0');
                document.documentElement.style.setProperty('--secondary-color', '#1a1a1a');
                themeBtn.textContent = '🌙';

                // Update grid overlay for dark theme
                document.querySelector('.grid-overlay').style.backgroundImage = `
                    linear-gradient(rgba(var(--primary-rgb), 0.05) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(var(--primary-rgb), 0.05) 1px, transparent 1px)
                `;
            }
            isDark = !isDark;
        });
    }

    // Helper function to adjust color brightness
    function adjustColor(color, amount) {
        const tempElement = document.createElement('div');
        tempElement.style.color = color;
        const computedColor = getComputedStyle(tempElement).color;
        const rgbValues = computedColor.match(/\d+/g);

        if (!rgbValues || rgbValues.length < 3) return color;

        const r = Math.max(0, Math.min(255, parseInt(rgbValues[0]) + amount));
        const g = Math.max(0, Math.min(255, parseInt(rgbValues[1]) + amount));
        const b = Math.max(0, Math.min(255, parseInt(rgbValues[2]) + amount));

        return `rgb(${r}, ${g}, ${b})`;
    }

    // Helper function to convert hex to rgb
    function hexToRgb(hex) {
        // Remove # if present
        hex = hex.replace('#', '');

        // Parse hex values
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);

        return [r, g, b];
    }

    // Create background elements function
    function createBackgroundElements() {
        // Create container for particles if it doesn't exist
        let particlesContainer = document.getElementById('particles');
        if (!particlesContainer) {
            particlesContainer = document.createElement('div');
            particlesContainer.id = 'particles';
            particlesContainer.className = 'particles';
            document.body.appendChild(particlesContainer);
        }

        // Create grid overlay if it doesn't exist
        if (!document.querySelector('.grid-overlay')) {
            const gridOverlay = document.createElement('div');
            gridOverlay.className = 'grid-overlay';
            document.body.appendChild(gridOverlay);
        }

        // Create corner accents if they don't exist
        if (!document.querySelector('.corner-accent.top-left')) {
            const topLeftCorner = document.createElement('div');
            topLeftCorner.className = 'corner-accent top-left';
            document.body.appendChild(topLeftCorner);
        }

        if (!document.querySelector('.corner-accent.bottom-right')) {
            const bottomRightCorner = document.createElement('div');
            bottomRightCorner.className = 'corner-accent bottom-right';
            document.body.appendChild(bottomRightCorner);
        }

        // Create particles
        const particleCount = 15;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');

            // Random size
            const size = Math.random() * 80 + 20; // 20-100px
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;

            // Random position
            particle.style.top = `${Math.random() * 100}%`;
            particle.style.left = `${Math.random() * 100}%`;

            // Random animation delay
            particle.style.animationDelay = `${Math.random() * 15}s`;

            // Random opacity
            particle.style.opacity = (Math.random() * 0.4 + 0.1).toString();

            particlesContainer.appendChild(particle);
        }

        // Create glow effects
        for (let i = 0; i < 3; i++) {
            const glowEffect = document.createElement('div');
            glowEffect.classList.add('glow-effect');

            // Random animation delay
            glowEffect.style.animationDelay = `${i * 7}s`;

            document.body.appendChild(glowEffect);
        }

        // Get the primary color and update background elements
        const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-color').trim();
        updateBackgroundColor(primaryColor);
    }

    // Update background colors function
    function updateBackgroundColor(color) {
        // Convert color to RGB for easier manipulation
        let rgb;
        if (color.startsWith('#')) {
            rgb = hexToRgb(color);
        } else if (color.startsWith('rgb')) {
            rgb = color.match(/\d+/g).map(Number);
        } else {
            // Default to the primary color if conversion fails
            rgb = [255, 77, 90]; // Default red color
        }

        // Extract RGB components
        const [r, g, b] = rgb;

        // Store RGB values as CSS variable for use in other elements
        document.documentElement.style.setProperty('--primary-rgb', `${r}, ${g}, ${b}`);

        // Update particles
        const particles = document.querySelectorAll('.particle');
        particles.forEach(particle => {
            particle.style.background = color;
        });

        // Update glow effects
        const glowEffects = document.querySelectorAll('.glow-effect');
        glowEffects.forEach(glow => {
            glow.style.background = `radial-gradient(circle, rgba(${r}, ${g}, ${b}, 0.3) 0%, rgba(${r}, ${g}, ${b}, 0.1) 30%, rgba(0, 0, 0, 0) 70%)`;
        });

        // Update corner accents
        const cornerAccents = document.querySelectorAll('.corner-accent');
        cornerAccents.forEach(accent => {
            accent.style.borderColor = color;
        });

        // Update grid overlay
        const gridOverlay = document.querySelector('.grid-overlay');
        if (gridOverlay) {
            const isDark = getComputedStyle(document.documentElement).getPropertyValue('--dark-bg').trim() === '#121212';
            const opacity = isDark ? '0.05' : '0.1';

            gridOverlay.style.backgroundImage = `
                linear-gradient(rgba(${r}, ${g}, ${b}, ${opacity}) 1px, transparent 1px),
                linear-gradient(90deg, rgba(${r}, ${g}, ${b}, ${opacity}) 1px, transparent 1px)
            `;
        }
    }

    // Update background elements when the window is resized
    window.addEventListener('resize', () => {
        // Clear existing particles
        const particlesContainer = document.getElementById('particles');
        if (particlesContainer) {
            particlesContainer.innerHTML = '';

            // Recreate particles with new dimensions
            const particleCount = 15;
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.classList.add('particle');

                // Random size
                const size = Math.random() * 80 + 20; // 20-100px
                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;

                // Random position
                particle.style.top = `${Math.random() * 100}%`;
                particle.style.left = `${Math.random() * 100}%`;

                // Random animation delay
                particle.style.animationDelay = `${Math.random() * 15}s`;

                // Random opacity
                particle.style.opacity = (Math.random() * 0.4 + 0.1).toString();

                particlesContainer.appendChild(particle);
            }
        }
    });

    document.getElementById("contactForm").addEventListener("submit", async function (e) {
        e.preventDefault(); 
    
        const form = e.target;
        const formData = new FormData(form);

        const phone = document.getElementById("number").value;

        // Validate phone number (must be exactly 10 digits)
          if (!/^\d{10}$/.test(phone)) {
          alert("Please enter a valid 10-digit phone number.");
          return;
        }
    
        const response = await fetch("https://formspree.io/f/xjkyezkl", {
          method: "POST",
          body: formData, // Send form data directly
          headers: { "Accept": "application/json" } 
        });
    
        if (response.ok) {
          alert("Message sent successfully!");
          form.reset();
        } else {
          alert("Something went wrong. Please try again.");
        }
    });
    
    
});

// FAQ Functionality
document.addEventListener('DOMContentLoaded', function () {
    // Set up the FAQ accordion functionality
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            // Toggle active class on the question
            question.classList.toggle('active');

            // Toggle visibility of the answer
            const answer = question.nextElementSibling;

            if (question.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
                answer.style.opacity = '1';
            } else {
                answer.style.maxHeight = '0';
                answer.style.opacity = '0';
            }
        });
    });

    // Initialize - Hide all answers initially
    document.querySelectorAll('.faq-answer').forEach(answer => {
        answer.style.maxHeight = '0';
        answer.style.opacity = '0';
        answer.style.overflow = 'hidden';
        answer.style.transition = 'max-height 0.3s ease, opacity 0.3s ease';
    });
});

// Enhanced Projects & Experience 
document.addEventListener('DOMContentLoaded', () => {
    // Existing code (header, particles, etc.)

    // Project filtering functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));

            // Add active class to clicked button
            button.classList.add('active');

            // Get filter value
            const filterValue = button.getAttribute('data-filter');

            // Filter projects
            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });


    // Animation for timeline items
    const timelineItems = document.querySelectorAll('.exp-timeline-item');

    const observerOptions = {
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('exp-timeline-item-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    timelineItems.forEach(item => {
        observer.observe(item);
    });

    // Add smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });

            // Close mobile menu if open
            document.querySelector('.nav-links').classList.remove('active');
        });
    });
});

// Show github notification
document.addEventListener('DOMContentLoaded', function () {
    const githubLinks = document.querySelectorAll('.github-link');
    const githubNotification = document.getElementById('github-notification');


    // Handle GitHub link clicks - Show fullscreen notification
    githubLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const hasSource = this.getAttribute('data-has-source') === 'true';

            if (!hasSource) {
                e.preventDefault();
                showFullscreenNotification();
            }
            // If hasSource is true, the default link behavior works and redirects to GitHub
        });
    });

    // Function to show fullscreen notification
    function showFullscreenNotification() {
        githubNotification.classList.add('show');
        githubNotification.classList.add('notification-animate');

        // Remove classes after animation completes
        setTimeout(function () {
            githubNotification.classList.remove('show');
            githubNotification.classList.remove('notification-animate');
        }, 4500);
    }
});

// Show mine demo notification
document.addEventListener('DOMContentLoaded', function () {
    const mineLinks = document.querySelectorAll('.demo-link-mine');
    const mineNotification = document.getElementById('mine-notification');


    // Handle GitHub link clicks - Show fullscreen notification
    mineLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const hasSource = this.getAttribute('data-has-source') === 'true';

            if (!hasSource) {
                e.preventDefault();
                showMineFullscreenNotification();
            }
            // If hasSource is true, the default link behavior works and redirects to GitHub
        });
    });

    // Function to show fullscreen notification
    function showMineFullscreenNotification() {
        mineNotification.classList.add('show');
        mineNotification.classList.add('notification-animate');

        // Remove classes after animation completes
        setTimeout(function () {
            mineNotification.classList.remove('show');
            mineNotification.classList.remove('notification-animate');
        }, 5500);
    }
});

// Demo Videos
document.addEventListener('DOMContentLoaded', function () {
    // Get modal elements
    const videoModal1 = document.getElementById('video-modal-1');
    const videoModal2 = document.getElementById('video-modal-2');
    const videoModal3 = document.getElementById('video-modal-3');
    const closeModal = document.querySelector('.close-modal');
    const demoVideo1 = document.getElementById('demo-video-1');
    const demoVideo2 = document.getElementById('demo-video-2');
    const demoVideo3 = document.getElementById('demo-video-3');

    // Show modal when Live Demo is clicked
    document.querySelectorAll('.demo-link-1').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            videoModal1.style.display = 'block';
            demoVideo1.play();
        });
    });

    // Close modal when X is clicked
    closeModal.addEventListener('click', function () {
        videoModal1.style.display = 'none';
        demoVideo1.pause();
        demoVideo1.currentTime = 0;
    });

    // Close when clicking outside the video area
    videoModal1.addEventListener('click', function (e) {
        if (e.target === videoModal1) {
            videoModal1.style.display = 'none';
            demoVideo2.pause();
            demoVideo3.currentTime = 0;
        }
    });
});

  
