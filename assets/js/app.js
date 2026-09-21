/**
 * HAUSMAN Fashion Showroom & Archive Gallery — Front-Office Interactive Engine
 * Editorial / Silent Luxury Architecture
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
        selectedPiecesForPull: JSON.parse(localStorage.getItem('hausman_pull') || '[]')
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
        
        // Projects
        projectsGrid: document.getElementById('projectsGrid'),

        // Form
        rentalForm: document.getElementById('rentalForm'),
        selectedPiecesContainer: document.getElementById('selectedPiecesContainer'),
        formRequestedPiecesInput: document.getElementById('formRequestedPieces'),
        pullCountBadges: document.querySelectorAll('.pull-count-badge')
    };

    // ==========================================
    // 1. Render Home Page Components
    // ==========================================
    function renderHomeComponents() {
        // Home Latest Arrivals (Curated 3 items)
        if (elements.homeLatestGarments) {
            const latest = HAUSMAN_DATA.garments.slice(0, 3);
            elements.homeLatestGarments.innerHTML = latest.map(garment => {
                const name = state.lang === 'fr' ? garment.nameFr : garment.name;

                return `
                    <article class="garment-card" onclick="window.location.href='garment.html?id=${garment.id}'">
                        <div class="garment-media-wrap">
                            <img class="garment-img img-flat" src="${garment.images.flat}" alt="${garment.brand} - ${name}" loading="lazy" />
                            <img class="garment-img img-model" src="${garment.images.model}" alt="${garment.brand} worn on model" loading="lazy" />
                        </div>
                        <div class="garment-meta">
                            <h3 class="garment-brand">${garment.brand}</h3>
                            <p class="garment-name">${name}</p>
                            <span class="garment-season-tag">${garment.season}</span>
                        </div>
                    </article>
                `;
            }).join('');
        }

        // Home Projects Preview (3 editorial items)
        if (elements.homeProjectsPreview) {
            const featuredProjects = HAUSMAN_DATA.projects.slice(0, 3);
            elements.homeProjectsPreview.innerHTML = featuredProjects.map(proj => {
                return `
                    <article class="project-editorial-card" onclick="window.location.href='projects.html'">
                        <div class="project-media">
                            <img src="${proj.coverImage}" alt="${proj.title}" loading="lazy" />
                        </div>
                        <div class="project-editorial-meta">
                            <div class="project-meta-line">
                                <span class="project-client-year">${proj.client} — ${proj.year}</span>
                                <span class="project-cat-pill">${proj.category}</span>
                            </div>
                            <h3 class="project-title">${proj.title}</h3>
                            <p class="project-credits">${proj.photographer} • ${proj.stylist}</p>
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
    // 3. Render Garments Grid (Pure Gallery / Editorial)
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
                <div style="grid-column: 1 / -1; padding: 5rem 0; text-align: center; color: var(--text-muted); font-size: 0.88rem; letter-spacing: 0.05em;">
                    ${i18n.noResults}
                </div>
            `;
            return;
        }

        // Build Clean Silent Gallery HTML (No badges, no overlay buttons, pure visual elegance)
        elements.garmentsGrid.innerHTML = filtered.map(garment => {
            const name = state.lang === 'fr' ? garment.nameFr : garment.name;

            return `
                <article class="garment-card" data-id="${garment.id}" onclick="window.location.href='garment.html?id=${garment.id}'">
                    <div class="garment-media-wrap">
                        <img class="garment-img img-flat" src="${garment.images.flat}" alt="${garment.brand} - ${name}" loading="lazy" />
                        <img class="garment-img img-model" src="${garment.images.model}" alt="${garment.brand} worn on model" loading="lazy" />
                    </div>
                    <div class="garment-meta">
                        <h3 class="garment-brand">${garment.brand}</h3>
                        <p class="garment-name">${name}</p>
                        <span class="garment-season-tag">${garment.season}</span>
                    </div>
                </article>
            `;
        }).join('');

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
    // 4. Render Projects / HAUSMAN FILES
    // ==========================================
    function renderProjects() {
        if (!elements.projectsGrid) return;
        const i18n = HAUSMAN_DATA.i18n[state.lang].projects;

        elements.projectsGrid.innerHTML = HAUSMAN_DATA.projects.map(proj => {
            const desc = state.lang === 'fr' ? proj.descriptionFr : proj.descriptionEn;
            return `
                <article class="project-editorial-card">
                    <div class="project-media">
                        <img src="${proj.coverImage}" alt="${proj.title}" loading="lazy" />
                    </div>
                    <div class="project-editorial-meta">
                        <div class="project-meta-line">
                            <span class="project-client-year">${proj.client} — ${proj.year}</span>
                            <span class="project-cat-pill">${proj.category}</span>
                        </div>
                        <h3 class="project-title">${proj.title}</h3>
                        <p class="project-desc-subtle">${desc}</p>
                        <p class="project-credits">${proj.photographer} • ${proj.stylist}</p>
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
    // 5. Contact / Pull Request Form Management
    // ==========================================
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
                    <span style="font-size: 0.78rem; color: var(--text-muted); font-style: italic;">
                        ${state.lang === 'fr' ? 'Aucune pièce sélectionnée pour le moment.' : 'No pieces selected yet.'}
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
                message: formData.get('message') || "Demande de prêt pour projet éditorial.",
                status: 'new',
                urgency: 'high'
            };

            HAUSMAN_DATA.inquiries.unshift(newInquiry);

            const i18nContact = HAUSMAN_DATA.i18n[state.lang].contact;
            alert(`${i18nContact.successTitle}\n\n${i18nContact.successMsg}\n\nReference : ${newInquiry.id}`);
            
            elements.rentalForm.reset();
            state.selectedPiecesForPull = [];
            localStorage.removeItem('hausman_pull');
            updateSelectedPiecesUI();
        });
    }

    // ==========================================
    // 6. Layout Grid Switcher (2 / 3 / 4 cols)
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
    // 7. Reset Filters
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
    // 8. Language Switcher (FR / EN)
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

    // ==========================================
    // 9. Mobile Navigation Menu Toggle
    // ==========================================
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileNavDrawer = document.getElementById('mobileNavDrawer');

    if (mobileMenuToggle && mobileNavDrawer) {
        mobileMenuToggle.addEventListener('click', () => {
            const isOpen = mobileNavDrawer.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active', isOpen);
            document.body.style.overflow = isOpen ? 'hidden' : '';
        });

        document.querySelectorAll('.mobile-nav-link').forEach(link => {
            link.addEventListener('click', () => {
                mobileNavDrawer.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // ==========================================
    // 10. Mobile Wardrobe Filter Drawer Toggle
    // ==========================================
    const mobileFilterToggleBtn = document.getElementById('mobileFilterToggleBtn');
    const catalogueSidebar = document.getElementById('catalogueSidebar');

    if (mobileFilterToggleBtn && catalogueSidebar) {
        mobileFilterToggleBtn.addEventListener('click', () => {
            catalogueSidebar.classList.toggle('hidden');
        });
    }

    // Initial setup
    setLanguage(state.lang);
});
