#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
HAUSMAN Paris — Générateur de Devis PDF
Structure 100% conforme au modèle fourni par Marius BIAOU
"""

from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.units import mm, cm
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, HRFlowable
)
from reportlab.pdfgen import canvas

PDF_OUTPUT_PATH = "/Users/user/Desktop/Mes projets web/HAUSMAN/DEVIS_HAUSMAN_BIAOU_Marius.pdf"

class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super(NumberedCanvas, self).__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_decorations(num_pages)
            super(NumberedCanvas, self).showPage()
        super(NumberedCanvas, self).save()

    def draw_page_decorations(self, page_count):
        self.saveState()
        self.setFont("Helvetica", 8)
        self.setFillColor(colors.HexColor("#71717A"))
        page_text = f"Page {self._pageNumber} / {page_count}"
        self.drawRightString(190 * mm, 12 * mm, page_text)
        self.restoreState()

def build_pdf_devis():
    doc = SimpleDocTemplate(
        PDF_OUTPUT_PATH,
        pagesize=A4,
        leftMargin=20 * mm,
        rightMargin=20 * mm,
        topMargin=20 * mm,
        bottomMargin=20 * mm
    )

    styles = getSampleStyleSheet()

    title_style = ParagraphStyle(
        'MainTitle',
        fontName='Helvetica-Bold',
        fontSize=20,
        leading=24,
        textColor=colors.HexColor("#0A0A0A"),
        spaceAfter=2
    )

    sub_style = ParagraphStyle(
        'SubTitle',
        fontName='Helvetica-Oblique',
        fontSize=10,
        leading=14,
        textColor=colors.HexColor("#52525B"),
        spaceAfter=10
    )

    sec_title_style = ParagraphStyle(
        'SecTitle',
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=15,
        textColor=colors.HexColor("#0A0A0A"),
        spaceBefore=10,
        spaceAfter=2,
        keepWithNext=True
    )

    body_style = ParagraphStyle(
        'BodyTxt',
        fontName='Helvetica',
        fontSize=8.5,
        leading=12,
        textColor=colors.HexColor("#27272A"),
        spaceAfter=6
    )

    bullet_style = ParagraphStyle(
        'BulletTxt',
        fontName='Helvetica',
        fontSize=8.5,
        leading=12,
        textColor=colors.HexColor("#27272A"),
        leftIndent=10,
        spaceAfter=2
    )

    bold_label = ParagraphStyle(
        'BoldLbl',
        fontName='Helvetica-Bold',
        fontSize=9,
        leading=13,
        textColor=colors.HexColor("#0A0A0A"),
        spaceBefore=4,
        spaceAfter=2,
        keepWithNext=True
    )

    table_cell = ParagraphStyle(
        'TCell',
        fontName='Helvetica',
        fontSize=8.5,
        leading=11,
        textColor=colors.HexColor("#27272A")
    )

    table_cell_bold = ParagraphStyle(
        'TCellB',
        fontName='Helvetica-Bold',
        fontSize=8.5,
        leading=11,
        textColor=colors.HexColor("#0A0A0A")
    )

    table_cell_right = ParagraphStyle(
        'TCellR',
        fontName='Helvetica',
        fontSize=8.5,
        leading=11,
        textColor=colors.HexColor("#27272A"),
        alignment=2
    )

    table_cell_right_bold = ParagraphStyle(
        'TCellRB',
        fontName='Helvetica-Bold',
        fontSize=9,
        leading=11,
        textColor=colors.HexColor("#0A0A0A"),
        alignment=2
    )

    story = []

    # EN-TÊTE
    story.append(Paragraph("DEVIS", title_style))
    story.append(Paragraph("Création du site HAUSMAN - Showroom digital de mode (Paris)", sub_style))

    # TABLE MÉTA
    meta_table_data = [
        [
            Paragraph("Date", table_cell),
            Paragraph("24 septembre 2026", table_cell),
            Paragraph("Client", table_cell),
            Paragraph("<b>HAUSMAN</b>", table_cell)
        ],
        [
            Paragraph("Prestataire", table_cell),
            Paragraph("<b>BIAOU Marius</b>", table_cell),
            Paragraph("", table_cell),
            Paragraph("", table_cell)
        ]
    ]
    t_meta = Table(meta_table_data, colWidths=[25 * mm, 60 * mm, 25 * mm, 60 * mm])
    t_meta.setStyle(TableStyle([
        ('LINEBELOW', (0, 0), (-1, -1), 0.5, colors.HexColor("#E4E4E7")),
        ('LINEABOVE', (0, 0), (-1, 0), 0.5, colors.HexColor("#E4E4E7")),
        ('TOPPADDING', (0, 0), (-1, -1), 3),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 3),
        ('LEFTPADDING', (0, 0), (-1, -1), 2),
        ('RIGHTPADDING', (0, 0), (-1, -1), 2),
    ]))
    story.append(t_meta)
    story.append(Spacer(1, 6))

    # 1. OBJET DU PROJET
    story.append(Paragraph("1. Objet du projet", sec_title_style))
    story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor("#0A0A0A"), spaceAfter=5))
    story.append(Paragraph(
        "Conception et développement du site HAUSMAN : un showroom digital de mode présentant le catalogue "
        "de location de vêtements, accessoires et pièces designer / archive, ainsi que les projets réalisés "
        "(éditoriaux, campagnes, collaborations). Le site fonctionne comme une vitrine et une galerie; il ne "
        "comporte aucune fonctionnalité e-commerce (pas de panier, pas de paiement en ligne, pas de "
        "réservation automatique).",
        body_style
    ))

    # 2. TECHNOLOGIE UTILISÉE
    story.append(Paragraph("2. Technologie utilisée", sec_title_style))
    story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor("#0A0A0A"), spaceAfter=5))
    
    techs = [
        "• <b>Framework & Front-end :</b> Front-end sur-mesure ultra-léger (HTML5, CSS3, Vanilla JS) avec architecture Laravel (PHP) et Blade pour un rendu serveur natif, ultra-fluide, garantissant un temps de chargement instantané (< 0.3s) et un référencement naturel (SEO) optimal.",
        "• <b>Base de données :</b> MySQL.",
        "• <b>Panel d'administration sur-mesure (CMS custom développé en Laravel) :</b> ajout, modification, masquage des vêtements (avec auto-référence HSMN-xxx et 4 statuts privés), upload des 5 photos par pièce et gestion des projets, sans intervention du développeur.",
        "• <b>Hébergement :</b> OVH (mutualisé ou VPS selon le volume de trafic et de stockage).",
        "• <b>Compte d'hébergement OVH et nom de domaine créés au nom de HAUSMAN</b>, avec transfert complet des accès à la livraison."
    ]
    for t in techs:
        story.append(Paragraph(t, bullet_style))
    
    story.append(Spacer(1, 3))
    story.append(Paragraph(
        "Cette stack permet d'obtenir un résultat visuel et fonctionnel équivalent à une solution type Webflow, "
        "avec une interface d'administration entièrement adaptée aux besoins spécifiques de HAUSMAN (fiches "
        "vêtements multi-photos, catégories, filtres). L'ensemble (code, hébergement, données) reste hébergé en "
        "France chez OVH, et la propriété du site est entièrement transférée à HAUSMAN.",
        body_style
    ))

    # 3. PÉRIMÈTRE INCLUS
    story.append(Paragraph("3. Périmètre inclus", sec_title_style))
    story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor("#0A0A0A"), spaceAfter=5))
    story.append(Paragraph("<b>Pages et fonctionnalités</b>", bold_label))

    perims = [
        "• <b>Home / Intro :</b> animation flash de 20-30 pièces d'archives (~2.0s) puis transition fluide vers le Menu central",
        "• <b>Menu d'accueil :</b> logo fixe, 4 liens majeurs épurés (COLLECTION, PROJECTS, ABOUT, CONTACT), footer discret",
        "• <b>Collection :</b> catalogue filtrable au ratio 4:5 (marque, catégories), survol révélant la silhouette portée mannequin, overlay filtres et recherche loupe par référence (HSMN-xxx)",
        "• <b>Fiche vêtement :</b> galerie de 5 photos haute définition (plat face, dos, détail, porté face, silhouette), informations sobres (marque, nom, catégorie, taille, mensurations mannequin), mention discrète \"Rental upon request\"",
        "• <b>Projects :</b> portfolio 4:5 avec titre, année, publication, crédits détaillés, défilement horizontal fluide des visuels et bouton NEXT PROJECT →",
        "• <b>About :</b> page courte et épurée présentant HAUSMAN comme entité indépendante de curation",
        "• <b>Contact :</b> formulaire structuré typographique (nom, email/Instagram, type de projet, dates, pièces demandées, message) + anti-spam invisible et liens directs WhatsApp, Instagram, Email",
        "• <b>Design :</b> direction artistique minimaliste, silencieuse, inspirée galerie/mode (fond blanc pur, grands espaces, typographie sobre, 0 bruit)",
        "• <b>Navigation bilingue FR / EN</b> (voir section coût dédié ci-dessous)",
        "• <b>Responsive mobile-first</b> (1 colonne stricte sur smartphone pour une pureté visuelle absolue)",
        "• <b>Panel d'administration sur-mesure</b> pour gérer vêtements (auto-référence HSMN-xxx, 4 statuts privés) et projets en totale autonomie",
        "• <b>Bases SEO :</b> titres, meta-descriptions, URLs propres, balises Open Graph (partage Instagram/iMessage/WhatsApp), indexation",
        "• Favicon, page 404 sur-mesure et pages légales de base (mentions légales / politique de confidentialité)",
        "• Optimisation raisonnable des images (WebP) et des performances de chargement",
        "• Formation à la livraison pour l'ajout autonome de vêtements et projets"
    ]
    for p in perims:
        story.append(Paragraph(p, bullet_style))

    story.append(Spacer(1, 3))
    story.append(Paragraph("<b>Maquettes et corrections</b>", bold_label))
    mqs = [
        "• 1 proposition de direction artistique (maquette de la Home + 1 fiche vêtement)",
        "• 2 allers-retours de corrections inclus sur la maquette et sur le développement",
        "• Au-delà : ajustements facturés en supplément sur devis"
    ]
    for m in mqs:
        story.append(Paragraph(m, bullet_style))

    story.append(Spacer(1, 6))

    # 4. NON INCLUS DANS CETTE V1
    story.append(Paragraph("4. Non inclus dans cette V1", sec_title_style))
    story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor("#0A0A0A"), spaceAfter=5))
    non_incs = [
        "• Fonctionnalités e-commerce (panier, paiement en ligne, checkout, réservation automatique, calendrier public, caution en ligne)",
        "• Espace professionnels, CRM, gestion des dépôts, contrats - évolutions possibles ultérieurement",
        "• Rédaction des textes et fourniture des photographies (fournies par HAUSMAN)",
        "• Achat du nom de domaine (facturé au prix réel du registrar, au nom de HAUSMAN)"
    ]
    for ni in non_incs:
        story.append(Paragraph(ni, bullet_style))

    story.append(Spacer(1, 6))

    # 5. COÛT DU BILINGUE FR / EN
    story.append(Paragraph("5. Coût du bilingue FR / EN", sec_title_style))
    story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor("#0A0A0A"), spaceAfter=5))
    story.append(Paragraph(
        "Le tarif ci-dessous inclut la structure technique bilingue (routing, sélecteur de langue, gestion des "
        "contenus dans les deux langues). La saisie des traductions elle-même reste à la charge de HAUSMAN, "
        "sauf demande contraire.",
        body_style
    ))

    t_bil_data = [
        [Paragraph("<b>Poste</b>", table_cell_bold), Paragraph("<b>Coût</b>", table_cell_right_bold)],
        [Paragraph("Structure bilingue FR / EN (inclus dans le prix total)", table_cell), Paragraph("Inclus", table_cell_right)]
    ]
    t_bil = Table(t_bil_data, colWidths=[135 * mm, 35 * mm])
    t_bil.setStyle(TableStyle([
        ('LINEBELOW', (0, 0), (-1, -1), 0.5, colors.HexColor("#E4E4E7")),
        ('LINEABOVE', (0, 0), (-1, 0), 0.5, colors.HexColor("#E4E4E7")),
        ('TOPPADDING', (0, 0), (-1, -1), 3),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 3),
    ]))
    story.append(t_bil)
    story.append(Spacer(1, 6))

    # 6. COÛTS D'HÉBERGEMENT ET D'OUTILS
    story.append(Paragraph("6. Coûts d'hébergement et d'outils (récurrents, hors forfait)", sec_title_style))
    story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor("#0A0A0A"), spaceAfter=5))
    story.append(Paragraph(
        "Ces coûts sont payés directement par HAUSMAN auprès d'OVH - ils ne sont pas facturés par le "
        "développeur, et le compte est créé au nom de HAUSMAN dès le départ.",
        body_style
    ))

    t_heb_data = [
        [Paragraph("<b>Service</b>", table_cell_bold), Paragraph("<b>Usage</b>", table_cell_bold), Paragraph("<b>Coût estimé</b>", table_cell_right_bold)],
        [Paragraph("Hébergement mutualisé OVH", table_cell), Paragraph("Suffisant pour le lancement (V1)", table_cell), Paragraph("~4–8 € / mois", table_cell_right)],
        [Paragraph("VPS OVH (si besoin de monter en charge)", table_cell), Paragraph("À prévoir si trafic/stock important", table_cell), Paragraph("~8–15 € / mois", table_cell_right)],
        [Paragraph("Nom de domaine (OVH)", table_cell), Paragraph("Ex. hausman.com", table_cell), Paragraph("~10–15 € / an", table_cell_right)],
        [Paragraph("Certificat SSL", table_cell), Paragraph("Généralement inclus chez OVH", table_cell), Paragraph("0 €", table_cell_right)],
    ]
    t_heb = Table(t_heb_data, colWidths=[60 * mm, 75 * mm, 35 * mm])
    t_heb.setStyle(TableStyle([
        ('LINEBELOW', (0, 0), (-1, -1), 0.5, colors.HexColor("#E4E4E7")),
        ('LINEABOVE', (0, 0), (-1, 0), 0.5, colors.HexColor("#E4E4E7")),
        ('TOPPADDING', (0, 0), (-1, -1), 3),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 3),
    ]))
    story.append(t_heb)
    story.append(Spacer(1, 3))
    story.append(Paragraph(
        "<i>L'offre mutualisée OVH est suffisante pour démarrer. Un passage en VPS ne sera nécessaire qu'en cas de "
        "trafic ou de volume de photos important - HAUSMAN en sera informé avant tout changement d'offre.</i>",
        body_style
    ))

    # 7. PRIX TOTAL
    story.append(Paragraph("7. Prix total", sec_title_style))
    story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor("#0A0A0A"), spaceAfter=5))

    t_tot_data = [
        [
            Paragraph("Développement complet du site HAUSMAN<br/>(V1) périmètre décrit en section 3", table_cell),
            Paragraph("<b>620 €</b>", table_cell_right_bold)
        ]
    ]
    t_tot = Table(t_tot_data, colWidths=[135 * mm, 35 * mm])
    t_tot.setStyle(TableStyle([
        ('LINEBELOW', (0, 0), (-1, -1), 0.5, colors.HexColor("#E4E4E7")),
        ('LINEABOVE', (0, 0), (-1, 0), 0.5, colors.HexColor("#E4E4E7")),
        ('TOPPADDING', (0, 0), (-1, -1), 4),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
    ]))
    story.append(t_tot)
    story.append(Spacer(1, 3))
    story.append(Paragraph(
        "<i>Ce tarif est proposé dans un cadre de lancement / mise en place d'une première collaboration. Il reste "
        "ouvert à la discussion, à la hausse comme à la baisse, selon les ajustements de périmètre que nous "
        "validerons ensemble avant le démarrage du projet.</i>",
        body_style
    ))

    # 8. DÉLAI ESTIMÉ
    story.append(Paragraph("8. Délai estimé", sec_title_style))
    story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor("#0A0A0A"), spaceAfter=5))
    story.append(Paragraph("1 à 2 semaines à réception des photos, des textes et après validation de la maquette (maquette interactive déjà opérationnelle pour recette).", body_style))

    # 9. MAINTENANCE APRÈS LIVRAISON
    story.append(Paragraph("9. Maintenance après livraison", sec_title_style))
    story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor("#0A0A0A"), spaceAfter=5))
    maints = [
        "• Corrections de bugs éventuels : 1 mois de garantie offerte après la mise en ligne",
        "• Au-delà : maintenance proposée sur devis séparé, ou forfait mensuel sur demande",
        "• Toute évolution fonctionnelle (espace professionnels avancé, réservations, paiements en ligne, CRM...) fera l'objet d'un devis complémentaire"
    ]
    for mb in maints:
        story.append(Paragraph(mb, bullet_style))

    # 10. CE QUI RESTE ADMINISTRABLE PAR HAUSMAN
    story.append(Paragraph("10. Ce qui reste administrable par HAUSMAN sans le développeur", sec_title_style))
    story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor("#0A0A0A"), spaceAfter=5))
    adms = [
        "• Ajouter, modifier, masquer ou supprimer un vêtement (série de 5 photos HD, marque, nom, catégorie, taille, mensurations mannequin, référence auto HSMN-xxx, statut privé Available/Reserved/On Loan/Unavailable)",
        "• Ajouter, modifier, masquer ou supprimer un projet (titre, année, crédits, galerie d'images)",
        "• Mise à jour des textes des pages About et Contact",
        "• Consultation et suivi des demandes de prêt (pull requests) reçues des stylistes"
    ]
    for ab in adms:
        story.append(Paragraph(ab, bullet_style))
    story.append(Paragraph("Toute modification de structure du site (nouvelle page, nouveau type de contenu, refonte de la navigation) reste du domaine du développeur.", body_style))

    # 11. LIVRABLES À LA FIN DU PROJET
    story.append(Paragraph("11. Livrables à la fin du projet", sec_title_style))
    story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor("#0A0A0A"), spaceAfter=5))
    livrs = [
        "• Site responsive complet, en ligne",
        "• Accès administrateur complet (hébergement OVH, nom de domaine) au nom de HAUSMAN",
        "• Accès au panel d'administration du contenu",
        "• Nom de domaine connecté",
        "• Formulaire de contact fonctionnel avec anti-spam invisible",
        "• Bases SEO en place (titres, descriptions, balises Open Graph, URLs, indexation)",
        "• Favicon, page 404 sur-mesure et pages légales",
        "• Courte session de formation à la prise en main du panel d'administration"
    ]
    for lb in livrs:
        story.append(Paragraph(lb, bullet_style))

    story.append(Spacer(1, 8))
    story.append(Paragraph("<b>Devis établi le 24 septembre 2026</b>", bold_label))

    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"Devis PDF successfully created: {PDF_OUTPUT_PATH}")

if __name__ == "__main__":
    build_pdf_devis()
