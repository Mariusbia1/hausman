#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
HAUSMAN Paris — Dossier d'Architecture Technique & Proposition Digitale V1
Générateur de document PDF Haute Définition avec ReportLab
"""

import os
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.units import mm, cm
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, KeepTogether, HRFlowable
)
from reportlab.pdfgen import canvas

PDF_OUTPUT_PATH = "/Users/user/Desktop/Mes projets web/HAUSMAN/HAUSMAN_Dossier_Technique_Architecture.pdf"

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
        self.setFont("Helvetica", 7.5)
        self.setFillColor(colors.HexColor("#71717A"))
        
        # Header (pages > 1)
        if self._pageNumber > 1:
            self.drawString(20 * mm, 282 * mm, "HAUSMAN PARIS — ARCHITECTURE TECHNIQUE & PROPOSITION DIGITALE V1")
            self.setStrokeColor(colors.HexColor("#E4E4E7"))
            self.setLineWidth(0.5)
            self.line(20 * mm, 280 * mm, 190 * mm, 280 * mm)

        # Footer (all pages)
        self.setStrokeColor(colors.HexColor("#E4E4E7"))
        self.setLineWidth(0.5)
        self.line(20 * mm, 15 * mm, 190 * mm, 15 * mm)
        
        self.drawString(20 * mm, 10 * mm, "CONFIDENTIEL • HAUSMAN DIGITAL SHOWROOM PARIS")
        page_text = f"Page {self._pageNumber} / {page_count}"
        self.drawRightString(190 * mm, 10 * mm, page_text)
        self.restoreState()

def build_pdf():
    doc = SimpleDocTemplate(
        PDF_OUTPUT_PATH,
        pagesize=A4,
        leftMargin=20 * mm,
        rightMargin=20 * mm,
        topMargin=22 * mm,
        bottomMargin=22 * mm
    )

    styles = getSampleStyleSheet()

    # Custom styles
    brand_title_style = ParagraphStyle(
        'BrandTitle',
        fontName='Helvetica-Bold',
        fontSize=24,
        leading=28,
        textColor=colors.HexColor("#0A0A0A"),
        spaceAfter=4
    )
    
    doc_sub_style = ParagraphStyle(
        'DocSub',
        fontName='Helvetica',
        fontSize=9.5,
        leading=13,
        textColor=colors.HexColor("#52525B"),
        spaceAfter=15
    )

    h1_style = ParagraphStyle(
        'Heading1_Custom',
        fontName='Helvetica-Bold',
        fontSize=11.5,
        leading=15,
        textColor=colors.HexColor("#0A0A0A"),
        spaceBefore=12,
        spaceAfter=6,
        keepWithNext=True
    )

    h2_style = ParagraphStyle(
        'Heading2_Custom',
        fontName='Helvetica-Bold',
        fontSize=9.5,
        leading=13,
        textColor=colors.HexColor("#27272A"),
        spaceBefore=8,
        spaceAfter=4,
        keepWithNext=True
    )

    body_style = ParagraphStyle(
        'Body_Custom',
        fontName='Helvetica',
        fontSize=8.5,
        leading=12,
        textColor=colors.HexColor("#27272A"),
        spaceAfter=6
    )

    body_bold = ParagraphStyle(
        'Body_Bold',
        fontName='Helvetica-Bold',
        fontSize=8.5,
        leading=12,
        textColor=colors.HexColor("#0A0A0A")
    )

    bullet_style = ParagraphStyle(
        'Bullet_Custom',
        fontName='Helvetica',
        fontSize=8.5,
        leading=12,
        textColor=colors.HexColor("#27272A"),
        leftIndent=10,
        spaceAfter=3
    )

    table_cell = ParagraphStyle(
        'TableCell',
        fontName='Helvetica',
        fontSize=8,
        leading=11,
        textColor=colors.HexColor("#27272A")
    )

    table_cell_bold = ParagraphStyle(
        'TableCellBold',
        fontName='Helvetica-Bold',
        fontSize=8,
        leading=11,
        textColor=colors.HexColor("#0A0A0A")
    )

    table_header = ParagraphStyle(
        'TableHeader',
        fontName='Helvetica-Bold',
        fontSize=8,
        leading=11,
        textColor=colors.white
    )

    story = []

    # =========================================================================
    # HEADER / EN-TÊTE DE PRESTIGE
    # =========================================================================
    story.append(Paragraph("HAUSMAN PARIS", brand_title_style))
    story.append(Paragraph("DOSSIER D'ARCHITECTURE TECHNIQUE & RECOMMANDATION DIGITALE V1", doc_sub_style))
    story.append(HRFlowable(width="100%", thickness=1.5, color=colors.HexColor("#0A0A0A"), spaceAfter=12))

    # Meta Table (Cadre méta-données)
    meta_data = [
        [
            Paragraph("<b>Projet :</b> Digital Showroom & Wardrobe Archive", table_cell),
            Paragraph("<b>Client :</b> HAUSMAN Paris (Paris, France)", table_cell)
        ],
        [
            Paragraph("<b>Document :</b> Recommandation Stack & Réponses Cahier des Charges", table_cell),
            Paragraph("<b>Version :</b> V1.0 Finale (Conforme 42 Sections)", table_cell)
        ],
        [
            Paragraph("<b>Statut :</b> Proposition d'Architecture & Chiffrage Technique", table_cell),
            Paragraph("<b>Date :</b> Septembre 2026", table_cell)
        ]
    ]
    meta_table = Table(meta_data, colWidths=[85 * mm, 85 * mm])
    meta_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), colors.HexColor("#F8F9FA")),
        ('BOX', (0, 0), (-1, -1), 0.5, colors.HexColor("#E4E4E7")),
        ('INNERGRID', (0, 0), (-1, -1), 0.5, colors.HexColor("#E4E4E7")),
        ('TOPPADDING', (0, 0), (-1, -1), 4),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
        ('LEFTPADDING', (0, 0), (-1, -1), 6),
        ('RIGHTPADDING', (0, 0), (-1, -1), 6),
    ]))
    story.append(meta_table)
    story.append(Spacer(1, 10))

    # =========================================================================
    # 1. VISION & OBJECTIFS TECHNIQUES
    # =========================================================================
    story.append(Paragraph("1. Vision & Exigences Techniques du Showroom", h1_style))
    story.append(Paragraph(
        "HAUSMAN est un fashion showroom parisien haut de gamme proposant une sélection curatée de pièces de designers d'archive et contemporaines pour stylistes, artistes, célébrités, magazines et productions créatives. "
        "Contrairement à une boutique e-commerce classique, le site incarne une <b>expérience silencieuse, muséale et éditoriale</b> : zéro bruit visuel, fond blanc pur, typographie sobre, et centrage absolu sur l'image haute fidélité au ratio strict 4:5.",
        body_style
    ))
    story.append(Paragraph(
        "Cette exigence artistique nécessite une infrastructure technique capable de délivrer des visuels haute définition avec un <b>temps de chargement instantané (&lt; 0.3s)</b>, une fluidité parfaite sur mobile (1 pièce par ligne), une sécurité totale et des coûts d'exploitation minimes.",
        body_style
    ))
    story.append(Spacer(1, 4))

    # =========================================================================
    # 2. ARCHITECTURE TECHNIQUE RECOMMANDÉE
    # =========================================================================
    story.append(Paragraph("2. Recommandation Technologique & Architecture Globale", h1_style))
    story.append(Paragraph(
        "En réponse directe aux questions formulées à la fin du cahier des charges officiel, nous recommandons une <b>architecture découplée sur-mesure</b> combinant un Front-End ultra-léger et un Back-End API sécurisé.",
        body_style
    ))

    # Bloc Front-End
    story.append(Paragraph("A. Front-End Public : Modern Vanilla JS / HTML5 / CSS3 (Haute Vitesse)", h2_style))
    story.append(Paragraph("• <b>Temps de chargement &lt; 0.3s (Score PageSpeed 98+) :</b> Pas de framework lourd superflu côté visiteur. Le navigateur affiche les grilles et les fiches instantanément sans latence.", bullet_style))
    story.append(Paragraph("• <b>Fluidité des animations d'avant-garde :</b> Exécution native du défilement flash d'introduction (25 pièces en 2.0s), du survol fluide révélant la silhouette portée, et de la lightbox tactile plein écran.", bullet_style))
    story.append(Paragraph("• <b>Conformité Mobile Stricte :</b> Affichage optimisé en 1 seule colonne sur smartphone avec boutons tactiles ergonomiques et filtres overlay semi-transparents.", bullet_style))
    story.append(Paragraph("• <b>Bilingue instantané (FR / EN) :</b> Basculement de langue sans rechargement de page pour la presse et les stylistes internationaux.", bullet_style))

    story.append(Spacer(1, 4))

    # Bloc Back-End
    story.append(Paragraph("B. Back-End & CMS d'Administration : Architecture Laravel & Base de Données", h2_style))
    story.append(Paragraph("• <b>Gestion d'Inventaire Confidentielle :</b> Attribution automatique et stricte des identifiants au format <code>HSMN-xxx</code> (ex. HSMN-001, HSMN-002...).", bullet_style))
    story.append(Paragraph("• <b>4 Statuts Internes Privés :</b> Gestion des états <code>Available</code> (Disponible), <code>Reserved</code> (Réservé), <code>On Loan</code> (En prêt) et <code>Unavailable</code> (Indisponible) avec masquage total côté public.", bullet_style))
    story.append(Paragraph("• <b>Pipeline 5 Photos Haute Définition :</b> Upload automatisé des 5 angles obligatoires (plat face, plat dos, détail, porté face, porté silhouette) avec compression automatique WebP sans perte de netteté.", bullet_style))
    story.append(Paragraph("• <b>Gestion des Pull Requests & Formulaire Contact :</b> Réception centralisée des demandes de location des stylistes, notifications email immédiates et export sécurisé.", bullet_style))

    from reportlab.platypus import PageBreak
    story.append(PageBreak())

    # =========================================================================
    # 3. COMPARATIF SUR-MESURE VS WORDPRESS / CMS TRADITIONNELS
    # =========================================================================
    story.append(Paragraph("3. Analyse Comparative : Solution Sur-Mesure vs WordPress", h1_style))
    story.append(Paragraph(
        "Pourquoi un CMS traditionnel type WordPress ou Shopify n'est pas adapté à l'exigence de HAUSMAN :",
        body_style
    ))

    comp_data = [
        [
            Paragraph("Critère", table_header),
            Paragraph("Solution Sur-Mesure Proposée", table_header),
            Paragraph("CMS Classique (WordPress / Shopify)", table_header)
        ],
        [
            Paragraph("<b>Temps de Chargement</b>", table_cell_bold),
            Paragraph("<b>&lt; 0.3s</b> (Fichiers ultra-optimisés servis par CDN)", table_cell),
            Paragraph("1.5s à 4.0s (Ralenti par plugins et base SQL publique)", table_cell)
        ],
        [
            Paragraph("<b>Esthétique & Épure</b>", table_cell_bold),
            Paragraph("<b>100% fidèle</b> au minimalisme silencieux demandé", table_cell),
            Paragraph("Contraint par des thèmes génériques et bruits e-commerce", table_cell)
        ],
        [
            Paragraph("<b>Sécurité & Failles</b>", table_cell_bold),
            Paragraph("<b>Maximale :</b> Surface d'attaque nulle, 0 plugin tiers", table_cell),
            Paragraph("Vulnérable : Mises à jour de sécurité obligatoires régulières", table_cell)
        ],
        [
            Paragraph("<b>Abonnements / Licences</b>", table_cell_bold),
            Paragraph("<b>0 € / mois</b> de redevance ou licence logicielle", table_cell),
            Paragraph("30 € à 150 € / mois (Shopify, plugins payants, maintenance)", table_cell)
        ],
        [
            Paragraph("<b>Propriété du Code</b>", table_cell_bold),
            Paragraph("<b>100% propriété exclusive</b> du client HAUSMAN", table_cell),
            Paragraph("Dépendance technologique aux plateformes propriétaires", table_cell)
        ]
    ]

    comp_table = Table(comp_data, colWidths=[38 * mm, 66 * mm, 66 * mm])
    comp_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor("#0A0A0A")),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor("#E4E4E7")),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, colors.HexColor("#F8F9FA")]),
        ('TOPPADDING', (0, 0), (-1, -1), 4),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
        ('LEFTPADDING', (0, 0), (-1, -1), 6),
        ('RIGHTPADDING', (0, 0), (-1, -1), 6),
    ]))
    story.append(comp_table)
    story.append(Spacer(1, 8))

    # =========================================================================
    # 4. SÉCURITÉ, SEO & MÉTHODOLOGIE DE DÉPLOIEMENT
    # =========================================================================
    story.append(Paragraph("4. Sécurité, Référencement (SEO) & Déploiement Cloud", h1_style))
    story.append(Paragraph("• <b>Hébergement Edge & CDN Mondial :</b> Déploiement sur réseau cloud mondial (Cloudflare / Netlify) garantissant une disponibilité de 99.99% et une vitesse de consultation optimale depuis Paris, Londres, Milan, New York ou Tokyo.", bullet_style))
    story.append(Paragraph("• <b>Certificat SSL & Protection Formulaires :</b> Chiffrement HTTPS complet, protection anti-spam invisible (honeypot) sur le formulaire de contact sans captcha intrusif pour les stylistes.", bullet_style))
    story.append(Paragraph("• <b>Balisage SEO Sémantique & Open Graph :</b> Balises méta enrichies pour un affichage prestigieux lors du partage de liens sur Instagram, WhatsApp, iMessage et LinkedIn.", bullet_style))

    story.append(Spacer(1, 6))

    # =========================================================================
    # 5. COÛTS DE FONCTIONNEMENT ANNUELS ESTIMÉS
    # =========================================================================
    story.append(Paragraph("5. Coûts Annuels de Fonctionnement & Exploitation", h1_style))
    story.append(Paragraph("Transparence totale sur les coûts d'infrastructure récurrents nécessaires au bon fonctionnement du site :", body_style))

    cost_data = [
        [
            Paragraph("Poste d'infrastructure", table_header),
            Paragraph("Prestataire Recommandé", table_header),
            Paragraph("Coût Annuel Estimé", table_header)
        ],
        [
            Paragraph("<b>Nom de Domaine</b> (<code>hausman-paris.com</code>)", table_cell),
            Paragraph("OVH / Gandi / Porkbun", table_cell),
            Paragraph("<b>~12 € à 18 € / an</b>", table_cell_bold)
        ],
        [
            Paragraph("<b>Hébergement Web & CDN Edge</b>", table_cell),
            Paragraph("Cloudflare Pages / Netlify", table_cell),
            Paragraph("<b>0 € / an</b> (Inclus forfait haute perf.)", table_cell_bold)
        ],
        [
            Paragraph("<b>Certificat de Sécurité SSL (HTTPS)</b>", table_cell),
            Paragraph("Let's Encrypt / Cloudflare", table_cell),
            Paragraph("<b>0 € (Inclus à vie)</b>", table_cell_bold)
        ],
        [
            Paragraph("<b>Boîte Mail Professionnelle</b>", table_cell),
            Paragraph("Google Workspace ou OVH Mail", table_cell),
            Paragraph("<b>~15 € à 70 € / an</b> (selon option)", table_cell)
        ],
        [
            Paragraph("<b>TOTAL DES FRAIS RÉCURRENTS TECHNIQUES</b>", table_cell_bold),
            Paragraph("—", table_cell),
            Paragraph("<b>~15 € à 50 € / AN SEULEMENT</b>", table_cell_bold)
        ]
    ]

    cost_table = Table(cost_data, colWidths=[65 * mm, 55 * mm, 50 * mm])
    cost_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor("#0A0A0A")),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor("#E4E4E7")),
        ('ROWBACKGROUNDS', (0, 1), (-1, -2), [colors.white, colors.HexColor("#F8F9FA")]),
        ('BACKGROUND', (0, -1), (-1, -1), colors.HexColor("#F1F5F9")),
        ('TOPPADDING', (0, 0), (-1, -1), 4),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
        ('LEFTPADDING', (0, 0), (-1, -1), 6),
        ('RIGHTPADDING', (0, 0), (-1, -1), 6),
    ]))
    story.append(cost_table)
    story.append(Spacer(1, 8))

    # =========================================================================
    # 6. PLANNING, GARANTIE & PROPRIÉTÉ
    # =========================================================================
    story.append(Paragraph("6. Planning de Réalisation, Garantie & Propriété", h1_style))
    story.append(Paragraph("• <b>Délai de Livraison :</b> 1 à 2 semaines (Phase 1 : Maquette interactive fonctionnelle validée • Phase 2 : Import des pièces HD • Phase 3 : Recette et mise en ligne).", bullet_style))
    story.append(Paragraph("• <b>Garantie 3 Mois :</b> Couverture intégrale des éventuels correctifs ou ajustements post-lancement sans frais supplémentaires.", bullet_style))
    story.append(Paragraph("• <b>Propriété Intellectuelle Exclusive :</b> HAUSMAN est propriétaire à 100% du code source, de la base de données et des visuels sans aucune redevance tierce.", bullet_style))

    # Build PDF with NumberedCanvas
    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"PDF successfully generated: {PDF_OUTPUT_PATH}")

if __name__ == "__main__":
    build_pdf()
