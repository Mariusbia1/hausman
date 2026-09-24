#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
HAUSMAN Paris — Générateur de Devis & Proposition Technique Officielle (.docx)
Montant : 620,00 € — Conforme aux 42 sections du Cahier des Charges
"""

import docx
from docx import Document
from docx.shared import Inches, Pt, RGBColor, Cm
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT, WD_ALIGN_VERTICAL
from docx.oxml import parse_xml, OxmlElement
from docx.oxml.ns import nsdecls, qn

DOCX_OUTPUT_PATH = "/Users/user/Desktop/Mes projets web/HAUSMAN/HAUSMAN_Devis_et_Proposition_V1.docx"

def set_cell_background(cell, hex_color):
    """Set background color for a table cell."""
    shading_elm = parse_xml(f'<w:shd {nsdecls("w")} w:fill="{hex_color}"/>')
    cell._tc.get_or_add_tcPr().append(shading_elm)

def set_cell_margins(cell, top=100, bottom=100, left=150, right=150):
    """Set inner margins (padding) for a table cell in dxa (1 pt = 20 dxa)."""
    tcPr = cell._tc.get_or_add_tcPr()
    tcMar = OxmlElement('w:tcMar')
    for m_name, m_val in [('top', top), ('bottom', bottom), ('left', left), ('right', right)]:
        node = OxmlElement(f'w:{m_name}')
        node.set(qn('w:w'), str(m_val))
        node.set(qn('w:type'), 'dxa')
        tcMar.append(node)
    tcPr.append(tcMar)

def set_table_borders(table, color="E4E4E7", sz="4", val="single"):
    """Apply clean subtle borders to a table."""
    tblPr = table._tbl.tblPr
    borders = parse_xml(
        f'<w:tblBorders {nsdecls("w")}>'
        f'  <w:top w:val="{val}" w:sz="{sz}" w:space="0" w:color="{color}"/>'
        f'  <w:left w:val="{val}" w:sz="{sz}" w:space="0" w:color="{color}"/>'
        f'  <w:bottom w:val="{val}" w:sz="{sz}" w:space="0" w:color="{color}"/>'
        f'  <w:right w:val="{val}" w:sz="{sz}" w:space="0" w:color="{color}"/>'
        f'  <w:insideH w:val="{val}" w:sz="{sz}" w:space="0" w:color="{color}"/>'
        f'  <w:insideV w:val="{val}" w:sz="{sz}" w:space="0" w:color="{color}"/>'
        f'</w:tblBorders>'
    )
    tblPr.append(borders)

def build_word_quote():
    doc = Document()

    # Page Margins (2.0 cm)
    for section in doc.sections:
        section.top_margin = Cm(2.0)
        section.bottom_margin = Cm(2.0)
        section.left_margin = Cm(2.0)
        section.right_margin = Cm(2.0)
        
        # Header & Footer setup
        header = section.header
        hp = header.paragraphs[0]
        hp.text = "HAUSMAN PARIS — DEVIS COMMERCIAL & PROPOSITION TECHNIQUE V1"
        hp.alignment = WD_ALIGN_PARAGRAPH.RIGHT
        hp.style.font.name = "Arial"
        hp.style.font.size = Pt(8)
        hp.style.font.color.rgb = RGBColor(150, 150, 150)

        footer = section.footer
        fp = footer.paragraphs[0]
        fp.text = "Document Confidentiel • Devis n° DEV-2026-HSMN01 • Page 1 / 3"
        fp.alignment = WD_ALIGN_PARAGRAPH.CENTER
        fp.style.font.name = "Arial"
        fp.style.font.size = Pt(8)
        fp.style.font.color.rgb = RGBColor(150, 150, 150)

    # Base formatting
    normal_style = doc.styles['Normal']
    normal_style.font.name = 'Arial'
    normal_style.font.size = Pt(9.5)
    normal_style.font.color.rgb = RGBColor(30, 30, 30)

    # ---------------------------------------------------------
    # EN-TÊTE DU DEVIS
    # ---------------------------------------------------------
    p_title = doc.add_paragraph()
    p_title.paragraph_format.space_before = Pt(0)
    p_title.paragraph_format.space_after = Pt(2)
    run_title = p_title.add_run("HAUSMAN PARIS")
    run_title.font.size = Pt(22)
    run_title.font.bold = True
    run_title.font.color.rgb = RGBColor(10, 10, 10)

    p_sub = doc.add_paragraph()
    p_sub.paragraph_format.space_after = Pt(12)
    run_sub = p_sub.add_run("DEVIS COMMERCIAL & PROPOSITION D'ARCHITECTURE DIGITALE V1")
    run_sub.font.size = Pt(10)
    run_sub.font.bold = True
    run_sub.font.color.rgb = RGBColor(100, 100, 100)

    # Cadre Émetteur / Client
    table_coords = doc.add_table(rows=1, cols=2)
    table_coords.alignment = WD_TABLE_ALIGNMENT.CENTER
    table_coords.autofit = False
    table_coords.columns[0].width = Cm(8.5)
    table_coords.columns[1].width = Cm(8.5)
    set_table_borders(table_coords, color="E5E7EB", sz="4")

    # Cellule Gauche : Émetteur & Méta
    cell_left = table_coords.cell(0, 0)
    set_cell_background(cell_left, "F9FAFB")
    set_cell_margins(cell_left, top=140, bottom=140, left=180, right=180)
    p_em = cell_left.paragraphs[0]
    p_em.add_run("INFORMATIONS DU DEVIS\n").bold = True
    p_em.add_run("Devis N° : ").bold = True
    p_em.add_run("DEV-2026-HSMN01\n")
    p_em.add_run("Date d'émission : ").bold = True
    p_em.add_run("24 Septembre 2026\n")
    p_em.add_run("Validité de l'offre : ").bold = True
    p_em.add_run("30 jours\n")
    p_em.add_run("Statut : ").bold = True
    p_em.add_run("Proposition Contractuelle")

    # Cellule Droite : Destinataire / Client
    cell_right = table_coords.cell(0, 1)
    set_cell_background(cell_right, "F9FAFB")
    set_cell_margins(cell_right, top=140, bottom=140, left=180, right=180)
    p_cl = cell_right.paragraphs[0]
    p_cl.add_run("CLIENT / DESTINATAIRE\n").bold = True
    p_cl.add_run("HAUSMAN Paris\n").bold = True
    p_cl.add_run("Digital Showroom & Fashion Archive\n")
    p_cl.add_run("Paris, France\n")
    p_cl.add_run("Objet : ").bold = True
    p_cl.add_run("Création & Développement du Digital Showroom V1")

    doc.add_paragraph().paragraph_format.space_after = Pt(6)

    # ---------------------------------------------------------
    # 1. RÉPONSES AU QUESTIONNAIRE DU CAHIER DES CHARGES
    # ---------------------------------------------------------
    h1 = doc.add_paragraph()
    h1.paragraph_format.space_before = Pt(10)
    h1.paragraph_format.space_after = Pt(4)
    run_h1 = h1.add_run("1. Réponses au Questionnaire Technique du Client")
    run_h1.font.size = Pt(12)
    run_h1.font.bold = True
    run_h1.font.color.rgb = RGBColor(10, 10, 10)

    # Question 1 : Recommandation technologique
    p_q1 = doc.add_paragraph()
    p_q1.paragraph_format.space_after = Pt(2)
    r_q1 = p_q1.add_run("A. Recommandation Technologique & Choix de l'Architecture")
    r_q1.bold = True
    r_q1.font.size = Pt(10)
    r_q1.font.color.rgb = RGBColor(40, 40, 40)

    p_r1 = doc.add_paragraph()
    p_r1.paragraph_format.space_after = Pt(4)
    p_r1.add_run(
        "Pour répondre précisément aux exigences de minimalisme radical, de fluidité et d'élégance silencieuse exprimées dans le cahier des charges, nous préconisons une "
    )
    p_r1.add_run("architecture découplée sur-mesure (Modern Vanilla JS / HTML5 / CSS3 & API Backend) ").bold = True
    p_r1.add_run("plutôt qu'un CMS traditionnel lourd type WordPress ou Shopify.\n\n")
    
    p_r1.add_run("• ")
    p_r1.add_run("Vitesse de chargement instantanée (< 0.3s) : ").bold = True
    p_r1.add_run("Aucune latence de base de données publique. Les photographies d'archives au ratio strict 4:5 s'affichent immédiatement en haute définition sans ralentissement.\n")
    
    p_r1.add_run("• ")
    p_r1.add_run("Esthétique pure & Animations sur-mesure : ").bold = True
    p_r1.add_run("Permet d'exécuter avec une fluidité parfaite le défilement flash d'introduction (25 pièces en 2.0s), le survol dynamique révélant la silhouette portée, et la lightbox plein écran sans aucun bug de template.\n")
    
    p_r1.add_run("• ")
    p_r1.add_run("Sécurité absolue & Zéro maintenance : ").bold = True
    p_r1.add_run("Aucune faille de sécurité liée aux extensions WordPress, aucune mise à jour corrective obligatoire, surface d'attaque quasi-nulle.\n")
    
    p_r1.add_run("• ")
    p_r1.add_run("Zéro abonnement mensuel : ").bold = True
    p_r1.add_run("Vous ne payez aucun abonnement logiciel récurrent (contrairement à Shopify à 36€/mois). Vous êtes propriétaire exclusif à 100% de votre site.")

    # Question 2 : Coûts de fonctionnement annuels
    p_q2 = doc.add_paragraph()
    p_q2.paragraph_format.space_before = Pt(6)
    p_q2.paragraph_format.space_after = Pt(2)
    r_q2 = p_q2.add_run("B. Estimation des Coûts Annuels d'Exploitation (Transparence Totale)")
    r_q2.bold = True
    r_q2.font.size = Pt(10)
    r_q2.font.color.rgb = RGBColor(40, 40, 40)

    # Tableau Coûts Annuels
    table_costs = doc.add_table(rows=5, cols=3)
    table_costs.alignment = WD_TABLE_ALIGNMENT.CENTER
    table_costs.autofit = False
    table_costs.columns[0].width = Cm(7.0)
    table_costs.columns[1].width = Cm(5.5)
    table_costs.columns[2].width = Cm(4.5)
    set_table_borders(table_costs, color="E5E7EB", sz="4")

    headers_costs = ["Poste d'Infrastructure", "Fournisseur Recommandé", "Coût Annuel Estimé"]
    for i, title in enumerate(headers_costs):
        cell = table_costs.cell(0, i)
        set_cell_background(cell, "111827")
        set_cell_margins(cell, top=100, bottom=100, left=120, right=120)
        p = cell.paragraphs[0]
        r = p.add_run(title)
        r.bold = True
        r.font.size = Pt(8.5)
        r.font.color.rgb = RGBColor(255, 255, 255)

    costs_rows = [
        ("Nom de domaine (ex. hausman-paris.com)", "OVHcloud / Gandi / Porkbun", "~12 € à 18 € / an"),
        ("Hébergement Web & CDN Haute Vitesse", "Cloudflare Pages / Netlify", "0 € / an (Inclus forfait perf.)"),
        ("Certificat SSL (HTTPS sécurisé)", "Let's Encrypt / Cloudflare", "0 € (Inclus à vie)"),
        ("TOTAL RÉCURRENT D'INFRASTRUCTURE", "—", "~15 € à 20 € / AN SEULEMENT")
    ]

    for row_idx, data in enumerate(costs_rows, start=1):
        for col_idx, text in enumerate(data):
            cell = table_costs.cell(row_idx, col_idx)
            if row_idx == 4:
                set_cell_background(cell, "F3F4F6")
            else:
                set_cell_background(cell, "FFFFFF" if row_idx % 2 == 1 else "F9FAFB")
            set_cell_margins(cell, top=80, bottom=80, left=120, right=120)
            p = cell.paragraphs[0]
            r = p.add_run(text)
            r.font.size = Pt(8.5)
            if row_idx == 4 or col_idx == 2:
                r.bold = True

    doc.add_paragraph().paragraph_format.space_after = Pt(6)

    # ---------------------------------------------------------
    # 2. DÉTAIL DU PÉRIMÈTRE & DES LIVRABLES (LES 42 SECTIONS)
    # ---------------------------------------------------------
    h2 = doc.add_paragraph()
    h2.paragraph_format.space_before = Pt(8)
    h2.paragraph_format.space_after = Pt(4)
    run_h2 = h2.add_run("2. Détail des Prestations & Livrables Inclus (Conforme Cahier des Charges)")
    run_h2.font.size = Pt(12)
    run_h2.font.bold = True
    run_h2.font.color.rgb = RGBColor(10, 10, 10)

    deliverables = [
        ("Lot 1 : Direction Artistique Silencieuse & Design System", 
         "Fond blanc pur (#FFFFFF), typographie noire ultra-sobre, suppression intégrale des codes e-commerce et des bruits visuels. Grille et photographies au ratio strict 4:5. Intégration responsive haute fidélité (1 colonne stricte sur mobile). Bilingue instantané Français / Anglais."),
        
        ("Lot 2 : Splash Screen d'Intro & Page Menu", 
         "Animation d'introduction avant-gardiste présentant 25 pièces et silhouettes d'archives en défilement flash (80ms par image, durée 2.0s pile) avec fondu automatique vers le Menu principal (COLLECTION, PROJECTS, ABOUT, CONTACT). Interaction spéciale sur le logo HAUSMAN."),
        
        ("Lot 3 : Catalogue de Collection & Filtres Dynamiques", 
         "Grille épurée affichant uniquement la photo et la marque. Effet de survol fluide basculant sur la photo portée mannequin. Overlay blanc semi-transparent pour le filtre par créateurs (liste alphabétique) et par catégories (9 catégories). Recherche loupe ultra-rapide par marque ou référence stricte HSMN-xxx."),
        
        ("Lot 4 : Fiche Pièce Spécimen & Lightbox Haute Définition", 
         "Fiche pièce d'archive intégrant strictement 5 photographies HD (plat face, plat dos, détail, porté face, porté silhouette). Lightbox plein écran avec navigation tactile/clavier. Fiche technique discrète avec mensurations du mannequin et mention texte simple 'Rental upon request' pré-remplissant la demande."),
        
        ("Lot 5 : Portfolio Projects / HAUSMAN Files & Pages Éditoriales", 
         "Section Projects avec grille 4:5 et filtre de projets. Fiche projet avec défilement horizontal fluide des visuels paysage, tableau complet des crédits (stylisme, photo, publication) et navigation continue 'NEXT PROJECT →'. Pages About, Contact avec anti-spam invisible et Page 404 sur-mesure."),
        
        ("Lot 6 : Espace d'Administration & Back-Office Showroom", 
         "Console CMS intuitive permettant à l'équipe HAUSMAN d'ajouter des pièces avec génération automatique des références HSMN-xxx, gestion des 4 statuts privés/internes (Available, Reserved, On Loan, Unavailable), upload des séries de 5 photos HD et boîte de réception des demandes de prêt.")
    ]

    for title, desc in deliverables:
        p_lot = doc.add_paragraph()
        p_lot.paragraph_format.space_after = Pt(2)
        r_lt = p_lot.add_run(f"• {title} : ")
        r_lt.bold = True
        r_lt.font.size = Pt(9)
        p_lot.add_run(desc).font.size = Pt(9)

    doc.add_paragraph().paragraph_format.space_after = Pt(6)

    # ---------------------------------------------------------
    # 3. TABLEAU RÉCAPITULATIF DU DEVIS & TARIFICATION
    # ---------------------------------------------------------
    h3 = doc.add_paragraph()
    h3.paragraph_format.space_before = Pt(8)
    h3.paragraph_format.space_after = Pt(4)
    run_h3 = h3.add_run("3. Proposition Tarifaire & Décomposition du Devis")
    run_h3.font.size = Pt(12)
    run_h3.font.bold = True
    run_h3.font.color.rgb = RGBColor(10, 10, 10)

    # Tableau Tarif
    table_price = doc.add_table(rows=5, cols=4)
    table_price.alignment = WD_TABLE_ALIGNMENT.CENTER
    table_price.autofit = False
    table_price.columns[0].width = Cm(8.0)
    table_price.columns[1].width = Cm(2.5)
    table_price.columns[2].width = Cm(3.0)
    table_price.columns[3].width = Cm(3.5)
    set_table_borders(table_price, color="E5E7EB", sz="4")

    headers_price = ["Désignation de la Prestation", "Qté", "Prix Unitaire", "Total Net"]
    for i, title in enumerate(headers_price):
        cell = table_price.cell(0, i)
        set_cell_background(cell, "111827")
        set_cell_margins(cell, top=100, bottom=100, left=120, right=120)
        p = cell.paragraphs[0]
        r = p.add_run(title)
        r.bold = True
        r.font.size = Pt(8.5)
        r.font.color.rgb = RGBColor(255, 255, 255)
        if i in [1, 2, 3]:
            p.alignment = WD_ALIGN_PARAGRAPH.RIGHT

    price_items = [
        ("Développement Front-End Sur-Mesure & Design Silencieux\n(Splash intro 25 pièces, Collection 4:5, Survol porté, Fiche 5 photos, Lightbox HD, Projects, Filtres overlay, Bilingue FR/EN, Mobile 1 col)", "1 Forfait", "320,00 €", "320,00 €"),
        ("Développement Back-Office CMS & Gestion des Archives\n(Auto-référence HSMN-xxx, 4 statuts privés, upload 5 vues WebP, gestion des demandes de pull stylistes)", "1 Forfait", "200,00 €", "200,00 €"),
        ("Optimisation Performances, SEO Sémantique & Déploiement Cloud\n(Compression images, SSL HTTPS, CDN mondial, configuration nom de domaine)", "1 Forfait", "100,00 €", "100,00 €"),
        ("TOTAL GÉNÉRAL DE LA PRESTATION", "—", "—", "620,00 €")
    ]

    for row_idx, (desc, qte, pu, tot) in enumerate(price_items, start=1):
        row_cells = [desc, qte, pu, tot]
        for col_idx, text in enumerate(row_cells):
            cell = table_price.cell(row_idx, col_idx)
            if row_idx == 4:
                set_cell_background(cell, "F3F4F6")
            else:
                set_cell_background(cell, "FFFFFF" if row_idx % 2 == 1 else "F9FAFB")
            set_cell_margins(cell, top=90, bottom=90, left=120, right=120)
            p = cell.paragraphs[0]
            if col_idx in [1, 2, 3]:
                p.alignment = WD_ALIGN_PARAGRAPH.RIGHT
            r = p.add_run(text)
            r.font.size = Pt(8.5)
            if row_idx == 4:
                r.bold = True
                r.font.size = Pt(9.5)
                if col_idx == 3:
                    r.font.color.rgb = RGBColor(0, 0, 0)

    p_tva = doc.add_paragraph()
    p_tva.paragraph_format.space_before = Pt(4)
    p_tva.paragraph_format.space_after = Pt(8)
    p_tva.add_run("Montant net de taxe (TVA non applicable, art. 293 B du CGI ou auto-entrepreneur / prestation exonérée).").font.size = Pt(8)

    # ---------------------------------------------------------
    # 4. PLANNING, MODALITÉS DE PAIEMENT & GARANTIE
    # ---------------------------------------------------------
    h4 = doc.add_paragraph()
    h4.paragraph_format.space_before = Pt(6)
    h4.paragraph_format.space_after = Pt(4)
    run_h4 = h4.add_run("4. Modalités de Paiement, Délais & Conditions Contractuelles")
    run_h4.font.size = Pt(12)
    run_h4.font.bold = True
    run_h4.font.color.rgb = RGBColor(10, 10, 10)

    p_cond = doc.add_paragraph()
    p_cond.paragraph_format.space_after = Pt(3)
    p_cond.add_run("• Échéancier de Paiement : ").bold = True
    p_cond.add_run("Acompte de 50% à la commande (310,00 €) — Solde de 50% à la livraison et mise en ligne finale (310,00 €).\n")
    p_cond.add_run("• Délais de Livraison : ").bold = True
    p_cond.add_run("1 à 2 semaines (Maquette interactive déjà prête et opérationnelle pour recette).\n")
    p_cond.add_run("• Garantie & Maintenance : ").bold = True
    p_cond.add_run("3 mois de garantie corrective offerte post-lancement pour couvrir tout ajustement ou question technique.\n")
    p_cond.add_run("• Propriété Intellectuelle : ").bold = True
    p_cond.add_run("Cession totale et exclusive de l'intégralité du code source, de la base de données et des droits à HAUSMAN Paris.")

    doc.add_paragraph().paragraph_format.space_after = Pt(10)

    # ---------------------------------------------------------
    # 5. BON POUR ACCORD & SIGNATURES
    # ---------------------------------------------------------
    table_sign = doc.add_table(rows=1, cols=2)
    table_sign.alignment = WD_TABLE_ALIGNMENT.CENTER
    table_sign.autofit = False
    table_sign.columns[0].width = Cm(8.5)
    table_sign.columns[1].width = Cm(8.5)
    set_table_borders(table_sign, color="E5E7EB", sz="4")

    # Prestataire
    cell_p = table_sign.cell(0, 0)
    set_cell_background(cell_p, "F9FAFB")
    set_cell_margins(cell_p, top=140, bottom=300, left=180, right=180)
    pp = cell_p.paragraphs[0]
    pp.add_run("POUR LE PRESTATAIRE\n").bold = True
    pp.add_run("Date : 24 Septembre 2026\n\n")
    pp.add_run("Signature & Mention 'Bon pour accord' :\n\n\n")

    # Client
    cell_c = table_sign.cell(0, 1)
    set_cell_background(cell_c, "F9FAFB")
    set_cell_margins(cell_c, top=140, bottom=300, left=180, right=180)
    pc = cell_c.paragraphs[0]
    pc.add_run("POUR LE CLIENT (HAUSMAN PARIS)\n").bold = True
    pc.add_run("Date :\n\n")
    pc.add_run("Signature & Mention manuscrite 'Bon pour accord' :\n\n\n")

    # Save document
    doc.save(DOCX_OUTPUT_PATH)
    print(f"Word Quote document successfully created: {DOCX_OUTPUT_PATH}")

if __name__ == "__main__":
    build_word_quote()
