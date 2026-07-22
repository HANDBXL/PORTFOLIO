/* ============================================================
   TRAVAUX — données unifiées
   disciplines : sous-ensemble de
   "UX" | "Design graphique" | "Illustration"
   (un projet peut en cocher plusieurs ; la 1re sert de badge)
   ============================================================ */
const projects = [
    {
        id: "01",
        title: "ASSET",
        disciplines: ["UX"],
        domain: "UX/UI · Mobile",
        tags: ["UX/UI", "Mobile", "Design System", "Sneakers"],
        visual: "assets/images/asset/asset-thumb.webp",
        excerpt: "L'app que les sneakerheads attendaient sans le savoir — recommandation quotidienne, design system from scratch, 92+ écrans.",
        link: "asset.html",
        external: false
    },
    {
        id: "02",
        title: "Timeline",
        disciplines: ["UX", "Illustration"],
        domain: "Archive · UI · Code",
        tags: ["Code", "Illustration", "UX/UI"],
        visual: "assets/lab-timeline.webp",
        motion: "assets/lab-timeline.mp4",
        excerpt: "Une archive visuelle chronologique de mes dessins, sur une seule page. Conçue et codée de A à Z.",
        link: "https://timeline-one-flax.vercel.app",
        external: true
    },
    {
        id: "03",
        title: "Rap Book",
        disciplines: ["Illustration", "Design graphique"],
        domain: "Illustration · Édition",
        tags: ["Illustration", "Édition"],
        visual: "assets/rapbook-thumb.webp",
        motion: "assets/rapbook-thumb.mp4",
        excerpt: "Trois éditions papier — livre accordéon, fanzine, affiche — qui explorent le rap par le dessin, de l'encre au produit fini.",
        link: "rapbook.html",
        external: false
    },
    {
        id: "04",
        title: "Connexia",
        disciplines: ["UX"],
        domain: "UX/UI · SaaS",
        tags: ["UX/UI", "SaaS", "Design System"],
        visual: "assets/images/Connexia_hero.webp",
        excerpt: "Intégrer et faire évoluer des fonctionnalités créatives dans un design system existant, sans rompre l'existant.",
        link: "connexia.html",
        external: false
    },
    {
        id: "05",
        title: "Philips Lighting",
        disciplines: ["Illustration"],
        domain: "Synthèse visuelle · Événementiel",
        tags: ["Illustration", "Idéation rapide"],
        visual: "assets/images/Philips_Lighting_01.webp",
        excerpt: "Traduire des concepts architecturaux complexes en illustrations claires, en moins de 24 heures.",
        link: "philips.html",
        external: false
    },
    {
        id: "06",
        title: "Calypso Rose",
        disciplines: ["Design graphique"],
        domain: "Direction artistique · Motion",
        tags: ["Motion", "Direction artistique"],
        visual: "assets/images/Calypso_01.webp",
        motion: "assets/images/Calypso_01.mp4",
        excerpt: "Construire une narration rythmée à partir d'une banque d'images limitée — la contrainte devenue identité.",
        link: "calypso.html",
        external: false
    },
    {
        id: "07",
        title: "Kinepolis",
        disciplines: ["UX"],
        domain: "UX/UI · Mobile",
        tags: ["UX/UI", "Mobile", "Prototypage"],
        visual: "assets/KINEPOLIS-logo.webp",
        excerpt: "Repenser le tunnel d'achat d'une billetterie mobile — de la sélection du film au billet en poche, sans friction.",
        link: "kinepolis.html",
        external: false
    },
    {
        id: "08",
        title: "Coloriage",
        disciplines: ["UX", "Illustration"],
        domain: "Web interactif · Code",
        tags: ["Code", "Illustration", "UX/UI"],
        visual: "assets/lab-coloriage.webp",
        motion: "assets/lab-coloriage.mp4",
        excerpt: "Adaptation web d'un livre de coloriage : préserver le tracé papier dans une expérience interactive et fluide.",
        link: "https://coloriage-nine.vercel.app",
        external: true
    },
    /* Masqué — retirer ce commentaire pour réafficher le projet
    {
        id: "09",
        title: "Révisions",
        disciplines: ["UX", "Illustration"],
        domain: "EdTech · Code",
        tags: ["Code", "EdTech", "UX/UI"],
        visual: "assets/lab-revisions.webp",
        motion: "assets/lab-revisions.mp4",
        excerpt: "Outil de révision conçu pour ma fille (examen CEB) : transformer un contenu pédagogique en système motivant.",
        link: "https://baze-delta.vercel.app",
        external: true
    } */
];
