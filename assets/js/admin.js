/**
 * HAUSMAN Paris — Admin Panel CMS Engine
 */

document.addEventListener('DOMContentLoaded', () => {
    // Current Admin State (Default to Dashboard)
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

        // Wardrobe
        wardrobeTableBody: document.getElementById('wardrobeTableBody'),
        adminSearchInput: document.getElementById('adminGarmentSearch'),
        adminCategoryFilter: document.getElementById('adminCategoryFilter'),
        adminStatusFilter: document.getElementById('adminStatusFilter'),
        btnAddGarment: document.getElementById('btnAddGarment'),
        
        // Modal Add Garment
        modalAddGarment: document.getElementById('modalAddGarment'),
        modalCloseAddGarment: document.getElementById('modalCloseAddGarment'),
        formAddGarment: document.getElementById('formAddGarment'),
        newGarmentBrandSelect: document.getElementById('newGarmentBrand'),
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
        const onLoan = HAUSMAN_DATA.garments.filter(g => g.status === 'on_loan').length;
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
                if (g.status === 'on_loan') {
                    statusLabel = 'En Location';
                    statusClass = 'status-on_loan';
                } else if (g.status === 'hidden') {
                    statusLabel = 'Masqué';
                    statusClass = 'status-hidden';
                }

                return `
                    <div class="mini-item-row">
                        <div class="mini-item-info">
                            <img class="mini-thumb" src="${g.images.flat}" alt="${g.name}" />
                            <div>
                                <div class="mini-title">${g.brand}</div>
                                <div class="mini-sub">${g.name} • <strong style="color: #111;">${g.ref}</strong></div>
                            </div>
                        </div>
                        <div style="display: flex; align-items: center; gap: 0.75rem;">
                            <span class="status-pill ${statusClass}" style="font-size: 0.65rem;">${statusLabel}</span>
                            <button class="btn-icon-action" style="font-size: 0.72rem; padding: 4px 8px;" onclick="document.querySelector('[data-tab=wardrobe]').click();">Éditer</button>
                        </div>
                    </div>
                `;
            }).join('');
        }

        // Render Dashboard Recent Projects
        const recentProjectsContainer = document.getElementById('dashboardRecentProjectsList');
        if (recentProjectsContainer) {
            const recentP = HAUSMAN_DATA.projects.slice(0, 2);
            recentProjectsContainer.innerHTML = recentP.map(p => `
                <div style="display: flex; gap: 0.85rem; align-items: center; padding: 0.6rem 0; border-bottom: 1px solid var(--admin-border-subtle);">
                    <img style="width: 54px; height: 38px; object-fit: cover; border-radius: 3px; border: 1px solid var(--admin-border);" src="${p.coverImage}" alt="${p.title}" />
                    <div style="flex-grow: 1;">
                        <strong style="font-family: var(--font-heading); font-size: 0.78rem; text-transform: uppercase;">${p.title}</strong>
                        <div style="font-size: 0.72rem; color: var(--admin-text-muted);">${p.client} • Stylisme : ${p.stylist}</div>
                    </div>
                </div>
            `).join('');
        }
    }

    // ==========================================
    // 3. Render Wardrobe Inventory Table
    // ==========================================
    function renderWardrobeTable() {
        if (!dom.wardrobeTableBody) return;

        let filtered = HAUSMAN_DATA.garments.filter(g => {
            if (adminState.garmentCategoryFilter !== 'ALL' && g.category !== adminState.garmentCategoryFilter) return false;
            if (adminState.garmentStatusFilter !== 'ALL' && g.status !== adminState.garmentStatusFilter) return false;
            if (adminState.garmentSearch) {
                const q = adminState.garmentSearch.toLowerCase();
                const match = g.brand.toLowerCase().includes(q) || 
                              g.name.toLowerCase().includes(q) || 
                              g.ref.toLowerCase().includes(q);
                if (!match) return false;
            }
            return true;
        });

        if (filtered.length === 0) {
            dom.wardrobeTableBody.innerHTML = `
                <tr>
                    <td colspan="6" style="text-align: center; padding: 3rem; color: var(--admin-text-muted);">
                        Aucune pièce d'archive trouvée.
                    </td>
                </tr>
            `;
            return;
        }

        dom.wardrobeTableBody.innerHTML = filtered.map(g => {
            let statusLabel = 'Disponible';
            let statusClass = 'status-available';
            if (g.status === 'on_loan') {
                statusLabel = 'En Location';
                statusClass = 'status-on_loan';
            } else if (g.status === 'hidden') {
                statusLabel = 'Masqué';
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
                        <button class="status-pill ${statusClass} btn-toggle-status" data-id="${g.id}" title="Cliquer pour changer le statut">
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

        // Attach Status Toggle listeners
        document.querySelectorAll('.btn-toggle-status').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.getAttribute('data-id');
                const garment = HAUSMAN_DATA.garments.find(g => g.id === id);
                if (garment) {
                    if (garment.status === 'available') garment.status = 'on_loan';
                    else if (garment.status === 'on_loan') garment.status = 'hidden';
                    else garment.status = 'available';

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

        // Update Table Pagination Info
        const pTableInfo = document.getElementById('wardrobeTablePaginationInfo');
        if (pTableInfo) {
            pTableInfo.textContent = `Affichage de 1 à ${filtered.length} sur ${HAUSMAN_DATA.garments.length} pièces`;
        }
    }

    // ==========================================
    // 4. Render Rental Inquiries (Demandes de Pull)
    // ==========================================
    function renderInquiriesTable() {
        if (!dom.inquiriesTableBody) return;

        dom.inquiriesTableBody.innerHTML = HAUSMAN_DATA.inquiries.map(inq => {
            let statusLabel = 'Nouveau';
            let statusClass = 'status-new';
            if (inq.status === 'in_progress') {
                statusLabel = 'En traitement';
                statusClass = 'status-in_progress';
            } else if (inq.status === 'confirmed') {
                statusLabel = 'Validé / Prêt';
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
                        <span style="color: var(--admin-text-muted);">${inq.agency}</span>
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
                            <a href="mailto:${inq.email}?subject=HAUSMAN Paris - Demande de pull ${inq.id}" class="btn-icon-action" title="Répondre par Email">Email</a>
                            <button class="btn-icon-action btn-toggle-inq-status" data-id="${inq.id}">Changer statut</button>
                        </div>
                    </td>
                </tr>
            `;
        }).join('');

        // Attach inquiry status toggles
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
    // 5. Render Editorial Projects Table
    // ==========================================
    function renderProjectsTable() {
        if (!dom.projectsTableBody) return;

        dom.projectsTableBody.innerHTML = HAUSMAN_DATA.projects.map(proj => `
            <tr>
                <td>
                    <div class="cell-garment-info">
                        <img class="cell-thumb" style="width: 60px; height: 42px;" src="${proj.coverImage}" alt="${proj.title}" />
                        <div>
                            <div class="cell-garment-title">${proj.title}</div>
                            <div class="cell-garment-sub">${proj.client} • ${proj.year}</div>
                        </div>
                    </div>
                </td>
                <td><span class="status-pill" style="background: #F3F4F6; color: #111;">${proj.category}</span></td>
                <td>${proj.stylist}</td>
                <td>${proj.garmentsUsed.join(', ')}</td>
                <td>
                    <div class="row-actions">
                        <button class="btn-icon-action">Modifier</button>
                        <button class="btn-icon-action" style="color: #DC2626;">Supprimer</button>
                    </div>
                </td>
            </tr>
        `).join('');
    }

    // ==========================================
    // 6. Add Garment Modal Logic
    // ==========================================
    function populateFormSelects() {
        if (dom.newGarmentBrandSelect) {
            dom.newGarmentBrandSelect.innerHTML = HAUSMAN_DATA.designers.map(d => `<option value="${d}">${d}</option>`).join('');
        }
        if (dom.newGarmentCategorySelect) {
            dom.newGarmentCategorySelect.innerHTML = HAUSMAN_DATA.categories.map(c => `<option value="${c}">${c}</option>`).join('');
        }
    }

    if (dom.btnAddGarment) {
        dom.btnAddGarment.addEventListener('click', () => {
            populateFormSelects();
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
            
            const newGarment = {
                id: `garment-${Date.now()}`,
                ref: formData.get('ref') || `HSM-ARC-${Math.floor(100 + Math.random() * 900)}`,
                brand: formData.get('brand') || "MAISON MARGIELA",
                name: formData.get('name') || "Nouvelle Pièce d'Archive",
                nameFr: formData.get('name') || "Nouvelle Pièce d'Archive",
                category: formData.get('category') || "Outerwear",
                categoryFr: formData.get('category') || "Manteaux",
                size: formData.get('size') || "48 (M)",
                season: formData.get('season') || "Archive Collection",
                status: "available",
                featured: true,
                images: {
                    flat: "assets/img/margiela_trench_flat.jpg",
                    model: "assets/img/margiela_trench_model.jpg",
                    gallery: [
                        "assets/img/margiela_trench_flat.jpg",
                        "assets/img/margiela_trench_model.jpg"
                    ]
                },
                descriptionEn: formData.get('description') || "Archival showroom piece.",
                descriptionFr: formData.get('description') || "Pièce d'archive pour showroom."
            };

            HAUSMAN_DATA.garments.unshift(newGarment);
            alert(`La pièce ${newGarment.brand} (${newGarment.ref}) a été ajoutée avec succès au catalogue HAUSMAN.`);
            
            dom.formAddGarment.reset();
            dom.modalAddGarment.classList.remove('active');
            renderWardrobeTable();
            refreshMetrics();
        });
    }

    // ==========================================
    // 7. Filters & Search Handlers
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
    // 8. Admin Authentication & Login Logic
    // ==========================================
    const userCard = document.getElementById('adminUserCard');
    const btnLogout = document.getElementById('btnLogoutAdmin');
    const btnLogin = document.getElementById('btnLoginAdmin');
    const modalLogin = document.getElementById('modalAdminLogin');
    const formLogin = document.getElementById('formAdminLogin');

    if (btnLogout) {
        btnLogout.addEventListener('click', () => {
            if (confirm('Voulez-vous vous déconnecter de l\'administration HAUSMAN ?')) {
                if (userCard) userCard.style.display = 'none';
                if (btnLogin) btnLogin.style.display = 'flex';
                if (modalLogin) modalLogin.classList.add('active');
            }
        });
    }

    if (btnLogin) {
        btnLogin.addEventListener('click', () => {
            if (modalLogin) modalLogin.classList.add('active');
        });
    }

    if (formLogin) {
        formLogin.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = document.getElementById('loginEmailInput');
            const email = emailInput ? emailInput.value : 'admin@hausman-paris.com';
            
            // Success feedback
            if (modalLogin) modalLogin.classList.remove('active');
            if (userCard) userCard.style.display = 'flex';
            if (btnLogin) btnLogin.style.display = 'none';

            alert(`Authentification réussie. Bienvenue sur le CMS HAUSMAN (${email}).`);
        });
    }

    // Initialize
    refreshMetrics();
    renderWardrobeTable();
    renderInquiriesTable();
    renderProjectsTable();
});

