/**
 * HAUSMAN Paris — Admin Panel CMS Engine
 * Senior Architectural Implementation
 * Compliant with Specifications (Sections 9, 10, 14, 18, 27, 28, 29, 30)
 */

document.addEventListener('DOMContentLoaded', () => {
    // Current Admin State
    const adminState = {
        activeTab: 'dashboard',
        garmentSearch: '',
        garmentCategoryFilter: 'ALL',
        garmentStatusFilter: 'ALL',
        editingGarmentId: null
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
        dashboardRecentGarmentsList: document.getElementById('dashboardRecentGarmentsList'),

        // Wardrobe / Collection
        wardrobeTableBody: document.getElementById('wardrobeTableBody'),
        wardrobeTablePaginationInfo: document.getElementById('wardrobeTablePaginationInfo'),
        adminSearchInput: document.getElementById('adminGarmentSearch'),
        adminCategoryFilter: document.getElementById('adminCategoryFilter'),
        adminStatusFilter: document.getElementById('adminStatusFilter'),
        btnAddGarment: document.getElementById('btnAddGarment'),
        
        // Modal Add/Edit Garment
        modalAddGarment: document.getElementById('modalAddGarment'),
        modalCloseAddGarment: document.getElementById('modalCloseAddGarment'),
        formAddGarment: document.getElementById('formAddGarment'),
        modalGarmentTitle: document.getElementById('modalGarmentTitle'),
        editingGarmentIdInput: document.getElementById('editingGarmentId'),
        newGarmentRefInput: document.getElementById('newGarmentRef'),
        newGarmentBrandInput: document.getElementById('newGarmentBrandInput'),
        brandSuggestions: document.getElementById('brandSuggestions'),
        newGarmentNameInput: document.getElementById('newGarmentName'),
        newGarmentCategorySelect: document.getElementById('newGarmentCategory'),
        newGarmentSizeInput: document.getElementById('newGarmentSize'),
        newGarmentModelInfoInput: document.getElementById('newGarmentModelInfo'),
        newGarmentDescInput: document.getElementById('newGarmentDesc'),
        newGarmentStatusSelect: document.getElementById('newGarmentStatus'),

        // Modal Add Project
        btnAddProject: document.getElementById('btnAddProject'),
        modalAddProject: document.getElementById('modalAddProject'),
        modalCloseAddProject: document.getElementById('modalCloseAddProject'),
        formAddProject: document.getElementById('formAddProject'),

        // Inquiries Table & Export
        inquiriesTableBody: document.getElementById('inquiriesTableBody'),
        btnExportInquiries: document.getElementById('btnExportInquiries'),

        // Projects Table
        projectsTableBody: document.getElementById('projectsTableBody'),
        projectsTablePaginationInfo: document.getElementById('projectsTablePaginationInfo'),

        // Mobile Sidebar
        adminSidebarToggle: document.getElementById('adminSidebarToggle'),
        adminSidebarBackdrop: document.getElementById('adminSidebarBackdrop'),
        adminSidebar: document.querySelector('.admin-sidebar'),

        // Auth
        modalAdminLogin: document.getElementById('modalAdminLogin'),
        formAdminLogin: document.getElementById('formAdminLogin'),
        btnLogoutAdmin: document.getElementById('btnLogoutAdmin'),
        btnLoginAdmin: document.getElementById('btnLoginAdmin'),
        adminUserCard: document.getElementById('adminUserCard')
    };

    // ==========================================
    // 0. Reference Generator (HSMN-xxx)
    // ==========================================
    function getNextGarmentRef() {
        let maxNumber = 0;
        HAUSMAN_DATA.garments.forEach(g => {
            if (g.ref && g.ref.startsWith('HSMN-')) {
                const num = parseInt(g.ref.replace('HSMN-', ''), 10);
                if (!isNaN(num) && num > maxNumber) {
                    maxNumber = num;
                }
            }
        });
        const nextNum = maxNumber + 1;
        return nextNum < 10 ? `HSMN-00${nextNum}` : (nextNum < 100 ? `HSMN-0${nextNum}` : `HSMN-${nextNum}`);
    }

    // Populate Brand Suggestions
    function populateBrandSuggestions() {
        if (!dom.brandSuggestions) return;
        const brandSet = new Set(HAUSMAN_DATA.designers);
        HAUSMAN_DATA.garments.forEach(g => brandSet.add(g.brand));
        dom.brandSuggestions.innerHTML = Array.from(brandSet).sort().map(b => `<option value="${b}">`).join('');
    }

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

            // Close mobile menu if open
            if (dom.adminSidebar && dom.adminSidebar.classList.contains('open')) {
                dom.adminSidebar.classList.remove('open');
                if (dom.adminSidebarBackdrop) dom.adminSidebarBackdrop.classList.remove('active');
            }
        });
    });

    // Mobile Sidebar Toggle
    if (dom.adminSidebarToggle && dom.adminSidebar) {
        dom.adminSidebarToggle.addEventListener('click', () => {
            dom.adminSidebar.classList.toggle('open');
            if (dom.adminSidebarBackdrop) dom.adminSidebarBackdrop.classList.toggle('active');
        });
    }
    if (dom.adminSidebarBackdrop) {
        dom.adminSidebarBackdrop.addEventListener('click', () => {
            if (dom.adminSidebar) dom.adminSidebar.classList.remove('open');
            dom.adminSidebarBackdrop.classList.remove('active');
        });
    }

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
            const recent = HAUSMAN_DATA.inquiries.slice(0, 4);
            if (recent.length === 0) {
                dom.dashboardRecentInquiries.innerHTML = `<tr><td colspan="4" style="text-align: center; color: var(--admin-text-muted); padding: 1.5rem;">Aucune demande de prêt en attente.</td></tr>`;
            } else {
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
                                <span style="font-size: 0.72rem; color: var(--admin-text-muted);">${inq.agency || inq.email}</span>
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
        }

        // Render Dashboard Recent Garments
        if (dom.dashboardRecentGarmentsList) {
            const recentG = HAUSMAN_DATA.garments.slice(0, 4);
            dom.dashboardRecentGarmentsList.innerHTML = recentG.map(g => {
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
                    <div class="mini-item-row" style="display: flex; align-items: center; justify-content: space-between; padding: 0.6rem 0; border-bottom: 1px solid var(--admin-border-subtle);">
                        <div class="mini-item-info" style="display: flex; align-items: center; gap: 10px;">
                            <img class="mini-thumb" src="${g.images.flat}" alt="${g.name}" style="width: 36px; aspect-ratio: 4/5; object-fit: cover; border-radius: 2px;" />
                            <div>
                                <div class="mini-item-title" style="font-weight: 600; font-size: 0.82rem;">${g.brand}</div>
                                <div class="mini-item-meta" style="font-size: 0.72rem; color: var(--admin-text-muted);">${g.ref} • ${g.category}</div>
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

        if (filtered.length === 0) {
            dom.wardrobeTableBody.innerHTML = `<tr><td colspan="6" style="text-align: center; color: var(--admin-text-muted); padding: 2rem;">Aucune pièce ne correspond à vos critères de recherche.</td></tr>`;
        } else {
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
                        <td><strong style="font-family: var(--font-heading); letter-spacing: 0.05em;">${g.ref}</strong></td>
                        <td><span style="font-size: 0.75rem; font-weight: 600; color: var(--admin-text-secondary);">${g.category}</span></td>
                        <td>${g.size}</td>
                        <td>
                            <button class="status-pill ${statusClass} btn-toggle-status" data-id="${g.id}" title="Cliquer pour changer de statut">
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
        }

        // Attach Status Toggle listeners (Cycle through 4 internal statuses)
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

        // Attach Edit listeners
        document.querySelectorAll('.btn-edit-garment').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.getAttribute('data-id');
                openEditGarmentModal(id);
            });
        });

        // Attach Delete listeners
        document.querySelectorAll('.btn-delete-garment').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.getAttribute('data-id');
                const garment = HAUSMAN_DATA.garments.find(g => g.id === id);
                const gName = garment ? `${garment.brand} (${garment.ref})` : 'cette pièce';
                if (confirm(`Confirmez-vous la suppression définitive de ${gName} des archives HAUSMAN ?`)) {
                    HAUSMAN_DATA.garments = HAUSMAN_DATA.garments.filter(g => g.id !== id);
                    renderWardrobeTable();
                    refreshMetrics();
                }
            });
        });

        if (dom.wardrobeTablePaginationInfo) {
            dom.wardrobeTablePaginationInfo.textContent = `Affichage de 1 à ${filtered.length} sur ${HAUSMAN_DATA.garments.length} pièces`;
        }
    }

    // ==========================================
    // 4. Modal Add / Edit Garment
    // ==========================================
    function openAddGarmentModal() {
        adminState.editingGarmentId = null;
        if (dom.editingGarmentIdInput) dom.editingGarmentIdInput.value = '';
        if (dom.modalGarmentTitle) dom.modalGarmentTitle.textContent = "Ajouter une pièce d'archive au showroom";
        
        if (dom.formAddGarment) dom.formAddGarment.reset();

        // Auto-generate reference HSMN-xxx
        const nextRef = getNextGarmentRef();
        if (dom.newGarmentRefInput) dom.newGarmentRefInput.value = nextRef;

        populateBrandSuggestions();

        // Reset image previews
        const p1 = document.getElementById('prevImg1'); if (p1) p1.src = 'assets/img/rick_leather_flat.jpg';
        const p2 = document.getElementById('prevImg2'); if (p2) p2.src = 'assets/img/rick_leather_flat.jpg';
        const p3 = document.getElementById('prevImg3'); if (p3) p3.src = 'assets/img/hero_cover.jpg';
        const p4 = document.getElementById('prevImg4'); if (p4) p4.src = 'assets/img/rick_leather_model.jpg';
        const p5 = document.getElementById('prevImg5'); if (p5) p5.src = 'assets/img/rick_leather_model.jpg';

        if (dom.modalAddGarment) dom.modalAddGarment.classList.add('active');
    }

    function openEditGarmentModal(id) {
        const garment = HAUSMAN_DATA.garments.find(g => g.id === id);
        if (!garment) return;

        adminState.editingGarmentId = id;
        if (dom.editingGarmentIdInput) dom.editingGarmentIdInput.value = id;
        if (dom.modalGarmentTitle) dom.modalGarmentTitle.textContent = `Modifier la pièce : ${garment.brand} (${garment.ref})`;

        if (dom.newGarmentRefInput) dom.newGarmentRefInput.value = garment.ref;
        if (dom.newGarmentBrandInput) dom.newGarmentBrandInput.value = garment.brand;
        if (dom.newGarmentNameInput) dom.newGarmentNameInput.value = garment.name;
        if (dom.newGarmentCategorySelect) dom.newGarmentCategorySelect.value = garment.category;
        if (dom.newGarmentSizeInput) dom.newGarmentSizeInput.value = garment.size;
        if (dom.newGarmentModelInfoInput) dom.newGarmentModelInfoInput.value = `${garment.modelHeight || '185 cm'} — Taille ${garment.modelSize || garment.size}`;
        if (dom.newGarmentDescInput) dom.newGarmentDescInput.value = garment.descriptionFr || garment.descriptionEn || '';
        if (dom.newGarmentStatusSelect) dom.newGarmentStatusSelect.value = garment.internalStatus;

        populateBrandSuggestions();

        // Populate Image previews
        if (garment.images) {
            const p1 = document.getElementById('prevImg1'); if (p1) p1.src = garment.images.flat || 'assets/img/rick_leather_flat.jpg';
            const p2 = document.getElementById('prevImg2'); if (p2) p2.src = garment.images.flatBack || garment.images.flat || 'assets/img/rick_leather_flat.jpg';
            const p3 = document.getElementById('prevImg3'); if (p3) p3.src = garment.images.flatDetail || 'assets/img/hero_cover.jpg';
            const p4 = document.getElementById('prevImg4'); if (p4) p4.src = garment.images.model || 'assets/img/rick_leather_model.jpg';
            const p5 = document.getElementById('prevImg5'); if (p5) p5.src = garment.images.modelAlt || garment.images.model || 'assets/img/rick_leather_model.jpg';
        }

        if (dom.modalAddGarment) dom.modalAddGarment.classList.add('active');
    }

    if (dom.btnAddGarment) {
        dom.btnAddGarment.addEventListener('click', openAddGarmentModal);
    }
    if (dom.modalCloseAddGarment) {
        dom.modalCloseAddGarment.addEventListener('click', () => {
            if (dom.modalAddGarment) dom.modalAddGarment.classList.remove('active');
        });
    }

    if (dom.formAddGarment) {
        dom.formAddGarment.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(dom.formAddGarment);
            const isEditing = Boolean(adminState.editingGarmentId);

            if (isEditing) {
                const garment = HAUSMAN_DATA.garments.find(g => g.id === adminState.editingGarmentId);
                if (garment) {
                    garment.brand = formData.get('brand') || garment.brand;
                    garment.name = formData.get('name') || garment.name;
                    garment.nameFr = formData.get('name') || garment.nameFr;
                    garment.category = formData.get('category') || garment.category;
                    garment.size = formData.get('size') || garment.size;
                    garment.descriptionFr = formData.get('description') || garment.descriptionFr;
                    garment.descriptionEn = formData.get('description') || garment.descriptionEn;
                    garment.internalStatus = formData.get('status') || garment.internalStatus;
                }
            } else {
                const autoRef = dom.newGarmentRefInput ? dom.newGarmentRefInput.value : getNextGarmentRef();
                const newGarment = {
                    id: `hsmn-${Date.now()}`,
                    ref: autoRef,
                    brand: formData.get('brand') || "Rick Owens",
                    name: formData.get('name') || "Archival Garment",
                    nameFr: formData.get('name') || "Pièce d'archive",
                    category: formData.get('category') || "OUTERWEAR",
                    size: formData.get('size') || "48",
                    modelHeight: "185 cm",
                    modelSize: formData.get('size') || "48",
                    descriptionEn: formData.get('description') || "Archival showroom specimen.",
                    descriptionFr: formData.get('description') || "Pièce d'archive numérisée pour showroom.",
                    images: {
                        flat: "assets/img/rick_leather_flat.jpg",
                        flatBack: "assets/img/rick_leather_flat.jpg",
                        flatDetail: "assets/img/hero_cover.jpg",
                        model: "assets/img/rick_leather_model.jpg",
                        modelAlt: "assets/img/rick_leather_model.jpg"
                    },
                    internalStatus: formData.get('status') || "available",
                    order: HAUSMAN_DATA.garments.length + 1,
                    published: true
                };

                HAUSMAN_DATA.garments.unshift(newGarment);
            }

            if (dom.modalAddGarment) dom.modalAddGarment.classList.remove('active');
            renderWardrobeTable();
            refreshMetrics();
        });
    }

    // ==========================================
    // 5. Inquiries Table & CSV Export (Section 29)
    // ==========================================
    function renderInquiriesTable() {
        if (!dom.inquiriesTableBody) return;

        if (HAUSMAN_DATA.inquiries.length === 0) {
            dom.inquiriesTableBody.innerHTML = `<tr><td colspan="6" style="text-align: center; color: var(--admin-text-muted); padding: 2rem;">Aucune demande de location enregistrée.</td></tr>`;
            return;
        }

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
                        <strong style="font-family: var(--font-heading); letter-spacing: 0.05em;">${inq.id}</strong><br>
                        <span style="font-size: 0.72rem; color: var(--admin-text-muted);">${inq.date}</span>
                    </td>
                    <td>
                        <strong>${inq.name}</strong><br>
                        <span style="color: var(--admin-text-muted); font-size: 0.78rem;">${inq.email}</span><br>
                        <span style="font-size: 0.72rem; color: var(--admin-text-secondary); font-weight: 500;">${inq.agency || 'Indépendant'}</span>
                    </td>
                    <td>
                        <span style="font-size: 0.82rem; font-weight: 600;">${inq.projectType}</span><br>
                        <span style="font-size: 0.75rem; color: var(--admin-text-muted);">Dates : ${inq.projectDate}</span>
                    </td>
                    <td>
                        <div style="font-size: 0.78rem; max-width: 260px; white-space: normal; line-height: 1.4;">
                            ${inq.requestedPieces}
                        </div>
                    </td>
                    <td>
                        <button class="status-pill ${statusClass} btn-toggle-inq-status" data-id="${inq.id}" title="Cliquer pour changer l'état">
                            ● ${statusLabel}
                        </button>
                    </td>
                    <td>
                        <div class="row-actions">
                            <a href="mailto:${inq.email}?subject=HAUSMAN Paris - Demande de Prêt ${inq.id}" class="btn-icon-action">Répondre</a>
                        </div>
                    </td>
                </tr>
            `;
        }).join('');

        // Status Toggle listeners for inquiries
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

    // Export Inquiries as CSV
    if (dom.btnExportInquiries) {
        dom.btnExportInquiries.addEventListener('click', () => {
            const headers = ['ID', 'Date', 'Demandeur', 'Email', 'Agence/Production', 'Type de Projet', 'Dates du Projet', 'Pieces Demandees', 'Statut'];
            const rows = HAUSMAN_DATA.inquiries.map(i => [
                `"${i.id}"`,
                `"${i.date}"`,
                `"${i.name.replace(/"/g, '""')}"`,
                `"${i.email}"`,
                `"${(i.agency || '').replace(/"/g, '""')}"`,
                `"${i.projectType.replace(/"/g, '""')}"`,
                `"${i.projectDate.replace(/"/g, '""')}"`,
                `"${i.requestedPieces.replace(/"/g, '""')}"`,
                `"${i.status}"`
            ]);

            const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(';'), ...rows.map(e => e.join(';'))].join('\n');
            const encodedUri = encodeURI(csvContent);
            const link = document.createElement('a');
            link.setAttribute('href', encodedUri);
            link.setAttribute('download', `hausman_demandes_pull_${new Date().toISOString().slice(0, 10)}.csv`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    }

    // ==========================================
    // 6. Projects Table & Modal (Section 28)
    // ==========================================
    function renderProjectsTable() {
        if (!dom.projectsTableBody) return;

        if (HAUSMAN_DATA.projects.length === 0) {
            dom.projectsTableBody.innerHTML = `<tr><td colspan="5" style="text-align: center; color: var(--admin-text-muted); padding: 2rem;">Aucun projet éditorial publié.</td></tr>`;
            return;
        }

        dom.projectsTableBody.innerHTML = HAUSMAN_DATA.projects.map(proj => `
            <tr data-id="${proj.id}">
                <td>
                    <div class="cell-garment-info">
                        <img class="cell-thumb" style="width: 48px; aspect-ratio: 4/5; object-fit: cover; border-radius: 2px;" src="${proj.coverImage}" alt="${proj.title}" />
                        <div>
                            <div class="cell-garment-title">${proj.title}</div>
                            <div class="cell-garment-sub">${proj.year} • ${proj.landscapeImages.length} photographies</div>
                        </div>
                    </div>
                </td>
                <td><span class="status-pill" style="background: #F3F4F6; color: #111; font-weight: 600;">${proj.category}</span></td>
                <td>${proj.credits['Styling'] || proj.credits['Photography'] || 'Équipe HAUSMAN'}</td>
                <td>${proj.landscapeImages.length} visuels</td>
                <td>
                    <div class="row-actions">
                        <a href="project.html?id=${proj.id}" target="_blank" class="btn-icon-action">Voir sur le site</a>
                        <button class="btn-icon-action btn-delete-project" data-id="${proj.id}" style="color: #DC2626;">Supprimer</button>
                    </div>
                </td>
            </tr>
        `).join('');

        // Delete project handlers
        document.querySelectorAll('.btn-delete-project').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.getAttribute('data-id');
                const proj = HAUSMAN_DATA.projects.find(p => p.id === id);
                const pTitle = proj ? proj.title : 'ce projet';
                if (confirm(`Confirmez-vous la suppression du projet "${pTitle}" ?`)) {
                    HAUSMAN_DATA.projects = HAUSMAN_DATA.projects.filter(p => p.id !== id);
                    renderProjectsTable();
                    refreshMetrics();
                }
            });
        });

        if (dom.projectsTablePaginationInfo) {
            dom.projectsTablePaginationInfo.textContent = `Affichage de 1 à ${HAUSMAN_DATA.projects.length} sur ${HAUSMAN_DATA.projects.length} projets éditoriaux`;
        }
    }

    if (dom.btnAddProject && dom.modalAddProject) {
        dom.btnAddProject.addEventListener('click', () => {
            if (dom.formAddProject) dom.formAddProject.reset();
            dom.modalAddProject.classList.add('active');
        });
    }

    if (dom.modalCloseAddProject && dom.modalAddProject) {
        dom.modalCloseAddProject.addEventListener('click', () => {
            dom.modalAddProject.classList.remove('active');
        });
    }

    if (dom.formAddProject) {
        dom.formAddProject.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(dom.formAddProject);
            const title = formData.get('title') || 'NOUVEAU PROJET ÉDITORIAL';
            const category = formData.get('category') || 'EDITORIALS';
            const year = formData.get('year') || '2026';
            const styling = formData.get('styling') || 'Studio HAUSMAN';
            const credits = formData.get('credits') || 'Photographie: Archives HAUSMAN • Paris';

            const newProject = {
                id: `proj-${Date.now()}`,
                title: title.toUpperCase(),
                category: category,
                year: year,
                coverImage: "assets/img/hero_cover.jpg",
                landscapeImages: [
                    "assets/img/hero_cover.jpg",
                    "assets/img/rick_leather_flat.jpg",
                    "assets/img/rick_leather_model.jpg"
                ],
                credits: {
                    "Styling": styling,
                    "Photography": "Archives HAUSMAN",
                    "Details": credits
                }
            };

            HAUSMAN_DATA.projects.unshift(newProject);
            if (dom.modalAddProject) dom.modalAddProject.classList.remove('active');
            renderProjectsTable();
            refreshMetrics();
        });
    }

    // ==========================================
    // 7. Search and Filter Handlers
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

    // ==========================================
    // 8. Auth State Simulation
    // ==========================================
    if (dom.btnLogoutAdmin) {
        dom.btnLogoutAdmin.addEventListener('click', () => {
            if (confirm('Voulez-vous vous déconnecter de la session administrateur ?')) {
                if (dom.modalAdminLogin) dom.modalAdminLogin.classList.add('active');
            }
        });
    }

    if (dom.formAdminLogin) {
        dom.formAdminLogin.addEventListener('submit', (e) => {
            e.preventDefault();
            if (dom.modalAdminLogin) dom.modalAdminLogin.classList.remove('active');
        });
    }

    // Initial Execution
    populateBrandSuggestions();
    refreshMetrics();
    renderWardrobeTable();
    renderInquiriesTable();
    renderProjectsTable();
});
