#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
HAUSMAN Paris — Guide & Catalogue de Propositions Typographiques
Générateur de Document PDF Haute Définition avec vraies polices TrueType
"""

import os
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.units import mm, cm
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, HRFlowable
)
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas

PDF_OUTPUT_PATH = "/Users/user/Desktop/Mes projets web/HAUSMAN/HAUSMAN_Propositions_Typographiques.pdf"

def register_fonts():
    """Enregistre les polices TrueType pour ReportLab."""
    fonts_dir = "/Users/user/Desktop/Mes projets web/HAUSMAN/assets/fonts"
    
    font_files = {
        'ArialCustom': os.path.join(fonts_dir, 'Arial.ttf'),
        'ArialCustom-Bold': os.path.join(fonts_dir, 'Arial-Bold.ttf'),
        'GeorgiaCustom': os.path.join(fonts_dir, 'Georgia.ttf'),
        'GeorgiaCustom-Bold': os.path.join(fonts_dir, 'Georgia-Bold.ttf'),
        'Playfair': os.path.join(fonts_dir, 'PlayfairDisplay.ttf'),
        'Outfit': os.path.join(fonts_dir, 'Outfit.ttf'),
        'Syne-Bold': os.path.join(fonts_dir, 'Syne-Bold.ttf'),
        'SpaceMono': os.path.join(fonts_dir, 'SpaceMono-Regular.ttf'),
        'SpaceMono-Bold': os.path.join(fonts_dir, 'SpaceMono-Bold.ttf'),
    }

    registered = []
    for name, path in font_files.items():
        if os.path.exists(path):
            try:
                pdfmetrics.registerFont(TTFont(name, path))
                registered.append(name)
            except Exception as e:
                print(f"Warning: Could not register font {name}: {e}")
    print(f"Registered fonts: {registered}")

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
            self.drawString(20 * mm, 282 * mm, "HAUSMAN PARIS — GUIDE & PROPOSITIONS TYPOGRAPHIQUES")
            self.setStrokeColor(colors.HexColor("#E4E4E7"))
            self.setLineWidth(0.5)
            self.line(20 * mm, 280 * mm, 190 * mm, 280 * mm)

        # Footer (all pages)
        self.setStrokeColor(colors.HexColor("#E4E4E7"))
        self.setLineWidth(0.5)
        self.line(20 * mm, 14 * mm, 190 * mm, 14 * mm)
        
        self.drawString(20 * mm, 9 * mm, "CONFIDENTIEL • DIRECTION ARTISTIQUE HAUSMAN PARIS")
        page_text = f"Page {self._pageNumber} / {page_count}"
        self.drawRightString(190 * mm, 9 * mm, page_text)
        self.restoreState()

def build_pdf():
    register_fonts()

    doc = SimpleDocTemplate(
        PDF_OUTPUT_PATH,
        pagesize=A4,
        leftMargin=20 * mm,
        rightMargin=20 * mm,
        topMargin=20 * mm,
        bottomMargin=20 * mm
    )

    story = []

    # Helper Styles
    doc_title_style = ParagraphStyle(
        'DocTitle',
        fontName='Helvetica-Bold',
        fontSize=22,
        leading=26,
        textColor=colors.HexColor("#0A0A0A"),
        spaceAfter=2
    )

    doc_sub_style = ParagraphStyle(
        'DocSub',
        fontName='Helvetica',
        fontSize=9.5,
        leading=13,
        textColor=colors.HexColor("#52525B"),
        spaceAfter=12
    )

    section_badge = ParagraphStyle(
        'SecBadge',
        fontName='Helvetica-Bold',
        fontSize=8,
        leading=10,
        textColor=colors.HexColor("#71717A"),
        spaceBefore=8,
        spaceAfter=2,
        keepWithNext=True
    )

    option_heading = ParagraphStyle(
        'OptionHeading',
        fontName='Helvetica-Bold',
        fontSize=12,
        leading=15,
        textColor=colors.HexColor("#0A0A0A"),
        spaceAfter=3,
        keepWithNext=True
    )

    option_desc = ParagraphStyle(
        'OptionDesc',
        fontName='Helvetica',
        fontSize=8.5,
        leading=12,
        textColor=colors.HexColor("#52525B"),
        spaceAfter=8,
        keepWithNext=True
    )

    tcell_text = ParagraphStyle(
        'TCellText',
        fontName='Helvetica',
        fontSize=8,
        leading=11,
        textColor=colors.HexColor("#27272A")
    )

    tcell_bold = ParagraphStyle(
        'TCellBold',
        fontName='Helvetica-Bold',
        fontSize=8,
        leading=11,
        textColor=colors.HexColor("#0A0A0A")
    )

    tcell_header = ParagraphStyle(
        'TCellHeader',
        fontName='Helvetica-Bold',
        fontSize=8,
        leading=11,
        textColor=colors.white
    )

    # =========================================================================
    # EN-TÊTE DU DOCUMENT
    # =========================================================================
    story.append(Paragraph("HAUSMAN PARIS", doc_title_style))
    story.append(Paragraph("GUIDE DES DIRECTIONS TYPOGRAPHIQUES & PROPOSITIONS DE POLICES", doc_sub_style))
    story.append(HRFlowable(width="100%", thickness=1.5, color=colors.HexColor("#0A0A0A"), spaceAfter=10))

    intro_p = Paragraph(
        "Ce document présente <b>5 propositions typographiques exclusives</b> pour le digital showroom HAUSMAN Paris. "
        "Chaque proposition illustre une identité de marque distincte (brutalisme silencieux, haute-couture éditoriale, "
        "avant-garde géométrique, ou cartel d'archive muséale). "
        "Chaque planche présente le logo, la navigation, un cartel de pièce d'archive et un paragraphe de manifeste.",
        ParagraphStyle('IntroText', fontName='Helvetica', fontSize=8.5, leading=12, textColor=colors.HexColor("#27272A"), spaceAfter=12)
    )
    story.append(intro_p)

    def create_specimen_box(font_title, font_body, font_mono=None):
        """Crée un bloc de démonstration typographique stylisé."""
        f_title = font_title if font_title in pdfmetrics.getRegisteredFontNames() else 'Helvetica-Bold'
        f_body = font_body if font_body in pdfmetrics.getRegisteredFontNames() else 'Helvetica'
        f_mono = font_mono if (font_mono and font_mono in pdfmetrics.getRegisteredFontNames()) else 'SpaceMono'

        s_logo = ParagraphStyle('S_Logo', fontName=f_title, fontSize=17, leading=21, textColor=colors.HexColor("#0A0A0A"))
        s_menu = ParagraphStyle('S_Menu', fontName=f_body, fontSize=8.5, leading=11, textColor=colors.HexColor("#52525B"))
        s_garment = ParagraphStyle('S_Garment', fontName=f_title, fontSize=9.5, leading=12.5, textColor=colors.HexColor("#0A0A0A"))
        s_text = ParagraphStyle('S_Text', fontName=f_body, fontSize=8, leading=11.5, textColor=colors.HexColor("#27272A"))
        s_alpha = ParagraphStyle('S_Alpha', fontName=f_body, fontSize=7.5, leading=10, textColor=colors.HexColor("#8E8E93"))

        specimen_data = [
            [
                Paragraph("<b>LOGO & MARQUE</b>", tcell_bold),
                Paragraph("HAUSMAN PARIS", s_logo)
            ],
            [
                Paragraph("<b>MENU & NAVIGATION</b>", tcell_bold),
                Paragraph("COLLECTION &nbsp;&nbsp;•&nbsp;&nbsp; PROJECTS &nbsp;&nbsp;•&nbsp;&nbsp; ABOUT &nbsp;&nbsp;•&nbsp;&nbsp; CONTACT &nbsp;&nbsp;•&nbsp;&nbsp; FR | EN", s_menu)
            ],
            [
                Paragraph("<b>FICHE PIÈCE & CARTEL</b>", tcell_bold),
                Paragraph("RICK OWENS &nbsp;—&nbsp; Bauhaus Heavy Leather Flight Jacket<br/><font color='#71717A'>HSMN-001 • OUTERWEAR • SIZE 50 • RENTAL UPON REQUEST</font>", s_garment)
            ],
            [
                Paragraph("<b>PARAGRAPHE ÉDITORIAL</b>", tcell_bold),
                Paragraph("HAUSMAN is an exclusive fashion showroom based in Paris Marais, housing a curated archive of rare designer garments, runway pieces and contemporary silhouettes for image professionals.", s_text)
            ],
            [
                Paragraph("<b>JEU DE CARACTÈRES</b>", tcell_bold),
                Paragraph("ABCDEFGHIJKLM NOPQRSTUVWXYZ<br/>abcdefghijklm nopqrstuvwxyz &nbsp;•&nbsp; 0123456789", s_alpha)
            ]
        ]

        t_spec = Table(specimen_data, colWidths=[42 * mm, 128 * mm])
        t_spec.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (0, -1), colors.HexColor("#F8F9FA")),
            ('BACKGROUND', (1, 0), (1, -1), colors.white),
            ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor("#E4E4E7")),
            ('TOPPADDING', (0, 0), (-1, -1), 4),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
            ('LEFTPADDING', (0, 0), (-1, -1), 6),
            ('RIGHTPADDING', (0, 0), (-1, -1), 6),
            ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ]))
        return t_spec

    # =========================================================================
    # OPTION 1 : NÉO-GROTESQUE BRUTALISTE & SILENCIEUX (INTER / HELVETICA)
    # =========================================================================
    story.append(Paragraph("DIRECTION 01", section_badge))
    story.append(Paragraph("Option 1 : Le Néo-Grotesque Brutaliste & Silencieux (Inter / Helvetica Neue)", option_heading))
    story.append(Paragraph(
        "<b>Inspiration & Univers :</b> SSENSE, Balenciaga, 032c, Studios de création contemporains.<br/>"
        "<b>Caractère :</b> Neutre, radical, industriel, sans artifice. L'attention est portée à 100% sur le vêtement et la texture photographique.",
        option_desc
    ))
    story.append(create_specimen_box('ArialCustom-Bold', 'ArialCustom', 'SpaceMono'))
    story.append(Spacer(1, 10))

    # =========================================================================
    # OPTION 2 : SÉRIF ÉDITORIALE HAUTE COUTURE (PLAYFAIR DISPLAY / GEORGIA / THE ROW)
    # =========================================================================
    story.append(Paragraph("DIRECTION 02", section_badge))
    story.append(Paragraph("Option 2 : La Sérif Éditoriale Haute-Couture (Playfair Display / Georgia)", option_heading))
    story.append(Paragraph(
        "<b>Inspiration & Univers :</b> Vogue Paris, Numéro Magazine, The Row, Celine, Maisons de couture patrimoniales.<br/>"
        "<b>Caractère :</b> Élégance classique intemporelle, proportions nobles, esprit galerie d'art et revue de mode prestigieuse.",
        option_desc
    ))
    story.append(create_specimen_box('Playfair', 'GeorgiaCustom', 'SpaceMono'))

    story.append(PageBreak())

    # =========================================================================
    # OPTION 3 : GÉOMÉTRIQUE AVANT-GARDE & SCULPTURAL (OUTFIT / SYNE)
    # =========================================================================
    story.append(Paragraph("DIRECTION 03", section_badge))
    story.append(Paragraph("Option 3 : Le Luxe Géométrique & Architectural (Outfit / Syne)", option_heading))
    story.append(Paragraph(
        "<b>Inspiration & Univers :</b> Bottega Veneta, Jacquemus, Design d'avant-garde, Mode conceptuelle.<br/>"
        "<b>Caractère :</b> Courbes précises, présence visuelle affirmée, modernité sculpturale et distinction immédiate.",
        option_desc
    ))
    story.append(create_specimen_box('Syne-Bold', 'Outfit', 'SpaceMono'))
    story.append(Spacer(1, 10))

    # =========================================================================
    # OPTION 4 : MONOSPACE D'ARCHIVE MUSÉALE (SPACE MONO)
    # =========================================================================
    story.append(Paragraph("DIRECTION 04", section_badge))
    story.append(Paragraph("Option 4 : Le Monospace d'Archive & Cartel Muséal (Space Mono)", option_heading))
    story.append(Paragraph(
        "<b>Inspiration & Univers :</b> Acne Studios, Off-White, Archives du Musée Galliera, Cartels d'exposition d'art brut.<br/>"
        "<b>Caractère :</b> Technique, rigoureux, esthétique d'inventaire scientifique et de fiches de prêt exclusives.",
        option_desc
    ))
    story.append(create_specimen_box('SpaceMono-Bold', 'SpaceMono', 'SpaceMono'))
    story.append(Spacer(1, 10))

    # =========================================================================
    # OPTION 5 : LA COMBINAISON ÉDITORIALE HYBRIDE (RECOMMANDÉE)
    # =========================================================================
    story.append(Paragraph("DIRECTION 05 — RECOMMANDATION REVENUE DU CAHIER DES CHARGES", section_badge))
    story.append(Paragraph("Option 5 : La Combinaison Hybride (Titres Néo-Grotesque + Fiches Space Mono)", option_heading))
    story.append(Paragraph(
        "<b>Inspiration & Univers :</b> L'équilibre idéal pour HAUSMAN : Titres nets et silencieux en <b>Néo-Grotesque</b>, fiches techniques et codes d'archives au format <b>Space Mono</b> (HSMN-xxx).<br/>"
        "<b>Caractère :</b> Alliant la pureté d'un e-shop de créateur à la précision d'un vestiaire d'archives confidentiel.",
        option_desc
    ))
    story.append(create_specimen_box('ArialCustom-Bold', 'ArialCustom', 'SpaceMono'))

    story.append(PageBreak())

    # =========================================================================
    # TABLEAU COMPARATIF & GUIDE DE DÉCISION
    # =========================================================================
    story.append(Paragraph("SYNTHÈSE & DÉCISION", section_badge))
    story.append(Paragraph("Tableau Comparatif des 5 Directions pour Décision Client", option_heading))
    story.append(Paragraph("Récapitulatif pour vous aider à choisir la direction la plus alignée avec l'ADN de HAUSMAN :", option_desc))

    comp_summary_data = [
        [
            Paragraph("Direction", tcell_header),
            Paragraph("Police Titres / Corps", tcell_header),
            Paragraph("Atmosphère & Mood", tcell_header),
            Paragraph("Point Fort Majeur", tcell_header)
        ],
        [
            Paragraph("<b>01. Néo-Grotesque</b>", tcell_bold),
            Paragraph("Inter / Helvetica", tcell_text),
            Paragraph("Brutaliste, silencieux, SSENSE", tcell_text),
            Paragraph("Zéro bruit, centrage 100% vêtement", tcell_text)
        ],
        [
            Paragraph("<b>02. Sérif Luxe</b>", tcell_bold),
            Paragraph("Playfair / Georgia / Vogue", tcell_text),
            Paragraph("Haute couture, patrimonial, revue", tcell_text),
            Paragraph("Élégance classique & prestige éditorial", tcell_text)
        ],
        [
            Paragraph("<b>03. Géométrique</b>", tcell_bold),
            Paragraph("Outfit / Syne", tcell_text),
            Paragraph("Avant-garde, sculptural, moderne", tcell_text),
            Paragraph("Identité forte et impact visuel", tcell_text)
        ],
        [
            Paragraph("<b>04. Monospace</b>", tcell_bold),
            Paragraph("Space Mono", tcell_text),
            Paragraph("Cartel d'archive, Acne Studios", tcell_text),
            Paragraph("Rendu inventaire technique muséal", tcell_text)
        ],
        [
            Paragraph("<b>05. Hybride (Recommandé)</b>", tcell_bold),
            Paragraph("Néo-Grotesque + Space Mono", tcell_text),
            Paragraph("Galerie de mode + Cartels d'archive", tcell_text),
            Paragraph("Équilibre parfait pureté et technicité", tcell_text)
        ]
    ]

    t_sum = Table(comp_summary_data, colWidths=[38 * mm, 38 * mm, 46 * mm, 48 * mm])
    t_sum.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor("#0A0A0A")),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor("#E4E4E7")),
        ('ROWBACKGROUNDS', (0, 1), (-1, -2), [colors.white, colors.HexColor("#F8F9FA")]),
        ('BACKGROUND', (0, -1), (-1, -1), colors.HexColor("#F1F5F9")),
        ('TOPPADDING', (0, 0), (-1, -1), 5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
        ('LEFTPADDING', (0, 0), (-1, -1), 6),
        ('RIGHTPADDING', (0, 0), (-1, -1), 6),
    ]))
    story.append(t_sum)
    story.append(Spacer(1, 14))

    # Notes de mise en oeuvre
    notes_p = Paragraph(
        "<b>Note technique de mise en œuvre :</b><br/>"
        "Toutes ces typographies sont sous licence libre (Google Fonts / Open Font License) et sont déjà optimisées en format web ultra-léger (WOFF2) dans le code source de votre site HAUSMAN. "
        "Le choix de l'une de ces directions s'applique immédiatement sans aucun surcoût ni délai supplémentaire.",
        ParagraphStyle('NoteText', fontName='Helvetica', fontSize=8, leading=11, textColor=colors.HexColor("#52525B"))
    )
    story.append(notes_p)

    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"Typography Specimen PDF successfully created: {PDF_OUTPUT_PATH}")

if __name__ == "__main__":
    build_pdf()
