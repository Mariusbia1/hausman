/**
 * HAUSMAN Fashion Showroom — Frontend Architecture Engine
 * Compliant with the 42-section V1 Official Cahier des Charges
 */

document.addEventListener('DOMContentLoaded', () => {
    // Current Global State
    const state = {
        lang: localStorage.getItem('hausman_lang') || 'en',
        category: 'ALL',
        designer: 'ALL',
        searchQuery: '',
        visibleGarmentCount: 24,
        currentLightboxIndex: 0,
        currentLightboxImages: [],
        currentProjectIndex: 0
    };

    // ==========================================
    // 1. SECTION 3: INTRO / SPLASH SCREEN ENGINE
    // ==========================================
    const splashOverlay = document.getElementById('splashOverlay');
    const splashFlasher = document.getElementById('splashFlasher');
    const splashLogo = document.getElementById('splashLogo');

    if (splashOverlay && splashFlasher) {
        // Collect 20-30 garments photos for flashing sequence
        const flashImages = [
            'assets/img/rick_leather_flat.jpg',
            'assets/img/margiela_trench_flat.jpg',
            'assets/img/balenciaga_bomber_flat.jpg',
            'assets/img/yohji_coat_flat.jpg',
            'assets/img/jpg_mesh_flat.jpg',
            'assets/img/raf_knit_flat.jpg',
            'assets/img/rick_leather_model.jpg',
            'assets/img/margiela_trench_model.jpg',
            'assets/img/balenciaga_bomber_model.jpg',
            'assets/img/yohji_coat_model.jpg',
            'assets/img/jpg_mesh_model.jpg',
            'assets/img/raf_knit_model.jpg',
            'assets/img/hero_cover.jpg'
        ];

        // Populate flasher container
        splashFlasher.innerHTML = flashImages.map((src, i) => `
            <img class="splash-flasher-img ${i === 0 ? 'active' : ''}" src="${src}" alt="Archive Flash Specimen ${i + 1}" />
        `).join('');

        const flasherImgs = splashFlasher.querySelectorAll('.splash-flasher-img');
        let currentFlashIdx = 0;

        // Rapid flashing cycle (~100ms per image as specified in Section 3)
        const flashInterval = setInterval(() => {
            flasherImgs[currentFlashIdx].classList.remove('active');
            currentFlashIdx = (currentFlashIdx + 1) % flasherImgs.length;
            flasherImgs[currentFlashIdx].classList.add('active');
        }, 100);

        // Click on logo or splash enters the site
        const enterSite = () => {
            clearInterval(flashInterval);
            splashOverlay.classList.add('hidden-splash');
            sessionStorage.setItem('hausman_intro_seen', 'true');
        };

        if (splashLogo) splashLogo.addEventListener('click', enterSite);
        splashOverlay.addEventListener('click', enterSite);

        // Auto check if intro should be shown (always on fresh visit or when requested via URL ?intro=1)
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('intro') === '1') {
            splashOverlay.classList.remove('hidden-splash');
        } else if (sessionStorage.getItem('hausman_intro_seen') === 'true' && !urlParams.get('intro')) {
            splashOverlay.classList.add('hidden-splash');
        }
    }

    // Logo click on MENU page relanches Intro (Section 3 & 4)
    const menuBrandLink = document.getElementById('menuBrandLink');
    if (menuBrandLink) {
        menuBrandLink.addEventListener('click', () => {
            window.location.href = 'index.html?intro=1';
        });
    }

    // ==========================================
    // 2. SECTION 5, 6, 7, 8: COLLECTION PAGE
    // ==========================================
    const collectionGrid = document.getElementById('collectionGrid');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const filterOverlay = document.getElementById('filterOverlay');
    const filterBtn = document.getElementById('filterBtn');
    const filterCloseBtn = document.getElementById('filterCloseBtn');
    const filterOptionsList = document.getElementById('filterOptionsList');
    const filterDesignersGrid = document.getElementById('filterDesignersGrid');
    const searchOverlay = document.getElementById('searchOverlay');
    const searchBtn = document.getElementById('searchBtn');
    const searchCloseBtn = document.getElementById('searchCloseBtn');
    const searchInput = document.getElementById('searchInput');

    function renderCollection() {
        if (!collectionGrid) return;

        const i18n = HAUSMAN_DATA.i18n[state.lang].collection;

        // Filter data strictly by category, designer, search query
        let filtered = HAUSMAN_DATA.garments.filter(g => {
            if (!g.published) return false;
            if (state.category !== 'ALL' && g.category !== state.category) return false;
            if (state.designer !== 'ALL' && g.brand !== state.designer) return false;
            if (state.searchQuery) {
                const query = state.searchQuery.toLowerCase().trim();
                const matchBrand = g.brand.toLowerCase().includes(query);
                const matchRef = g.ref.toLowerCase().includes(query);
                if (!matchBrand && !matchRef) return false;
            }
            return true;
        });

        // Sort by custom order
        filtered.sort((a, b) => (a.order || 99) - (b.order || 99));

        if (filtered.length === 0) {
            collectionGrid.innerHTML = `
                <div style="grid-column: 1 / -1; padding: 6rem 0; text-align: center; color: var(--text-muted); font-size: 0.85rem; letter-spacing: 0.08em;">
                    ${i18n.noResults}
                </div>
            `;
            if (loadMoreBtn) loadMoreBtn.style.display = 'none';
            return;
        }

        // Limit to visible batch (Section 6)
        const visibleItems = filtered.slice(0, state.visibleGarmentCount);

        // Build Collection Grid: ONLY Photo + Brand Name (Section 5)
        collectionGrid.innerHTML = visibleItems.map(g => {
            return `
                <article class="collection-item" onclick="window.location.href='garment.html?id=${g.id}'">
                    <div class="collection-media-box">
                        <img class="collection-img flat-img" src="${g.images.flat}" alt="${g.brand}" loading="lazy" />
                        <img class="collection-img model-img" src="${g.images.model}" alt="${g.brand} on model" loading="lazy" />
                    </div>
                    <h3 class="collection-brand-title">${g.brand}</h3>
                </article>
            `;
        }).join('');

        // Handle LOAD MORE button visibility
        if (loadMoreBtn) {
            loadMoreBtn.style.display = filtered.length > state.visibleGarmentCount ? 'block' : 'none';
        }
    }

    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            state.visibleGarmentCount += 24;
            renderCollection();
        });
    }

    // Filter Overlay Handlers (Section 7)
    if (filterBtn && filterOverlay) {
        filterBtn.addEventListener('click', () => {
            filterOverlay.classList.add('open');
            document.body.style.overflow = 'hidden';
            if (filterDesignersGrid) filterDesignersGrid.classList.remove('active-designers');
            if (filterOptionsList) filterOptionsList.style.display = 'flex';
        });
    }

    if (filterCloseBtn && filterOverlay) {
        filterCloseBtn.addEventListener('click', () => {
            filterOverlay.classList.remove('open');
            document.body.style.overflow = '';
        });
    }

    if (filterOptionsList) {
        filterOptionsList.querySelectorAll('.filter-option-item').forEach(item => {
            item.addEventListener('click', () => {
                const cat = item.getAttribute('data-category');
                if (cat === 'DESIGNER') {
                    // Show designers list
                    filterOptionsList.style.display = 'none';
                    if (filterDesignersGrid) {
                        const brands = [...new Set(HAUSMAN_DATA.garments.filter(g => g.published).map(g => g.brand))].sort();
                        filterDesignersGrid.innerHTML = brands.map(b => `
                            <button class="filter-designer-btn" data-brand="${b}">${b}</button>
                        `).join('');

                        filterDesignersGrid.classList.add('active-designers');

                        filterDesignersGrid.querySelectorAll('.filter-designer-btn').forEach(btn => {
                            btn.addEventListener('click', () => {
                                state.designer = btn.getAttribute('data-brand');
                                state.category = 'ALL';
                                filterOverlay.classList.remove('open');
                                document.body.style.overflow = '';
                                renderCollection();
                            });
                        });
                    }
                } else {
                    state.category = cat;
                    state.designer = 'ALL';
                    filterOptionsList.querySelectorAll('.filter-option-item').forEach(i => i.classList.remove('active'));
                    item.classList.add('active');
                    filterOverlay.classList.remove('open');
                    document.body.style.overflow = '';
                    renderCollection();
                }
            });
        });
    }

    // Search Overlay Handlers (Section 8)
    if (searchBtn && searchOverlay) {
        searchBtn.addEventListener('click', () => {
            searchOverlay.classList.add('open');
            document.body.style.overflow = 'hidden';
            if (searchInput) {
                searchInput.focus();
            }
        });
    }

    if (searchCloseBtn && searchOverlay) {
        searchCloseBtn.addEventListener('click', () => {
            searchOverlay.classList.remove('open');
            document.body.style.overflow = '';
        });
    }

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            state.searchQuery = e.target.value;
            renderCollection();
        });
        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                searchOverlay.classList.remove('open');
                document.body.style.overflow = '';
            }
        });
    }

    // ==========================================
    // 3. SECTION 10, 11, 12, 13, 15: FICHE VÊTEMENT & LIGHTBOX
    // ==========================================
    const garmentGalleryStream = document.getElementById('garmentGalleryStream');
    const lightboxModal = document.getElementById('lightboxModal');
    const lightboxMainImg = document.getElementById('lightboxMainImg');
    const lightboxCloseBtn = document.getElementById('lightboxCloseBtn');
    const lightboxPrevBtn = document.getElementById('lightboxPrevBtn');
    const lightboxNextBtn = document.getElementById('lightboxNextBtn');

    function renderGarmentDetail() {
        if (!garmentGalleryStream) return;

        const params = new URLSearchParams(window.location.search);
        const garmentId = params.get('id') || 'hsmn-001';
        const garment = HAUSMAN_DATA.garments.find(g => g.id === garmentId) || HAUSMAN_DATA.garments[0];

        if (!garment) return;

        const i18nProd = HAUSMAN_DATA.i18n[state.lang].product;
        const name = state.lang === 'fr' ? garment.nameFr : garment.name;
        const modelTxt = state.lang === 'fr' 
            ? `Le mannequin mesure ${garment.modelHeight} et porte la taille ${garment.modelSize}`
            : `Model is ${garment.modelHeight} and wears size ${garment.modelSize}`;

        // Set metadata
        const brandEl = document.getElementById('specimenBrand');
        const nameEl = document.getElementById('specimenName');
        const sizeVal = document.getElementById('specimenSizeVal');
        const modelVal = document.getElementById('specimenModelVal');
        const categoryVal = document.getElementById('specimenCategoryVal');
        const refVal = document.getElementById('specimenRefVal');
        const rentalText = document.getElementById('specimenRentalText');

        if (brandEl) brandEl.textContent = garment.brand;
        if (nameEl) nameEl.textContent = name;
        if (sizeVal) sizeVal.textContent = garment.size;
        if (modelVal) modelVal.textContent = modelTxt;
        if (categoryVal) categoryVal.textContent = garment.category;
        if (refVal) refVal.textContent = garment.ref;
        if (rentalText) rentalText.textContent = i18nProd.rentalNotice;

        // 5 mandatory photos (Section 10)
        state.currentLightboxImages = [
            garment.images.flat,
            garment.images.flatBack,
            garment.images.flatDetail,
            garment.images.model,
            garment.images.modelAlt
        ];

        garmentGalleryStream.innerHTML = state.currentLightboxImages.map((imgSrc, idx) => `
            <div class="specimen-photo-box" data-index="${idx}">
                <img src="${imgSrc}" alt="${garment.brand} photo ${idx + 1}" loading="lazy" />
            </div>
        `).join('');

        // Attach Lightbox click
        garmentGalleryStream.querySelectorAll('.specimen-photo-box').forEach(box => {
            box.addEventListener('click', () => {
                const index = parseInt(box.getAttribute('data-index'), 10);
                openLightbox(index);
            });
        });
    }

    function openLightbox(index) {
        if (!lightboxModal || !lightboxMainImg) return;
        state.currentLightboxIndex = index;
        lightboxMainImg.src = state.currentLightboxImages[state.currentLightboxIndex];
        lightboxModal.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        if (!lightboxModal) return;
        lightboxModal.classList.remove('open');
        document.body.style.overflow = '';
    }

    if (lightboxCloseBtn) lightboxCloseBtn.addEventListener('click', closeLightbox);
    if (lightboxPrevBtn) {
        lightboxPrevBtn.addEventListener('click', () => {
            state.currentLightboxIndex = (state.currentLightboxIndex - 1 + state.currentLightboxImages.length) % state.currentLightboxImages.length;
            lightboxMainImg.src = state.currentLightboxImages[state.currentLightboxIndex];
        });
    }
    if (lightboxNextBtn) {
        lightboxNextBtn.addEventListener('click', () => {
            state.currentLightboxIndex = (state.currentLightboxIndex + 1) % state.currentLightboxImages.length;
            lightboxMainImg.src = state.currentLightboxImages[state.currentLightboxIndex];
        });
    }

    document.addEventListener('keydown', (e) => {
        if (!lightboxModal || !lightboxModal.classList.contains('open')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft' && lightboxPrevBtn) lightboxPrevBtn.click();
        if (e.key === 'ArrowRight' && lightboxNextBtn) lightboxNextBtn.click();
    });

    // ==========================================
    // 4. SECTION 18, 19, 20: PROJECTS & PROJECT DETAIL
    // ==========================================
    const projectsEditorialGrid = document.getElementById('projectsEditorialGrid');
    const projectCatPills = document.getElementById('projectCatPills');
    const projectStreamImages = document.getElementById('projectStreamImages');
    const projectCreditsTable = document.getElementById('projectCreditsTable');
    const btnNextProject = document.getElementById('btnNextProject');

    function renderProjects() {
        if (!projectsEditorialGrid) return;

        let filtered = HAUSMAN_DATA.projects.filter(p => {
            if (!p.published) return false;
            if (state.category !== 'ALL' && p.category !== state.category) return false;
            return true;
        });

        filtered.sort((a, b) => (a.order || 99) - (b.order || 99));

        projectsEditorialGrid.innerHTML = filtered.map(p => `
            <article class="project-card-item" onclick="window.location.href='project.html?id=${p.id}'">
                <div class="project-cover-box">
                    <img src="${p.coverImage}" alt="${p.title}" loading="lazy" />
                </div>
                <h3 class="project-card-title">${p.title}</h3>
            </article>
        `).join('');
    }

    if (projectCatPills) {
        projectCatPills.querySelectorAll('.project-cat-pill').forEach(pill => {
            pill.addEventListener('click', () => {
                projectCatPills.querySelectorAll('.project-cat-pill').forEach(p => p.classList.remove('active'));
                pill.classList.add('active');
                state.category = pill.getAttribute('data-cat');
                renderProjects();
            });
        });
    }

    function renderProjectDetail() {
        if (!projectStreamImages) return;

        const params = new URLSearchParams(window.location.search);
        const projId = params.get('id') || 'proj-01';
        const project = HAUSMAN_DATA.projects.find(p => p.id === projId) || HAUSMAN_DATA.projects[0];

        if (!project) return;

        const titleEl = document.getElementById('projectDetailTitle');
        if (titleEl) titleEl.textContent = project.title;

        // Render horizontal sequence images (Section 19)
        projectStreamImages.innerHTML = project.landscapeImages.map(img => `
            <div class="project-stream-photo">
                <img src="${img}" alt="${project.title} photograph" loading="lazy" />
            </div>
        `).join('');

        // Render Credits (Section 20)
        if (projectCreditsTable) {
            projectCreditsTable.innerHTML = Object.entries(project.credits).map(([role, name]) => `
                <div class="project-credit-row">
                    <span class="project-credit-role">${role}</span>
                    <span class="project-credit-name">${name}</span>
                </div>
            `).join('');
        }

        // Handle Next Project navigation
        const currentIndex = HAUSMAN_DATA.projects.findIndex(p => p.id === project.id);
        const nextIndex = (currentIndex + 1) % HAUSMAN_DATA.projects.length;
        const nextProject = HAUSMAN_DATA.projects[nextIndex];

        if (btnNextProject && nextProject) {
            btnNextProject.href = `project.html?id=${nextProject.id}`;
        }
    }

    // ==========================================
    // 5. SECTION 23: CONTACT FORM & SUBMISSION
    // ==========================================
    const contactFormMinimal = document.getElementById('contactFormMinimal');
    const contactSuccessNotice = document.getElementById('contactSuccessNotice');

    if (contactFormMinimal) {
        contactFormMinimal.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(contactFormMinimal);

            const newInquiry = {
                id: `REQ-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
                date: "Aujourd'hui",
                name: formData.get('name') || "Styliste",
                email: formData.get('email') || "contact@agency.com",
                agency: "Direct Inquiry",
                instagram: formData.get('email') || "@agency",
                projectType: formData.get('projectType') || "Editorial",
                projectDate: formData.get('projectDate') || "ASAP",
                requestedPieces: formData.get('requestedPieces') || "Général",
                message: formData.get('message') || "Demande d'inquiry showroom.",
                status: 'new',
                urgency: 'high'
            };

            HAUSMAN_DATA.inquiries.unshift(newInquiry);

            if (contactSuccessNotice) {
                contactSuccessNotice.style.display = 'block';
            }
            contactFormMinimal.reset();
        });
    }

    // ==========================================
    // 6. SECTION 25 & 28: MOBILE NAV & BILINGUAL ENGINE
    // ==========================================
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileNavFullscreen = document.getElementById('mobileNavFullscreen');
    const mobileNavClose = document.getElementById('mobileNavClose');

    if (mobileMenuBtn && mobileNavFullscreen) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileNavFullscreen.classList.add('open');
            document.body.style.overflow = 'hidden';
        });
    }

    if (mobileNavClose && mobileNavFullscreen) {
        mobileNavClose.addEventListener('click', () => {
            mobileNavFullscreen.classList.remove('open');
            document.body.style.overflow = '';
        });
    }

    function setLanguage(lang) {
        state.lang = lang;
        localStorage.setItem('hausman_lang', lang);

        document.querySelectorAll('.lang-btn').forEach(btn => {
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

        renderCollection();
        renderGarmentDetail();
        renderProjects();
        renderProjectDetail();
    }

    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            setLanguage(btn.getAttribute('data-lang'));
        });
    });

    // Run Initial Renders
    setLanguage(state.lang);
});
