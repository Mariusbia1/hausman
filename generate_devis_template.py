#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
HAUSMAN Paris — Générateur de Devis Word (.docx)
Structure 100% conforme au modèle fourni par Marius BIAOU
Montant : 620 € — Intégrant les réponses au Cahier des Charges V1 (42 sections)
"""

import docx
from docx import Document
from docx.shared import Inches, Pt, RGBColor, Cm
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.oxml import parse_xml, OxmlElement
from docx.oxml.ns import nsdecls, qn

DOCX_OUTPUT_PATH = "/Users/user/Desktop/Mes projets web/HAUSMAN/DEVIS_HAUSMAN_BIAOU_Marius.docx"

def set_cell_background(cell, hex_color):
    """Applique une couleur d'arrière-plan à une cellule."""
    shading_elm = parse_xml(f'<w:shd {nsdecls("w")} w:fill="{hex_color}"/>')
    cell._tc.get_or_add_tcPr().append(shading_elm)

def set_cell_margins(cell, top=100, bottom=100, left=150, right=150):
    """Définit les marges internes (padding) d'une cellule en dxa."""
    tcPr = cell._tc.get_or_add_tcPr()
    tcMar = OxmlElement('w:tcMar')
    for m_name, m_val in [('top', top), ('bottom', bottom), ('left', left), ('right', right)]:
        node = OxmlElement(f'w:{m_name}')
        node.set(qn('w:w'), str(m_val))
        node.set(qn('w:type'), 'dxa')
        tcMar.append(node)
    tcPr.append(tcMar)

def set_table_horizontal_borders(table, color="D1D5DB", sz="4"):
    """Bordures horizontales fines et discrètes, sans bordures verticales."""
    tblPr = table._tbl.tblPr
    borders = parse_xml(
        f'<w:tblBorders {nsdecls("w")}>'
        f'  <w:top w:val="single" w:sz="{sz}" w:space="0" w:color="{color}"/>'
        f'  <w:left w:val="none"/>'
        f'  <w:bottom w:val="single" w:sz="{sz}" w:space="0" w:color="{color}"/>'
        f'  <w:right w:val="none"/>'
        f'  <w:insideH w:val="single" w:sz="{sz}" w:space="0" w:color="{color}"/>'
        f'  <w:insideV w:val="none"/>'
        f'</w:tblBorders>'
    )
    tblPr.append(borders)

def build_devis():
    doc = Document()

    # Marges de la page : 2.0 cm
    for section in doc.sections:
        section.top_margin = Cm(2.0)
        section.bottom_margin = Cm(2.0)
        section.left_margin = Cm(2.2)
        section.right_margin = Cm(2.2)

    # Style par défaut
    normal_style = doc.styles['Normal']
    normal_style.font.name = 'Arial'
    normal_style.font.size = Pt(9.5)
    normal_style.font.color.rgb = RGBColor(40, 40, 40)

    # ---------------------------------------------------------
    # TITRE & EN-TÊTE
    # ---------------------------------------------------------
    p_title = doc.add_paragraph()
    p_title.paragraph_format.space_before = Pt(0)
    p_title.paragraph_format.space_after = Pt(2)
    r_title = p_title.add_run("DEVIS")
    r_title.font.size = Pt(20)
    r_title.font.bold = True
    r_title.font.color.rgb = RGBColor(10, 10, 10)

    p_sub = doc.add_paragraph()
    p_sub.paragraph_format.space_after = Pt(12)
    r_sub = p_sub.add_run("Création du site HAUSMAN - Showroom digital de mode (Paris)")
    r_sub.font.size = Pt(10)
    r_sub.font.italic = True
    r_sub.font.color.rgb = RGBColor(90, 90, 90)

    # Tableau Méta : Date / Client / Prestataire
    table_meta = doc.add_table(rows=2, cols=4)
    table_meta.alignment = WD_TABLE_ALIGNMENT.CENTER
    table_meta.autofit = False
    table_meta.columns[0].width = Cm(3.0)
    table_meta.columns[1].width = Cm(5.5)
    table_meta.columns[2].width = Cm(3.0)
    table_meta.columns[3].width = Cm(5.1)
    set_table_horizontal_borders(table_meta, color="E5E7EB", sz="4")

    # Ligne 1 : Date & Client
    cell_d_lbl = table_meta.cell(0, 0)
    cell_d_lbl.paragraphs[0].add_run("Date").font.size = Pt(9.5)
    cell_d_val = table_meta.cell(0, 1)
    cell_d_val.paragraphs[0].add_run("24 septembre 2026").font.size = Pt(9.5)

    cell_c_lbl = table_meta.cell(0, 2)
    cell_c_lbl.paragraphs[0].add_run("Client").font.size = Pt(9.5)
    cell_c_val = table_meta.cell(0, 3)
    cell_c_val.paragraphs[0].add_run("HAUSMAN").bold = True

    # Ligne 2 : Prestataire
    cell_p_lbl = table_meta.cell(1, 0)
    cell_p_lbl.paragraphs[0].add_run("Prestataire").font.size = Pt(9.5)
    cell_p_val = table_meta.cell(1, 1)
    r_p = cell_p_val.paragraphs[0].add_run("BIAOU Marius")
    r_p.bold = True
    r_p.font.size = Pt(9.5)

    cell_empty1 = table_meta.cell(1, 2)
    cell_empty2 = table_meta.cell(1, 3)

    for row in table_meta.rows:
        for cell in row.cells:
            set_cell_margins(cell, top=80, bottom=80, left=60, right=60)

    doc.add_paragraph().paragraph_format.space_after = Pt(8)

    # ---------------------------------------------------------
    # 1. OBJET DU PROJET
    # ---------------------------------------------------------
    h1 = doc.add_paragraph()
    h1.paragraph_format.space_before = Pt(10)
    h1.paragraph_format.space_after = Pt(4)
    r_h1 = h1.add_run("1. Objet du projet")
    r_h1.font.size = Pt(11)
    r_h1.font.bold = True
    r_h1.font.color.rgb = RGBColor(10, 10, 10)

    # Ligne de séparation sous titre
    p_line = doc.add_paragraph()
    p_line.paragraph_format.space_after = Pt(6)
    p_line_border = parse_xml(f'<w:pBdr {nsdecls("w")}><w:bottom w:val="single" w:sz="6" w:space="1" w:color="0A0A0A"/></w:pBdr>')
    p_line._p.get_or_add_pPr().append(p_line_border)

    p_obj = doc.add_paragraph()
    p_obj.paragraph_format.space_after = Pt(10)
    p_obj.paragraph_format.line_spacing = 1.15
    p_obj.add_run(
        "Conception et développement du site HAUSMAN : un showroom digital de mode présentant le catalogue "
        "de location de vêtements, accessoires et pièces designer / archive, ainsi que les projets réalisés "
        "(éditoriaux, campagnes, collaborations). Le site fonctionne comme une vitrine et une galerie; il ne "
        "comporte aucune fonctionnalité e-commerce (pas de panier, pas de paiement en ligne, pas de "
        "réservation automatique)."
    )

    # ---------------------------------------------------------
    # 2. TECHNOLOGIE UTILISÉE
    # ---------------------------------------------------------
    h2 = doc.add_paragraph()
    h2.paragraph_format.space_before = Pt(10)
    h2.paragraph_format.space_after = Pt(4)
    r_h2 = h2.add_run("2. Technologie utilisée")
    r_h2.font.size = Pt(11)
    r_h2.font.bold = True
    r_h2.font.color.rgb = RGBColor(10, 10, 10)

    p_line2 = doc.add_paragraph()
    p_line2.paragraph_format.space_after = Pt(6)
    p_line2_bdr = parse_xml(f'<w:pBdr {nsdecls("w")}><w:bottom w:val="single" w:sz="6" w:space="1" w:color="0A0A0A"/></w:pBdr>')
    p_line2._p.get_or_add_pPr().append(p_line2_bdr)

    tech_bullets = [
        ("Framework & Front-end : ", "Front-end sur-mesure ultra-léger (HTML5, CSS3, Vanilla JS) avec architecture Laravel (PHP) et Blade pour un rendu serveur natif, ultra-fluide, garantissant un temps de chargement instantané (< 0.3s) et un référencement naturel (SEO) optimal."),
        ("Base de données : ", "MySQL."),
        ("Panel d'administration sur-mesure (CMS custom développé en Laravel) : ", "ajout, modification, masquage des vêtements (avec auto-référence HSMN-xxx et 4 statuts privés), upload des 5 photos par pièce et gestion des projets, sans aucune intervention du développeur."),
        ("Hébergement : ", "OVH (mutualisé ou VPS selon le volume de trafic et de stockage)."),
        ("Propriété & Accès : ", "Compte d'hébergement OVH et nom de domaine créés au nom de HAUSMAN, avec transfert complet des accès à la livraison.")
    ]

    for b_title, b_desc in tech_bullets:
        p_b = doc.add_paragraph()
        p_b.paragraph_format.space_after = Pt(3)
        p_b.paragraph_format.left_indent = Cm(0.5)
        r_bt = p_b.add_run(f"• {b_title}")
        r_bt.bold = True
        r_bt.font.size = Pt(9)
        r_bd = p_b.add_run(b_desc)
        r_bd.font.size = Pt(9)

    p_tech_sum = doc.add_paragraph()
    p_tech_sum.paragraph_format.space_before = Pt(4)
    p_tech_sum.paragraph_format.space_after = Pt(10)
    p_tech_sum.paragraph_format.line_spacing = 1.15
    p_tech_sum.add_run(
        "Cette stack permet d'obtenir un résultat visuel et fonctionnel équivalent à une solution type Webflow, "
        "avec une interface d'administration entièrement adaptée aux besoins spécifiques de HAUSMAN (fiches "
        "vêtements multi-photos, catégories, filtres). L'ensemble (code, hébergement, données) reste hébergé en "
        "France chez OVH, et la propriété du site est entièrement transférée à HAUSMAN."
    )

    # ---------------------------------------------------------
    # 3. PÉRIMÈTRE INCLUS
    # ---------------------------------------------------------
    h3 = doc.add_paragraph()
    h3.paragraph_format.space_before = Pt(10)
    h3.paragraph_format.space_after = Pt(4)
    r_h3 = h3.add_run("3. Périmètre inclus")
    r_h3.font.size = Pt(11)
    r_h3.font.bold = True
    r_h3.font.color.rgb = RGBColor(10, 10, 10)

    p_line3 = doc.add_paragraph()
    p_line3.paragraph_format.space_after = Pt(6)
    p_line3_bdr = parse_xml(f'<w:pBdr {nsdecls("w")}><w:bottom w:val="single" w:sz="6" w:space="1" w:color="0A0A0A"/></w:pBdr>')
    p_line3._p.get_or_add_pPr().append(p_line3_bdr)

    p_pf = doc.add_paragraph()
    p_pf.paragraph_format.space_after = Pt(3)
    r_pf = p_pf.add_run("Pages et fonctionnalités")
    r_pf.bold = True
    r_pf.font.size = Pt(9.5)

    perim_bullets = [
        "Home / Intro - animation flash de 20-30 pièces d'archives (~2.0s) puis transition fluide vers le Menu central",
        "Menu d'accueil - logo fixe, 4 liens majeurs épurés (COLLECTION, PROJECTS, ABOUT, CONTACT), footer discret",
        "Collection - catalogue filtrable au ratio 4:5 (marque, catégories), survol révélant la silhouette portée mannequin, overlay filtres et recherche loupe par référence (HSMN-xxx)",
        "Fiche vêtement - galerie de 5 photos haute définition (plat face, dos, détail, porté face, silhouette), informations sobres (marque, nom, catégorie, taille, mensurations mannequin), mention discrète \"Rental upon request\"",
        "Projects - portfolio 4:5 avec titre, année, publication, crédits détaillés, défilement horizontal fluide des visuels et bouton NEXT PROJECT →",
        "About - page courte et épurée présentant HAUSMAN comme entité indépendante de curation",
        "Contact - formulaire structuré typographique (nom, email/Instagram, type de projet, dates, pièces demandées, message) + anti-spam invisible et liens directs WhatsApp, Instagram, Email",
        "Design : direction artistique minimaliste, silencieuse, inspirée galerie/mode (fond blanc pur, grands espaces, typographie sobre, 0 bruit)",
        "Navigation bilingue FR / EN (voir section coût dédié ci-dessous)",
        "Responsive mobile-first (1 colonne stricte sur smartphone pour une pureté visuelle absolue)",
        "Panel d'administration sur-mesure pour gérer vêtements (auto-référence HSMN-xxx, 4 statuts privés) et projets en totale autonomie",
        "Bases SEO : titres, meta-descriptions, URLs propres, balises Open Graph (partage Instagram/iMessage/WhatsApp), indexation",
        "Favicon, page 404 sur-mesure et pages légales de base (mentions légales / politique de confidentialité)",
        "Optimisation raisonnable des images (WebP) et des performances de chargement",
        "Formation à la livraison pour l'ajout autonome de vêtements et projets"
    ]

    for p_item in perim_bullets:
        p_bp = doc.add_paragraph()
        p_bp.paragraph_format.space_after = Pt(2)
        p_bp.paragraph_format.left_indent = Cm(0.5)
        p_bp.add_run(f"• {p_item}").font.size = Pt(9)

    p_mq = doc.add_paragraph()
    p_mq.paragraph_format.space_before = Pt(4)
    p_mq.paragraph_format.space_after = Pt(2)
    r_mq = p_mq.add_run("Maquettes et corrections")
    r_mq.bold = True
    r_mq.font.size = Pt(9.5)

    mq_bullets = [
        "1 proposition de direction artistique (maquette de la Home + 1 fiche vêtement)",
        "2 allers-retours de corrections inclus sur la maquette et sur le développement",
        "Au-delà : ajustements facturés en supplément sur devis"
    ]
    for m_item in mq_bullets:
        p_bm = doc.add_paragraph()
        p_bm.paragraph_format.space_after = Pt(2)
        p_bm.paragraph_format.left_indent = Cm(0.5)
        p_bm.add_run(f"• {m_item}").font.size = Pt(9)

    doc.add_paragraph().paragraph_format.space_after = Pt(6)

    # ---------------------------------------------------------
    # 4. NON INCLUS DANS CETTE V1
    # ---------------------------------------------------------
    h4 = doc.add_paragraph()
    h4.paragraph_format.space_before = Pt(8)
    h4.paragraph_format.space_after = Pt(4)
    r_h4 = h4.add_run("4. Non inclus dans cette V1")
    r_h4.font.size = Pt(11)
    r_h4.font.bold = True
    r_h4.font.color.rgb = RGBColor(10, 10, 10)

    p_line4 = doc.add_paragraph()
    p_line4.paragraph_format.space_after = Pt(6)
    p_line4_bdr = parse_xml(f'<w:pBdr {nsdecls("w")}><w:bottom w:val="single" w:sz="6" w:space="1" w:color="0A0A0A"/></w:pBdr>')
    p_line4._p.get_or_add_pPr().append(p_line4_bdr)

    non_inc_bullets = [
        "Fonctionnalités e-commerce (panier, paiement en ligne, checkout, réservation automatique, calendrier public, caution en ligne)",
        "Espace professionnels, CRM, gestion des dépôts, contrats - évolutions possibles ultérieurement",
        "Rédaction des textes et fourniture des photographies (fournies par HAUSMAN)",
        "Achat du nom de domaine (facturé au prix réel du registrar, au nom de HAUSMAN)"
    ]
    for ni_item in non_inc_bullets:
        p_bni = doc.add_paragraph()
        p_bni.paragraph_format.space_after = Pt(2)
        p_bni.paragraph_format.left_indent = Cm(0.5)
        p_bni.add_run(f"• {ni_item}").font.size = Pt(9)

    doc.add_paragraph().paragraph_format.space_after = Pt(6)

    # ---------------------------------------------------------
    # 5. COÛT DU BILINGUE FR / EN
    # ---------------------------------------------------------
    h5 = doc.add_paragraph()
    h5.paragraph_format.space_before = Pt(8)
    h5.paragraph_format.space_after = Pt(4)
    r_h5 = h5.add_run("5. Coût du bilingue FR / EN")
    r_h5.font.size = Pt(11)
    r_h5.font.bold = True
    r_h5.font.color.rgb = RGBColor(10, 10, 10)

    p_line5 = doc.add_paragraph()
    p_line5.paragraph_format.space_after = Pt(6)
    p_line5_bdr = parse_xml(f'<w:pBdr {nsdecls("w")}><w:bottom w:val="single" w:sz="6" w:space="1" w:color="0A0A0A"/></w:pBdr>')
    p_line5._p.get_or_add_pPr().append(p_line5_bdr)

    p_bil = doc.add_paragraph()
    p_bil.paragraph_format.space_after = Pt(6)
    p_bil.paragraph_format.line_spacing = 1.15
    p_bil.add_run(
        "Le tarif ci-dessous inclut la structure technique bilingue (routing, sélecteur de langue, gestion des "
        "contenus dans les deux langues). La saisie des traductions elle-même reste à la charge de HAUSMAN, "
        "sauf demande contraire."
    )

    table_bil = doc.add_table(rows=2, cols=2)
    table_bil.alignment = WD_TABLE_ALIGNMENT.CENTER
    table_bil.autofit = False
    table_bil.columns[0].width = Cm(13.0)
    table_bil.columns[1].width = Cm(3.6)
    set_table_horizontal_borders(table_bil, color="E5E7EB", sz="4")

    # Header
    c0 = table_bil.cell(0, 0)
    c0.paragraphs[0].add_run("Poste").bold = True
    c1 = table_bil.cell(0, 1)
    c1.paragraphs[0].add_run("Coût").bold = True
    c1.paragraphs[0].alignment = WD_ALIGN_PARAGRAPH.RIGHT

    # Row 1
    r1_0 = table_bil.cell(1, 0)
    r1_0.paragraphs[0].add_run("Structure bilingue FR / EN (inclus dans le prix total)").font.size = Pt(9)
    r1_1 = table_bil.cell(1, 1)
    r1_1.paragraphs[0].add_run("Inclus").font.size = Pt(9)
    r1_1.paragraphs[0].alignment = WD_ALIGN_PARAGRAPH.RIGHT

    for row in table_bil.rows:
        for cell in row.cells:
            set_cell_margins(cell, top=70, bottom=70, left=80, right=80)

    doc.add_paragraph().paragraph_format.space_after = Pt(6)

    # ---------------------------------------------------------
    # 6. COÛTS D'HÉBERGEMENT ET D'OUTILS (RÉCURRENTS, HORS FORFAIT)
    # ---------------------------------------------------------
    h6 = doc.add_paragraph()
    h6.paragraph_format.space_before = Pt(8)
    h6.paragraph_format.space_after = Pt(4)
    r_h6 = h6.add_run("6. Coûts d'hébergement et d'outils (récurrents, hors forfait)")
    r_h6.font.size = Pt(11)
    r_h6.font.bold = True
    r_h6.font.color.rgb = RGBColor(10, 10, 10)

    p_line6 = doc.add_paragraph()
    p_line6.paragraph_format.space_after = Pt(6)
    p_line6_bdr = parse_xml(f'<w:pBdr {nsdecls("w")}><w:bottom w:val="single" w:sz="6" w:space="1" w:color="0A0A0A"/></w:pBdr>')
    p_line6._p.get_or_add_pPr().append(p_line6_bdr)

    p_heb = doc.add_paragraph()
    p_heb.paragraph_format.space_after = Pt(6)
    p_heb.paragraph_format.line_spacing = 1.15
    p_heb.add_run(
        "Ces coûts sont payés directement par HAUSMAN auprès d'OVH - ils ne sont pas facturés par le "
        "développeur, et le compte est créé au nom de HAUSMAN dès le départ."
    )

    table_heb = doc.add_table(rows=5, cols=3)
    table_heb.alignment = WD_TABLE_ALIGNMENT.CENTER
    table_heb.autofit = False
    table_heb.columns[0].width = Cm(5.5)
    table_heb.columns[1].width = Cm(7.5)
    table_heb.columns[2].width = Cm(3.6)
    set_table_horizontal_borders(table_heb, color="E5E7EB", sz="4")

    headers_heb = ["Service", "Usage", "Coût estimé"]
    for i, title in enumerate(headers_heb):
        c = table_heb.cell(0, i)
        p = c.paragraphs[0]
        p.add_run(title).bold = True
        p.runs[0].font.size = Pt(9)
        if i == 2:
            p.alignment = WD_ALIGN_PARAGRAPH.RIGHT

    heb_rows = [
        ("Hébergement mutualisé OVH", "Suffisant pour le lancement (V1)", "~4–8 € / mois"),
        ("VPS OVH (si besoin de monter en charge)", "À prévoir si trafic/stock important", "~8–15 € / mois"),
        ("Nom de domaine (OVH)", "Ex. hausman.com", "~10–15 € / an"),
        ("Certificat SSL", "Généralement inclus chez OVH", "0 €")
    ]

    for row_idx, (serv, usg, cost) in enumerate(heb_rows, start=1):
        c0 = table_heb.cell(row_idx, 0)
        c0.paragraphs[0].add_run(serv).font.size = Pt(9)
        c1 = table_heb.cell(row_idx, 1)
        c1.paragraphs[0].add_run(usg).font.size = Pt(9)
        c2 = table_heb.cell(row_idx, 2)
        c2.paragraphs[0].add_run(cost).font.size = Pt(9)
        c2.paragraphs[0].alignment = WD_ALIGN_PARAGRAPH.RIGHT

    for row in table_heb.rows:
        for cell in row.cells:
            set_cell_margins(cell, top=70, bottom=70, left=80, right=80)

    p_heb_note = doc.add_paragraph()
    p_heb_note.paragraph_format.space_before = Pt(4)
    p_heb_note.paragraph_format.space_after = Pt(8)
    p_heb_note.paragraph_format.line_spacing = 1.15
    r_hn = p_heb_note.add_run(
        "L'offre mutualisée OVH est suffisante pour démarrer. Un passage en VPS ne sera nécessaire qu'en cas de "
        "trafic ou de volume de photos important - HAUSMAN en sera informé avant tout changement d'offre."
    )
    r_hn.font.italic = True
    r_hn.font.size = Pt(8.5)

    # ---------------------------------------------------------
    # 7. PRIX TOTAL
    # ---------------------------------------------------------
    h7 = doc.add_paragraph()
    h7.paragraph_format.space_before = Pt(8)
    h7.paragraph_format.space_after = Pt(4)
    r_h7 = h7.add_run("7. Prix total")
    r_h7.font.size = Pt(11)
    r_h7.font.bold = True
    r_h7.font.color.rgb = RGBColor(10, 10, 10)

    p_line7 = doc.add_paragraph()
    p_line7.paragraph_format.space_after = Pt(6)
    p_line7_bdr = parse_xml(f'<w:pBdr {nsdecls("w")}><w:bottom w:val="single" w:sz="6" w:space="1" w:color="0A0A0A"/></w:pBdr>')
    p_line7._p.get_or_add_pPr().append(p_line7_bdr)

    table_tot = doc.add_table(rows=1, cols=2)
    table_tot.alignment = WD_TABLE_ALIGNMENT.CENTER
    table_tot.autofit = False
    table_tot.columns[0].width = Cm(13.0)
    table_tot.columns[1].width = Cm(3.6)
    set_table_horizontal_borders(table_tot, color="E5E7EB", sz="4")

    c_tot0 = table_tot.cell(0, 0)
    c_tot0.paragraphs[0].add_run("Développement complet du site HAUSMAN\n(V1) périmètre décrit en section 3").font.size = Pt(9.5)
    c_tot1 = table_tot.cell(0, 1)
    r_prx = c_tot1.paragraphs[0].add_run("620 €")
    r_prx.bold = True
    r_prx.font.size = Pt(11)
    c_tot1.paragraphs[0].alignment = WD_ALIGN_PARAGRAPH.RIGHT

    for cell in table_tot.rows[0].cells:
        set_cell_margins(cell, top=80, bottom=80, left=80, right=80)

    p_tot_note = doc.add_paragraph()
    p_tot_note.paragraph_format.space_before = Pt(6)
    p_tot_note.paragraph_format.space_after = Pt(10)
    p_tot_note.paragraph_format.line_spacing = 1.15
    r_tn = p_tot_note.add_run(
        "Ce tarif est proposé dans un cadre de lancement / mise en place d'une première collaboration. Il reste "
        "ouvert à la discussion, à la hausse comme à la baisse, selon les ajustements de périmètre que nous "
        "validerons ensemble avant le démarrage du projet."
    )
    r_tn.font.italic = True
    r_tn.font.size = Pt(8.5)

    # ---------------------------------------------------------
    # 8. DÉLAI ESTIMÉ
    # ---------------------------------------------------------
    h8 = doc.add_paragraph()
    h8.paragraph_format.space_before = Pt(8)
    h8.paragraph_format.space_after = Pt(4)
    r_h8 = h8.add_run("8. Délai estimé")
    r_h8.font.size = Pt(11)
    r_h8.font.bold = True
    r_h8.font.color.rgb = RGBColor(10, 10, 10)

    p_line8 = doc.add_paragraph()
    p_line8.paragraph_format.space_after = Pt(6)
    p_line8_bdr = parse_xml(f'<w:pBdr {nsdecls("w")}><w:bottom w:val="single" w:sz="6" w:space="1" w:color="0A0A0A"/></w:pBdr>')
    p_line8._p.get_or_add_pPr().append(p_line8_bdr)

    p_del = doc.add_paragraph()
    p_del.paragraph_format.space_after = Pt(8)
    p_del.add_run("1 à 2 semaines à réception des photos, des textes et après validation de la maquette (maquette interactive déjà opérationnelle pour recette).").font.size = Pt(9.5)

    # ---------------------------------------------------------
    # 9. MAINTENANCE APRÈS LIVRAISON
    # ---------------------------------------------------------
    h9 = doc.add_paragraph()
    h9.paragraph_format.space_before = Pt(8)
    h9.paragraph_format.space_after = Pt(4)
    r_h9 = h9.add_run("9. Maintenance après livraison")
    r_h9.font.size = Pt(11)
    r_h9.font.bold = True
    r_h9.font.color.rgb = RGBColor(10, 10, 10)

    p_line9 = doc.add_paragraph()
    p_line9.paragraph_format.space_after = Pt(6)
    p_line9_bdr = parse_xml(f'<w:pBdr {nsdecls("w")}><w:bottom w:val="single" w:sz="6" w:space="1" w:color="0A0A0A"/></w:pBdr>')
    p_line9._p.get_or_add_pPr().append(p_line9_bdr)

    maint_bullets = [
        "Corrections de bugs éventuels : 1 mois de garantie offerte après la mise en ligne",
        "Au-delà : maintenance proposée sur devis séparé, ou forfait mensuel sur demande",
        "Toute évolution fonctionnelle (espace professionnels avancé, réservations, paiements en ligne, CRM...) fera l'objet d'un devis complémentaire"
    ]
    for mb_item in maint_bullets:
        p_bm = doc.add_paragraph()
        p_bm.paragraph_format.space_after = Pt(2)
        p_bm.paragraph_format.left_indent = Cm(0.5)
        p_bm.add_run(f"• {mb_item}").font.size = Pt(9)

    doc.add_paragraph().paragraph_format.space_after = Pt(6)

    # ---------------------------------------------------------
    # 10. CE QUI RESTE ADMINISTRABLE PAR HAUSMAN SANS LE DÉVELOPPEUR
    # ---------------------------------------------------------
    h10 = doc.add_paragraph()
    h10.paragraph_format.space_before = Pt(8)
    h10.paragraph_format.space_after = Pt(4)
    r_h10 = h10.add_run("10. Ce qui reste administrable par HAUSMAN sans le développeur")
    r_h10.font.size = Pt(11)
    r_h10.font.bold = True
    r_h10.font.color.rgb = RGBColor(10, 10, 10)

    p_line10 = doc.add_paragraph()
    p_line10.paragraph_format.space_after = Pt(6)
    p_line10_bdr = parse_xml(f'<w:pBdr {nsdecls("w")}><w:bottom w:val="single" w:sz="6" w:space="1" w:color="0A0A0A"/></w:pBdr>')
    p_line10._p.get_or_add_pPr().append(p_line10_bdr)

    adm_bullets = [
        "Ajouter, modifier, masquer ou supprimer un vêtement (série de 5 photos HD, marque, nom, catégorie, taille, mensurations mannequin, référence auto HSMN-xxx, statut privé Available/Reserved/On Loan/Unavailable)",
        "Ajouter, modifier, masquer ou supprimer un projet (titre, année, crédits, galerie d'images)",
        "Mise à jour des textes des pages About et Contact",
        "Consultation et suivi des demandes de prêt (pull requests) reçues des stylistes"
    ]
    for ab_item in adm_bullets:
        p_ba = doc.add_paragraph()
        p_ba.paragraph_format.space_after = Pt(2)
        p_ba.paragraph_format.left_indent = Cm(0.5)
        p_ba.add_run(f"• {ab_item}").font.size = Pt(9)

    p_adm_note = doc.add_paragraph()
    p_adm_note.paragraph_format.space_before = Pt(2)
    p_adm_note.paragraph_format.space_after = Pt(8)
    p_adm_note.paragraph_format.line_spacing = 1.15
    r_an = p_adm_note.add_run(
        "Toute modification de structure du site (nouvelle page, nouveau type de contenu, refonte de la navigation) "
        "reste du domaine du développeur."
    )
    r_an.font.size = Pt(9)

    # ---------------------------------------------------------
    # 11. LIVRABLES À LA FIN DU PROJET
    # ---------------------------------------------------------
    h11 = doc.add_paragraph()
    h11.paragraph_format.space_before = Pt(8)
    h11.paragraph_format.space_after = Pt(4)
    r_h11 = h11.add_run("11. Livrables à la fin du projet")
    r_h11.font.size = Pt(11)
    r_h11.font.bold = True
    r_h11.font.color.rgb = RGBColor(10, 10, 10)

    p_line11 = doc.add_paragraph()
    p_line11.paragraph_format.space_after = Pt(6)
    p_line11_bdr = parse_xml(f'<w:pBdr {nsdecls("w")}><w:bottom w:val="single" w:sz="6" w:space="1" w:color="0A0A0A"/></w:pBdr>')
    p_line11._p.get_or_add_pPr().append(p_line11_bdr)

    livrables_bullets = [
        "Site responsive complet, en ligne",
        "Accès administrateur complet (hébergement OVH, nom de domaine) au nom de HAUSMAN",
        "Accès au panel d'administration du contenu",
        "Nom de domaine connecté",
        "Formulaire de contact fonctionnel avec anti-spam invisible",
        "Bases SEO en place (titres, descriptions, balises Open Graph, URLs, indexation)",
        "Favicon, page 404 sur-mesure et pages légales",
        "Courte session de formation à la prise en main du panel d'administration"
    ]
    for lb_item in livrables_bullets:
        p_bl = doc.add_paragraph()
        p_bl.paragraph_format.space_after = Pt(2)
        p_bl.paragraph_format.left_indent = Cm(0.5)
        p_bl.add_run(f"• {lb_item}").font.size = Pt(9)

    doc.add_paragraph().paragraph_format.space_after = Pt(14)

    # Bas de page / Signature
    p_fin = doc.add_paragraph()
    p_fin.paragraph_format.space_after = Pt(10)
    p_fin.add_run("Devis établi le 24 septembre 2026").bold = True

    # Save
    doc.save(DOCX_OUTPUT_PATH)
    print(f"Devis DOCX successfully created: {DOCX_OUTPUT_PATH}")

if __name__ == "__main__":
    build_devis()
