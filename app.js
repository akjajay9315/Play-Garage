/*
 * PlayingGarage - Core JS Application Logic
 * Single Page E-Commerce Flow, Cart State, and Theme Engine
 */

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. PRODUCT DATABASE
    // ==========================================
    // Photos live in assets/products/<folder>/1.jpg, 2.jpg, ... (1.jpg is the cover image)
    const gallery = (folder, count) => Array.from({ length: count }, (_, i) => `assets/products/${folder}/${i + 1}.jpg`);

    const PRODUCTS = [
        {
            id: 101,
            title: "Mercedes-AMG Vision GT Diecast Model Car (Black & Gold)",
            brand: "Mercedes-Benz",
            category: "Supercars",
            theme: "German",
            price: 2999,
            oldPrice: 4499,
            rating: 4.8,
            ratingCount: 64,
            inStock: true,
            desc: "Gloss black Mercedes-AMG Vision GT concept with chrome gold wheels and Panamericana grille. Features working gullwing doors, glowing LED headlights and tail light bar, a detailed cockpit and red brake calipers.",
            specifications: {
                Material: "Diecast alloy body with ABS plastic parts",
                Scale: "1:24",
                Weight: "450g",
                Features: "Gullwing doors, LED lights & sound, pull-back action"
            },
            images: gallery("mercedes-amg-vision-gt", 10)
        },
        {
            id: 102,
            title: "Lamborghini Aventador SVJ 63 Diecast Model Car (Red)",
            brand: "Lamborghini",
            category: "Supercars",
            theme: "Italian",
            price: 2799,
            oldPrice: 3999,
            rating: 4.7,
            ratingCount: 58,
            inStock: true,
            desc: "Candy red Aventador SVJ in '63' race livery with a carbon-look roof, rear wing and diffuser. Scissor doors open to reveal a yellow sports interior, finished with black multi-spoke wheels.",
            specifications: {
                Material: "Diecast alloy body with ABS plastic parts",
                Scale: "1:24",
                Weight: "420g",
                Features: "Scissor doors, lights & sound, pull-back action"
            },
            images: gallery("lamborghini-aventador-svj", 5)
        },
        {
            id: 103,
            title: "BMW M3 E30 Diecast Model Car (Chrome Red)",
            brand: "BMW",
            category: "Classic Cars",
            theme: "German",
            price: 2499,
            oldPrice: 3499,
            rating: 4.8,
            ratingCount: 47,
            inStock: true,
            desc: "The legendary E30 M3 in a mirror-chrome red finish with silver cross-spoke wheels. Doors, bonnet and boot all open, the quad headlights light up, and the interior is fully detailed.",
            specifications: {
                Material: "Diecast alloy body with ABS plastic parts",
                Scale: "1:24",
                Weight: "400g",
                Features: "Opening doors, bonnet & boot, working headlights"
            },
            images: gallery("bmw-m3-e30", 4)
        },
        {
            id: 104,
            title: "Pagani Huayra Diecast Model Car (Purple Carbon)",
            brand: "Pagani",
            category: "Hypercars",
            theme: "Italian",
            price: 4999,
            oldPrice: 6999,
            rating: 4.9,
            ratingCount: 39,
            inStock: true,
            desc: "Metallic purple Pagani Huayra with carbon-fibre detailing and Italian tricolour stripe. Gullwing doors and front and rear clamshells open to show the red leather cockpit and detailed V12 engine bay.",
            specifications: {
                Material: "Diecast alloy body with ABS plastic parts",
                Scale: "1:18",
                Weight: "1.1 kg",
                Features: "Gullwing doors, opening engine cover, detailed interior"
            },
            images: gallery("pagani-huayra", 4)
        },
        {
            id: 105,
            title: "Ford Mustang Fastback 58 Racer Diecast Model Car (Black)",
            brand: "Ford",
            category: "Classic Cars",
            theme: "American",
            price: 1799,
            oldPrice: 2499,
            rating: 4.6,
            ratingCount: 52,
            inStock: true,
            desc: "Classic Mustang fastback in black '58 Racer' livery with white racing stripes and chrome bumpers. Opening doors and bonnet reveal a detailed engine and interior.",
            specifications: {
                Material: "Diecast alloy body with ABS plastic parts",
                Scale: "1:32",
                Weight: "300g",
                Features: "Opening doors & bonnet, pull-back action"
            },
            images: gallery("ford-mustang-fastback", 3)
        },
        {
            id: 106,
            title: "Aston Martin Valkyrie AMR Diecast Model Car (Racing Green)",
            brand: "Aston Martin",
            category: "Hypercars",
            theme: "British",
            price: 2999,
            oldPrice: 3999,
            rating: 4.7,
            ratingCount: 33,
            inStock: true,
            desc: "Aston Martin Valkyrie AMR hypercar in metallic racing green with lime accents and '001' race numbers. Upward-opening doors and a detailed cockpit, sitting on black multi-spoke wheels.",
            specifications: {
                Material: "Diecast alloy body with ABS plastic parts",
                Scale: "1:24",
                Weight: "420g",
                Features: "Opening doors, lights & sound, pull-back action"
            },
            images: gallery("aston-martin-valkyrie", 3)
        }
    ];

    // ==========================================
    // 2. PRODUCT IMAGE HELPER
    // ==========================================
    function getProductImage(prod, index = 0) {
        const src = prod.images[index] || prod.images[0];
        return `<img src="${src}" alt="${prod.title}" class="product-photo" loading="lazy">`;
    }

    // ==========================================
    // 3. APPLICATION STATE
    // ==========================================
    const state = {
        currentView: 'home',
        theme: 'dark',
        cart: [],
        filters: {
            searchQuery: '',
            categories: [],
            themes: [],
            brands: [],
            priceMin: null,
            priceMax: null,
            sortBy: 'featured'
        },
        selectedProduct: null,
        detailQty: 1
    };

    // Load state from LocalStorage if available
    function loadPersistedState() {
        const savedTheme = localStorage.getItem('sh_theme');
        if (savedTheme) {
            state.theme = savedTheme;
            const checkbox = document.getElementById('checkbox');
            if (checkbox) {
                checkbox.checked = savedTheme === 'light';
            }
            if (savedTheme === 'light') {
                document.body.classList.add('light-theme');
            } else {
                document.body.classList.remove('light-theme');
            }
        }

        const savedCart = localStorage.getItem('sh_cart');
        if (savedCart) {
            try {
                // Re-link saved items to the current catalog; drop products that no longer exist
                state.cart = JSON.parse(savedCart)
                    .map(item => ({ product: PRODUCTS.find(p => p.id === item.product?.id), quantity: item.quantity }))
                    .filter(item => item.product);
                updateCartUI();
            } catch (e) {
                state.cart = [];
            }
        }
    }

    function saveState() {
        localStorage.setItem('sh_theme', state.theme);
        localStorage.setItem('sh_cart', JSON.stringify(state.cart));
    }

    // ==========================================
    // 4. ROUTER & VIEWS RENDERING
    // ==========================================
    function navigateTo(viewName, data = null) {
        state.currentView = viewName;
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // Toggle Active Sections
        document.querySelectorAll('.view-section').forEach(section => {
            section.classList.remove('active-view');
        });

        const activeSection = document.getElementById(`${viewName}-view`);
        if (activeSection) {
            activeSection.classList.add('active-view');
        }

        // View Specific Logic
        if (viewName === 'home') {
            renderHomeProducts();
        } else if (viewName === 'catalog') {
            // Apply parameters if passed in data
            if (data && data.filterType) {
                resetFilters(false);
                const filterVal = data.filterVal;
                if (data.filterType === 'category') {
                    state.filters.categories = [filterVal];
                } else if (data.filterType === 'theme') {
                    state.filters.themes = [filterVal];
                } else if (data.filterType === 'brand') {
                    state.filters.brands = [filterVal];
                } else if (data.filterType === 'search') {
                    state.filters.searchQuery = filterVal;
                    const searchInput = document.getElementById('global-search-input');
                    if (searchInput) searchInput.value = filterVal;
                }
            }
            renderFiltersSidebar();
            renderCatalog();
        } else if (viewName === 'detail') {
            if (data && data.productId) {
                const prod = PRODUCTS.find(p => p.id === parseInt(data.productId));
                if (prod) {
                    state.selectedProduct = prod;
                    state.detailQty = 1;
                    renderProductDetail();
                }
            }
        } else if (viewName === 'checkout') {
            renderCheckout();
        }

        // Reset Suggestions Box
        const suggestionBox = document.getElementById('search-suggestions-box');
        if (suggestionBox) suggestionBox.style.display = 'none';

        lucide.createIcons();
    }

    // Bind link clicks
    document.addEventListener('click', (e) => {
        const target = e.target.closest('[data-link]');
        if (target) {
            e.preventDefault();
            const view = target.getAttribute('data-link');
            const filterType = target.getAttribute('data-filter-type');
            const filterVal = target.getAttribute('data-filter-val');
            const productId = target.getAttribute('data-product-id');
            
            const params = {};
            if (filterType) {
                params.filterType = filterType;
                params.filterVal = filterVal;
            }
            if (productId) {
                params.productId = productId;
            }
            
            navigateTo(view, params);
        }
    });

    // ==========================================
    // 5. THEME SWITCH ENGINE
    // ==========================================
    const themeCheckbox = document.getElementById('checkbox');
    if (themeCheckbox) {
        themeCheckbox.addEventListener('change', () => {
            if (themeCheckbox.checked) {
                state.theme = 'light';
                document.body.classList.add('light-theme');
            } else {
                state.theme = 'dark';
                document.body.classList.remove('light-theme');
            }
            saveState();
            // Re-render views if they use theme-specific backgrounds
            if (state.currentView === 'home') {
                renderHomeProducts();
            } else if (state.currentView === 'catalog') {
                renderCatalog();
            }
        });
    }

    // ==========================================
    // 6. SEARCH AUTOCOMPLETE & EXECUTION
    // ==========================================
    const searchInput = document.getElementById('global-search-input');
    const suggestionBox = document.getElementById('search-suggestions-box');

    if (searchInput && suggestionBox) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            if (query.length < 2) {
                suggestionBox.style.display = 'none';
                return;
            }

            // Find matching products
            const matches = PRODUCTS.filter(p => 
                p.title.toLowerCase().includes(query) ||
                p.brand.toLowerCase().includes(query) ||
                p.category.toLowerCase().includes(query) ||
                p.theme.toLowerCase().includes(query)
            ).slice(0, 5); // Limit 5

            if (matches.length === 0) {
                suggestionBox.innerHTML = `
                    <div class="suggestion-item" style="cursor:default; justify-content:center; color:var(--text-secondary);">
                        No results found
                    </div>
                `;
            } else {
                suggestionBox.innerHTML = matches.map(prod => `
                    <div class="suggestion-item" data-product-id="${prod.id}">
                        <div class="suggestion-img">
                            ${getProductImage(prod)}
                        </div>
                        <div class="suggestion-info">
                            <span class="suggestion-title">${prod.title.substring(0, 45)}...</span>
                            <span class="suggestion-price">₹${prod.price.toLocaleString('en-IN')}</span>
                        </div>
                    </div>
                `).join('');

                // Bind suggestion clicks
                suggestionBox.querySelectorAll('.suggestion-item').forEach(item => {
                    item.addEventListener('click', () => {
                        const pid = item.getAttribute('data-product-id');
                        if (pid) {
                            searchInput.value = '';
                            navigateTo('detail', { productId: pid });
                        }
                    });
                });
            }
            suggestionBox.style.display = 'block';
        });

        // Hide suggestions on clicking outside
        document.addEventListener('click', (e) => {
            if (!searchInput.contains(e.target) && !suggestionBox.contains(e.target)) {
                suggestionBox.style.display = 'none';
            }
        });

        // Execute search on Enter key
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const query = searchInput.value.trim();
                if (query.length > 0) {
                    navigateTo('catalog', { filterType: 'search', filterVal: query });
                }
            }
        });
    }

    // ==========================================
    // 7. TOAST NOTIFICATION SYSTEM
    // ==========================================
    function showToast(title, desc, icon = "info") {
        const container = document.getElementById('global-toast-container');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = 'toast';
        
        let iconName = "info";
        if (icon === "success") iconName = "check-circle";
        if (icon === "warning") iconName = "alert-triangle";
        if (icon === "cart") iconName = "shopping-cart";

        toast.innerHTML = `
            <div class="toast-icon"><i data-lucide="${iconName}"></i></div>
            <div class="toast-body">
                <div class="toast-title">${title}</div>
                <div class="toast-desc">${desc}</div>
            </div>
            <div class="toast-close"><i data-lucide="x"></i></div>
        `;

        container.appendChild(toast);
        lucide.createIcons();

        // Animate in
        setTimeout(() => toast.classList.add('show'), 50);

        // Auto Close Timer
        const autoClose = setTimeout(() => {
            closeToast(toast);
        }, 3500);

        // Click Close Bind
        toast.querySelector('.toast-close').addEventListener('click', () => {
            clearTimeout(autoClose);
            closeToast(toast);
        });
    }

    function closeToast(toast) {
        toast.classList.remove('show');
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 400);
    }

    // ==========================================
    // 8. CART STATE MANAGEMENT
    // ==========================================
    const cartOverlay = document.getElementById('cart-drawer-overlay');
    const cartToggle = document.getElementById('cart-drawer-toggle');
    const cartCloseBtn = document.getElementById('cart-drawer-close-btn');

    if (cartToggle && cartOverlay && cartCloseBtn) {
        cartToggle.addEventListener('click', () => cartOverlay.classList.add('open'));
        cartCloseBtn.addEventListener('click', () => cartOverlay.classList.remove('open'));
        cartOverlay.addEventListener('click', (e) => {
            if (e.target === cartOverlay) cartOverlay.classList.remove('open');
        });
    }

    function addToCart(productId, qty = 1) {
        const prod = PRODUCTS.find(p => p.id === parseInt(productId));
        if (!prod) return;

        if (!prod.inStock) {
            showToast("Sold Out", `${prod.title.substring(0, 25)}... is currently out of stock.`, "warning");
            return;
        }

        const existingItem = state.cart.find(item => item.product.id === prod.id);
        if (existingItem) {
            existingItem.quantity += qty;
        } else {
            state.cart.push({ product: prod, quantity: qty });
        }

        saveState();
        updateCartUI();
        showToast("Added to Cart", `${prod.title.substring(0, 25)}... (Qty: ${qty}) has been added to your cart.`, "cart");
        
        // Auto Open drawer
        if (cartOverlay) cartOverlay.classList.add('open');
    }

    function updateCartUI() {
        const badge = document.getElementById('header-cart-count');
        const drawerCountText = document.getElementById('cart-drawer-count');
        const listContainer = document.getElementById('cart-drawer-items-list');
        const subtotalText = document.getElementById('cart-drawer-subtotal');
        
        // Calculate Count and Subtotal
        const totalQty = state.cart.reduce((sum, item) => sum + item.quantity, 0);
        const subtotal = state.cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

        if (badge) badge.innerText = totalQty;
        if (drawerCountText) drawerCountText.innerText = totalQty;
        if (subtotalText) subtotalText.innerText = `₹${subtotal.toLocaleString('en-IN')}`;

        if (!listContainer) return;

        if (state.cart.length === 0) {
            listContainer.innerHTML = `
                <div class="cart-empty-state">
                    <i data-lucide="shopping-bag" style="width: 48px; height: 48px; stroke-width: 1.5;"></i>
                    <p>Your shopping cart is empty.</p>
                    <button class="btn-primary" style="margin-top:10px;" id="cart-drawer-empty-shop-btn">Continue Shopping</button>
                </div>
            `;
            const shopBtn = document.getElementById('cart-drawer-empty-shop-btn');
            if (shopBtn) {
                shopBtn.addEventListener('click', () => {
                    cartOverlay.classList.remove('open');
                    navigateTo('catalog');
                });
            }
        } else {
            listContainer.innerHTML = state.cart.map(item => `
                <div class="cart-item">
                    <div class="cart-item-img-wrapper">
                        ${getProductImage(item.product)}
                    </div>
                    <div class="cart-item-details">
                        <a href="#" class="cart-item-title" data-product-nav="${item.product.id}">${item.product.title.substring(0, 45)}...</a>
                        <span class="cart-item-vendor">${item.product.brand}</span>
                        <div class="cart-item-bottom">
                            <div class="cart-item-qty">
                                <button class="cart-qty-btn cart-qty-minus" data-id="${item.product.id}"><i data-lucide="minus" style="width:12px;"></i></button>
                                <input type="number" class="cart-qty-input" value="${item.quantity}" readonly>
                                <button class="cart-qty-btn cart-qty-plus" data-id="${item.product.id}"><i data-lucide="plus" style="width:12px;"></i></button>
                            </div>
                            <span class="cart-item-price">₹${(item.product.price * item.quantity).toLocaleString('en-IN')}</span>
                        </div>
                    </div>
                    <button class="cart-item-remove" data-id="${item.product.id}"><i data-lucide="trash-2" style="width:18px;"></i></button>
                </div>
            `).join('');

            // Bind events for items inside cart drawer
            listContainer.querySelectorAll('.cart-qty-minus').forEach(btn => {
                btn.addEventListener('click', () => {
                    const pid = parseInt(btn.getAttribute('data-id'));
                    adjustCartItemQuantity(pid, -1);
                });
            });

            listContainer.querySelectorAll('.cart-qty-plus').forEach(btn => {
                btn.addEventListener('click', () => {
                    const pid = parseInt(btn.getAttribute('data-id'));
                    adjustCartItemQuantity(pid, 1);
                });
            });

            listContainer.querySelectorAll('.cart-item-remove').forEach(btn => {
                btn.addEventListener('click', () => {
                    const pid = parseInt(btn.getAttribute('data-id'));
                    removeCartItem(pid);
                });
            });

            // Bind links inside cart drawer to details view
            listContainer.querySelectorAll('[data-product-nav]').forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const pid = link.getAttribute('data-product-nav');
                    cartOverlay.classList.remove('open');
                    navigateTo('detail', { productId: pid });
                });
            });
        }
        lucide.createIcons();
    }

    function adjustCartItemQuantity(productId, amount) {
        const item = state.cart.find(i => i.product.id === productId);
        if (!item) return;

        item.quantity += amount;
        if (item.quantity <= 0) {
            removeCartItem(productId);
            return;
        }

        saveState();
        updateCartUI();
        if (state.currentView === 'checkout') renderCheckout(); // Refresh checkout view if open
    }

    function removeCartItem(productId) {
        const item = state.cart.find(i => i.product.id === productId);
        state.cart = state.cart.filter(i => i.product.id !== productId);
        saveState();
        updateCartUI();
        if (item) {
            showToast("Item Removed", `${item.product.title.substring(0, 20)}... removed from cart.`, "info");
        }
        if (state.currentView === 'checkout') renderCheckout(); // Refresh checkout view if open
    }

    // Cart checkout button trigger
    const cartCheckoutTrigger = document.getElementById('cart-checkout-trigger');
    if (cartCheckoutTrigger) {
        cartCheckoutTrigger.addEventListener('click', () => {
            if (state.cart.length === 0) {
                showToast("Cart Empty", "Add items to your cart before checking out.", "warning");
                return;
            }
            cartOverlay.classList.remove('open');
            navigateTo('checkout');
        });
    }

    // ==========================================
    // 9. VIEW RENDERING FUNCTIONS
    // ==========================================

    // Dynamic Product Card HTML helper
    function getProductCardHTML(prod) {
        const isSoldOut = !prod.inStock;
        return `
            <div class="product-card">
                ${isSoldOut ? `<span class="product-card-badge">Sold Out</span>` : ''}
                ${(prod.oldPrice && !isSoldOut) ? `<span class="product-card-badge badge-sale">${Math.round(((prod.oldPrice - prod.price) / prod.oldPrice) * 100)}% OFF</span>` : ''}
                <div class="product-card-media" data-link="detail" data-product-id="${prod.id}">
                    <div class="product-card-img">
                        ${getProductImage(prod)}
                    </div>
                </div>
                <div class="product-card-info">
                    <span class="product-card-theme">${prod.theme}</span>
                    <h3 class="product-card-title" data-link="detail" data-product-id="${prod.id}">${prod.title}</h3>
                    <div class="product-card-rating">
                        <i data-lucide="star" style="width:12px;fill:#ffb300;stroke:none;"></i>
                        <span>${prod.rating}</span>
                        <span class="rating-count">(${prod.ratingCount})</span>
                    </div>
                    <div class="product-card-price-row">
                        <span class="product-card-price">₹${prod.price.toLocaleString('en-IN')}</span>
                        ${prod.oldPrice ? `<span class="product-card-old-price">₹${prod.oldPrice.toLocaleString('en-IN')}</span>` : ''}
                    </div>
                </div>
                <div class="product-card-actions">
                    <button class="card-btn quick-buy-btn" data-id="${prod.id}">
                        <i data-lucide="shopping-cart" style="width:14px;"></i> Quick Add
                    </button>
                    <button class="card-btn" data-link="detail" data-product-id="${prod.id}">
                        <i data-lucide="eye" style="width:14px;"></i> View
                    </button>
                </div>
            </div>
        `;
    }

    // 9a. Render Home View Products
    function renderHomeProducts() {
        const newLaunchesGrid = document.getElementById('new-launches-grid');
        const bestSellersGrid = document.getElementById('bestsellers-grid');

        // Grab first 4 for new launches
        if (newLaunchesGrid) {
            const launches = PRODUCTS.slice(0, 4);
            newLaunchesGrid.innerHTML = launches.map(getProductCardHTML).join('');
        }

        // Grab last 4 for bestsellers
        if (bestSellersGrid) {
            const bestSellers = PRODUCTS.slice(-4);
            bestSellersGrid.innerHTML = bestSellers.map(getProductCardHTML).join('');
        }

        // Bind quick buy button listeners
        document.querySelectorAll('.quick-buy-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const pid = btn.getAttribute('data-id');
                addToCart(pid, 1);
            });
        });
    }

    // Hero Slider Carousel Actions
    let currentSlide = 0;
    const heroSlides = document.querySelectorAll('#main-hero-carousel .carousel-slide');
    const heroPrevBtn = document.getElementById('hero-prev');
    const heroNextBtn = document.getElementById('hero-next');

    function showSlide(index) {
        if (heroSlides.length === 0) return;
        heroSlides.forEach(slide => slide.classList.remove('active'));
        
        currentSlide = (index + heroSlides.length) % heroSlides.length;
        heroSlides[currentSlide].classList.add('active');
    }

    if (heroPrevBtn && heroNextBtn) {
        heroPrevBtn.addEventListener('click', () => showSlide(currentSlide - 1));
        heroNextBtn.addEventListener('click', () => showSlide(currentSlide + 1));
        
        // Auto Rotate slider every 6 seconds
        setInterval(() => {
            if (state.currentView === 'home') {
                showSlide(currentSlide + 1);
            }
        }, 6000);
    }

    // 9b. Render Catalog Filter Options Sidebar
    function renderFiltersSidebar() {
        const categories = [...new Set(PRODUCTS.map(p => p.category))];
        const themes = [...new Set(PRODUCTS.map(p => p.theme))];
        const brands = [...new Set(PRODUCTS.map(p => p.brand))];

        const catList = document.getElementById('category-filter-list');
        const themeList = document.getElementById('theme-filter-list');
        const brandList = document.getElementById('brand-filter-list');

        if (catList) {
            catList.innerHTML = categories.map(cat => `
                <li>
                    <label class="filter-checkbox-wrapper">
                        <input type="checkbox" class="category-filter-input" value="${cat}" 
                            ${state.filters.categories.includes(cat) ? 'checked' : ''}>
                        <span class="filter-checkbox"><i data-lucide="check" style="width:12px;"></i></span>
                        <span>${cat}</span>
                    </label>
                </li>
            `).join('');
            
            catList.querySelectorAll('.category-filter-input').forEach(input => {
                input.addEventListener('change', () => {
                    const val = input.value;
                    if (input.checked) {
                        state.filters.categories.push(val);
                    } else {
                        state.filters.categories = state.filters.categories.filter(c => c !== val);
                    }
                    renderCatalog();
                });
            });
        }

        if (themeList) {
            themeList.innerHTML = themes.map(th => `
                <li>
                    <label class="filter-checkbox-wrapper">
                        <input type="checkbox" class="theme-filter-input" value="${th}"
                            ${state.filters.themes.includes(th) ? 'checked' : ''}>
                        <span class="filter-checkbox"><i data-lucide="check" style="width:12px;"></i></span>
                        <span>${th}</span>
                    </label>
                </li>
            `).join('');

            themeList.querySelectorAll('.theme-filter-input').forEach(input => {
                input.addEventListener('change', () => {
                    const val = input.value;
                    if (input.checked) {
                        state.filters.themes.push(val);
                    } else {
                        state.filters.themes = state.filters.themes.filter(t => t !== val);
                    }
                    renderCatalog();
                });
            });
        }

        if (brandList) {
            brandList.innerHTML = brands.map(br => `
                <li>
                    <label class="filter-checkbox-wrapper">
                        <input type="checkbox" class="brand-filter-input" value="${br}"
                            ${state.filters.brands.includes(br) ? 'checked' : ''}>
                        <span class="filter-checkbox"><i data-lucide="check" style="width:12px;"></i></span>
                        <span>${br}</span>
                    </label>
                </li>
            `).join('');

            brandList.querySelectorAll('.brand-filter-input').forEach(input => {
                input.addEventListener('change', () => {
                    const val = input.value;
                    if (input.checked) {
                        state.filters.brands.push(val);
                    } else {
                        state.filters.brands = state.filters.brands.filter(b => b !== val);
                    }
                    renderCatalog();
                });
            });
        }

        lucide.createIcons();
    }

    // 9c. Render Catalog Products Grid & Apply Filter Logic
    function renderCatalog() {
        const catalogProductsGrid = document.getElementById('catalog-products-grid');
        const resultsCountText = document.getElementById('results-count-text');
        const emptyView = document.getElementById('catalog-empty-view');

        if (!catalogProductsGrid) return;

        // Filter product collection
        let filtered = PRODUCTS.filter(prod => {
            // Search Query filter
            if (state.filters.searchQuery) {
                const query = state.filters.searchQuery.toLowerCase();
                const matchesSearch = 
                    prod.title.toLowerCase().includes(query) ||
                    prod.brand.toLowerCase().includes(query) ||
                    prod.category.toLowerCase().includes(query) ||
                    prod.theme.toLowerCase().includes(query);
                if (!matchesSearch) return false;
            }

            // Categories Filter
            if (state.filters.categories.length > 0) {
                if (!state.filters.categories.includes(prod.category)) return false;
            }

            // Themes Filter
            if (state.filters.themes.length > 0) {
                if (!state.filters.themes.includes(prod.theme)) return false;
            }

            // Brands Filter
            if (state.filters.brands.length > 0) {
                if (!state.filters.brands.includes(prod.brand)) return false;
            }

            // Price Filters
            if (state.filters.priceMin !== null) {
                if (prod.price < state.filters.priceMin) return false;
            }
            if (state.filters.priceMax !== null) {
                if (prod.price > state.filters.priceMax) return false;
            }

            return true;
        });

        // Sorting Logic
        if (state.filters.sortBy === 'price-low') {
            filtered.sort((a, b) => a.price - b.price);
        } else if (state.filters.sortBy === 'price-high') {
            filtered.sort((a, b) => b.price - a.price);
        } else if (state.filters.sortBy === 'rating') {
            filtered.sort((a, b) => b.rating - a.rating);
        }

        // Render Cards
        if (filtered.length === 0) {
            catalogProductsGrid.style.display = 'none';
            if (emptyView) emptyView.style.display = 'block';
            if (resultsCountText) resultsCountText.innerText = `0 products found`;
        } else {
            if (emptyView) emptyView.style.display = 'none';
            catalogProductsGrid.style.display = 'grid';
            catalogProductsGrid.innerHTML = filtered.map(getProductCardHTML).join('');
            if (resultsCountText) resultsCountText.innerText = `${filtered.length} products found`;

            // Bind listeners inside catalog
            catalogProductsGrid.querySelectorAll('.quick-buy-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const pid = btn.getAttribute('data-id');
                    addToCart(pid, 1);
                });
            });
        }
        lucide.createIcons();
    }

    // Price Filter Buttons binds
    const applyPriceBtn = document.getElementById('apply-price-filter');
    if (applyPriceBtn) {
        applyPriceBtn.addEventListener('click', () => {
            const minInput = document.getElementById('price-min');
            const maxInput = document.getElementById('price-max');
            
            const min = minInput.value ? parseFloat(minInput.value) : null;
            const max = maxInput.value ? parseFloat(maxInput.value) : null;

            state.filters.priceMin = min;
            state.filters.priceMax = max;
            renderCatalog();
        });
    }

    // Clear Filters Button binds
    function resetFilters(refreshUI = true) {
        state.filters.categories = [];
        state.filters.themes = [];
        state.filters.brands = [];
        state.filters.priceMin = null;
        state.filters.priceMax = null;
        state.filters.searchQuery = '';
        
        const searchInput = document.getElementById('global-search-input');
        if (searchInput) searchInput.value = '';
        
        const minInput = document.getElementById('price-min');
        const maxInput = document.getElementById('price-max');
        if (minInput) minInput.value = '';
        if (maxInput) maxInput.value = '';

        if (refreshUI) {
            renderFiltersSidebar();
            renderCatalog();
        }
    }

    const clearFiltersBtn = document.getElementById('clear-filters-btn');
    const emptyResetBtn = document.getElementById('catalog-empty-reset');
    
    if (clearFiltersBtn) clearFiltersBtn.addEventListener('click', () => resetFilters(true));
    if (emptyResetBtn) emptyResetBtn.addEventListener('click', () => resetFilters(true));

    // Sort Dropdown bind
    const sortSelect = document.getElementById('catalog-sort-select');
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            state.filters.sortBy = e.target.value;
            renderCatalog();
        });
    }


    // 9d. Render Product Detail View
    function renderProductDetail() {
        const prod = state.selectedProduct;
        if (!prod) return;

        // Elements
        const crumbs = document.getElementById('detail-breadcrumbs-box');
        const mainImg = document.getElementById('product-detail-main-img');
        const thumbsList = document.getElementById('product-detail-thumbnails');
        const themeText = document.getElementById('product-detail-theme');
        const titleText = document.getElementById('product-detail-title');
        const starsBox = document.getElementById('product-detail-stars');
        const ratingText = document.getElementById('product-detail-rating-text');
        const brandText = document.getElementById('product-detail-brand');
        const priceText = document.getElementById('product-detail-price');
        const oldPriceText = document.getElementById('product-detail-old-price');
        const discountTag = document.getElementById('product-detail-discount');
        const descText = document.getElementById('product-detail-desc');
        
        const stockDot = document.getElementById('product-detail-stock-dot');
        const stockLabel = document.getElementById('product-detail-stock-label');
        const qtyInput = document.getElementById('detail-qty-input');

        const specMaterial = document.getElementById('spec-material');
        const specScale = document.getElementById('spec-scale');
        const specWeight = document.getElementById('spec-weight');
        const specFeatures = document.getElementById('spec-features');
        const relatedGrid = document.getElementById('related-products-grid');

        // Breadcrumbs
        if (crumbs) {
            crumbs.innerHTML = `
                <a href="#" data-link="home">Home</a>
                <span class="breadcrumb-separator"><i data-lucide="chevron-right" style="width:12px;"></i></span>
                <a href="#" data-link="catalog" data-filter-type="category" data-filter-val="${prod.category}">${prod.category}</a>
                <span class="breadcrumb-separator"><i data-lucide="chevron-right" style="width:12px;"></i></span>
                <span style="color:var(--text-primary); font-weight:600;">${prod.title.substring(0, 30)}...</span>
            `;
        }

        // Main photo (cover image first)
        if (mainImg) {
            mainImg.src = prod.images[0];
            mainImg.alt = prod.title;
        }

        // Thumbnails: one per photo of this product
        if (thumbsList) {
            thumbsList.innerHTML = prod.images.map((src, i) => `
                <button class="detail-thumb-btn${i === 0 ? ' active' : ''}" data-index="${i}">
                    <img src="${src}" alt="${prod.title} - photo ${i + 1}" loading="lazy">
                </button>
            `).join('');

            thumbsList.querySelectorAll('.detail-thumb-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    thumbsList.querySelectorAll('.detail-thumb-btn').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');

                    // Swap main photo to the clicked thumbnail
                    if (mainImg) {
                        mainImg.src = prod.images[parseInt(btn.getAttribute('data-index'))];
                    }
                });
            });
        }

        // Metadata
        if (themeText) themeText.innerText = prod.theme;
        if (titleText) titleText.innerText = prod.title;
        if (brandText) brandText.innerText = prod.brand;
        if (descText) descText.innerText = prod.desc;

        // Stars
        if (starsBox) {
            let starsHTML = '';
            const floorRating = Math.floor(prod.rating);
            for (let i = 1; i <= 5; i++) {
                if (i <= floorRating) {
                    starsHTML += '<i data-lucide="star" style="width:14px; fill:#ffb300; stroke:none;"></i> ';
                } else if (i === floorRating + 1 && prod.rating % 1 !== 0) {
                    starsHTML += '<i data-lucide="star-half" style="width:14px; fill:#ffb300; stroke:none;"></i> ';
                } else {
                    starsHTML += '<i data-lucide="star" style="width:14px; fill:var(--border-color); stroke:none;"></i> ';
                }
            }
            starsBox.innerHTML = starsHTML;
        }
        if (ratingText) ratingText.innerText = `(${prod.ratingCount} customer reviews)`;

        // Prices
        if (priceText) priceText.innerText = `₹${prod.price.toLocaleString('en-IN')}`;
        if (prod.oldPrice) {
            if (oldPriceText) {
                oldPriceText.innerText = `₹${prod.oldPrice.toLocaleString('en-IN')}`;
                oldPriceText.style.display = 'inline';
            }
            if (discountTag) {
                discountTag.innerText = `${Math.round(((prod.oldPrice - prod.price) / prod.oldPrice) * 100)}% OFF`;
                discountTag.style.display = 'inline';
            }
        } else {
            if (oldPriceText) oldPriceText.style.display = 'none';
            if (discountTag) discountTag.style.display = 'none';
        }

        // Stock Status
        if (prod.inStock) {
            if (stockDot) {
                stockDot.className = 'stock-dot in-stock';
            }
            if (stockLabel) {
                stockLabel.innerText = "In Stock (Ready to dispatch)";
                stockLabel.style.color = 'var(--text-primary)';
            }
        } else {
            if (stockDot) {
                stockDot.className = 'stock-dot out-of-stock';
            }
            if (stockLabel) {
                stockLabel.innerText = "Temporarily Out of Stock";
                stockLabel.style.color = '#d32f2f';
            }
        }

        // Reset Qty input
        if (qtyInput) qtyInput.value = state.detailQty;

        // Specifications
        if (specMaterial) specMaterial.innerText = prod.specifications.Material || 'Diecast alloy';
        if (specScale) specScale.innerText = prod.specifications.Scale || 'N/A';
        if (specWeight) specWeight.innerText = prod.specifications.Weight || 'N/A';
        if (specFeatures) specFeatures.innerText = prod.specifications.Features || 'N/A';

        // Render Related Products (same theme first, topped up with others to always show 4)
        if (relatedGrid) {
            const others = PRODUCTS.filter(p => p.id !== prod.id);
            const related = [
                ...others.filter(p => p.theme === prod.theme),
                ...others.filter(p => p.theme !== prod.theme)
            ].slice(0, 4);
            relatedGrid.innerHTML = related.map(getProductCardHTML).join('');

            // Bind listeners inside related grid
            relatedGrid.querySelectorAll('.quick-buy-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const pid = btn.getAttribute('data-id');
                    addToCart(pid, 1);
                });
            });
        }

        lucide.createIcons();
    }

    // Detail Page Quantity Buttons
    const detailQtyMinus = document.getElementById('detail-qty-minus');
    const detailQtyPlus = document.getElementById('detail-qty-plus');
    const detailQtyInput = document.getElementById('detail-qty-input');

    if (detailQtyMinus && detailQtyPlus && detailQtyInput) {
        detailQtyMinus.addEventListener('click', () => {
            let val = parseInt(detailQtyInput.value);
            if (val > 1) {
                val--;
                detailQtyInput.value = val;
                state.detailQty = val;
            }
        });

        detailQtyPlus.addEventListener('click', () => {
            let val = parseInt(detailQtyInput.value);
            val++;
            detailQtyInput.value = val;
            state.detailQty = val;
        });

        detailQtyInput.addEventListener('change', () => {
            let val = parseInt(detailQtyInput.value);
            if (isNaN(val) || val < 1) {
                val = 1;
            }
            detailQtyInput.value = val;
            state.detailQty = val;
        });
    }

    // Detail Page Add to Cart Button Binds
    const detailAddToCartBtn = document.getElementById('detail-add-to-cart-btn');
    if (detailAddToCartBtn) {
        detailAddToCartBtn.addEventListener('click', () => {
            if (state.selectedProduct) {
                addToCart(state.selectedProduct.id, state.detailQty);
            }
        });
    }

    // Detail Page Buy Now Button Binds
    const detailBuyNowBtn = document.getElementById('detail-buy-now-btn');
    if (detailBuyNowBtn) {
        detailBuyNowBtn.addEventListener('click', () => {
            if (state.selectedProduct) {
                // Add to cart and immediately go to checkout
                const prod = state.selectedProduct;
                if (!prod.inStock) {
                    showToast("Sold Out", `${prod.title.substring(0, 25)}... is out of stock.`, "warning");
                    return;
                }
                const existing = state.cart.find(i => i.product.id === prod.id);
                if (!existing) {
                    state.cart.push({ product: prod, quantity: state.detailQty });
                }
                saveState();
                updateCartUI();
                navigateTo('checkout');
            }
        });
    }


    // 9e. Render Checkout Page View
    let promoDiscountApplied = false;

    function renderCheckout() {
        const checkoutLayout = document.getElementById('checkout-main-layout');
        const successView = document.getElementById('order-success-view');
        
        if (checkoutLayout) checkoutLayout.style.display = 'grid';
        if (successView) successView.style.display = 'none';

        const checkoutList = document.getElementById('checkout-summary-items-list');
        const subtotalText = document.getElementById('checkout-subtotal');
        const deliveryText = document.getElementById('checkout-delivery');
        const codRow = document.getElementById('checkout-cod-row');
        const discountRow = document.getElementById('checkout-discount-row');
        const discountVal = document.getElementById('checkout-discount-val');
        const grandTotalText = document.getElementById('checkout-grand-total');

        if (!checkoutList) return;

        // Compute pricing
        const subtotal = state.cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
        let deliveryFee = subtotal >= 1499 ? 0 : 99;
        
        // Read active payment method for COD charges
        const activePayment = document.querySelector('input[name="payment-option"]:checked')?.value || 'cod';
        const codCharge = activePayment === 'cod' ? 49 : 0;
        
        let discount = 0;
        if (promoDiscountApplied) {
            discount = Math.round(subtotal * 0.1);
        }

        const grandTotal = subtotal + deliveryFee + codCharge - discount;

        // Render item summaries
        checkoutList.innerHTML = state.cart.map(item => `
            <div class="checkout-item">
                <div class="checkout-item-img">
                    ${getProductImage(item.product)}
                </div>
                <div class="checkout-item-details">
                    <span class="checkout-item-title">${item.product.title.substring(0, 35)}...</span>
                    <span class="checkout-item-qty">Qty: ${item.quantity}</span>
                </div>
                <span class="checkout-item-price">₹${(item.product.price * item.quantity).toLocaleString('en-IN')}</span>
            </div>
        `).join('');

        // Apply visual updates to numbers
        if (subtotalText) subtotalText.innerText = `₹${subtotal.toLocaleString('en-IN')}`;
        if (deliveryText) deliveryText.innerText = deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`;
        
        if (activePayment === 'cod') {
            if (codRow) codRow.style.display = 'flex';
        } else {
            if (codRow) codRow.style.display = 'none';
        }

        if (promoDiscountApplied) {
            if (discountRow) discountRow.style.display = 'flex';
            if (discountVal) discountVal.innerText = `-₹${discount.toLocaleString('en-IN')}`;
        } else {
            if (discountRow) discountRow.style.display = 'none';
        }

        if (grandTotalText) grandTotalText.innerText = `₹${grandTotal.toLocaleString('en-IN')}`;
    }

    // Payment Radio button changes update totals
    document.querySelectorAll('input[name="payment-option"]').forEach(radio => {
        radio.addEventListener('change', () => {
            renderCheckout();
        });
    });

    // Promo Code Application
    const applyPromoBtn = document.getElementById('apply-promo-btn');
    if (applyPromoBtn) {
        applyPromoBtn.addEventListener('click', () => {
            const promoInput = document.getElementById('promo-code-input');
            const code = promoInput.value.toUpperCase().trim();

            if (code === 'SUPER10') {
                if (promoDiscountApplied) {
                    showToast("Already Applied", "The promo code has already been applied to this order.", "warning");
                    return;
                }
                promoDiscountApplied = true;
                showToast("Promo Code Applied", "10% coupon discount has been successfully credited.", "success");
                renderCheckout();
            } else if (code === '') {
                showToast("Empty Code", "Please input a coupon code first.", "warning");
            } else {
                showToast("Invalid Promo Code", "The coupon code you input is invalid or expired.", "warning");
            }
        });
    }

    // Place Order Button Action Flow
    const placeOrderBtn = document.getElementById('place-order-btn');
    if (placeOrderBtn) {
        placeOrderBtn.addEventListener('click', () => {
            // Form validation
            const email = document.getElementById('checkout-email').value.trim();
            const phone = document.getElementById('checkout-phone').value.trim();
            const firstName = document.getElementById('shipping-first-name').value.trim();
            const lastName = document.getElementById('shipping-last-name').value.trim();
            const address = document.getElementById('shipping-address').value.trim();
            const city = document.getElementById('shipping-city').value.trim();
            const stateField = document.getElementById('shipping-state').value.trim();
            const pincode = document.getElementById('shipping-pincode').value.trim();

            if (!email || !phone || !firstName || !lastName || !address || !city || !stateField || !pincode) {
                showToast("Incomplete Form", "Please fill in all the required (*) shipping details.", "warning");
                return;
            }

            // Animate button loading
            placeOrderBtn.disabled = true;
            placeOrderBtn.innerHTML = `<i data-lucide="loader" class="spin"></i> Placing Order...`;
            lucide.createIcons();

            // Simulate order processing API request
            setTimeout(() => {
                const checkoutLayout = document.getElementById('checkout-main-layout');
                const successView = document.getElementById('order-success-view');

                // Get final total details
                const subtotal = state.cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
                const deliveryFee = subtotal >= 1499 ? 0 : 99;
                const activePayment = document.querySelector('input[name="payment-option"]:checked')?.value || 'cod';
                const codCharge = activePayment === 'cod' ? 49 : 0;
                let discount = 0;
                if (promoDiscountApplied) discount = Math.round(subtotal * 0.1);
                const finalTotal = subtotal + deliveryFee + codCharge - discount;

                // Setup success details
                const successName = document.getElementById('success-shipping-name');
                const successPayment = document.getElementById('success-payment-method');
                const successPrice = document.getElementById('success-final-price');
                const successInvoice = document.getElementById('success-invoice-id');

                if (successName) successName.innerText = `${firstName} ${lastName}, ${city}`;
                if (successPayment) {
                    if (activePayment === 'cod') successPayment.innerText = "Cash on Delivery";
                    else if (activePayment === 'upi') successPayment.innerText = "UPI (Express Gateway)";
                    else successPayment.innerText = "Credit/Debit Card";
                }
                if (successPrice) successPrice.innerText = `₹${finalTotal.toLocaleString('en-IN')}`;
                if (successInvoice) successInvoice.innerText = Math.floor(100000 + Math.random() * 900000); // Random Invoice ID

                // Transition views
                if (checkoutLayout) checkoutLayout.style.display = 'none';
                if (successView) successView.style.display = 'block';

                // Reset cart
                state.cart = [];
                promoDiscountApplied = false;
                const promoInput = document.getElementById('promo-code-input');
                if (promoInput) promoInput.value = '';
                saveState();
                updateCartUI();

                // Restore place order button
                placeOrderBtn.disabled = false;
                placeOrderBtn.innerText = "Complete Order & Pay";
                
                showToast("Order Confirmed!", "Your order was submitted successfully.", "success");
                lucide.createIcons();
            }, 1800);
        });
    }

    // ==========================================
    // 10. INITIALIZATION RUN
    // ==========================================
    loadPersistedState();
    navigateTo('home');
});
