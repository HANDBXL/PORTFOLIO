# Portfolio — Jean-Charles Fremont

Site portfolio personnel (V2). Designer basé à Bruxelles — UX, design graphique et illustration.

Site statique, sans dépendances ni build : HTML, CSS et JavaScript natifs.

## Structure

- `index.html` — page d'accueil (hero, travaux filtrables par discipline, contact)
- `methode.html` — démarche
- pages de cas : `asset.html`, `connexia.html`, `kinepolis.html`, `philips.html`, `calypso.html`, `rapbook.html`
- `projects.js` — données des projets (titre, disciplines, visuel, lien)
- `main.js` — rendu des cartes, filtres, interactions
- `components.js` — en-tête / pied de page partagés
- `style.css` — styles
- `assets/` — images, vidéos, polices, CV

## Lancer en local

Ouvrir `index.html` dans un navigateur, ou servir le dossier :

```
python3 -m http.server 8000
```

puis ouvrir http://localhost:8000
