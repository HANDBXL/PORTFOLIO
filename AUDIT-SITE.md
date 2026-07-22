# Audit global — Portfolio Jean-Charles Fremont

Trois volets : navigation, rendu light/dark, écriture (audit mené par l'agent copywriter du projet).

---

## 1. Navigation

### Critique

**N1 — Header et footer absents sans JavaScript sur 6 pages.**
Les pages cas d'étude et `methode.html` n'ont aucun header dans leur HTML : tout est injecté par `components.js` après le chargement. Conséquences : flash visible sans menu au chargement, aucune navigation si JS échoue, et les moteurs de recherche voient des pages sans maillage interne. Correction : réintégrer le header statiquement dans chaque page (le script peut rester pour contact/footer).

### Important

**N2 — Cul-de-sac en fin de cas d'étude.**
Arrivé en bas d'un projet, le visiteur n'a que « Retour » pour continuer. Un recruteur qui lit ASSET devrait pouvoir enchaîner sur Connexia sans repasser par la grille. Correction : bloc « Projet suivant → » avant le contact.

**N3 — Doublon `PORTFOLIO-main/` dans le dossier.**
Ancienne copie complète du site (vieux assets JPG/GIF compris). Risque de déploiement en double (contenu dupliqué, poids) et de confusion d'édition. À supprimer ou sortir du dossier déployé.

### Mineur

**N4 — Liens externes sans indication.** Timeline et Coloriage ouvrent un nouvel onglet ; le CTA « Voir le projet » ne signale pas la sortie du site (pas de ↗, pas de mention). Ajouter l'icône ↗ au CTA des cartes `external`.

**N5 — Filtres sans deep-link.** Le filtre actif n'est pas reflété dans l'URL (`#travaux?f=client`) : impossible de partager une vue filtrée, état perdu au retour arrière.

**N6 — Nommage `methode.html` vs label « Démarche ».** Incohérence URL/label (SEO et lisibilité). Si renommage en `demarche.html`, prévoir la redirection.

---

## 2. Light mode / Dark mode

### Important

**D1 — Mode sombre non déclaré.**
Le site est volontairement light-only, mais rien ne le déclare au navigateur. Chez un utilisateur en dark mode OS, les éléments rendus par le navigateur (scrollbars, contrôles vidéo, champs éventuels) peuvent basculer en sombre au milieu d'une page claire. Correction (1 ligne) : `:root { color-scheme: light; }` dans `style.css`.

**D2 — Icônes des cartes Signal interverties.**
La carte « 02 — Système » charge `skill-elan-loop.webp` et la carte « 03 — Élan » charge `skill-systeme-loop.webp` (`index.html`). Si les fichiers portent bien le nom de leur contenu, les visuels sont inversés par rapport aux textes.

### Vérifié conforme

- **Contrastes (WCAG AA)** : toutes les combinaisons passent, sur fond clair comme sur les sections sombres. Valeur la plus basse : footer-meta à 4,82:1 (seuil 4,5). Accent `#003CFF` sur fond clair : 5,99:1 ; `#4D7CFF` sur fond sombre : 5,35:1.
- **theme-color** unique clair : cohérent avec un site light-only.
- **prefers-reduced-motion** : animations, APNG/WebP animés et vidéos autoplay correctement neutralisés.

### Mineur

**D3 — Caractères décoratifs vocalisés.** Le curseur clignotant `▍` du hero-label et les flèches `↓ → ← ↗` sont lus par les lecteurs d'écran. Envelopper dans `<span aria-hidden="true">`.

---

## 3. Écriture (audit copywriter)

### Critique

**E1 — La formulation bannie par le guide de voix est dans les métadonnées de l'accueil.**
`meta description` et `og:description` d'`index.html` : « Je viens du dessin, j'ai appris à penser en systèmes » — mot pour mot le contre-exemple n°2 du guide (understatement en opposition). C'est le texte affiché par Google et LinkedIn.
Réécritures proposées :
- A : « Jean-Charles Fremont, designer à Bruxelles. Le trait et le système : interfaces, illustration, prototypes codés. »
- B : « Designer à Bruxelles. Une boîte à outils créative, du trait à l'interface — interfaces, illustration, prototypes codés. »

**E2 — Kinepolis : « Client » sur la page, « Side Project » sur la carte.**
`kinepolis.html` affiche `Client` alors que `projects.js` dit `Side Project` et que la page annonce « Exercice de conception UX/UI ». Présenter un exercice comme un travail client fragilise la crédibilité de tout le reste. → « Concept » (comme ASSET) ou « Side Project ».

### Important

**E3 — Tournures négatives contraires au guide :**
- `methode.html` : « Mon parcours n'est pas une ligne droite, c'est… » → « Mon parcours est une évolution d'échelle : des objets et des images, puis des espaces et des équipes, aujourd'hui des interfaces et des systèmes. »
- `methode.html` : « une belle interface ne sert à rien si elle ne répond pas… » → « une interface tient quand elle répond à un besoin humain réel. »
- excerpt Connexia : « sans rompre l'existant » (+ répétition « existant… l'existant ») → « Enrichir un design system vivant, composant après composant — de nouvelles fonctionnalités qui s'intègrent au millimètre. »
- meta Kinepolis : « éliminer la friction… end-to-end » → « un parcours clair et rapide, de bout en bout. »

**E4 — Auto-qualifications corporate en série.**
« Designer aguerri, je vis du dessin… » (hero — « je vis du dessin » est en plus ambigu) et « Professionnel engagé, je veux m'ancrer… » (contact) : deux étiquettes qui annoncent au lieu de montrer. Réécritures :
- Hero : « Basé à Bruxelles. Je conçois des interfaces, des identités et des prototypes codés. Ce que j'apporte à une équipe : un œil exigeant, des ponts entre les disciplines, et l'envie constante d'expérimenter. »
- Contact : « Je cherche une équipe solide où m'ancrer : y apporter ma rigueur et ma créativité, et construire dans la durée. Bruxelles ou hybride. »

**E5 — Rap Book : trois inventaires contradictoires.**
Carte : « Trois éditions — livre accordéon, fanzine, affiche » / page : deux objets (recueil à dos collé + dépliant accordéon) / meta : « un recueil et un dépliant ». Aligner sur la page : « Deux objets édités — un recueil à dos collé et un dépliant accordéon — nés d'années à dessiner le rap à l'encre. »

**E6 — Fautes de français :**
- « étude marché quantitative » → « étude **de** marché quantitative » (`asset.html`)
- « un dépliant édition limitée » → « un dépliant **en** édition limitée » (`rapbook.html`)
- « Du brief ou de moi-même. » (section Travaux) → « Sur brief ou de ma propre initiative. »

**E7 — og:description absente sur 5 pages cas** (connexia, philips, calypso, rapbook, kinepolis) : chaque partage LinkedIn perd sa ligne de pitch. `methode.html` n'a ni og:image ni og:url ; canonical seulement sur l'index.

### Mineur

- Franglais à arbitrer : « flux core MVP » → « flux clés du MVP » ; « tier gratuit » → « offre gratuite » ; « design system from scratch » → « créé de zéro » ; « 92+ écrans » → « plus de 92 écrans ».
- « cas d'étude » (calque de *case study*, affiché sur toutes les cartes) vs « étude de cas » — trancher et unifier.
- Casse/langue des tags incohérentes : « Side Project » (EN) vs « Exploration/Client » (FR) ; « Design System » vs « Design Systems » ; « User Flows » vs « Identité visuelle ». Unifier (catégorie FR « Projet perso » recommandée).
- ASSET : promesse « 3 secondes » vs test « 5 secondes » — harmoniser ou expliciter.
- « maquettes haute-fidélité » vs « haute fidélité » ; « avec évidence » ; « ingénierie lumineuse » → « ingénierie de l'éclairage » ; « ou l'écran recommence ».
- Kicker « // 03 — Contact » (index) vs « // Contact » (autres pages).
- Rap Book : structure sans temps de clôture — ajouter « 04 — L'objet ».

### À préserver (références de voix)

Le hero-title, « Kinepolis — le chemin le plus court vers le bon siège », « Calypso Rose — quand la contrainte devient identité », l'og:description de `methode.html` (« Les outils changent, la démarche reste : traduire. »), le rituel « Terrain / Rôle / Défi / Méthode / Impact », les micro-copies de `main.js`.

---

## Synthèse des priorités

| # | Problème | Volet | Gravité |
|---|---|---|---|
| E1 | Formulation bannie dans les meta de l'accueil | Écriture | Critique |
| E2 | Kinepolis « Client » vs « exercice » | Écriture | Critique |
| N1 | Nav absente sans JS sur 6 pages | Navigation | Critique |
| D2 | Icônes Signal interverties | Visuel | Important |
| D1 | `color-scheme: light` manquant | Light/Dark | Important |
| N2 | Pas de « projet suivant » | Navigation | Important |
| E3–E7 | Tournures négatives, fautes, og manquants | Écriture | Important |
| N3 | Doublon PORTFOLIO-main/ | Hygiène | Important |
| Reste | Franglais, tags, deep-links, aria-hidden… | Divers | Mineur |
