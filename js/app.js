
document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);

    // 1. SLIDING DOORS LOGIC
    const tl = gsap.timeline();
    const video = document.getElementById('hero-video');

    // Pull doors apart
    tl.to(".door-left", { x: "-100%", duration: 1.5, ease: "power4.inOut", delay: 0.5 })
      .to(".door-right", { x: "100%", duration: 1.5, ease: "power4.inOut" }, "<")
      .to(".door-overlay", { display: "none" });

    // Force video play once doors open
    setTimeout(() => {
        if(video) video.play();
    }, 1000);

    // 2. Hero Animation
    gsap.from(".hero-glass-card", {
        y: 100, opacity: 0, duration: 1.5, delay: 2.2, ease: "power3.out"
    });

    // 3. Scroll Staggers
    gsap.from(".service-item", {
        scrollTrigger: { trigger: "#expertise", start: "top 80%" },
        y: 50, opacity: 0, duration: 0.8, stagger: 0.1
    });

    gsap.from(".review-card", {
        scrollTrigger: { trigger: "#testimonials", start: "top 80%" },
        y: 50, opacity: 0, duration: 0.8, stagger: 0.1
    });

    // 4. Comparison Slider
    const slider = document.querySelector(".comparison-slider");
    const beforeWrapper = document.querySelector(".img-before-wrapper");
    const handle = document.querySelector(".handle");

    const moveSlider = (x) => {
        let rect = slider.getBoundingClientRect();
        let pos = ((x - rect.left) / rect.width) * 100;
        if(pos < 0) pos = 0;
        if(pos > 100) pos = 100;
        beforeWrapper.style.width = pos + "%";
        handle.style.left = pos + "%";
    };

    if(slider) {
        slider.addEventListener("mousemove", (e) => moveSlider(e.clientX));
        slider.addEventListener("touchmove", (e) => moveSlider(e.touches[0].clientX));
    }

    // 5. Form Logic
    window.nextStep = (step) => {
        const current = document.querySelector('.form-step.active');
        const next = document.querySelector(`[data-step="${step}"]`);
        const bar = document.querySelector('.progress-fill');
        
        current.classList.remove('active');
        next.classList.add('active');
        
        if(step === 2) bar.style.width = "66%";
        if(step === 3) bar.style.width = "100%";
    };

    window.prevStep = (step) => {
        document.querySelectorAll('.form-step').forEach(s => s.classList.remove('active'));
        document.querySelector(`[data-step="${step}"]`).classList.add('active');
        
        const bar = document.querySelector('.progress-fill');
        if(step === 1) bar.style.width = "33%";
        if(step === 2) bar.style.width = "66%";
    };

    // Form Submission Handler
    const form = document.getElementById('leadForm');
    if(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            alert("Request Sent! (Demo Mode)");
        });
    }
});
