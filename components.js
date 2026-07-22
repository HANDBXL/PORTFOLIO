/* ============================================================
   PORTFOLIO V2 — Composants partagés
   Header, footer et section contact injectés automatiquement
   sur toutes les pages pour éviter la duplication HTML.
   ============================================================ */

(function () {
    const PAGE = window.location.pathname.split('/').pop() || 'index.html';
    const isHome = PAGE === 'index.html' || PAGE === '';
    const isCase = !isHome && PAGE !== 'methode.html';

    /* ---- Helper : chemin relatif vers la racine ---- */
    const root = '';  // toutes les pages sont à la racine

    /* ---- Nav link actif ---- */
    function navLink(href, label, current) {
        const aria = current ? ' aria-current="page"' : '';
        return `<li><a href="${href}"${aria}>${label}</a></li>`;
    }

    const travaux = isCase ? ' aria-current="page"' : '';
    const demarche = PAGE === 'methode.html' ? ' aria-current="page"' : '';

    /* ============================================================
       HEADER
       ============================================================ */
    const headerHTML = `
    <a class="skip-link" href="#main-content">Aller au contenu</a>
    <header class="site-header">
        <nav class="nav" aria-label="Navigation principale">
            <a href="index.html" class="wordmark" aria-label="Accueil — Jean-Charles Fremont">
                <img src="assets/signature.webp" alt="JCF" class="wordmark-sig" width="568" height="503">
                <span class="wordmark-full">Jean-Charles Fremont</span>
            </a>
            <ul class="nav-links">
                <li><a href="index.html#travaux"${travaux}>Travaux</a></li>
                <li><a href="methode.html"${demarche}>Démarche</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </nav>
    </header>`;

    /* ============================================================
       CONTACT + FOOTER
       ============================================================ */
    const contactFooterHTML = `
    <section id="contact" class="contact">
        <div class="contact-inner" data-reveal>
            <p class="section-kicker">// Contact</p>
            <h2 class="contact-head">On travaille<br>ensemble&nbsp;?</h2>
            <p class="contact-lead">Professionnel engagé, je veux m'ancrer dans une équipe solide, y apporter ma rigueur et ma créativité, et construire dans la durée. Bruxelles ou hybride.</p>
            <div class="contact-cols">
                <div class="contact-col">
                    <p class="contact-k">Rôles visés</p>
                    <ul class="contact-list">
                        <li>UX/UI Designer</li>
                        <li>Product Designer</li>
                        <li>Designer visuel hybride</li>
                    </ul>
                </div>
                <div class="contact-col">
                    <p class="contact-k">Écrire</p>
                    <a class="contact-link" href="mailto:jeancharlesfremont@gmail.com">jeancharlesfremont@gmail.com <span aria-hidden="true">↗</span></a>
                    <a class="contact-link" href="https://www.linkedin.com/in/fremontjeancharles/" target="_blank" rel="noopener">LinkedIn <span aria-hidden="true">↗</span></a>
                    <a class="contact-link" href="assets/CV_JC_Fremont.pdf" download>Télécharger le CV <span aria-hidden="true">↓</span></a>
                </div>
            </div>
        </div>
    </section>

    <footer class="site-footer">
        <div class="footer-inner">
            <img src="assets/signature.webp" alt="JCF" class="footer-sig" width="568" height="503">
            <ul class="footer-social">
                <li><a href="https://www.linkedin.com/in/fremontjeancharles/" target="_blank" rel="noopener">LinkedIn</a></li>
                <li><a href="https://github.com/HANDBXL" target="_blank" rel="noopener">GitHub</a></li>
                <li><a href="https://www.instagram.com/jean.charles.fremont/" target="_blank" rel="noopener">Instagram</a></li>
            </ul>
            <span class="footer-meta">Bruxelles, Belgique</span>
        </div>
    </footer>`;

    /* ============================================================
       INJECTION
       ============================================================ */
    document.addEventListener('DOMContentLoaded', () => {

        // 1. Injecter header uniquement si absent du HTML statique
        if (!document.querySelector('.site-header')) {
            document.body.insertAdjacentHTML('afterbegin', headerHTML);
        }

        // 2. Injecter contact + footer uniquement si absents
        if (!document.querySelector('.contact')) {
            document.body.insertAdjacentHTML('beforeend', contactFooterHTML);
        }

        // 3. Activer le scroll reveal sur les éléments injectés
        if ('IntersectionObserver' in window) {
            const io = new IntersectionObserver((entries) => {
                entries.forEach(e => {
                    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
                });
            }, { threshold: 0.12 });
            document.querySelectorAll('[data-reveal]').forEach(el => {
                if (!el.classList.contains('in')) io.observe(el);
            });
        } else {
            document.querySelectorAll('[data-reveal]').forEach(el => el.classList.add('in'));
        }
    });
})();
