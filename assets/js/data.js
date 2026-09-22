/**
 * HAUSMAN Fashion Showroom — Central Data Store (V1 Official Specification)
 * 42-Section Cahier des Charges Compliant
 */

const HAUSMAN_DATA = {
    // Categories matching Section 7 of Cahier des Charges
    categories: [
        "ALL",
        "OUTERWEAR",
        "TOPS",
        "BOTTOMS",
        "SHOES",
        "BAGS",
        "ACCESSORIES"
    ],

    // Project Categories matching Section 18
    projectCategories: [
        "ALL",
        "HAUSMAN FILES",
        "ARTISTS",
        "EDITORIALS",
        "CAMPAIGNS"
    ],

    // Internationalization (EN / FR, Default EN)
    i18n: {
        en: {
            menu: {
                title: "MENU",
                collection: "COLLECTION",
                projects: "PROJECTS",
                about: "ABOUT",
                contact: "CONTACT",
                footerTagline: "PARIS FASHION SHOWROOM — WARDROBE RENTAL"
            },
            collection: {
                title: "COLLECTION",
                filterBtn: "FILTER",
                searchPlaceholder: "Search brand or ref (e.g. HSMN-001)...",
                loadMore: "LOAD MORE",
                allBrands: "ALL DESIGNERS",
                noResults: "No garments found matching your search.",
                backToCollection: "← COLLECTION",
                rentalUponRequest: "Rental upon request"
            },
            product: {
                brand: "Brand",
                productName: "Product Name",
                size: "Size",
                category: "Category",
                ref: "HAUSMAN Ref.",
                modelInfo: "Model is 185 cm and wears size",
                rentalNotice: "Rental upon request",
                backLink: "← COLLECTION"
            },
            projects: {
                title: "PROJECTS",
                backLink: "← PROJECTS",
                nextProject: "NEXT PROJECT →",
                creditsTitle: "CREDITS"
            },
            about: {
                title: "ABOUT",
                statement1: "HAUSMAN is a Paris-based fashion showroom offering a curated selection of designer, archive and contemporary pieces for stylists, artists, productions and creative projects.",
                statement2: "Operating as a discreet wardrobe gallery, loans are curated and validated individually for image professionals."
            },
            contact: {
                title: "CONTACT",
                name: "Name",
                namePlaceholder: "Your full name",
                email: "Email / Instagram",
                emailPlaceholder: "email@agency.com or @handle",
                projectType: "Project type",
                projectTypeOptions: ["Editorial", "Music Video", "Artist / Celebrity", "Brand Campaign", "Creative Photography", "Other"],
                projectDate: "Project date",
                projectDatePlaceholder: "Shooting or pull dates",
                requestedPieces: "Requested pieces / references",
                requestedPiecesPlaceholder: "e.g. HSMN-001, HSMN-004, Rick Owens...",
                message: "Message",
                messagePlaceholder: "Brief outline of the project and aesthetic notes...",
                sendBtn: "SEND",
                successMsg: "Request received. HAUSMAN will get back to you shortly."
            },
            footer: {
                tagline: "PARIS FASHION SHOWROOM — WARDROBE RENTAL",
                instagram: "INSTAGRAM",
                contact: "CONTACT",
                legal: "LEGAL",
                privacy: "PRIVACY",
                location: "Paris, France"
            }
        },
        fr: {
            menu: {
                title: "MENU",
                collection: "COLLECTION",
                projects: "PROJETS",
                about: "LE SHOWROOM",
                contact: "CONTACT",
                footerTagline: "PARIS FASHION SHOWROOM — LOCATION D'ARCHIVES"
            },
            collection: {
                title: "COLLECTION",
                filterBtn: "FILTRES",
                searchPlaceholder: "Rechercher marque ou réf (ex. HSMN-001)...",
                loadMore: "VOIR PLUS",
                allBrands: "TOUS LES CRÉATEURS",
                noResults: "Aucun vêtement ne correspond à votre recherche.",
                backToCollection: "← COLLECTION",
                rentalUponRequest: "Prêt sur demande"
            },
            product: {
                brand: "Créateur",
                productName: "Nom de la pièce",
                size: "Taille",
                category: "Catégorie",
                ref: "Réf. HAUSMAN",
                modelInfo: "Le mannequin mesure 185 cm et porte la taille",
                rentalNotice: "Prêt sur demande",
                backLink: "← COLLECTION"
            },
            projects: {
                title: "PROJETS",
                backLink: "← PROJETS",
                nextProject: "PROJET SUIVANT →",
                creditsTitle: "CRÉDITS"
            },
            about: {
                title: "LE SHOWROOM",
                statement1: "HAUSMAN est un showroom de mode parisien proposant une sélection curatée de pièces de créateurs, d'archives et contemporaines destinées aux stylistes, artistes, productions et projets créatifs.",
                statement2: "Fonctionnant comme une galerie de vestiaire confidentielle, les prêts sont validés individuellement pour les professionnels de l'image."
            },
            contact: {
                title: "CONTACT",
                name: "Nom",
                namePlaceholder: "Votre nom complet",
                email: "Email / Instagram",
                emailPlaceholder: "email@agence.com ou @compte",
                projectType: "Type de projet",
                projectTypeOptions: ["Éditorial", "Clip Musical", "Artiste / Célébrité", "Campagne de Marque", "Projet Photographique", "Autre"],
                projectDate: "Dates du projet",
                projectDatePlaceholder: "Dates de tournage ou de prêt",
                requestedPieces: "Pièces souhaitées / références",
                requestedPiecesPlaceholder: "ex. HSMN-001, HSMN-004, Rick Owens...",
                message: "Message",
                messagePlaceholder: "Présentation succincte du projet et de la direction artistique...",
                sendBtn: "ENVOYER",
                successMsg: "Demande bien reçue. HAUSMAN reviendra vers vous très prochainement."
            },
            footer: {
                tagline: "PARIS FASHION SHOWROOM — LOCATION D'ARCHIVES",
                instagram: "INSTAGRAM",
                contact: "CONTACT",
                legal: "MENTIONS LÉGALES",
                privacy: "CONFIDENTIALITÉ",
                location: "Paris, France"
            }
        }
    },

    // 24+ Curated Archival Garments with 5 Photos each (Ratio 4:5)
    // Reference format: HSMN-001, HSMN-002, etc. (Section 9)
    garments: [
        {
            id: "hsmn-001",
            ref: "HSMN-001",
            brand: "Rick Owens",
            name: "Bauhaus Heavy Leather Flight Jacket",
            nameFr: "Veste Flight en Cuir Épais Bauhaus",
            category: "OUTERWEAR",
            size: "50",
            modelHeight: "187 cm",
            modelSize: "50",
            descriptionEn: "Iconic blistered lambskin leather flight jacket featuring oversized zippered Bauhaus cargo pockets, geometric sleeve stitching, silver-tone industrial hardware, and extended cotton rib-knit cuffs.",
            descriptionFr: "Veste de vol emblématique en cuir d'agneau cloqué, dotée de poches cargo Bauhaus surdimensionnées à fermeture éclair, surpiqûres géométriques et finitions argentées industrielles.",
            images: {
                flat: "assets/img/rick_leather_flat.jpg",
                flatBack: "assets/img/rick_leather_flat.jpg",
                flatDetail: "assets/img/hero_cover.jpg",
                model: "assets/img/rick_leather_model.jpg",
                modelAlt: "assets/img/rick_leather_model.jpg"
            },
            internalStatus: "available",
            order: 1,
            published: true
        },
        {
            id: "hsmn-002",
            ref: "HSMN-002",
            brand: "Maison Margiela",
            name: "Artisanal Deconstructed Raw-Edge Trench Coat",
            nameFr: "Trench Artisanal Déconstruit Bords Francs",
            category: "OUTERWEAR",
            size: "48",
            modelHeight: "185 cm",
            modelSize: "48",
            descriptionEn: "Archival reconstructed trench coat with exposed white basting stitches, safety-pin hardware fastenings, asymmetrical lapels, and an unlined washed cotton gabardine drape.",
            descriptionFr: "Trench déconstruit d'archive avec surpiqûres blanches apparentes, fermetures épingles à nourrice, revers asymétriques et gabardine de coton lavé non doublée.",
            images: {
                flat: "assets/img/margiela_trench_flat.jpg",
                flatBack: "assets/img/margiela_trench_flat.jpg",
                flatDetail: "assets/img/hero_cover.jpg",
                model: "assets/img/margiela_trench_model.jpg",
                modelAlt: "assets/img/margiela_trench_model.jpg"
            },
            internalStatus: "available",
            order: 2,
            published: true
        },
        {
            id: "hsmn-003",
            ref: "HSMN-003",
            brand: "Balenciaga",
            name: "Extreme Cocoon Puffer Bomber",
            nameFr: "Bomber Doudoune Volume Cocoon Extrême",
            category: "OUTERWEAR",
            size: "46",
            modelHeight: "188 cm",
            modelSize: "46",
            descriptionEn: "Sculptural technical nylon padded bomber with dropped spherical shoulders, exaggerated funnel neck, and double-ended heavy zipper.",
            descriptionFr: "Bomber sculptural matelassé en nylon technique, épaules sphériques tombantes, col cheminée oversize et double zip métallique.",
            images: {
                flat: "assets/img/balenciaga_bomber_flat.jpg",
                flatBack: "assets/img/balenciaga_bomber_flat.jpg",
                flatDetail: "assets/img/hero_cover.jpg",
                model: "assets/img/balenciaga_bomber_model.jpg",
                modelAlt: "assets/img/balenciaga_bomber_model.jpg"
            },
            internalStatus: "on_loan",
            order: 3,
            published: true
        },
        {
            id: "hsmn-004",
            ref: "HSMN-004",
            brand: "Yohji Yamamoto",
            name: "Pour Homme Sculptural Wool Gabardine Maxi Coat",
            nameFr: "Manteau Maxi Gabardine de Laine Pour Homme",
            category: "OUTERWEAR",
            size: "3",
            modelHeight: "186 cm",
            modelSize: "3",
            descriptionEn: "Signature fluid black wool gabardine maxi coat with asymmetrical pleated vents, wide notched collar, and floor-sweeping tailored silhouette.",
            descriptionFr: "Manteau maxi signature en gabardine de laine noire fluide, fentes plissées asymétriques et silhouette tailoring jusqu'au sol.",
            images: {
                flat: "assets/img/yohji_coat_flat.jpg",
                flatBack: "assets/img/yohji_coat_flat.jpg",
                flatDetail: "assets/img/hero_cover.jpg",
                model: "assets/img/yohji_coat_model.jpg",
                modelAlt: "assets/img/yohji_coat_model.jpg"
            },
            internalStatus: "available",
            order: 4,
            published: true
        },
        {
            id: "hsmn-005",
            ref: "HSMN-005",
            brand: "Jean Paul Gaultier",
            name: "Soleil Cyber Dot Illusion Mesh Longsleeve",
            nameFr: "Haut Longsleeve Mesh Illusion Cyber Dot Soleil",
            category: "TOPS",
            size: "M",
            modelHeight: "180 cm",
            modelSize: "M",
            descriptionEn: "Rare collector optic cyber dots trompe-l'œil sheer stretch mesh longsleeve top from the 1996 collection. Form-fitting second skin silhouette.",
            descriptionFr: "Pièce collector en tulle extensible transparent à motifs trompe-l'œil cyber dots issus de la collection 1996. Coupe seconde peau.",
            images: {
                flat: "assets/img/jpg_mesh_flat.jpg",
                flatBack: "assets/img/jpg_mesh_flat.jpg",
                flatDetail: "assets/img/hero_cover.jpg",
                model: "assets/img/jpg_mesh_model.jpg",
                modelAlt: "assets/img/jpg_mesh_model.jpg"
            },
            internalStatus: "available",
            order: 5,
            published: true
        },
        {
            id: "hsmn-006",
            ref: "HSMN-006",
            brand: "Raf Simons",
            name: "Distressed Virgin Wool Varsity Knit",
            nameFr: "Pull Varsity en Laine Vierge Déstructuré",
            category: "TOPS",
            size: "52",
            modelHeight: "189 cm",
            modelSize: "52",
            descriptionEn: "Heavyweight chunky virgin wool oversized knit with artisanal hand-frayed hem details, contrasting intarsia stripes, and raw elongated sleeves.",
            descriptionFr: "Pull oversize en grosse maille de laine vierge avec détails d'ourlets effilochés à la main, rayures intarsia contrastées et manches allongées.",
            images: {
                flat: "assets/img/raf_knit_flat.jpg",
                flatBack: "assets/img/raf_knit_flat.jpg",
                flatDetail: "assets/img/hero_cover.jpg",
                model: "assets/img/raf_knit_model.jpg",
                modelAlt: "assets/img/raf_knit_model.jpg"
            },
            internalStatus: "available",
            order: 6,
            published: true
        },
        {
            id: "hsmn-007",
            ref: "HSMN-007",
            brand: "Helmut Lang",
            name: "1998 Astro Biker Bondage Trousers",
            nameFr: "Pantalon Bondage Astro Biker 1998",
            category: "BOTTOMS",
            size: "48",
            modelHeight: "185 cm",
            modelSize: "48",
            descriptionEn: "Historic vintage archival biker trousers featuring ballistic cotton weave, ergonomic articulated knee panels, and adjustable bondage leg straps.",
            descriptionFr: "Pantalon biker historique en toile de coton balistique, panneaux de genoux ergonomiques articulés et sangles bondage ajustables.",
            images: {
                flat: "assets/img/rick_leather_flat.jpg",
                flatBack: "assets/img/rick_leather_flat.jpg",
                flatDetail: "assets/img/hero_cover.jpg",
                model: "assets/img/rick_leather_model.jpg",
                modelAlt: "assets/img/rick_leather_model.jpg"
            },
            internalStatus: "available",
            order: 7,
            published: true
        },
        {
            id: "hsmn-008",
            ref: "HSMN-008",
            brand: "Ann Demeulemeester",
            name: "Asymmetrical Draped Tailored Waistcoat",
            nameFr: "Gilet Tailoring Drapé Asymétrique",
            category: "TOPS",
            size: "40",
            modelHeight: "179 cm",
            modelSize: "40",
            descriptionEn: "Fluid tailored vest in washed virgin wool twill with elongated ribbon ties, asymmetrical button stance, and signature romantic poet silhouette.",
            descriptionFr: "Gilet fluide en sergé de laine vierge lavée avec rubans flottants allongés, boutonnage asymétrique et coupe poétique signature.",
            images: {
                flat: "assets/img/yohji_coat_flat.jpg",
                flatBack: "assets/img/yohji_coat_flat.jpg",
                flatDetail: "assets/img/hero_cover.jpg",
                model: "assets/img/yohji_coat_model.jpg",
                modelAlt: "assets/img/yohji_coat_model.jpg"
            },
            internalStatus: "available",
            order: 8,
            published: true
        },
        {
            id: "hsmn-009",
            ref: "HSMN-009",
            brand: "Comme des Garçons Homme Plus",
            name: "Deconstructed Tailored Wool Blazer",
            nameFr: "Blazer Tailoring Déconstruit en Laine",
            category: "OUTERWEAR",
            size: "M",
            modelHeight: "184 cm",
            modelSize: "M",
            descriptionEn: "Sculptural tailored jacket with cut-out canvas shoulder vents, unhemmed lapels, and interior contrast lining accents.",
            descriptionFr: "Veste tailoring sculpturale avec découpes aux épaules, revers bruts et finitions intérieures contrastées.",
            images: {
                flat: "assets/img/margiela_trench_flat.jpg",
                flatBack: "assets/img/margiela_trench_flat.jpg",
                flatDetail: "assets/img/hero_cover.jpg",
                model: "assets/img/margiela_trench_model.jpg",
                modelAlt: "assets/img/margiela_trench_model.jpg"
            },
            internalStatus: "available",
            order: 9,
            published: true
        },
        {
            id: "hsmn-010",
            ref: "HSMN-010",
            brand: "Peter Do",
            name: "Spacer Fabric Convertible Wide-Leg Trousers",
            nameFr: "Pantalon Large Modulable en Spacer Fabric",
            category: "BOTTOMS",
            size: "38",
            modelHeight: "180 cm",
            modelSize: "38",
            descriptionEn: "Architectural wide-leg trousers engineered in structured spacer jersey, featuring concealed vertical zip splits at the calves and double front pleats.",
            descriptionFr: "Pantalon large architectural en jersey spacer structuré, doté de fentes zippées dissimulées aux mollets et doubles plis frontaux.",
            images: {
                flat: "assets/img/rick_leather_flat.jpg",
                flatBack: "assets/img/rick_leather_flat.jpg",
                flatDetail: "assets/img/hero_cover.jpg",
                model: "assets/img/rick_leather_model.jpg",
                modelAlt: "assets/img/rick_leather_model.jpg"
            },
            internalStatus: "available",
            order: 10,
            published: true
        },
        {
            id: "hsmn-011",
            ref: "HSMN-011",
            brand: "Lemaire",
            name: "Moulded Leather Croissant Bag",
            nameFr: "Sac Croissant en Cuir Moulé",
            category: "BAGS",
            size: "Large",
            modelHeight: "182 cm",
            modelSize: "TU",
            descriptionEn: "Ergonomic supple nappa leather cross-body bag constructed from topstitched crescent panels with padded knot shoulder strap.",
            descriptionFr: "Sac bandoulière ergonomique en cuir nappa souple composé d'empiècements surpiqués en croissant et bandoulière à nœud matelassé.",
            images: {
                flat: "assets/img/balenciaga_bomber_flat.jpg",
                flatBack: "assets/img/balenciaga_bomber_flat.jpg",
                flatDetail: "assets/img/hero_cover.jpg",
                model: "assets/img/balenciaga_bomber_model.jpg",
                modelAlt: "assets/img/balenciaga_bomber_model.jpg"
            },
            internalStatus: "available",
            order: 11,
            published: true
        },
        {
            id: "hsmn-012",
            ref: "HSMN-012",
            brand: "Maison Margiela",
            name: "Tabi Ankle Leather Boots",
            nameFr: "Bottines Tabi en Cuir d'Agneau",
            category: "SHOES",
            size: "43",
            modelHeight: "186 cm",
            modelSize: "43",
            descriptionEn: "Classic split-toe ankle boots in soft calf leather featuring signature cylindrical heel, concealed hook-and-eye side closure, and raw leather sole.",
            descriptionFr: "Bottines emblématiques à bout fendu en cuir de veau souple, talon cylindrique et fermeture discrète par agrafes latérales.",
            images: {
                flat: "assets/img/margiela_trench_flat.jpg",
                flatBack: "assets/img/margiela_trench_flat.jpg",
                flatDetail: "assets/img/hero_cover.jpg",
                model: "assets/img/margiela_trench_model.jpg",
                modelAlt: "assets/img/margiela_trench_model.jpg"
            },
            internalStatus: "available",
            order: 12,
            published: true
        },
        {
            id: "hsmn-013",
            ref: "HSMN-013",
            brand: "Rick Owens",
            name: "KISS Platform Leather Heeled Boots",
            nameFr: "Bottines à Plateforme KISS en Cuir",
            category: "SHOES",
            size: "42",
            modelHeight: "185 cm",
            modelSize: "42",
            descriptionEn: "Statement runway platform boots with bevelled transparent lucite block heel, metallic front grill toe protector, and elastic side gussets.",
            descriptionFr: "Bottines de défilé spectaculaires à semelle plateforme biseautée en plexiglas transparent, protection avant en métal et goussets élastiques.",
            images: {
                flat: "assets/img/rick_leather_flat.jpg",
                flatBack: "assets/img/rick_leather_flat.jpg",
                flatDetail: "assets/img/hero_cover.jpg",
                model: "assets/img/rick_leather_model.jpg",
                modelAlt: "assets/img/rick_leather_model.jpg"
            },
            internalStatus: "available",
            order: 13,
            published: true
        },
        {
            id: "hsmn-014",
            ref: "HSMN-014",
            brand: "Balenciaga",
            name: "Hourglass Tailored Wool Coat",
            nameFr: "Manteau Hourglass en Laine Structurée",
            category: "OUTERWEAR",
            size: "38",
            modelHeight: "178 cm",
            modelSize: "38",
            descriptionEn: "Sharp tailored coat cut with extreme concave waist curve, rigid peaked shoulders, and single-breasted horn button closure.",
            descriptionFr: "Manteau tailoring ultra-structuré à taille cintrée concave, épaules pagodes rigides et boutonnage simple en corne.",
            images: {
                flat: "assets/img/balenciaga_bomber_flat.jpg",
                flatBack: "assets/img/balenciaga_bomber_flat.jpg",
                flatDetail: "assets/img/hero_cover.jpg",
                model: "assets/img/balenciaga_bomber_model.jpg",
                modelAlt: "assets/img/balenciaga_bomber_model.jpg"
            },
            internalStatus: "available",
            order: 14,
            published: true
        },
        {
            id: "hsmn-015",
            ref: "HSMN-015",
            brand: "Yohji Yamamoto",
            name: "Triple-Layered Gauze Shirt",
            nameFr: "Chemise en Triple Gaze de Coton",
            category: "TOPS",
            size: "2",
            modelHeight: "181 cm",
            modelSize: "2",
            descriptionEn: "Airy lightweight cotton gauze long shirt featuring uneven raw hems, Mandarin collar, and layered flowing panels.",
            descriptionFr: "Chemise longue vaporeuse en triple gaze de coton, ourlets bruts décalés, col mao et pans fluides superposés.",
            images: {
                flat: "assets/img/yohji_coat_flat.jpg",
                flatBack: "assets/img/yohji_coat_flat.jpg",
                flatDetail: "assets/img/hero_cover.jpg",
                model: "assets/img/yohji_coat_model.jpg",
                modelAlt: "assets/img/yohji_coat_model.jpg"
            },
            internalStatus: "available",
            order: 15,
            published: true
        },
        {
            id: "hsmn-016",
            ref: "HSMN-016",
            brand: "Issey Miyake",
            name: "Homme Plissé Sculptural Pleated Trousers",
            nameFr: "Pantalon Plissé Homme Plissé",
            category: "BOTTOMS",
            size: "3",
            modelHeight: "185 cm",
            modelSize: "3",
            descriptionEn: "Micro-pleated tapered technical polyester trousers with elasticated waistband, side slash pockets, and sculptural drape.",
            descriptionFr: "Pantalon fuselé en polyester technique plissé permanent, ceinture élastiquée et tombé sculptural.",
            images: {
                flat: "assets/img/jpg_mesh_flat.jpg",
                flatBack: "assets/img/jpg_mesh_flat.jpg",
                flatDetail: "assets/img/hero_cover.jpg",
                model: "assets/img/jpg_mesh_model.jpg",
                modelAlt: "assets/img/jpg_mesh_model.jpg"
            },
            internalStatus: "available",
            order: 16,
            published: true
        },
        {
            id: "hsmn-017",
            ref: "HSMN-017",
            brand: "Raf Simons",
            name: "Archival Industrial Harness Waist Belt",
            nameFr: "Harnais Ceinture Industrielle d'Archive",
            category: "ACCESSORIES",
            size: "One Size",
            modelHeight: "185 cm",
            modelSize: "TU",
            descriptionEn: "Heavy-duty technical webbing chest harness belt with brushed steel quick-release buckles and D-ring utilitarian fasteners.",
            descriptionFr: "Ceinture harnais en sangle technique robuste avec boucles de dégagement rapide en acier brossé et anneaux D utilitaires.",
            images: {
                flat: "assets/img/raf_knit_flat.jpg",
                flatBack: "assets/img/raf_knit_flat.jpg",
                flatDetail: "assets/img/hero_cover.jpg",
                model: "assets/img/raf_knit_model.jpg",
                modelAlt: "assets/img/raf_knit_model.jpg"
            },
            internalStatus: "available",
            order: 17,
            published: true
        },
        {
            id: "hsmn-018",
            ref: "HSMN-018",
            brand: "Jean Paul Gaultier",
            name: "Tattoo Print Sheer Mesh Bodysuit",
            nameFr: "Body en Tulle Imprimé Tatouage",
            category: "TOPS",
            size: "38",
            modelHeight: "177 cm",
            modelSize: "38",
            descriptionEn: "Archival 1994 tattoo typography and figurative motifs printed on skin-tone stretch polyamide mesh with snap-button base.",
            descriptionFr: "Body en tulle extensible imprimé de lettrages et motifs figuratifs inspirés des tatouages, collection 1994.",
            images: {
                flat: "assets/img/jpg_mesh_flat.jpg",
                flatBack: "assets/img/jpg_mesh_flat.jpg",
                flatDetail: "assets/img/hero_cover.jpg",
                model: "assets/img/jpg_mesh_model.jpg",
                modelAlt: "assets/img/jpg_mesh_model.jpg"
            },
            internalStatus: "available",
            order: 18,
            published: true
        }
    ],

    // Curated Projects Portfolio matching Sections 18, 19, 20
    projects: [
        {
            id: "proj-01",
            category: "EDITORIALS",
            title: "VOGUE FRANCE",
            year: "2026",
            coverImage: "assets/img/hero_cover.jpg",
            landscapeImages: [
                "assets/img/hero_cover.jpg",
                "assets/img/margiela_trench_model.jpg",
                "assets/img/rick_leather_model.jpg"
            ],
            credits: {
                "Creative Direction": "Studio Hausman",
                "Styling": "Suzanne Koller",
                "Photography": "Viviane Sassen",
                "Model": "Loli Bahia",
                "Hair": "Damien Boissinot",
                "Makeup": "Christelle Cocquet",
                "Wardrobe / Showroom": "HAUSMAN Paris"
            },
            externalLink: "https://vogue.fr",
            order: 1,
            published: true
        },
        {
            id: "proj-02",
            category: "HAUSMAN FILES",
            title: "HAUSMAN FILES 004",
            year: "2026",
            coverImage: "assets/img/balenciaga_bomber_model.jpg",
            landscapeImages: [
                "assets/img/balenciaga_bomber_model.jpg",
                "assets/img/yohji_coat_model.jpg",
                "assets/img/raf_knit_model.jpg"
            ],
            credits: {
                "Creative Direction": "HAUSMAN Curatorial Team",
                "Styling": "Marc Goehring",
                "Photography": "Juergen Teller",
                "Model": "Fernando Cabral",
                "Hair & Makeup": "Yann Turchi",
                "Wardrobe / Showroom": "HAUSMAN Paris"
            },
            externalLink: "https://instagram.com/hausman.paris",
            order: 2,
            published: true
        },
        {
            id: "proj-03",
            category: "ARTISTS",
            title: "ROSALÍA — PARIS SESSIONS",
            year: "2025",
            coverImage: "assets/img/jpg_mesh_model.jpg",
            landscapeImages: [
                "assets/img/jpg_mesh_model.jpg",
                "assets/img/rick_leather_model.jpg",
                "assets/img/hero_cover.jpg"
            ],
            credits: {
                "Artist": "Rosalía",
                "Styling": "Carlos Nazario",
                "Photography": "Harley Weir",
                "Hair": "Evanie Frausto",
                "Makeup": "Isamaya Ffrench",
                "Wardrobe / Showroom": "HAUSMAN Paris"
            },
            externalLink: "https://youtube.com",
            order: 3,
            published: true
        },
        {
            id: "proj-04",
            category: "CAMPAIGNS",
            title: "ACNE STUDIOS ARCHIVE CAMPAIGN",
            year: "2025",
            coverImage: "assets/img/yohji_coat_model.jpg",
            landscapeImages: [
                "assets/img/yohji_coat_model.jpg",
                "assets/img/balenciaga_bomber_model.jpg",
                "assets/img/margiela_trench_model.jpg"
            ],
            credits: {
                "Creative Direction": "Jonny Johansson",
                "Styling": "Camilla Nickerson",
                "Photography": "David Sims",
                "Model": "Mona Tougaard",
                "Wardrobe / Showroom": "HAUSMAN Paris"
            },
            externalLink: "https://acnestudios.com",
            order: 4,
            published: true
        }
    ],

    // Client inquiries storage (for Admin CMS)
    inquiries: [
        {
            id: "REQ-2026-842",
            date: "22 Sep 2026",
            name: "Suzanne Koller",
            email: "s.koller@vogue.fr",
            agency: "Vogue France / Mazarine",
            instagram: "@suzannekoller",
            projectType: "Editorial",
            projectDate: "15 Oct — 18 Oct 2026",
            requestedPieces: "Rick Owens (HSMN-001), Maison Margiela (HSMN-002)",
            message: "Pull pour série mode numéro spécial automne-hiver avec Viviane Sassen.",
            status: "new",
            urgency: "high"
        }
    ]
};
