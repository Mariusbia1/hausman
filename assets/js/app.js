/**
 * HAUSMAN Fashion Showroom & Archive Gallery — Interactive Engine
 * Ultra-Minimalist / Silent Luxury Architecture
 */

document.addEventListener('DOMContentLoaded', () => {
    // Current application state
    const state = {
        lang: localStorage.getItem('hausman_lang') || 'en',
        category: 'ALL',
        designer: 'ALL',
        gridCols: 3,
        selectedPiecesForPull: JSON.parse(localStorage.getItem('hausman_pull') || '[]')
    };

    // DOM Elements Cache
    const elements = {
        garmentsGrid: document.getElementById('garmentsGrid'),
        homeLatestGarments: document.getElementById('homeLatestGarments'),
        homeProjectsPreview: document.getElementById('homeProjectsPreview'),
        categoryPills: document.getElementById('categoryPills'),
        filterDesignerSelect: document.getElementById('filterDesignerSelect'),
        activeCount: document.getElementById('activeGarmentsCount'),
        gridButtons: document.querySelectorAll('.grid-btn'),
        langButtons: document.querySelectorAll('.lang-btn'),
        
        // Projects
        projectsGrid: document.getElementById('projectsGrid'),

        // Form
        rentalForm: document.getElementById('rentalForm'),
        selectedPiecesContainer: document.getElementById('selectedPiecesContainer'),
        formRequestedPiecesInput: document.getElementById('formRequestedPieces')
    };

    // ==========================================
    // 1. Render Home Page Components
    // ==========================================
    function renderHomeComponents() {
        // Home Curated Archive (3 items)
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
                            <span class="project-client-year">${proj.client} — ${proj.year}</span>
                            <h3 class="project-title">${proj.title}</h3>
                            <p class="project-credits">${proj.photographer} • ${proj.stylist}</p>
                        </div>
                    </article>
                `;
            }).join('');
        }
    }

    // ==========================================
    // 2. Render Silent Horizontal Category Pills
    // ==========================================
    function renderCategoryPills() {
        if (!elements.categoryPills) return;

        const allLabel = state.lang === 'fr' ? 'TOUTES LES PIÈCES' : 'ALL SPECIMENS';
        const categories = HAUSMAN_DATA.categories;

        let html = `
            <span class="category-pill ${state.category === 'ALL' ? 'active' : ''}" data-cat="ALL">
                ${allLabel}
            </span>
        `;

        categories.forEach(cat => {
            html += `
                <span class="category-pill ${state.category === cat ? 'active' : ''}" data-cat="${cat}">
                    ${cat}
                </span>
            `;
        });

        elements.categoryPills.innerHTML = html;

        // Attach click listeners
        elements.categoryPills.querySelectorAll('.category-pill').forEach(pill => {
            pill.addEventListener('click', () => {
                state.category = pill.getAttribute('data-cat');
                renderCategoryPills();
                renderGarments();
            });
        });
    }

    function renderDesignerOptions() {
        if (!elements.filterDesignerSelect) return;

        const designers = [...new Set(HAUSMAN_DATA.garments.map(g => g.brand))];
        const allDesignersLabel = state.lang === 'fr' ? 'TOUS LES CRÉATEURS' : 'ALL DESIGNERS';

        let html = `<option value="ALL">${allDesignersLabel}</option>`;
        designers.forEach(des => {
            html += `<option value="${des}" ${state.designer === des ? 'selected' : ''}>${des}</option>`;
        });

        elements.filterDesignerSelect.innerHTML = html;
        elements.filterDesignerSelect.onchange = (e) => {
            state.designer = e.target.value;
            renderGarments();
        };
    }

    // ==========================================
    // 3. Render Garments Grid (Silent Gallery)
    // ==========================================
    function renderGarments() {
        if (!elements.garmentsGrid) return;

        const i18n = HAUSMAN_DATA.i18n[state.lang].wardrobe;

        // Filter data
        let filtered = HAUSMAN_DATA.garments.filter(g => {
            if (g.status === 'hidden') return false;
            if (state.category !== 'ALL' && g.category !== state.category) return false;
            if (state.designer !== 'ALL' && g.brand !== state.designer) return false;
            return true;
        });

        // Update active count
        if (elements.activeCount) {
            const countStr = filtered.length < 10 ? `0${filtered.length}` : `${filtered.length}`;
            elements.activeCount.textContent = `${countStr} ${state.lang === 'fr' ? 'PIÈCES' : 'SPECIMENS'}`;
        }

        if (filtered.length === 0) {
            elements.garmentsGrid.innerHTML = `
                <div style="grid-column: 1 / -1; padding: 6rem 0; text-align: center; color: var(--text-muted); font-size: 0.85rem; letter-spacing: 0.08em;">
                    ${i18n.noResults}
                </div>
            `;
            return;
        }

        // Build Clean Silent Gallery HTML
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
    }

    // ==========================================
    // 4. Render Projects / HAUSMAN FILES
    // ==========================================
    function renderProjects() {
        if (!elements.projectsGrid) return;

        elements.projectsGrid.innerHTML = HAUSMAN_DATA.projects.map(proj => {
            const desc = state.lang === 'fr' ? proj.descriptionFr : proj.descriptionEn;
            return `
                <article class="project-editorial-card">
                    <div class="project-media">
                        <img src="${proj.coverImage}" alt="${proj.title}" loading="lazy" />
                    </div>
                    <div class="project-editorial-meta">
                        <span class="project-client-year">${proj.client} — ${proj.year}</span>
                        <h3 class="project-title">${proj.title}</h3>
                        <p class="project-desc-subtle">${desc}</p>
                        <p class="project-credits">${proj.photographer} • ${proj.stylist}</p>
                    </div>
                </article>
            `;
        }).join('');
    }

    // ==========================================
    // 5. Contact / Inquiry Form
    // ==========================================
    function updateSelectedPiecesUI() {
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
                        state.selectedPiecesForPull = state.selectedPiecesForPull.filter(p => p.id !== id);
                        localStorage.setItem('hausman_pull', JSON.stringify(state.selectedPiecesForPull));
                        updateSelectedPiecesUI();
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
    // 7. Language Switcher (FR / EN)
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
        renderCategoryPills();
        renderDesignerOptions();
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
    // 8. Mobile Navigation Drawer Toggle
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

    // Initial setup
    setLanguage(state.lang);
});
