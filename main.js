document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('js-reveal');

    // ===========================
    // RENDER PROJECT CARDS
    // ===========================
    const projectsGrid = document.querySelector('.projects-grid');

    if (projectsGrid && typeof projects !== 'undefined') {
        projects.forEach(project => {
            const card = document.createElement('div');
            card.classList.add('project-card');
            card.id = `projet-${project.id}`;

            const tagsHTML = (project.tags || [])
                .map(t => `<span class="project-tag">${t}</span>`).join('');

            const yearHTML = project.year
                ? `<span class="project-year">${project.year}</span>` : '';

            card.innerHTML = `
                <div class="project-info">
                    <div class="project-meta-row">
                        <span class="project-number">PROJET ${project.id}</span>
                    </div>
                    <h2 class="project-title">${project.title}</h2>
                    <p class="project-meta">${project.domain}</p>
                    <div class="project-description">
                        <p><strong>L'enjeu :</strong> ${project.issue}</p>
                        <p>${project.description}</p>
                    </div>
                    ${tagsHTML ? `<div class="project-tags">${tagsHTML}</div>` : ''}
                    <span class="project-link desktop-only">Voir le cas d'étude &#x279E;</span>
                </div>
                <div class="project-visual">
                    <img src="${project.visual}" alt="${project.title}">
                </div>
                <span class="project-link mobile-only" style="margin-top: 1rem;">Voir le cas d'étude &#x279E;</span>
            `;

            // Card click → navigate
            card.addEventListener('click', (e) => {
                window.location.href = project.link;
            });

            projectsGrid.appendChild(card);
        });


    }

    // ===========================
    // SCROLL REVEAL
    // ===========================
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => entry.target.classList.add('is-visible'), i * 100);
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08 });

    document.querySelectorAll('.project-card').forEach(card => revealObserver.observe(card));

    // ===========================
    // DYNAMIC HERO PHRASES
    // ===========================
    const heroPhrases = [
        "Concevoir des <em>systèmes visuels</em> à l'intersection de <em>l'intuition</em> et de <em>l'usage</em>.",
        "Donner une <em>structure</em> à vos idées et de la <em>sensibilité</em> à vos interfaces.",
        "Design de <em>systèmes visuels</em> pour produits qui durent.",
        "Design d'<em>interfaces</em> pensées pour ceux qui s'en servent vraiment.",
        "Design qui tient — à <em>l'usage</em> comme à <em>l'image</em>."
    ];
    let heroIndex = 0;
    const heroEl = document.querySelector('.hero-dynamic-phrase');

    if (heroEl) {
        function cyclePhrase() {
            // Exit: blur + lift + fade
            heroEl.style.transition = 'opacity 0.35s ease, transform 0.35s ease, filter 0.35s ease';
            heroEl.style.opacity = '0';
            heroEl.style.transform = 'translateY(-12px) scale(0.97)';
            heroEl.style.filter = 'blur(6px)';

            setTimeout(() => {
                let nextIndex;
                do {
                    nextIndex = Math.floor(Math.random() * heroPhrases.length);
                } while (nextIndex === heroIndex);

                heroIndex = nextIndex;
                heroEl.innerHTML = heroPhrases[heroIndex];

                // Start from below, blurred
                heroEl.style.transition = 'none';
                heroEl.style.transform = 'translateY(14px) scale(0.97)';
                heroEl.style.opacity = '0';
                heroEl.style.filter = 'blur(8px)';

                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        // Spring in: unblur + rise + scale to 1
                        heroEl.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), filter 0.5s ease';
                        heroEl.style.opacity = '1';
                        heroEl.style.transform = 'translateY(0) scale(1)';
                        heroEl.style.filter = 'blur(0px)';
                        setTimeout(cyclePhrase, 4200);
                    });
                });
            }, 350);
        }
        setTimeout(cyclePhrase, 3000);
    }



    // ===========================
    // GALLERY NAV BUTTONS
    // ===========================
    document.querySelectorAll('.project-gallery-container').forEach(container => {
        const gallery = container.querySelector('.project-gallery');
        if (!gallery) return;
        const prevBtn = container.querySelector('.js-gallery-prev');
        const nextBtn = container.querySelector('.js-gallery-next');
        if (prevBtn) prevBtn.addEventListener('click', () => gallery.scrollBy({ left: -600, behavior: 'smooth' }));
        if (nextBtn) nextBtn.addEventListener('click', () => gallery.scrollBy({ left: 600, behavior: 'smooth' }));
    });

    // ===========================
    // STICKY PROJECT BAR (Scroll reveal)
    // ===========================
    const stickyBar = document.querySelector('.project-sticky-bar');

    if (stickyBar) {
        const footer = document.querySelector('.site-footer');
        window.addEventListener('scroll', () => {
            const footerTop = footer.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            const bottomMargin = 32; // 2rem

            if (window.scrollY > 200) {
                stickyBar.classList.add('is-visible');
                
                // If footer is visible, pin the bar above it
                if (footerTop < windowHeight) {
                    const offset = windowHeight - footerTop + bottomMargin;
                    stickyBar.style.bottom = `${offset}px`;
                } else {
                    stickyBar.style.bottom = `${bottomMargin}px`;
                }
            } else {
                stickyBar.classList.remove('is-visible');
            }
        });
    }
});
