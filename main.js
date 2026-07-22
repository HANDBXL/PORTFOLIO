/* ============================================================
   PORTFOLIO V2 — interactions
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {

    // Galerie : chargement immédiat + suppression du min-width après load
    // (le min-width sert de placeholder avant chargement ; une fois l'image connue
    //  le conteneur flex doit pouvoir adopter la largeur naturelle de l'image)
    document.querySelectorAll('.gallery img, .gallery video').forEach(el => {
        if (el.tagName === 'IMG') el.loading = 'eager';
        const item = el.closest('.gallery-item');
        const onLoad = () => { if (item) item.style.minWidth = '0'; };
        if (el.tagName === 'VIDEO' || el.complete) {
            onLoad();
        } else {
            el.addEventListener('load', onLoad, { once: true });
        }
    });

    // Header : état "scrolled" (filet + compaction)
    const header = document.querySelector('.site-header');
    const onScroll = () => {
        header.classList.toggle('scrolled', window.scrollY > 20);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    // Mouvements réduits : images animées → statiques, vidéos décoratives stoppées
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
        document.querySelectorAll('img[data-static]').forEach(img => {
            if (img.dataset.static) img.src = img.dataset.static;
        });
        document.querySelectorAll('video[autoplay]').forEach(v => {
            v.removeAttribute('autoplay');
            v.pause();
            // contrôles uniquement hors des cartes cliquables
            if (!v.closest('a')) v.setAttribute('controls', '');
        });
    }

    // ===========================================================
    // TRAVAUX — rendu des cartes
    // ===========================================================
    const grid = document.getElementById('works-grid');

    if (grid && typeof projects !== 'undefined') {
        grid.innerHTML = projects.map(p => {
            const target = p.external ? ` target="_blank" rel="noopener"` : '';
            const cta = p.external ? 'Voir le projet' : "Voir le cas d'étude";
            const arrow = p.external ? '↗' : '→';
            const media = (p.motion && !reduceMotion)
                ? `<video src="${p.motion}" poster="${p.visual}" autoplay loop muted playsinline aria-hidden="true"></video>`
                : `<img src="${p.visual}" alt="" loading="lazy" width="800" height="600">`;
            const disciplines = p.disciplines || [];
            return `
            <a class="work-card" href="${p.link}"${target} data-disciplines="${disciplines.join('|')}">
                <div class="work-visual">
                    ${media}
                    <span class="work-mask">
                        <span class="work-cta">${cta} <span class="arrow" aria-hidden="true">${arrow}</span></span>
                    </span>
                    <span class="work-cat">${disciplines[0] || ''}</span>
                </div>
                <div class="work-body">
                    <div class="work-topline">
                        <span class="work-num">${p.id}</span>
                        <span class="work-domain">${p.domain}</span>
                    </div>
                    <h3 class="work-title">${p.title}</h3>
                    <p class="work-excerpt">${p.excerpt}</p>
                </div>
            </a>`;
        }).join('');

        // ----- Filtres -----
        const filters = document.querySelectorAll('.filter');
        const cards = Array.from(grid.querySelectorAll('.work-card'));

        // compteur "Tous"
        const allCount = document.querySelector('[data-filter="all"] .filter-count');
        if (allCount) allCount.textContent = cards.length;

        const applyFilter = (btn, updateHash = true) => {
            filters.forEach(b => { b.classList.remove('is-active'); b.setAttribute('aria-pressed', 'false'); });
            btn.classList.add('is-active');
            btn.setAttribute('aria-pressed', 'true');

            const f = btn.dataset.filter;
            cards.forEach(card => {
                const disciplines = (card.dataset.disciplines || '').split('|');
                const show = (f === 'all' || disciplines.includes(f));
                card.classList.toggle('is-hidden', !show);
            });
            // Deep-link : filtre reflété dans l'URL, sans provoquer de scroll
            if (updateHash) {
                history.replaceState(null, '', f === 'all' ? '#travaux' : '#travaux:' + encodeURIComponent(f));
            }
        };

        filters.forEach(btn => btn.addEventListener('click', () => applyFilter(btn)));

        // Filtre initial depuis l'URL (#travaux:Client, #travaux:Side%20Project…)
        const hashFilter = decodeURIComponent((location.hash.match(/^#travaux:(.+)$/) || [])[1] || '');
        if (hashFilter) {
            const btn = document.querySelector(`.filter[data-filter="${hashFilter}"]`);
            if (btn) {
                applyFilter(btn, false);
                document.getElementById('travaux')?.scrollIntoView();
            }
        }
    }

    // ===========================================================
    // GALERIE cas d'étude — flèches prev/next
    // ===========================================================
    document.querySelectorAll('.gallery-wrap').forEach(wrap => {
        const track = wrap.querySelector('.gallery');
        const step = () => Math.min(track.clientWidth * 0.8, 460);
        const prev = wrap.querySelector('.js-gallery-prev');
        const next = wrap.querySelector('.js-gallery-next');
        if (prev) prev.addEventListener('click', () => track.scrollBy({ left: -step(), behavior: 'smooth' }));
        if (next) next.addEventListener('click', () => track.scrollBy({ left: step(), behavior: 'smooth' }));
    });

    // ===========================================================
    // SCROLL REVEAL (sections)
    // ===========================================================
    if (!reduceMotion && 'IntersectionObserver' in window) {
        const io = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
            });
        }, { threshold: 0.12 });
        document.querySelectorAll('[data-reveal], .work-card, .section-head').forEach(el => io.observe(el));
    } else {
        document.querySelectorAll('[data-reveal], .work-card, .section-head').forEach(el => el.classList.add('in'));
    }

    // ===========================================================
    // BARRE DE RETOUR (centrée en bas, apparaît au scroll)
    //   - pages projet : titre + sous-titre + "← Retour" vers les travaux
    //   - accueil/démarche : pastille "↑ Haut" (remonte)
    // ===========================================================
    // Uniquement sur les pages projet : barre "← Retour" avec titre/sous-titre.
    const caseEl = document.querySelector('.case');
    if (caseEl) {
        const title = (document.querySelector('.case-title')?.textContent || '').trim();
        const sub = caseEl.getAttribute('data-sub') || '';
        const floatEl = document.createElement('div');
        floatEl.className = 'case-navbar';
        floatEl.innerHTML =
            `<div class="case-navbar-info">` +
                `<span class="case-navbar-title">${title}</span>` +
                (sub ? `<span class="case-navbar-sub">${sub}</span>` : '') +
            `</div>` +
            `<a class="case-navbar-back" href="index.html#travaux" aria-label="Retour aux travaux">` +
                `<span class="cn-arrow" aria-hidden="true">←</span> Retour</a>`;
        document.body.appendChild(floatEl);

        const floatScroll = () => floatEl.classList.toggle('is-visible', window.scrollY > 400);
        floatScroll();
        window.addEventListener('scroll', floatScroll, { passive: true });

        // ----- Projet suivant (avant le contact) -----
        if (typeof projects !== 'undefined') {
            const page = window.location.pathname.split('/').pop();
            const internal = projects.filter(p => !p.external);
            const i = internal.findIndex(p => p.link === page);
            if (i > -1 && internal.length > 1) {
                const next = internal[(i + 1) % internal.length];
                const nav = document.createElement('nav');
                nav.className = 'case-next';
                nav.setAttribute('aria-label', 'Projet suivant');
                nav.innerHTML =
                    `<a class="case-next-link" href="${next.link}">` +
                        `<span class="case-next-k">Projet suivant</span>` +
                        `<span class="case-next-title">${next.title} <span class="cn-arrow" aria-hidden="true">→</span></span>` +
                        `<span class="case-next-domain">${next.domain}</span>` +
                    `</a>`;
                caseEl.appendChild(nav);
            }
        }
    }

});
