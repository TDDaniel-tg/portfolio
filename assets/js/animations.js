/* AI Dev Studio - GSAP Animations */

// Initialize GSAP Animations
function initGSAPAnimations() {
    console.log('GSAP Animations initialized');
    
    // Hero section animations
    initHeroAnimations();
    
    // Section reveal animations
    initSectionReveal();
    
    // Cards animations
    initCardsAnimations();
    
    // Parallax effects
    initParallaxEffects();
    
    // Magnetic buttons
    initMagneticButtons();
    
    // Text reveal animations
    initTextReveal();
    
    // Logo animation
    initLogoAnimation();
}

// Hero Section Animations
function initHeroAnimations() {
    const tl = gsap.timeline({ delay: 1.5 });
    
    // Animate hero content
    tl.from('.hero__title', {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: 'power4.out'
    })
    .from('.hero__subtitle', {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    }, '-=0.8')
    .from('.hero__stats .stat', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out'
    }, '-=0.6')
    .from('.hero__cta .btn', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'back.out(1.7)'
    }, '-=0.4');
    
    // Animate gradient orbs
    gsap.to('.orb-1', {
        rotation: 360,
        duration: 20,
        repeat: -1,
        ease: 'none'
    });
    
    gsap.to('.orb-2', {
        rotation: -360,
        duration: 25,
        repeat: -1,
        ease: 'none'
    });
    
    // Mouse parallax for hero background
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX - window.innerWidth / 2) / window.innerWidth;
        mouseY = (e.clientY - window.innerHeight / 2) / window.innerHeight;
        
        gsap.to('.orb-1', {
            x: mouseX * 50,
            y: mouseY * 50,
            duration: 2,
            ease: 'power2.out'
        });
        
        gsap.to('.orb-2', {
            x: mouseX * -30,
            y: mouseY * -30,
            duration: 2,
            ease: 'power2.out'
        });
    });
}

// Section Reveal Animations
function initSectionReveal() {
    // Animate section headers
    gsap.utils.toArray('.section-header').forEach(header => {
        gsap.fromTo(header.querySelector('.section-title'), {
            y: 60,
            opacity: 0
        }, {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: header,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        });
        
        gsap.fromTo(header.querySelector('.section-subtitle'), {
            y: 30,
            opacity: 0
        }, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: 0.2,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: header,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        });
    });
}

// Cards Animations
function initCardsAnimations() {
    // Advantage cards
    gsap.utils.toArray('.advantage-card').forEach((card, index) => {
        gsap.fromTo(card, {
            y: 100,
            opacity: 0,
            rotationY: -15
        }, {
            y: 0,
            opacity: 1,
            rotationY: 0,
            duration: 0.8,
            delay: index * 0.1,
            ease: 'back.out(1.7)',
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                end: 'bottom 15%',
                toggleActions: 'play none none reverse'
            }
        });
        
        // Hover animation
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                y: -10,
                rotationY: 5,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                y: 0,
                rotationY: 0,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });
    
    // Service cards
    gsap.utils.toArray('.service-card').forEach((card, index) => {
        gsap.fromTo(card, {
            y: 80,
            opacity: 0,
            scale: 0.9
        }, {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            delay: index * 0.15,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                end: 'bottom 15%',
                toggleActions: 'play none none reverse'
            }
        });
    });
    
    // Portfolio items
    gsap.utils.toArray('.portfolio-item').forEach((item, index) => {
        gsap.fromTo(item, {
            y: 60,
            opacity: 0,
            scale: 0.95
        }, {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            delay: index * 0.1,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: item,
                start: 'top 90%',
                end: 'bottom 10%',
                toggleActions: 'play none none reverse'
            }
        });
    });
    
    // Tech items
    gsap.utils.toArray('.tech-item').forEach((item, index) => {
        gsap.fromTo(item, {
            y: 50,
            opacity: 0,
            rotation: -10
        }, {
            y: 0,
            opacity: 1,
            rotation: 0,
            duration: 0.6,
            delay: index * 0.05,
            ease: 'back.out(1.7)',
            scrollTrigger: {
                trigger: item,
                start: 'top 85%',
                end: 'bottom 15%',
                toggleActions: 'play none none reverse'
            }
        });
        
        // 3D hover effect
        item.addEventListener('mouseenter', () => {
            gsap.to(item, {
                rotationY: 15,
                rotationX: 5,
                y: -5,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        item.addEventListener('mouseleave', () => {
            gsap.to(item, {
                rotationY: 0,
                rotationX: 0,
                y: 0,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });
    
    // Testimonial cards
    gsap.utils.toArray('.testimonial-card').forEach((card, index) => {
        gsap.fromTo(card, {
            x: index % 2 === 0 ? -100 : 100,
            opacity: 0,
            rotation: index % 2 === 0 ? -5 : 5
        }, {
            x: 0,
            opacity: 1,
            rotation: 0,
            duration: 0.8,
            delay: index * 0.2,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                end: 'bottom 15%',
                toggleActions: 'play none none reverse'
            }
        });
    });
}

// Parallax Effects
function initParallaxEffects() {
    // Background parallax
    gsap.utils.toArray('.gradient-orb').forEach(orb => {
        gsap.to(orb, {
            yPercent: -50,
            ease: 'none',
            scrollTrigger: {
                trigger: orb,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1
            }
        });
    });
    
    // Section backgrounds
    gsap.utils.toArray('section').forEach(section => {
        gsap.to(section, {
            yPercent: -10,
            ease: 'none',
            scrollTrigger: {
                trigger: section,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 2
            }
        });
    });
}

// Magnetic Buttons
function initMagneticButtons() {
    gsap.utils.toArray('.btn--primary, .btn--hero').forEach(button => {
        let xTo = gsap.quickTo(button, 'x', { duration: 0.6, ease: 'power3' });
        let yTo = gsap.quickTo(button, 'y', { duration: 0.6, ease: 'power3' });
        
        button.addEventListener('mouseenter', () => {
            gsap.to(button, { scale: 1.05, duration: 0.3, ease: 'power2.out' });
        });
        
        button.addEventListener('mouseleave', () => {
            gsap.to(button, { scale: 1, duration: 0.3, ease: 'power2.out' });
            xTo(0);
            yTo(0);
        });
        
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            xTo(x * 0.3);
            yTo(y * 0.3);
        });
    });
}

// Text Reveal Animations
function initTextReveal() {
    // Split text and animate
    gsap.utils.toArray('.advantage-card__title, .service-card__title, .testimonial-card__name').forEach(title => {
        const text = title.textContent;
        title.innerHTML = text.split('').map(char => 
            char === ' ' ? '<span>&nbsp;</span>' : `<span>${char}</span>`
        ).join('');
        
        gsap.fromTo(title.querySelectorAll('span'), {
            y: 50,
            opacity: 0,
            rotationX: -90
        }, {
            y: 0,
            opacity: 1,
            rotationX: 0,
            duration: 0.6,
            stagger: 0.02,
            ease: 'back.out(1.7)',
            scrollTrigger: {
                trigger: title,
                start: 'top 85%',
                end: 'bottom 15%',
                toggleActions: 'play none none reverse'
            }
        });
    });
}

// Logo Animation
function initLogoAnimation() {
    const logo = document.querySelector('.nav__logo');
    
    // Continuous glow animation
    gsap.to(logo.querySelector('.logo-icon'), {
        textShadow: '0 0 20px #00d4ff, 0 0 40px #00d4ff',
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'power2.inOut'
    });
    
    // Click animation
    logo.addEventListener('click', () => {
        gsap.to(logo, {
            scale: 0.95,
            duration: 0.1,
            yoyo: true,
            repeat: 1,
            ease: 'power2.inOut'
        });
    });
}

// Cursor Trail Effect
function initCursorTrail() {
    if (window.innerWidth < 768) return; // Skip on mobile
    
    const trail = [];
    const trailLength = 10;
    
    for (let i = 0; i < trailLength; i++) {
        const dot = document.createElement('div');
        dot.className = 'cursor-dot';
        dot.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: rgba(0, 212, 255, ${1 - i / trailLength});
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            mix-blend-mode: difference;
        `;
        document.body.appendChild(dot);
        trail.push(dot);
    }
    
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animateTrail() {
        let x = mouseX;
        let y = mouseY;
        
        trail.forEach((dot, index) => {
            const nextDot = trail[index + 1] || trail[0];
            
            dot.style.left = x + 'px';
            dot.style.top = y + 'px';
            
            x += (nextDot.offsetLeft - x) * 0.3;
            y += (nextDot.offsetTop - y) * 0.3;
        });
        
        requestAnimationFrame(animateTrail);
    }
    
    animateTrail();
}

// Page Transition Animation
function initPageTransition() {
    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'page-transition';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #0a0a0a, #1a1a1a);
        z-index: 10001;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        visibility: hidden;
    `;
    
    overlay.innerHTML = `
        <div style="text-align: center;">
            <div style="font-family: 'Space Grotesk', sans-serif; font-size: 2rem; color: #00d4ff; margin-bottom: 1rem;">
                AI Dev Studio
            </div>
            <div style="width: 200px; height: 3px; background: rgba(255,255,255,0.1); border-radius: 3px; overflow: hidden;">
                <div class="loading-progress" style="width: 0%; height: 100%; background: linear-gradient(90deg, #00d4ff, #8b5cf6); transition: width 0.3s ease;"></div>
            </div>
        </div>
    `;
    
    document.body.appendChild(overlay);
    
    // Animate page load
    window.addEventListener('load', () => {
        const progress = overlay.querySelector('.loading-progress');
        
        gsap.to(overlay, {
            opacity: 1,
            visibility: 'visible',
            duration: 0.3
        });
        
        gsap.to(progress, {
            width: '100%',
            duration: 1.5,
            ease: 'power2.out',
            onComplete: () => {
                gsap.to(overlay, {
                    opacity: 0,
                    visibility: 'hidden',
                    duration: 0.5,
                    delay: 0.3
                });
            }
        });
    });
}

// Initialize advanced animations
if (typeof gsap !== 'undefined') {
    initCursorTrail();
    initPageTransition();
}

// Performance optimization
function optimizeAnimations() {
    // Reduce animations on low-performance devices
    if (navigator.hardwareConcurrency < 4) {
        gsap.globalTimeline.timeScale(1.5); // Speed up animations
    }
    
    // Pause animations when tab is not visible
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            gsap.globalTimeline.pause();
        } else {
            gsap.globalTimeline.resume();
        }
    });
    
    // Disable complex animations on battery-powered devices
    if (navigator.getBattery) {
        navigator.getBattery().then(battery => {
            if (battery.level < 0.2) {
                gsap.globalTimeline.timeScale(2); // Speed up to save battery
            }
        });
    }
}

// Call optimization
if (typeof gsap !== 'undefined') {
    optimizeAnimations();
} 