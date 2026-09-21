/**
 * HAUSMAN Fashion Showroom — Front-Office Interactive Engine
 */

document.addEventListener('DOMContentLoaded', () => {
    // Current application state
    const state = {
        lang: localStorage.getItem('hausman_lang') || 'en',
        category: 'ALL',
        designer: 'ALL',
        size: 'ALL',
        availability: 'ALL',
        gridCols: 3,
        selectedPiecesForPull: JSON.parse(localStorage.getItem('hausman_pull') || '[]'),
        currentGarmentModal: null
    };

    // DOM Elements Cache
    const elements = {
        garmentsGrid: document.getElementById('garmentsGrid'),
        homeLatestGarments: document.getElementById('homeLatestGarments'),
        homeProjectsPreview: document.getElementById('homeProjectsPreview'),
        filterCategories: document.getElementById('filterCategories'),
        filterDesigners: document.getElementById('filterDesigners'),
        filterSizes: document.getElementById('filterSizes'),
        filterAvailability: document.getElementById('filterAvailability'),
        activeCount: document.getElementById('activeGarmentsCount'),
        resetFiltersBtn: document.getElementById('resetFiltersBtn'),
        gridButtons: document.querySelectorAll('.grid-btn'),
        langButtons: document.querySelectorAll('.lang-btn'),
        
        // Modal
        modalBackdrop: document.getElementById('garmentModalBackdrop'),
        modalCloseBtn: document.getElementById('modalCloseBtn'),
        modalMainImg: document.getElementById('modalMainImg'),
        modalThumbnails: document.getElementById('modalThumbnails'),
        modalBrand: document.getElementById('modalBrand'),
        modalName: document.getElementById('modalName'),
        modalRefVal: document.getElementById('modalRefVal'),
        modalSeasonVal: document.getElementById('modalSeasonVal'),
        modalSizeVal: document.getElementById('modalSizeVal'),
        modalCategoryVal: document.getElementById('modalCategoryVal'),
        modalStatusVal: document.getElementById('modalStatusVal'),
        modalDescText: document.getElementById('modalDescText'),
        modalRequestBtn: document.getElementById('modalRequestBtn'),

        // Projects
        projectsGrid: document.getElementById('projectsGrid'),

        // Form
        rentalForm: document.getElementById('rentalForm'),
        selectedPiecesContainer: document.getElementById('selectedPiecesContainer'),
        formRequestedPiecesInput: document.getElementById('formRequestedPieces'),
        pullCountBadges: document.querySelectorAll('.pull-count-badge')
    };

    // ==========================================
    // 1. Render Home Page Latest Arrivals & Projects
    // ==========================================
    function renderHomeComponents() {
        const i18nWardrobe = HAUSMAN_DATA.i18n[state.lang].wardrobe;

        // Home Latest Arrivals (Curated 3 items)
        if (elements.homeLatestGarments) {
            const latest = HAUSMAN_DATA.garments.slice(0, 3);
            elements.homeLatestGarments.innerHTML = latest.map(garment => {
                const name = state.lang === 'fr' ? garment.nameFr : garment.name;
                const statusLabel = garment.status === 'on_loan' ? i18nWardrobe.statusOnLoan : i18nWardrobe.statusAvailable;
                const statusClass = garment.status === 'on_loan' ? 'on-loan' : 'available';

                return `
                    <article class="garment-card" onclick="window.location.href='garment.html?id=${garment.id}'">
                        <div class="garment-media-wrap">
                            <img class="garment-img img-flat" src="${garment.images.flat}" alt="${garment.brand} - ${name}" loading="lazy" />
                            <img class="garment-img img-model" src="${garment.images.model}" alt="${garment.brand} worn on model" loading="lazy" />
                            <div class="card-badges">
                                <span class="badge-status ${statusClass}">${statusLabel}</span>
                            </div>
                            <span class="card-ref-overlay">${garment.ref}</span>
                            <div class="quick-inspect-btn">${state.lang === 'fr' ? 'VOIR LA PIÈCE' : 'INSPECT ARCHIVE'}</div>
                        </div>
                        <div class="garment-meta">
                            <h3 class="garment-brand">${garment.brand}</h3>
                            <p class="garment-name">${name}</p>
                            <div class="garment-size-row">
                                <span class="garment-size">${garment.size} • ${garment.season}</span>
                                <span class="garment-rental-tag">${i18nWardrobe.rentalUponRequest}</span>
                            </div>
                        </div>
                    </article>
                `;
            }).join('');
        }

        // Home Projects Preview (2 items)
        if (elements.homeProjectsPreview) {
            const featuredProjects = HAUSMAN_DATA.projects.slice(0, 3);
            elements.homeProjectsPreview.innerHTML = featuredProjects.map(proj => {
                const desc = state.lang === 'fr' ? proj.descriptionFr : proj.descriptionEn;
                return `
                    <article class="project-card" onclick="window.location.href='projects.html'">
                        <div class="project-media">
                            <img src="${proj.coverImage}" alt="${proj.title}" loading="lazy" />
                            <span class="project-category-tag">${proj.category}</span>
                        </div>
                        <div class="project-body">
                            <div>
                                <div class="project-meta-top">
                                    <span>${proj.client}</span>
                                    <span>${proj.year}</span>
                                </div>
                                <h3 class="project-title">${proj.title}</h3>
                                <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 0.75rem;">${desc}</p>
                            </div>
                            <div class="project-credits-preview">
                                <strong style="font-size: 0.7rem; letter-spacing: 0.08em; text-transform: uppercase;">CREDITS :</strong><br>
                                ${proj.photographer} • ${proj.stylist} • ${proj.artist}
                            </div>
                        </div>
                    </article>
                `;
            }).join('');
        }
    }

    // ==========================================
    // 2. Render Filters Sidebar (Wardrobe page)
    // ==========================================
    function renderFilters() {
        const i18n = HAUSMAN_DATA.i18n[state.lang].wardrobe;

        // Categories
        if (elements.filterCategories) {
            const categories = HAUSMAN_DATA.categories;
            let catHTML = `
                <li class="filter-item ${state.category === 'ALL' ? 'active' : ''}" data-type="category" data-val="ALL">
                    <span>${i18n.allCategories}</span>
                    <span class="filter-count">(${HAUSMAN_DATA.garments.length})</span>
                </li>
            `;
            categories.forEach(cat => {
                const count = HAUSMAN_DATA.garments.filter(g => g.category === cat).length;
                if (count > 0) {
                    catHTML += `
                        <li class="filter-item ${state.category === cat ? 'active' : ''}" data-type="category" data-val="${cat}">
                            <span>${cat}</span>
                            <span class="filter-count">(${count})</span>
                        </li>
                    `;
                }
            });
            elements.filterCategories.innerHTML = catHTML;
        }

        // Designers
        if (elements.filterDesigners) {
            const designers = [...new Set(HAUSMAN_DATA.garments.map(g => g.brand))];
            let desHTML = `
                <li class="filter-item ${state.designer === 'ALL' ? 'active' : ''}" data-type="designer" data-val="ALL">
                    <span>${i18n.allDesigners}</span>
                </li>
            `;
            designers.forEach(des => {
                const count = HAUSMAN_DATA.garments.filter(g => g.brand === des).length;
                desHTML += `
                    <li class="filter-item ${state.designer === des ? 'active' : ''}" data-type="designer" data-val="${des}">
                        <span>${des}</span>
                        <span class="filter-count">(${count})</span>
                    </li>
                `;
            });
            elements.filterDesigners.innerHTML = desHTML;
        }

        // Sizes
        if (elements.filterSizes) {
            const sizes = [...new Set(HAUSMAN_DATA.garments.map(g => g.size))];
            let sizeHTML = `
                <li class="filter-item ${state.size === 'ALL' ? 'active' : ''}" data-type="size" data-val="ALL">
                    <span>${i18n.allSizes}</span>
                </li>
            `;
            sizes.forEach(sz => {
                sizeHTML += `
                    <li class="filter-item ${state.size === sz ? 'active' : ''}" data-type="size" data-val="${sz}">
                        <span>${sz}</span>
                    </li>
                `;
            });
            elements.filterSizes.innerHTML = sizeHTML;
        }

        // Attach filter click events
        document.querySelectorAll('.filter-item').forEach(item => {
            item.addEventListener('click', () => {
                const type = item.getAttribute('data-type');
                const val = item.getAttribute('data-val');
                state[type] = val;
                renderFilters();
                renderGarments();
            });
        });
    }

    // ==========================================
    // 3. Render Garments Grid (SSENSE / Firusas Style)
    // ==========================================
    function renderGarments() {
        if (!elements.garmentsGrid) return;

        const i18n = HAUSMAN_DATA.i18n[state.lang].wardrobe;

        // Filter data
        let filtered = HAUSMAN_DATA.garments.filter(g => {
            if (g.status === 'hidden') return false;
            if (state.category !== 'ALL' && g.category !== state.category) return false;
            if (state.designer !== 'ALL' && g.brand !== state.designer) return false;
            if (state.size !== 'ALL' && g.size !== state.size) return false;
            if (state.availability !== 'ALL' && g.status !== state.availability) return false;
            return true;
        });

        // Update active count
        if (elements.activeCount) {
            elements.activeCount.textContent = `${filtered.length} ${state.lang === 'fr' ? 'PIÈCES' : 'PIECES'}`;
        }

        if (filtered.length === 0) {
            elements.garmentsGrid.innerHTML = `
                <div style="grid-column: 1 / -1; padding: 4rem 0; text-align: center; color: var(--text-muted); font-size: 0.9rem;">
                    ${i18n.noResults}
                </div>
            `;
            return;
        }

        // Build HTML
        elements.garmentsGrid.innerHTML = filtered.map(garment => {
            const name = state.lang === 'fr' ? garment.nameFr : garment.name;
            const statusLabel = garment.status === 'on_loan' ? i18n.statusOnLoan : i18n.statusAvailable;
            const statusClass = garment.status === 'on_loan' ? 'on-loan' : 'available';

            return `
                <article class="garment-card" data-id="${garment.id}">
                    <div class="garment-media-wrap">
                        <img class="garment-img img-flat" src="${garment.images.flat}" alt="${garment.brand} - ${name}" loading="lazy" />
                        <img class="garment-img img-model" src="${garment.images.model}" alt="${garment.brand} worn on model" loading="lazy" />
                        
                        <div class="card-badges">
                            <span class="badge-status ${statusClass}">${statusLabel}</span>
                        </div>
                        <span class="card-ref-overlay">${garment.ref}</span>
                        <div class="quick-inspect-btn">${state.lang === 'fr' ? 'VOIR LA PIÈCE' : 'INSPECT ARCHIVE'}</div>
                    </div>
                    <div class="garment-meta">
                        <h3 class="garment-brand">${garment.brand}</h3>
                        <p class="garment-name">${name}</p>
                        <div class="garment-size-row">
                            <span class="garment-size">${garment.size} • ${garment.season}</span>
                            <span class="garment-rental-tag">${i18n.rentalUponRequest}</span>
                        </div>
                    </div>
                </article>
            `;
        }).join('');

        // Attach click listeners to cards (opens modal or navigates to dedicated garment page)
        document.querySelectorAll('.garment-card').forEach(card => {
            card.addEventListener('click', () => {
                const id = card.getAttribute('data-id');
                const garment = HAUSMAN_DATA.garments.find(g => g.id === id);
                if (garment) {
                    if (elements.modalBackdrop) {
                        openGarmentModal(garment);
                    } else {
                        window.location.href = `garment.html?id=${garment.id}`;
                    }
                }
            });
        });

        // Update Wardrobe Pagination
        const pInfo = document.getElementById('wardrobePaginationInfo');
        const pNums = document.getElementById('wardrobePageNums');
        const pPrev = document.getElementById('wardrobePrevBtn');
        const pNext = document.getElementById('wardrobeNextBtn');
        if (pInfo) {
            const count = filtered.length;
            pInfo.textContent = state.lang === 'fr' 
                ? `PAGE 1 SUR 1 • ${count} PIÈCES AU TOTAL`
                : `PAGE 1 OF 1 • ${count} PIECES TOTAL`;
        }
        if (pNums) {
            pNums.innerHTML = '<button class="pagination-page-num active">1</button>';
        }
        if (pPrev) {
            pPrev.disabled = true;
            pPrev.classList.add('disabled');
        }
        if (pNext) {
            pNext.disabled = true;
            pNext.classList.add('disabled');
        }
    }

    // ==========================================
    // 4. Garment Detail Modal (Quick View)
    // ==========================================
    function openGarmentModal(garment) {
        state.currentGarmentModal = garment;
        const i18nModal = HAUSMAN_DATA.i18n[state.lang].modal;
        const i18nWardrobe = HAUSMAN_DATA.i18n[state.lang].wardrobe;

        const name = state.lang === 'fr' ? garment.nameFr : garment.name;
        const desc = state.lang === 'fr' ? garment.descriptionFr : garment.descriptionEn;
        const category = state.lang === 'fr' ? garment.categoryFr : garment.category;
        const statusLabel = garment.status === 'on_loan' ? i18nWardrobe.statusOnLoan : i18nWardrobe.statusAvailable;

        if (elements.modalBrand) elements.modalBrand.textContent = garment.brand;
        if (elements.modalName) elements.modalName.textContent = name;
        if (elements.modalRefVal) elements.modalRefVal.textContent = garment.ref;
        if (elements.modalSeasonVal) elements.modalSeasonVal.textContent = garment.season;
        if (elements.modalSizeVal) elements.modalSizeVal.textContent = garment.size;
        if (elements.modalCategoryVal) elements.modalCategoryVal.textContent = category;
        if (elements.modalStatusVal) elements.modalStatusVal.textContent = statusLabel;
        if (elements.modalDescText) elements.modalDescText.textContent = desc;

        // Set main image
        if (elements.modalMainImg) elements.modalMainImg.src = garment.images.flat;

        // Render thumbnails
        if (elements.modalThumbnails) {
            const imagesList = [garment.images.flat, garment.images.model];
            elements.modalThumbnails.innerHTML = imagesList.map((imgUrl, idx) => `
                <div class="modal-thumb ${idx === 0 ? 'active' : ''}" data-src="${imgUrl}">
                    <img src="${imgUrl}" alt="Thumbnail angle ${idx + 1}" />
                </div>
            `).join('');

            // Thumbnail switcher
            document.querySelectorAll('.modal-thumb').forEach(thumb => {
                thumb.addEventListener('click', () => {
                    document.querySelectorAll('.modal-thumb').forEach(t => t.classList.remove('active'));
                    thumb.classList.add('active');
                    elements.modalMainImg.src = thumb.getAttribute('data-src');
                });
            });
        }

        // Request button handler
        if (elements.modalRequestBtn) {
            elements.modalRequestBtn.onclick = () => {
                addPieceToPull(garment);
                closeGarmentModal();
                window.location.href = `contact.html?piece=${encodeURIComponent(garment.brand + ' (' + garment.ref + ')')}`;
            };
        }

        // Open modal
        if (elements.modalBackdrop) {
            elements.modalBackdrop.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeGarmentModal() {
        if (elements.modalBackdrop) {
            elements.modalBackdrop.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    if (elements.modalCloseBtn) {
        elements.modalCloseBtn.addEventListener('click', closeGarmentModal);
    }
    if (elements.modalBackdrop) {
        elements.modalBackdrop.addEventListener('click', (e) => {
            if (e.target === elements.modalBackdrop) closeGarmentModal();
        });
    }
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeGarmentModal();
    });

    // ==========================================
    // 5. Render Projects / HAUSMAN FILES
    // ==========================================
    function renderProjects() {
        if (!elements.projectsGrid) return;
        const i18n = HAUSMAN_DATA.i18n[state.lang].projects;

        elements.projectsGrid.innerHTML = HAUSMAN_DATA.projects.map(proj => {
            const desc = state.lang === 'fr' ? proj.descriptionFr : proj.descriptionEn;
            return `
                <article class="project-card">
                    <div class="project-media">
                        <img src="${proj.coverImage}" alt="${proj.title}" loading="lazy" />
                        <span class="project-category-tag">${proj.category}</span>
                    </div>
                    <div class="project-body">
                        <div>
                            <div class="project-meta-top">
                                <span>${proj.client}</span>
                                <span>${proj.year}</span>
                            </div>
                            <h3 class="project-title">${proj.title}</h3>
                            <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 0.75rem;">${desc}</p>
                        </div>
                        <div class="project-credits-preview">
                            <strong style="font-size: 0.7rem; letter-spacing: 0.08em; text-transform: uppercase;">${i18n.credits} :</strong><br>
                            ${proj.photographer} • ${proj.stylist} • ${proj.artist}
                        </div>
                    </div>
                </article>
            `;
        }).join('');

        // Update Projects Pagination
        const projInfo = document.getElementById('projectsPaginationInfo');
        const projNums = document.getElementById('projectsPageNums');
        const projPrev = document.getElementById('projectsPrevBtn');
        const projNext = document.getElementById('projectsNextBtn');
        if (projInfo) {
            projInfo.textContent = state.lang === 'fr'
                ? `PAGE 1 SUR 1 • ${HAUSMAN_DATA.projects.length} PRODUCTIONS`
                : `PAGE 1 OF 1 • ${HAUSMAN_DATA.projects.length} PRODUCTIONS`;
        }
        if (projNums) {
            projNums.innerHTML = '<button class="pagination-page-num active">1</button>';
        }
        if (projPrev) {
            projPrev.disabled = true;
            projPrev.classList.add('disabled');
        }
        if (projNext) {
            projNext.disabled = true;
            projNext.classList.add('disabled');
        }
    }

    // ==========================================
    // 6. Pull Request & Form Management
    // ==========================================
    function addPieceToPull(garment) {
        if (!state.selectedPiecesForPull.some(p => p.id === garment.id)) {
            state.selectedPiecesForPull.push(garment);
            localStorage.setItem('hausman_pull', JSON.stringify(state.selectedPiecesForPull));
            updateSelectedPiecesUI();
        }
    }

    function removePieceFromPull(garmentId) {
        state.selectedPiecesForPull = state.selectedPiecesForPull.filter(p => p.id !== garmentId);
        localStorage.setItem('hausman_pull', JSON.stringify(state.selectedPiecesForPull));
        updateSelectedPiecesUI();
    }

    function updateSelectedPiecesUI() {
        const count = state.selectedPiecesForPull.length;
        elements.pullCountBadges.forEach(b => {
            b.textContent = count > 0 ? count : '';
            b.style.display = count > 0 ? 'inline-block' : 'none';
        });

        if (elements.selectedPiecesContainer) {
            if (state.selectedPiecesForPull.length === 0) {
                elements.selectedPiecesContainer.innerHTML = `
                    <span style="font-size: 0.75rem; color: var(--text-muted); font-style: italic;">
                        ${state.lang === 'fr' ? 'Aucune pièce sélectionnée pour le moment. Vous pouvez naviguer sur le catalogue Wardrobe pour en sélectionner.' : 'No pieces selected yet. Browse the Wardrobe catalogue to add pieces.'}
                    </span>
                `;
            } else {
                elements.selectedPiecesContainer.innerHTML = state.selectedPiecesForPull.map(p => `
                    <span class="piece-tag">
                        ${p.brand} (${p.ref})
                        <span class="piece-tag-remove" data-id="${p.id}" title="Remove">✕</span>
                    </span>
                `).join('');

                document.querySelectorAll('.piece-tag-remove').forEach(btn => {
                    btn.addEventListener('click', () => {
                        const id = btn.getAttribute('data-id');
                        removePieceFromPull(id);
                    });
                });
            }
        }

        if (elements.formRequestedPiecesInput) {
            elements.formRequestedPiecesInput.value = state.selectedPiecesForPull
                .map(p => `${p.brand} - ${p.ref}`)
                .join(', ');
        }
    }

    // Form submission handler
    if (elements.rentalForm) {
        elements.rentalForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(elements.rentalForm);
            
            const newInquiry = {
                id: `REQ-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
                date: "Aujourd'hui",
                name: formData.get('name') || "Styliste",
                email: formData.get('email') || "contact@production.com",
                agency: formData.get('agency') || "Studio Indépendant",
                instagram: formData.get('instagram') || "@studio",
                projectType: formData.get('projectType') || "Editorial",
                projectDate: formData.get('dates') || "ASAP",
                requestedPieces: formData.get('requestedPieces') || state.selectedPiecesForPull.map(p => `${p.brand} (${p.ref})`).join(', ') || "Sélection en cours",
                message: formData.get('message') || "Demande de pull pour projet.",
                status: 'new',
                urgency: 'high'
            };

            HAUSMAN_DATA.inquiries.unshift(newInquiry);

            const i18nContact = HAUSMAN_DATA.i18n[state.lang].contact;
            alert(`${i18nContact.successTitle}\n\n${i18nContact.successMsg}\n\nReference : ${newInquiry.id}\n(Cette demande a été transmise au Panel Admin CMS)`);
            
            elements.rentalForm.reset();
            state.selectedPiecesForPull = [];
            localStorage.removeItem('hausman_pull');
            updateSelectedPiecesUI();
        });
    }

    // ==========================================
    // 7. Layout Grid Switcher (2 / 3 / 4 cols)
    // ==========================================
    elements.gridButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            elements.gridButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const cols = parseInt(btn.getAttribute('data-cols'), 10);
            state.gridCols = cols;
            
            if (elements.garmentsGrid) {
                elements.garmentsGrid.classList.remove('cols-2', 'cols-3', 'cols-4');
                elements.garmentsGrid.classList.add(`cols-${cols}`);
            }
        });
    });

    // ==========================================
    // 8. Reset Filters
    // ==========================================
    if (elements.resetFiltersBtn) {
        elements.resetFiltersBtn.addEventListener('click', () => {
            state.category = 'ALL';
            state.designer = 'ALL';
            state.size = 'ALL';
            state.availability = 'ALL';
            renderFilters();
            renderGarments();
        });
    }

    // ==========================================
    // 9. Language Switcher (FR / EN)
    // ==========================================
    function setLanguage(lang) {
        state.lang = lang;
        localStorage.setItem('hausman_lang', lang);

        elements.langButtons.forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
        });

        document.querySelectorAll('[data-i18n]').forEach(el => {
            const keyPath = el.getAttribute('data-i18n').split('.');
            let val = HAUSMAN_DATA.i18n[lang];
            for (const key of keyPath) {
                if (val && val[key]) {
                    val = val[key];
                } else {
                    val = null;
                    break;
                }
            }
            if (val) el.textContent = val;
        });

        renderHomeComponents();
        renderFilters();
        renderGarments();
        renderProjects();
        updateSelectedPiecesUI();
    }

    elements.langButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            setLanguage(lang);
        });
    });

    // Initial setup
    setLanguage(state.lang);
});
