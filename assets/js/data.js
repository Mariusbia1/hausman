/**
 * HAUSMAN Fashion Showroom & Archive Rental
 * Central Data Store (Bilingual content, Garments Catalogue, Projects Portfolio, Admin State)
 */

const HAUSMAN_DATA = {
    // Internationalization dictionary
    i18n: {
        en: {
            nav: {
                home: "HOME",
                wardrobe: "WARDROBE",
                projects: "PROJECTS",
                about: "ABOUT",
                contact: "CONTACT / REQUEST",
                adminSwitch: "ADMIN PANEL CMS"
            },
            hero: {
                tagline: "FASHION SHOWROOM & WARDROBE RENTAL — PARIS",
                subtitle: "Curated designer archives, runway specimens and contemporary silhouettes available for stylists, editorial productions, artists and creative direction.",
                exploreBtn: "EXPLORE WARDROBE",
                requestBtn: "SUBMIT PULL REQUEST"
            },
            wardrobe: {
                title: "WARDROBE ARCHIVE",
                subtitle: "Select pieces available for loan. All rentals handled upon individual request.",
                filterBy: "FILTER BY:",
                categories: "CATEGORIES",
                allCategories: "ALL CATEGORIES",
                designers: "DESIGNERS",
                allDesigners: "ALL DESIGNERS",
                sizes: "SIZES",
                allSizes: "ALL SIZES",
                availability: "AVAILABILITY",
                allPieces: "ALL PIECES",
                availableOnly: "AVAILABLE IN SHOWROOM",
                onLoan: "CURRENTLY ON LOAN",
                rentalUponRequest: "RENTAL UPON REQUEST",
                viewGrid4: "4 COLS",
                viewGrid3: "3 COLS",
                viewGrid2: "2 COLS",
                statusAvailable: "AVAILABLE",
                statusOnLoan: "ON LOAN",
                noResults: "No archive piece found matching your filters."
            },
            modal: {
                ref: "HAUSMAN REF.",
                season: "SEASON / ARCHIVE",
                size: "SIZE",
                category: "CATEGORY",
                status: "STATUS",
                description: "CURATION NOTES",
                requestThisPiece: "REQUEST THIS PIECE FOR PULL",
                close: "CLOSE [ESC]"
            },
            projects: {
                tag: "HAUSMAN FILES",
                title: "EDITORIALS & PRODUCTIONS",
                subtitle: "Styling, collaborations, music videos, and creative campaigns featuring the HAUSMAN archive.",
                viewGallery: "VIEW PROJECT FILES",
                credits: "CREDITS",
                featuredPieces: "PIECES UTILIZED"
            },
            about: {
                tag: "THE SHOWROOM",
                title: "PARISIAN WARDROBE ARCHIVE FOR IMAGE PROFESSIONALS",
                p1: "HAUSMAN is an exclusive fashion showroom based in Paris, housing an evolving archive of rare designer garments, runway pieces, and contemporary sculptural menswear and womenswear.",
                p2: "Dedicated exclusively to stylists, creative directors, photographers, artists, and film productions, HAUSMAN operates as a discreet physical and digital wardrobe gallery. We provide bespoke rental curation for fashion editorials, music videos, album campaigns, red carpet appearances, and independent artistic endeavours.",
                p3: "Rentals are strictly curated and validated individually. No direct consumer sales, no mass rental."
            },
            contact: {
                tag: "RESERVATION & INQUIRIES",
                title: "RENTAL REQUEST FORM",
                subtitle: "Please specify your production details, dates, and selected references. We reply within 24 hours.",
                name: "Full Name / Stylist Name",
                email: "Professional Email",
                company: "Production Company / Agency / Magazine",
                instagram: "Instagram / Portfolio Website",
                projectType: "Project Type",
                projectDate: "Pull / Shooting Dates",
                requestedPieces: "Requested Pieces (Refs or Names)",
                message: "Project Description & Styling Mood",
                submit: "SEND PULL REQUEST",
                successTitle: "REQUEST SENT",
                successMsg: "Your rental pull request has been recorded. Our Paris team will review and confirm piece availability shortly.",
                directContact: "DIRECT SHOWROOM CONTACT"
            }
        },
        fr: {
            nav: {
                home: "ACCUEIL",
                wardrobe: "WARDROBE",
                projects: "PROJETS",
                about: "À PROPOS",
                contact: "CONTACT / DEMANDE",
                adminSwitch: "PANEL ADMIN CMS"
            },
            hero: {
                tagline: "SHOWROOM DE MODE & LOCATION DE PIÈCES — PARIS",
                subtitle: "Archives designer sélectionnées, pièces de défilé et silhouettes contemporaines pour stylistes, productions éditoriales, artistes et directions artistiques.",
                exploreBtn: "EXPLORER LA WARDROBE",
                requestBtn: "FAIRE UNE DEMANDE DE PULL"
            },
            wardrobe: {
                title: "CATALOGUE WARDROBE",
                subtitle: "Sélection de pièces disponibles à la location. Toutes les demandes sont traitées individuellement.",
                filterBy: "FILTRER PAR :",
                categories: "CATÉGORIES",
                allCategories: "TOUTES LES CATÉGORIES",
                designers: "CRÉATEURS",
                allDesigners: "TOUS LES CRÉATEURS",
                sizes: "TAILLES",
                allSizes: "TOUTES LES TAILLES",
                availability: "DISPONIBILITÉ",
                allPieces: "TOUTES LES PIÈCES",
                availableOnly: "DISPONIBLE AU SHOWROOM",
                onLoan: "ACTUELLEMENT EN LOCATION",
                rentalUponRequest: "RENTAL UPON REQUEST",
                viewGrid4: "4 COLS",
                viewGrid3: "3 COLS",
                viewGrid2: "2 COLS",
                statusAvailable: "DISPONIBLE",
                statusOnLoan: "EN LOCATION",
                noResults: "Aucune pièce d'archive ne correspond à vos filtres."
            },
            modal: {
                ref: "RÉF. HAUSMAN",
                season: "SAISON / ARCHIVE",
                size: "TAILLE",
                category: "CATÉGORIE",
                status: "STATUT",
                description: "NOTES DE CURATION",
                requestThisPiece: "RÉSERVER CETTE PIÈCE POUR UN PULL",
                close: "FERMER [ESC]"
            },
            projects: {
                tag: "HAUSMAN FILES",
                title: "ÉDITORIAUX & PRODUCTIONS",
                subtitle: "Styling, collaborations, clips musicaux et campagnes créatives utilisant les archives HAUSMAN.",
                viewGallery: "VOIR LE PROJET",
                credits: "CRÉDITS",
                featuredPieces: "PIÈCES UTILISÉES"
            },
            about: {
                tag: "LE SHOWROOM",
                title: "ARCHIVE DE MODE PARISIENNE POUR PROFESSIONNELS DE L'IMAGE",
                p1: "HAUSMAN est un showroom de mode exclusif basé à Paris, abritant des archives rares de créateurs, des pièces de défilés et des silhouettes contemporaines pour femme et homme.",
                p2: "Dédié exclusivement aux stylistes, directeurs artistiques, photographes, artistes et productions cinématographiques, HAUSMAN fonctionne comme une galerie-vestiaire digitale et physique. Nous accompagnons les projets d'éditoriaux, clips, pochettes d'album, tapis rouges et créations visuelles.",
                p3: "Toutes les locations sont soumises à validation individuelle. Aucune vente directe, aucun e-commerce grand public."
            },
            contact: {
                tag: "RÉSERVATION & DEMANDES",
                title: "FORMULAIRE DE LOCATION",
                subtitle: "Précisez les détails de votre production, les dates prévues et les pièces souhaitées. Réponse sous 24h.",
                name: "Nom complet / Nom du styliste",
                email: "Email professionnel",
                company: "Production / Agence / Média",
                instagram: "Instagram / Portfolio",
                projectType: "Type de projet",
                projectDate: "Dates de pull / tournage",
                requestedPieces: "Pièces souhaitées (Réf. ou noms)",
                message: "Description du projet & note de style",
                submit: "ENVOYER LA DEMANDE",
                successTitle: "DEMANDE ENVOYÉE",
                successMsg: "Votre demande de location a bien été enregistrée. L'équipe HAUSMAN vous confirmera la disponibilité rapidement.",
                directContact: "CONTACT DIRECT SHOWROOM"
            }
        }
    },

    // Garments inventory
    garments: [
        {
            id: "garment-01",
            ref: "HSM-ARC-024",
            brand: "MAISON MARGIELA",
            name: "Deconstructed Raw-Edge Trench Coat",
            nameFr: "Trench Déconstruit Bords Francs",
            category: "Outerwear",
            categoryFr: "Manteaux",
            size: "48 (M/L)",
            season: "Spring / Summer 2004",
            status: "available", // 'available', 'on_loan', 'hidden'
            featured: true,
            images: {
                flat: "assets/img/margiela_trench_flat.jpg",
                model: "assets/img/margiela_trench_model.jpg",
                gallery: [
                    "assets/img/margiela_trench_flat.jpg",
                    "assets/img/margiela_trench_model.jpg"
                ]
            },
            descriptionEn: "Iconic Artisanal concept trench coat featuring asymmetrical patchwork panels, exposed basting stitches, safety pin hardware accents, and unlined raw hem. Heavyweight washed cotton gabardine.",
            descriptionFr: "Trench emblématique inspiré de la ligne Artisanale, composé de panneaux asymétriques, surpiqûres apparentes, détails d'épingles de sûreté et ourlets francs. Gabardine de coton lavé texturée."
        },
        {
            id: "garment-02",
            ref: "HSM-ARC-089",
            brand: "RICK OWENS",
            name: "Architectural Biker Lambskin Jacket",
            nameFr: "Blouson Biker Cuir d'Agneau Architectural",
            category: "Jackets",
            categoryFr: "Vestes & Cuirs",
            size: "46 (S/M)",
            season: "Autumn / Winter 2011 'Limo'",
            status: "available",
            featured: true,
            images: {
                flat: "assets/img/rick_leather_flat.jpg",
                model: "assets/img/rick_leather_model.jpg",
                gallery: [
                    "assets/img/rick_leather_flat.jpg",
                    "assets/img/rick_leather_model.jpg"
                ]
            },
            descriptionEn: "Heavy washed lambskin asymmetrical motorcycle jacket with exaggerated sculptural funnel lapel, tailored gusseted sleeves with ribbed inserts, and oxidised heavy silver hardware.",
            descriptionFr: "Veste asymétrique en cuir d'agneau lavé, col cheminée sculptural signature, manches ajustées avec empiècements côtelés et finitions en métal argenté vieilli."
        },
        {
            id: "garment-03",
            ref: "HSM-ARC-112",
            brand: "BALENCIAGA",
            name: "Oversized Vintage Washed Flight Bomber",
            nameFr: "Bomber d'Aviation Oversize Délavé",
            category: "Jackets",
            categoryFr: "Vestes & Cuirs",
            size: "52 (Oversize L/XL)",
            season: "Fall 2021 Runway",
            status: "on_loan",
            featured: true,
            images: {
                flat: "assets/img/balenciaga_bomber_flat.jpg",
                model: "assets/img/balenciaga_bomber_model.jpg",
                gallery: [
                    "assets/img/balenciaga_bomber_flat.jpg",
                    "assets/img/balenciaga_bomber_model.jpg"
                ]
            },
            descriptionEn: "Substantial garment-dyed heavy nylon flight jacket with extreme dropped shoulder construction, padded orange lining, utility zip arm pocket, and subtle distressed collar patina.",
            descriptionFr: "Bomber en nylon lourd teint en pièce avec construction d'épaules extrêmement tombantes, doublure orange matelassée et patine vintage subtile."
        },
        {
            id: "garment-04",
            ref: "HSM-ARC-047",
            brand: "YOHJI YAMAMOTO",
            name: "Asymmetrical Draped Gabardine Greatcoat",
            nameFr: "Grand Manteau Gabardine Drapé Asymétrique",
            category: "Outerwear",
            categoryFr: "Manteaux",
            size: "3 (Free Size)",
            season: "Autumn / Winter 2008 Pour Homme",
            status: "available",
            featured: true,
            images: {
                flat: "assets/img/yohji_coat_flat.jpg",
                model: "assets/img/yohji_coat_model.jpg",
                gallery: [
                    "assets/img/yohji_coat_flat.jpg",
                    "assets/img/yohji_coat_model.jpg"
                ]
            },
            descriptionEn: "Flowing sculptural wool gabardine coat with cascading multi-layered front panels, raw edge drape extensions, and fluid movement in motion. Pure Parisian avant-garde tailoring.",
            descriptionFr: "Manteau en gabardine de laine fluide avec panneaux avant superposés en cascade, pans drapés asymétriques et tombé majestueux en mouvement."
        },
        {
            id: "garment-05",
            ref: "HSM-ARC-073",
            brand: "JEAN PAUL GAULTIER",
            name: "Archival Cyber Graphic Tattoo Mesh Top",
            nameFr: "Haut en Tulle Imprimé Cyber Tattoo Archive",
            category: "Tops",
            categoryFr: "Tops & Chemises",
            size: "S / M (Stretchy)",
            season: "Spring / Summer 1996 'Cyberbaba'",
            status: "available",
            featured: true,
            images: {
                flat: "assets/img/jpg_mesh_flat.jpg",
                model: "assets/img/jpg_mesh_model.jpg",
                gallery: [
                    "assets/img/jpg_mesh_flat.jpg",
                    "assets/img/jpg_mesh_model.jpg"
                ]
            },
            descriptionEn: "Extremely rare collector second-skin polyamide stretch mesh top with optical illusion techno-tribal graphic typography. Museum-grade condition, perfect for music video & stage performances.",
            descriptionFr: "Pièce de collection rarissime en tulle seconde peau extensible avec graphismes techno-tribaux en trompe-l'œil. Idéale pour clips, shootings et performances scéniques."
        },
        {
            id: "garment-06",
            ref: "HSM-ARC-038",
            brand: "RAF SIMONS",
            name: "Distressed Chunky Cable Knit Virgin Wool Sweater",
            nameFr: "Pull Tricot Laine Vierge Déstructuré",
            category: "Knitwear",
            categoryFr: "Mailles & Tricots",
            size: "M (Relaxed)",
            season: "Autumn / Winter 2017",
            status: "available",
            featured: true,
            images: {
                flat: "assets/img/raf_knit_flat.jpg",
                model: "assets/img/raf_knit_model.jpg",
                gallery: [
                    "assets/img/raf_knit_flat.jpg",
                    "assets/img/raf_knit_model.jpg"
                ]
            },
            descriptionEn: "Chunky unbleached ecru virgin wool oversized knit with intentional distressed laddering, dropped armholes, and raw ribbed hem. Highly photogenic texture under studio lights.",
            descriptionFr: "Pull en laine vierge écru non blanchie à torsades épaisses, détails déchirés intentionnels, emmanchures basses et texture spectaculaire sous les projecteurs."
        }
    ],

    // Editorial and Production Projects
    projects: [
        {
            id: "proj-01",
            title: "NUMÉRO HOMME — 'BRUTALISME PARISIEN'",
            year: "2026",
            category: "Editorial",
            coverImage: "assets/img/hero_cover.jpg",
            gallery: [
                "assets/img/hero_cover.jpg",
                "assets/img/yohji_coat_model.jpg",
                "assets/img/balenciaga_bomber_model.jpg"
            ],
            client: "Numéro Magazine #248",
            photographer: "Antoine Verdier",
            stylist: "Léa Saint-Germain",
            artist: "Modèle : Aminata Diallo",
            garmentsUsed: ["HSM-ARC-047", "HSM-ARC-112"],
            descriptionEn: "Monochrome architectural editorial shot in the brutalist concrete structures of Paris 13th arrondissement, showcasing oversized tailoring and avant-garde drapes.",
            descriptionFr: "Série éditoriale monochrome shootée dans les structures béton brut de Paris 13e, mettant en valeur des volumes oversize et des drapés couture."
        },
        {
            id: "proj-02",
            title: "NIGHT CALL — OFFICIAL MUSIC VIDEO",
            year: "2025",
            category: "Music Video",
            coverImage: "assets/img/jpg_mesh_model.jpg",
            gallery: [
                "assets/img/jpg_mesh_model.jpg",
                "assets/img/rick_leather_model.jpg"
            ],
            client: "Sony Music France",
            photographer: "Director: Maxime Chen",
            stylist: "HAUSMAN Studio",
            artist: "Artist: Clara Moreau",
            garmentsUsed: ["HSM-ARC-073", "HSM-ARC-089"],
            descriptionEn: "Complete wardrobe styling for the cinematic dark-electro music video, featuring rare 90s archive mesh tops and sculpted lambskin jackets.",
            descriptionFr: "Direction stylisme complète pour le clip vidéo nocturne, associant les tops en tulle 90s et vestes en cuir sculpturales."
        },
        {
            id: "proj-03",
            title: "PARIS ARCHIVE RETROSPECTIVE",
            year: "2025",
            category: "Campaign",
            coverImage: "assets/img/margiela_trench_model.jpg",
            gallery: [
                "assets/img/margiela_trench_model.jpg",
                "assets/img/raf_knit_model.jpg"
            ],
            client: "Fédération de la Haute Couture Showcase",
            photographer: "Sébastien Roche",
            stylist: "Marc Delattre",
            artist: "Exhibition & Lookbook",
            garmentsUsed: ["HSM-ARC-024", "HSM-ARC-038"],
            descriptionEn: "Exhibition catalog and promotional film presenting the evolution of deconstructive tailoring from 1995 to 2010.",
            descriptionFr: "Catalogue d'exposition et film promotionnel retraçant l'évolution du tailoring déconstruit des années 1995 à 2010."
        }
    ],

    // Mock incoming rental inquiries for Admin Panel
    inquiries: [
        {
            id: "REQ-2026-081",
            date: "18 Sep 2026",
            name: "Camille Laurent",
            email: "c.laurent@vogue.fr",
            agency: "Vogue Paris / Condé Nast",
            instagram: "@camillelaurent_styling",
            projectType: "Editorial",
            projectDate: "24-27 Septembre 2026",
            requestedPieces: "HSM-ARC-024 (Margiela Trench), HSM-ARC-073 (JPG Mesh)",
            message: "Bonjour, nous préparons la couverture du numéro d'octobre avec une artiste internationale à Paris. Pouvons-nous bloquer ces deux pièces ?",
            status: "new", // 'new', 'in_progress', 'confirmed', 'completed'
            urgency: "high"
        },
        {
            id: "REQ-2026-079",
            date: "17 Sep 2026",
            name: "Karim Benali",
            email: "karim@iconoclast.tv",
            agency: "Iconoclast Production",
            instagram: "@karim_director",
            projectType: "Music Video",
            projectDate: "02-04 Octobre 2026",
            requestedPieces: "HSM-ARC-089 (Rick Owens Biker)",
            message: "Tournage clip officiel à Saint-Denis. Besoin du blouson Rick Owens pour l'acteur principal.",
            status: "in_progress",
            urgency: "medium"
        },
        {
            id: "REQ-2026-075",
            date: "15 Sep 2026",
            name: "Sarah Jenkins",
            email: "s.jenkins@dazedmedia.com",
            agency: "Dazed Magazine",
            instagram: "@sarahj_style",
            projectType: "Campaign",
            projectDate: "19-21 Sep 2026",
            requestedPieces: "HSM-ARC-112 (Balenciaga Bomber)",
            message: "Shoot pour campagne digitale capsule. Location confirmée.",
            status: "confirmed",
            urgency: "normal"
        }
    ],

    // Available categories and designers for quick filtering & admin additions
    categories: ["Outerwear", "Jackets", "Tops", "Knitwear", "Bottoms", "Denim", "Shoes", "Bags", "Accessories"],
    designers: ["MAISON MARGIELA", "RICK OWENS", "BALENCIAGA", "YOHJI YAMAMOTO", "JEAN PAUL GAULTIER", "RAF SIMONS", "HELMUT LANG", "DRIES VAN NOTEN", "UNDERCOVER", "COMME DES GARÇONS"],
    sizes: ["36 (XS)", "38 (S)", "40 (M)", "42 (L)", "44 (XL)", "46 (S/M)", "48 (M/L)", "50 (L)", "52 (XL)", "Free Size", "OS"]
};

// Export to global scope
if (typeof window !== 'undefined') {
    window.HAUSMAN_DATA = HAUSMAN_DATA;
}
