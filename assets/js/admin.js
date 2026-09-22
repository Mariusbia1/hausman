/**
 * HAUSMAN Paris — Admin Panel CMS Engine
 * V1 Specification Compliant (Sections 14, 29, 30, 32)
 */

document.addEventListener('DOMContentLoaded', () => {
    // Current Admin State
    const adminState = {
        activeTab: 'dashboard',
        garmentSearch: '',
        garmentCategoryFilter: 'ALL',
        garmentStatusFilter: 'ALL'
    };

    // DOM Cache
    const dom = {
        navItems: document.querySelectorAll('.admin-nav-item'),
        panels: document.querySelectorAll('.admin-panel'),
        
        // Metrics
        metricTotalPieces: document.getElementById('metricTotalPieces'),
        metricOnLoan: document.getElementById('metricOnLoan'),
        metricTotalProjects: document.getElementById('metricTotalProjects'),
        metricNewInquiries: document.getElementById('metricNewInquiries'),
        inquiriesBadge: document.getElementById('sidebarInquiriesBadge'),

        // Dashboard widgets
        dashboardRecentInquiries: document.getElementById('dashboardRecentInquiries'),

        // Collection / Wardrobe
        wardrobeTableBody: document.getElementById('wardrobeTableBody'),
        adminSearchInput: document.getElementById('adminGarmentSearch'),
        adminCategoryFilter: document.getElementById('adminCategoryFilter'),
        adminStatusFilter: document.getElementById('adminStatusFilter'),
        btnAddGarment: document.getElementById('btnAddGarment'),
        
        // Modal Add Garment
        modalAddGarment: document.getElementById('modalAddGarment'),
        modalCloseAddGarment: document.getElementById('modalCloseAddGarment'),
        formAddGarment: document.getElementById('formAddGarment'),
        newGarmentCategorySelect: document.getElementById('newGarmentCategory'),

        // Inquiries Table
        inquiriesTableBody: document.getElementById('inquiriesTableBody'),

        // Projects Table
        projectsTableBody: document.getElementById('projectsTableBody')
    };

    // ==========================================
    // 1. Navigation & Tab Switcher
    // ==========================================
    dom.navItems.forEach(item => {
        item.addEventListener('click', () => {
            const targetTab = item.getAttribute('data-tab');
            if (!targetTab) return;

            dom.navItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');

            dom.panels.forEach(panel => {
                panel.classList.toggle('active', panel.id === `panel-${targetTab}`);
            });

            adminState.activeTab = targetTab;
        });
    });

    // ==========================================
    // 2. Refresh Metrics & Dashboard Widgets
    // ==========================================
    function refreshMetrics() {
        const totalGarments = HAUSMAN_DATA.garments.length;
        const onLoan = HAUSMAN_DATA.garments.filter(g => g.internalStatus === 'on_loan').length;
        const totalProjects = HAUSMAN_DATA.projects.length;
        const newInquiries = HAUSMAN_DATA.inquiries.filter(i => i.status === 'new').length;

        if (dom.metricTotalPieces) dom.metricTotalPieces.textContent = totalGarments;
        if (dom.metricOnLoan) dom.metricOnLoan.textContent = onLoan;
        if (dom.metricTotalProjects) dom.metricTotalProjects.textContent = totalProjects;
        if (dom.metricNewInquiries) dom.metricNewInquiries.textContent = newInquiries;
        if (dom.inquiriesBadge) {
            dom.inquiriesBadge.textContent = newInquiries;
            dom.inquiriesBadge.style.display = newInquiries > 0 ? 'inline-block' : 'none';
        }

        // Render Dashboard Recent Inquiries
        if (dom.dashboardRecentInquiries) {
            const recent = HAUSMAN_DATA.inquiries.slice(0, 3);
            dom.dashboardRecentInquiries.innerHTML = recent.map(inq => {
                let statusLabel = 'Nouveau';
                let statusClass = 'status-new';
                if (inq.status === 'in_progress') {
                    statusLabel = 'En cours';
                    statusClass = 'status-in_progress';
                } else if (inq.status === 'confirmed') {
                    statusLabel = 'Validé';
                    statusClass = 'status-confirmed';
                }

                return `
                    <tr>
                        <td>
                            <strong>${inq.name}</strong><br>
                            <span style="font-size: 0.72rem; color: var(--admin-text-muted);">${inq.agency}</span>
                        </td>
                        <td>
                            <span style="font-size: 0.8rem; font-weight: 600;">${inq.projectType}</span><br>
                            <span style="font-size: 0.72rem; color: var(--admin-text-muted);">${inq.projectDate}</span>
                        </td>
                        <td>
                            <span class="status-pill ${statusClass}">${statusLabel}</span>
                        </td>
                        <td style="text-align: right;">
                            <button class="btn-icon-action" onclick="document.querySelector('[data-tab=inquiries]').click();" style="font-size: 0.72rem; padding: 4px 8px;">Traiter &rarr;</button>
                        </td>
                    </tr>
                `;
            }).join('');
        }

        // Render Dashboard Recent Garments
        const recentGarmentsContainer = document.getElementById('dashboardRecentGarmentsList');
        if (recentGarmentsContainer) {
            const recentG = HAUSMAN_DATA.garments.slice(0, 4);
            recentGarmentsContainer.innerHTML = recentG.map(g => {
                let statusLabel = 'Disponible';
                let statusClass = 'status-available';
                if (g.internalStatus === 'on_loan') {
                    statusLabel = 'En Location';
                    statusClass = 'status-on_loan';
                } else if (g.internalStatus === 'reserved') {
                    statusLabel = 'Réservé';
                    statusClass = 'status-in_progress';
                } else if (g.internalStatus === 'unavailable') {
                    statusLabel = 'Indisponible';
                    statusClass = 'status-hidden';
                }

                return `
                    <div class="mini-item-row">
                        <div class="mini-item-info">
                            <img class="mini-thumb" src="${g.images.flat}" alt="${g.name}" />
                            <div>
                                <div class="mini-item-title">${g.brand}</div>
                                <div class="mini-item-meta">${g.ref} • ${g.category}</div>
                            </div>
                        </div>
                        <span class="status-pill ${statusClass}">${statusLabel}</span>
                    </div>
                `;
            }).join('');
        }
    }

    // ==========================================
    // 3. Render Collection Table (Sections 14 & 29)
    // ==========================================
    function renderWardrobeTable() {
        if (!dom.wardrobeTableBody) return;

        let filtered = HAUSMAN_DATA.garments.filter(g => {
            if (adminState.garmentCategoryFilter !== 'ALL' && g.category !== adminState.garmentCategoryFilter) return false;
            if (adminState.garmentStatusFilter !== 'ALL' && g.internalStatus !== adminState.garmentStatusFilter) return false;
            if (adminState.garmentSearch) {
                const q = adminState.garmentSearch.toLowerCase().trim();
                const matchB = g.brand.toLowerCase().includes(q);
                const matchN = g.name.toLowerCase().includes(q);
                const matchR = g.ref.toLowerCase().includes(q);
                if (!matchB && !matchN && !matchR) return false;
            }
            return true;
        });

        dom.wardrobeTableBody.innerHTML = filtered.map(g => {
            let statusLabel = 'Disponible';
            let statusClass = 'status-available';
            if (g.internalStatus === 'on_loan') {
                statusLabel = 'En Location';
                statusClass = 'status-on_loan';
            } else if (g.internalStatus === 'reserved') {
                statusLabel = 'Réservé';
                statusClass = 'status-in_progress';
            } else if (g.internalStatus === 'unavailable') {
                statusLabel = 'Indisponible';
                statusClass = 'status-hidden';
            }

            return `
                <tr data-id="${g.id}">
                    <td>
                        <div class="cell-garment-info">
                            <img class="cell-thumb" src="${g.images.flat}" alt="${g.name}" />
                            <div>
                                <div class="cell-garment-title">${g.brand}</div>
                                <div class="cell-garment-sub">${g.name}</div>
                            </div>
                        </div>
                    </td>
                    <td><strong style="font-family: var(--font-heading);">${g.ref}</strong></td>
                    <td>${g.category}</td>
                    <td>${g.size}</td>
                    <td>
                        <button class="status-pill ${statusClass} btn-toggle-status" data-id="${g.id}" title="Statut interne (non public)">
                            ● ${statusLabel}
                        </button>
                    </td>
                    <td>
                        <div class="row-actions">
                            <button class="btn-icon-action btn-edit-garment" data-id="${g.id}">Modifier</button>
                            <button class="btn-icon-action btn-delete-garment" data-id="${g.id}" style="color: #DC2626;">Supprimer</button>
                        </div>
                    </td>
                </tr>
            `;
        }).join('');

        // Attach Status Toggle listeners (Section 14: Available -> Reserved -> On Loan -> Unavailable)
        document.querySelectorAll('.btn-toggle-status').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.getAttribute('data-id');
                const garment = HAUSMAN_DATA.garments.find(g => g.id === id);
                if (garment) {
                    if (garment.internalStatus === 'available') garment.internalStatus = 'reserved';
                    else if (garment.internalStatus === 'reserved') garment.internalStatus = 'on_loan';
                    else if (garment.internalStatus === 'on_loan') garment.internalStatus = 'unavailable';
                    else garment.internalStatus = 'available';

                    renderWardrobeTable();
                    refreshMetrics();
                }
            });
        });

        // Attach Delete listeners
        document.querySelectorAll('.btn-delete-garment').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.getAttribute('data-id');
                if (confirm('Voulez-vous vraiment retirer cette pièce du showroom ?')) {
                    HAUSMAN_DATA.garments = HAUSMAN_DATA.garments.filter(g => g.id !== id);
                    renderWardrobeTable();
                    refreshMetrics();
                }
            });
        });

        const pTableInfo = document.getElementById('wardrobeTablePaginationInfo');
        if (pTableInfo) {
            pTableInfo.textContent = `Affichage de 1 à ${filtered.length} sur ${HAUSMAN_DATA.garments.length} pièces`;
        }
    }

    // ==========================================
    // 4. Render Inquiries Table
    // ==========================================
    function renderInquiriesTable() {
        if (!dom.inquiriesTableBody) return;

        dom.inquiriesTableBody.innerHTML = HAUSMAN_DATA.inquiries.map(inq => {
            let statusLabel = 'Nouveau';
            let statusClass = 'status-new';
            if (inq.status === 'in_progress') {
                statusLabel = 'En cours';
                statusClass = 'status-in_progress';
            } else if (inq.status === 'confirmed') {
                statusLabel = 'Validé';
                statusClass = 'status-confirmed';
            }

            return `
                <tr>
                    <td>
                        <strong style="font-family: var(--font-heading);">${inq.id}</strong><br>
                        <span style="font-size: 0.72rem; color: var(--admin-text-muted);">${inq.date}</span>
                    </td>
                    <td>
                        <strong>${inq.name}</strong><br>
                        <span style="color: var(--admin-text-muted);">${inq.email}</span>
                    </td>
                    <td>
                        <span style="font-size: 0.8rem; font-weight: 600;">${inq.projectType}</span><br>
                        <span style="font-size: 0.75rem; color: var(--admin-text-muted);">Dates : ${inq.projectDate}</span>
                    </td>
                    <td>
                        <div style="font-size: 0.78rem; max-width: 250px; white-space: normal; line-height: 1.4;">
                            ${inq.requestedPieces}
                        </div>
                    </td>
                    <td>
                        <span class="status-pill ${statusClass}">${statusLabel}</span>
                    </td>
                    <td>
                        <div class="row-actions">
                            <a href="mailto:${inq.email}?subject=HAUSMAN Paris - Inquiry ${inq.id}" class="btn-icon-action">Email</a>
                            <button class="btn-icon-action btn-toggle-inq-status" data-id="${inq.id}">Changer statut</button>
                        </div>
                    </td>
                </tr>
            `;
        }).join('');

        document.querySelectorAll('.btn-toggle-inq-status').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.getAttribute('data-id');
                const inq = HAUSMAN_DATA.inquiries.find(i => i.id === id);
                if (inq) {
                    if (inq.status === 'new') inq.status = 'in_progress';
                    else if (inq.status === 'in_progress') inq.status = 'confirmed';
                    else inq.status = 'new';
                    
                    renderInquiriesTable();
                    refreshMetrics();
                }
            });
        });
    }

    // ==========================================
    // 5. Render Projects Table (Section 30)
    // ==========================================
    function renderProjectsTable() {
        if (!dom.projectsTableBody) return;

        dom.projectsTableBody.innerHTML = HAUSMAN_DATA.projects.map(proj => `
            <tr>
                <td>
                    <div class="cell-garment-info">
                        <img class="cell-thumb" style="width: 50px; height: 60px;" src="${proj.coverImage}" alt="${proj.title}" />
                        <div>
                            <div class="cell-garment-title">${proj.title}</div>
                            <div class="cell-garment-sub">${proj.category} • ${proj.year}</div>
                        </div>
                    </div>
                </td>
                <td><span class="status-pill" style="background: #F3F4F6; color: #111;">${proj.category}</span></td>
                <td>${proj.credits['Styling'] || proj.credits['Photography'] || 'Équipe HAUSMAN'}</td>
                <td>${proj.landscapeImages.length} photos</td>
                <td>
                    <div class="row-actions">
                        <a href="project.html?id=${proj.id}" target="_blank" class="btn-icon-action">Voir</a>
                        <button class="btn-icon-action" style="color: #DC2626;">Supprimer</button>
                    </div>
                </td>
            </tr>
        `).join('');
    }

    // ==========================================
    // 6. Modal Add Garment (Auto HSMN-xxx ref generation)
    // ==========================================
    if (dom.btnAddGarment) {
        dom.btnAddGarment.addEventListener('click', () => {
            if (dom.newGarmentCategorySelect) {
                const cats = HAUSMAN_DATA.categories.filter(c => c !== 'ALL');
                dom.newGarmentCategorySelect.innerHTML = cats.map(c => `<option value="${c}">${c}</option>`).join('');
            }
            const brandSelect = document.getElementById('newGarmentBrand');
            if (brandSelect) {
                brandSelect.innerHTML = HAUSMAN_DATA.designers.map(d => `<option value="${d}">${d}</option>`).join('');
            }
            dom.modalAddGarment.classList.add('active');
        });
    }

    if (dom.modalCloseAddGarment) {
        dom.modalCloseAddGarment.addEventListener('click', () => {
            dom.modalAddGarment.classList.remove('active');
        });
    }

    if (dom.formAddGarment) {
        dom.formAddGarment.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(dom.formAddGarment);

            // Auto-generate strict HSMN-xxx reference (Section 9)
            const nextIndex = HAUSMAN_DATA.garments.length + 1;
            const refNumber = nextIndex < 10 ? `00${nextIndex}` : (nextIndex < 100 ? `0${nextIndex}` : `${nextIndex}`);
            const autoRef = `HSMN-${refNumber}`;

            const newGarment = {
                id: `hsmn-${refNumber.toLowerCase()}`,
                ref: autoRef,
                brand: formData.get('brand') || "Rick Owens",
                name: formData.get('name') || "Archival Garment",
                nameFr: formData.get('name') || "Pièce d'archive",
                category: formData.get('category') || "OUTERWEAR",
                size: formData.get('size') || "48",
                modelHeight: "185 cm",
                modelSize: formData.get('size') || "48",
                descriptionEn: formData.get('description') || "Archival showroom specimen.",
                descriptionFr: formData.get('description') || "Pièce d'archive pour showroom.",
                images: {
                    flat: "assets/img/rick_leather_flat.jpg",
                    flatBack: "assets/img/rick_leather_flat.jpg",
                    flatDetail: "assets/img/hero_cover.jpg",
                    model: "assets/img/rick_leather_model.jpg",
                    modelAlt: "assets/img/rick_leather_model.jpg"
                },
                internalStatus: "available",
                order: nextIndex,
                published: true
            };

            HAUSMAN_DATA.garments.unshift(newGarment);
            alert(`Pièce créée avec succès : ${newGarment.brand} (Réf. ${newGarment.ref})`);

            dom.formAddGarment.reset();
            dom.modalAddGarment.classList.remove('active');
            renderWardrobeTable();
            refreshMetrics();
        });
    }

    // ==========================================
    // 7. Search and Filter Handlers in Admin
    // ==========================================
    if (dom.adminSearchInput) {
        dom.adminSearchInput.addEventListener('input', (e) => {
            adminState.garmentSearch = e.target.value;
            renderWardrobeTable();
        });
    }
    if (dom.adminCategoryFilter) {
        dom.adminCategoryFilter.addEventListener('change', (e) => {
            adminState.garmentCategoryFilter = e.target.value;
            renderWardrobeTable();
        });
    }
    if (dom.adminStatusFilter) {
        dom.adminStatusFilter.addEventListener('change', (e) => {
            adminState.garmentStatusFilter = e.target.value;
            renderWardrobeTable();
        });
    }

    // Initial Renders
    refreshMetrics();
    renderWardrobeTable();
    renderInquiriesTable();
    renderProjectsTable();
});
