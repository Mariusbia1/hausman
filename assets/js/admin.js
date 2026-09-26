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
        editingGarmentId: null,
        activeInquiryId: null
    };

    // DOM Cache
    const dom = {
        navItems: document.querySelectorAll('.admin-nav-item'),
        panels: document.querySelectorAll('.admin-panel'),
        toastContainer: document.getElementById('adminToastContainer'),
        
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
        prevProjCover: document.getElementById('prevProjCover'),
        fileUploadProjCover: document.getElementById('fileUploadProjCover'),

        // Inquiries Table & Detail Modal
        inquiriesTableBody: document.getElementById('inquiriesTableBody'),
        btnExportInquiries: document.getElementById('btnExportInquiries'),
        modalInquiryDetail: document.getElementById('modalInquiryDetail'),
        modalCloseInquiryDetail: document.getElementById('modalCloseInquiryDetail'),
        inquiryDetailRef: document.getElementById('inquiryDetailRef'),
        inquiryDetailDate: document.getElementById('inquiryDetailDate'),
        inquiryDetailName: document.getElementById('inquiryDetailName'),
        inquiryDetailAgency: document.getElementById('inquiryDetailAgency'),
        inquiryDetailEmail: document.getElementById('inquiryDetailEmail'),
        inquiryDetailInstagram: document.getElementById('inquiryDetailInstagram'),
        inquiryDetailProject: document.getElementById('inquiryDetailProject'),
        inquiryDetailDates: document.getElementById('inquiryDetailDates'),
        inquiryDetailPiecesList: document.getElementById('inquiryDetailPiecesList'),
        inquiryDetailStatusSelect: document.getElementById('inquiryDetailStatusSelect'),
        inquiryDetailMailtoBtn: document.getElementById('inquiryDetailMailtoBtn'),

        // Projects Table
        projectsTableBody: document.getElementById('projectsTableBody'),
        projectsTablePaginationInfo: document.getElementById('projectsTablePaginationInfo'),

        // Content Editor
        formContentEdit: document.getElementById('formContentEdit'),
        aboutTitleEn: document.getElementById('aboutTitleEn'),
        aboutTitleFr: document.getElementById('aboutTitleFr'),
        aboutTextEn: document.getElementById('aboutTextEn'),
        aboutTextFr: document.getElementById('aboutTextFr'),

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
    // 0. Notification Toast System (Quiet Luxury)
    // ==========================================
    function showToast(message, duration = 3200) {
        if (!dom.toastContainer) return;
        const toast = document.createElement('div');
        toast.className = 'admin-toast';
        toast.innerHTML = `
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            <span>${message}</span>
        `;
        dom.toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('toast-fadeout');
            setTimeout(() => {
                if (toast.parentNode) toast.parentNode.removeChild(toast);
            }, 300);
        }, duration);
    }

    // ==========================================
    // 1. Reference Generator (HSMN-xxx)
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
    // 2. Interactive Image Uploads (FileReader + Drag & Drop)
    // ==========================================
    function setupImageUploadHandlers() {
        // Trigger buttons
        document.querySelectorAll('.btn-upload-trigger').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const targetInputId = btn.getAttribute('data-input');
                const fileInput = document.getElementById(targetInputId);
                if (fileInput) fileInput.click();
            });
        });

        // Garment file inputs
        document.querySelectorAll('.garment-file-input').forEach(input => {
            input.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (file) {
                    const targetImgId = input.getAttribute('data-target');
                    const imgElem = document.getElementById(targetImgId);
                    const reader = new FileReader();
                    reader.onload = (re) => {
                        if (imgElem) imgElem.src = re.target.result;
                        showToast(`Photographie chargée avec succès (${file.name})`);
                    };
                    reader.readAsDataURL(file);
                }
            });
        });

        // Drag & Drop on photo slots
        document.querySelectorAll('.photo-upload-slot').forEach(slot => {
            slot.addEventListener('dragover', (e) => {
                e.preventDefault();
                slot.classList.add('dragover');
            });
            slot.addEventListener('dragleave', () => {
                slot.classList.remove('dragover');
            });
            slot.addEventListener('drop', (e) => {
                e.preventDefault();
                slot.classList.remove('dragover');
                if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                    const file = e.dataTransfer.files[0];
                    const imgElem = slot.querySelector('.photo-preview-img');
                    const reader = new FileReader();
                    reader.onload = (re) => {
                        if (imgElem) imgElem.src = re.target.result;
                        showToast(`Photographie déposée (${file.name})`);
                    };
                    reader.readAsDataURL(file);
                }
            });
        });

        // Project cover upload
        if (dom.fileUploadProjCover && dom.prevProjCover) {
            dom.fileUploadProjCover.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (re) => {
                        dom.prevProjCover.src = re.target.result;
                        showToast(`Couverture de projet chargée (${file.name})`);
                    };
                    reader.readAsDataURL(file);
                }
            });
        }
    }

    // ==========================================
    // 3. Navigation & Tab Switcher
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
    // 4. Refresh Metrics & Dashboard Widgets
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
                        <tr style="cursor: pointer;" onclick="window.hausmanOpenInquiry('${inq.id}')">
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
                                <button class="btn-icon-action" style="font-size: 0.72rem; padding: 4px 8px;">Détails &rarr;</button>
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
                    <div class="mini-item-row" style="display: flex; align-items: center; justify-content: space-between; padding: 0.6rem 0; border-bottom: 1px solid var(--admin-border-subtle); cursor: pointer;" onclick="document.querySelector('[data-tab=wardrobe]').click(); window.hausmanEditGarment('${g.id}');">
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
    // 5. Wardrobe / Collection Management
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
                    showToast(`Statut de ${garment.brand} (${garment.ref}) mis à jour : ${garment.internalStatus.toUpperCase()}`);
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
                    showToast(`${gName} retiré des archives`);
                }
            });
        });

        if (dom.wardrobeTablePaginationInfo) {
            dom.wardrobeTablePaginationInfo.textContent = `Affichage de 1 à ${filtered.length} sur ${HAUSMAN_DATA.garments.length} pièces`;
        }
    }

    // Modal Add / Edit Garment
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

    // Expose edit function globally for table onclick shortcuts
    window.hausmanEditGarment = openEditGarmentModal;

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

            // Fetch live previews for the 5 photos
            const p1 = document.getElementById('prevImg1');
            const p2 = document.getElementById('prevImg2');
            const p3 = document.getElementById('prevImg3');
            const p4 = document.getElementById('prevImg4');
            const p5 = document.getElementById('prevImg5');

            const currentImages = {
                flat: p1 ? p1.src : "assets/img/rick_leather_flat.jpg",
                flatBack: p2 ? p2.src : "assets/img/rick_leather_flat.jpg",
                flatDetail: p3 ? p3.src : "assets/img/hero_cover.jpg",
                model: p4 ? p4.src : "assets/img/rick_leather_model.jpg",
                modelAlt: p5 ? p5.src : "assets/img/rick_leather_model.jpg"
            };

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
                    garment.images = currentImages;
                    showToast(`Pièce mise à jour : ${garment.brand} (${garment.ref})`);
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
                    images: currentImages,
                    internalStatus: formData.get('status') || "available",
                    order: HAUSMAN_DATA.garments.length + 1,
                    published: true
                };

                HAUSMAN_DATA.garments.unshift(newGarment);
                showToast(`Nouvelle pièce créée : ${newGarment.brand} (${newGarment.ref})`);
            }

            if (dom.modalAddGarment) dom.modalAddGarment.classList.remove('active');
            renderWardrobeTable();
            refreshMetrics();
        });
    }

    // ==========================================
    // 6. Inquiries Management & Detail Modal (Section 29)
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
                <tr data-id="${inq.id}">
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
                            <button class="btn-icon-action btn-view-inquiry" data-id="${inq.id}">Détails</button>
                            <a href="mailto:${inq.email}?subject=HAUSMAN Paris - Demande de Prêt ${inq.id}" class="btn-icon-action">Email</a>
                        </div>
                    </td>
                </tr>
            `;
        }).join('');

        // Status Toggle listeners for inquiries
        document.querySelectorAll('.btn-toggle-inq-status').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const id = btn.getAttribute('data-id');
                const inq = HAUSMAN_DATA.inquiries.find(i => i.id === id);
                if (inq) {
                    if (inq.status === 'new') inq.status = 'in_progress';
                    else if (inq.status === 'in_progress') inq.status = 'confirmed';
                    else inq.status = 'new';
                    
                    renderInquiriesTable();
                    refreshMetrics();
                    showToast(`Demande ${inq.id} passée en statut : ${inq.status.toUpperCase()}`);
                }
            });
        });

        // Detail view listeners
        document.querySelectorAll('.btn-view-inquiry').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.getAttribute('data-id');
                openInquiryDetailModal(id);
            });
        });
    }

    function openInquiryDetailModal(id) {
        const inq = HAUSMAN_DATA.inquiries.find(i => i.id === id);
        if (!inq) return;

        adminState.activeInquiryId = id;

        if (dom.inquiryDetailRef) dom.inquiryDetailRef.textContent = `Demande de Pull #${inq.id}`;
        if (dom.inquiryDetailDate) dom.inquiryDetailDate.textContent = `Reçue le ${inq.date}`;
        if (dom.inquiryDetailName) dom.inquiryDetailName.textContent = inq.name;
        if (dom.inquiryDetailAgency) dom.inquiryDetailAgency.textContent = inq.agency || 'Styliste / Demandeur Indépendant';
        if (dom.inquiryDetailEmail) dom.inquiryDetailEmail.textContent = inq.email;
        if (dom.inquiryDetailInstagram) dom.inquiryDetailInstagram.textContent = `Instagram: @${inq.name.toLowerCase().replace(/\s+/g, '')}`;
        if (dom.inquiryDetailProject) dom.inquiryDetailProject.textContent = inq.projectType;
        if (dom.inquiryDetailDates) dom.inquiryDetailDates.textContent = inq.projectDate;
        if (dom.inquiryDetailStatusSelect) dom.inquiryDetailStatusSelect.value = inq.status;

        // Render Pieces tags
        if (dom.inquiryDetailPiecesList) {
            const pieces = inq.requestedPieces.split(',').map(p => p.trim()).filter(Boolean);
            dom.inquiryDetailPiecesList.innerHTML = pieces.map(pName => {
                // Try finding matching garment in catalog
                const matchG = HAUSMAN_DATA.garments.find(g => pName.includes(g.brand) || pName.includes(g.ref));
                const thumb = matchG ? matchG.images.flat : 'assets/img/rick_leather_flat.jpg';
                return `
                    <div class="inquiry-piece-tag">
                        <img src="${thumb}" alt="${pName}" />
                        <span>${pName}</span>
                    </div>
                `;
            }).join('');
        }

        // Setup Mailto URL
        if (dom.inquiryDetailMailtoBtn) {
            const subject = encodeURIComponent(`HAUSMAN Paris — Confirmation de Prêt [${inq.id}]`);
            const body = encodeURIComponent(`Bonjour ${inq.name},\n\nNous avons bien reçu votre demande de prêt pour le projet "${inq.projectType}" (${inq.projectDate}).\n\nLes pièces demandées (${inq.requestedPieces}) sont actuellement disponibles au showroom.\n\nBien cordialement,\nL'équipe HAUSMAN Paris\nShowroom & Archives`);
            dom.inquiryDetailMailtoBtn.href = `mailto:${inq.email}?subject=${subject}&body=${body}`;
        }

        if (dom.modalInquiryDetail) dom.modalInquiryDetail.classList.add('active');
    }

    window.hausmanOpenInquiry = openInquiryDetailModal;

    if (dom.modalCloseInquiryDetail) {
        dom.modalCloseInquiryDetail.addEventListener('click', () => {
            if (dom.modalInquiryDetail) dom.modalInquiryDetail.classList.remove('active');
        });
    }

    if (dom.inquiryDetailStatusSelect) {
        dom.inquiryDetailStatusSelect.addEventListener('change', (e) => {
            if (adminState.activeInquiryId) {
                const inq = HAUSMAN_DATA.inquiries.find(i => i.id === adminState.activeInquiryId);
                if (inq) {
                    inq.status = e.target.value;
                    renderInquiriesTable();
                    refreshMetrics();
                    showToast(`Statut de la demande ${inq.id} mis à jour`);
                }
            }
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
            showToast('Export CSV généré et téléchargé');
        });
    }

    // ==========================================
    // 7. Projects Table & Modal (Section 28)
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
                    showToast(`Projet "${pTitle}" supprimé`);
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
            if (dom.prevProjCover) dom.prevProjCover.src = 'assets/img/hero_cover.jpg';
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
            const coverSrc = dom.prevProjCover ? dom.prevProjCover.src : "assets/img/hero_cover.jpg";

            const newProject = {
                id: `proj-${Date.now()}`,
                title: title.toUpperCase(),
                category: category,
                year: year,
                coverImage: coverSrc,
                landscapeImages: [
                    coverSrc,
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
            showToast(`Projet "${newProject.title}" publié avec succès`);
        });
    }

    // ==========================================
    // 8. Content Editor (Section 30)
    // ==========================================
    function setupContentEditor() {
        // Load stored content if any
        try {
            const savedContent = JSON.parse(localStorage.getItem('hausman_showroom_texts') || '{}');
            if (savedContent.aboutTitleEn && dom.aboutTitleEn) dom.aboutTitleEn.value = savedContent.aboutTitleEn;
            if (savedContent.aboutTitleFr && dom.aboutTitleFr) dom.aboutTitleFr.value = savedContent.aboutTitleFr;
            if (savedContent.aboutTextEn && dom.aboutTextEn) dom.aboutTextEn.value = savedContent.aboutTextEn;
            if (savedContent.aboutTextFr && dom.aboutTextFr) dom.aboutTextFr.value = savedContent.aboutTextFr;
        } catch (e) {
            console.error('Error loading saved texts', e);
        }

        if (dom.formContentEdit) {
            dom.formContentEdit.addEventListener('submit', (e) => {
                e.preventDefault();
                const texts = {
                    aboutTitleEn: dom.aboutTitleEn ? dom.aboutTitleEn.value : '',
                    aboutTitleFr: dom.aboutTitleFr ? dom.aboutTitleFr.value : '',
                    aboutTextEn: dom.aboutTextEn ? dom.aboutTextEn.value : '',
                    aboutTextFr: dom.aboutTextFr ? dom.aboutTextFr.value : ''
                };
                localStorage.setItem('hausman_showroom_texts', JSON.stringify(texts));
                showToast('Textes de présentation enregistrés sur le showroom');
            });
        }
    }

    // ==========================================
    // 9. Search and Filter Handlers
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
    // 10. Auth State Simulation
    // ==========================================
    if (dom.btnLogoutAdmin) {
        dom.btnLogoutAdmin.addEventListener('click', () => {
            if (confirm('Voulez-vous vous déconnecter de la session administrateur ?')) {
                if (dom.modalAdminLogin) dom.modalAdminLogin.classList.add('active');
                showToast('Session déconnectée');
            }
        });
    }

    if (dom.formAdminLogin) {
        dom.formAdminLogin.addEventListener('submit', (e) => {
            e.preventDefault();
            if (dom.modalAdminLogin) dom.modalAdminLogin.classList.remove('active');
            showToast('Connexion administrateur réussie');
        });
    }

    // Initial Execution
    setupImageUploadHandlers();
    setupContentEditor();
    populateBrandSuggestions();
    refreshMetrics();
    renderWardrobeTable();
    renderInquiriesTable();
    renderProjectsTable();
});
