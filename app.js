/*
 * SuperHero Toy Store - Core JS Application Logic
 * Single Page E-Commerce Flow, Cart State, and Theme Engine
 */

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. MOCK PRODUCT DATABASE
    // ==========================================
    const PRODUCTS = [
        {
            id: 1,
            title: "Fondjoy Superman 2.0 (Man of Steel) 1/10 Articulated Action Figure",
            brand: "Fondjoy",
            category: "Action Figures",
            theme: "DC Comics",
            price: 3999,
            oldPrice: 5999,
            rating: 4.8,
            ratingCount: 89,
            inStock: true,
            desc: "The definitive Man of Steel action figure by Fondjoy. Featuring a screen-accurate texture, metallic blue coloring, over 22 points of articulation, and multiple interchangeable hands and cape configurations to recreate iconic flight poses.",
            specifications: {
                Material: "High-grade PVC, ABS, and Fabric cape",
                Dimensions: "7.2 inches (18 cm)",
                Weight: "420g",
                Articulation: "24 joints"
            },
            svgType: "superman"
        },
        {
            id: 2,
            title: "ZD Toys Iron Man Mark 85 (Endgame) 1/10 Articulated Action Figure",
            brand: "ZD Toys",
            category: "Action Figures",
            theme: "Marvel",
            price: 2999,
            oldPrice: 4999,
            rating: 4.9,
            ratingCount: 142,
            inStock: true,
            desc: "ZD Toys presents the Mark LXXXV armor from Avengers: Endgame. Includes highly detailed metallic paint, back repulsor flap details, multiple hand attachments, and glowing paint effects. An essential addition to any Iron Man collection.",
            specifications: {
                Material: "ABS & PVC with metallic paint",
                Dimensions: "7.0 inches (18 cm)",
                Weight: "380g",
                Articulation: "20 joints"
            },
            svgType: "ironman"
        },
        {
            id: 3,
            title: "Bandai Goku S.H. Figuarts Super Saiyan (Awakening Ver) Action Figure",
            brand: "Bandai",
            category: "Action Figures",
            theme: "Anime",
            price: 4999,
            oldPrice: 6999,
            rating: 4.7,
            ratingCount: 63,
            inStock: true,
            desc: "Imported from Bandai Spirits Japan. S.H. Figuarts Goku features unmatched leg and arm articulation, battle-damaged outfit details, and three swap-in facial expressions (screaming, combat, determined). Perfect for DBZ fans.",
            specifications: {
                Material: "Premium flexible PVC",
                Dimensions: "6.0 inches (15 cm)",
                Weight: "320g",
                Articulation: "26 joints"
            },
            svgType: "goku"
        },
        {
            id: 4,
            title: "McFarlane Batman (The Dark Knight Trilogy) Gold Label Action Figure",
            brand: "McFarlane",
            category: "Action Figures",
            theme: "DC Comics",
            price: 2499,
            oldPrice: 3499,
            rating: 4.6,
            ratingCount: 55,
            inStock: true,
            desc: "Based on the critically acclaimed Dark Knight movie. Designed with Ultra Articulation containing up to 22 moving parts for full range of posing. Comes with a batarang, grapple launcher, collector card, and display stand.",
            specifications: {
                Material: "Resilient PVC",
                Dimensions: "7.0 inches (18 cm)",
                Weight: "390g",
                Articulation: "22 joints"
            },
            svgType: "batman"
        },
        {
            id: 5,
            title: "Iron Studios Thanos Deluxe (Infinity War) 1/10 BDS Art Scale Statue",
            brand: "Iron Studios",
            category: "Statues",
            theme: "Marvel",
            price: 14999,
            oldPrice: 19999,
            rating: 5.0,
            ratingCount: 31,
            inStock: true,
            desc: "A breathtaking collector's piece. Hand-painted Thanos BDS Art Scale statue capturing the Mad Titan on a detailed diorama base. Features the complete Infinity Gauntlet with translucent colored stones and an alternate head sculpt.",
            specifications: {
                Material: "Polystone / Resin (Hand painted)",
                Dimensions: "13.8 inches (35 cm)",
                Weight: "2.1 kg",
                Articulation: "Static Statue"
            },
            svgType: "thanos"
        },
        {
            id: 6,
            title: "LEGO Marvel Daily Bugle Spider-Man Building Block Set (76178)",
            brand: "Lego",
            category: "Lego",
            theme: "Marvel",
            price: 24999,
            oldPrice: 29999,
            rating: 4.9,
            ratingCount: 72,
            inStock: true,
            desc: "Build the ultimate Marvel offices. This massive 3,772-piece LEGO brick set stands over 32 inches high. Includes 25 iconic minifigures including Spider-Man, Venom, Green Goblin, Carnage, and exclusive media reporters.",
            specifications: {
                Material: "ABS Building bricks",
                Dimensions: "32 inches height (82 cm)",
                Weight: "4.8 kg",
                Pieces: "3772 bricks"
            },
            svgType: "legobugle"
        },
        {
            id: 7,
            title: "LEGO DC Batmobile Tumbler Model Brick Building Set (76240)",
            brand: "Lego",
            category: "Lego",
            theme: "DC Comics",
            price: 18999,
            oldPrice: 22999,
            rating: 4.8,
            ratingCount: 48,
            inStock: true,
            desc: "Recreate the high-speed armored tumbler vehicle from the Dark Knight movie trilogy. Featuring openable roof cockpit, control panel details, and display stand with minifigure Batman and the Joker.",
            specifications: {
                Material: "ABS Building bricks",
                Dimensions: "6 inches height, 17 inches length",
                Weight: "3.2 kg",
                Pieces: "2049 bricks"
            },
            svgType: "legotumbler"
        },
        {
            id: 8,
            title: "Maisto Kawasaki Ninja H2R 1:12 Scale Diecast Model Bike",
            brand: "Maisto",
            category: "Cars & Bikes",
            theme: "Anime",
            price: 1599,
            oldPrice: 2499,
            rating: 4.5,
            ratingCount: 110,
            inStock: true,
            desc: "Highly authentic 1/12 scale diecast model of the Kawasaki Ninja H2R hyperbike. Features steerable handlebars, working rear suspension, realistic kickstand, and detailed engine chassis block.",
            specifications: {
                Material: "Diecast Metal alloy with ABS plastic trims",
                Dimensions: "7.0 inches length",
                Weight: "220g",
                Scale: "1:12 Scale"
            },
            svgType: "bike"
        },
        {
            id: 9,
            title: "Disney Pixar Toy Story Signature Buzz Lightyear Interactive Space Figure",
            brand: "Disney",
            category: "Action Figures",
            theme: "Disney",
            price: 3499,
            oldPrice: 4499,
            rating: 4.7,
            ratingCount: 42,
            inStock: true,
            desc: "To infinity and beyond! Official Disney interactive Space Ranger. Features pop-out wings, laser light sound effects, retractable helmet visor, and responsive talkback sensors triggered by voice commands.",
            specifications: {
                Material: "ABS and electronic modules",
                Dimensions: "12 inches (30 cm)",
                Weight: "980g",
                Battery: "3 AA required (included)"
            },
            svgType: "buzz"
        },
        {
            id: 10,
            title: "Iron Studios Darth Vader (Obi-Wan) Limited Edition 1/10 BDS Art Statue",
            brand: "Iron Studios",
            category: "Statues",
            theme: "Limited Edition",
            price: 16999,
            oldPrice: 21999,
            rating: 4.9,
            ratingCount: 28,
            inStock: false,
            desc: "Limited Edition Darth Vader statue based on his climatic battle in the Obi-Wan Kenobi series. Displays Vader standing amidst dynamic rock debris, brandishing his crimson red lightsaber. Highly collectible.",
            specifications: {
                Material: "Polystone (Hand painted)",
                Dimensions: "9.6 inches (24.5 cm)",
                Weight: "1.2 kg",
                Articulation: "Static Statue"
            },
            svgType: "vader"
        }
    ];

    // ==========================================
    // 2. VECTOR SVG GENERATOR FOR PREMIUM CARDS
    // ==========================================
    function getProductSVG(type, width = "100%", height = "100%") {
        const svgStyles = `style="width:${width}; height:${height}; display:block;"`;
        
        switch(type) {
            case "superman":
                return `
                <svg viewBox="0 0 200 200" ${svgStyles}>
                    <defs>
                        <linearGradient id="bg-sup" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stop-color="#0a1931" />
                            <stop offset="100%" stop-color="#15305b" />
                        </linearGradient>
                    </defs>
                    <rect width="200" height="200" rx="10" fill="url(#bg-sup)" />
                    <!-- Shield Border -->
                    <polygon points="100,25 170,55 155,135 100,175 45,135 30,55" fill="#f5b041" stroke="#e50914" stroke-width="8" stroke-linejoin="round"/>
                    <polygon points="100,35 155,60 142,125 100,158 58,125 45,60" fill="#e50914" stroke="#e50914" stroke-width="2" stroke-linejoin="round"/>
                    <!-- 'S' Symbol -->
                    <path d="M70,75 C70,60 130,50 130,70 C130,85 75,90 75,115 C75,135 130,135 130,120 C130,110 120,110 120,115 C120,125 90,125 90,115 C90,105 145,95 145,72 C145,45 60,45 60,70 Z" fill="#f5b041" />
                </svg>`;
            
            case "ironman":
                return `
                <svg viewBox="0 0 200 200" ${svgStyles}>
                    <defs>
                        <linearGradient id="bg-iron" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stop-color="#210002" />
                            <stop offset="100%" stop-color="#540b0e" />
                        </linearGradient>
                    </defs>
                    <rect width="200" height="200" rx="10" fill="url(#bg-iron)" />
                    <!-- Helmet Outline -->
                    <path d="M60,50 L140,50 L155,90 L145,150 L100,170 L55,150 L45,90 Z" fill="#9e0007" stroke="#d32f2f" stroke-width="4" />
                    <!-- Face Plate (Gold) -->
                    <path d="M75,65 L125,65 L135,110 L125,140 L100,150 L75,140 L65,110 Z" fill="#f5b041" />
                    <!-- Eyes (Glowing Light Blue) -->
                    <polygon points="80,95 100,95 95,102 80,102" fill="#e0f7fa" stroke="#00bcd4" stroke-width="1.5" filter="drop-shadow(0px 0px 3px #00bcd4)" />
                    <polygon points="120,95 100,95 105,102 120,102" fill="#e0f7fa" stroke="#00bcd4" stroke-width="1.5" filter="drop-shadow(0px 0px 3px #00bcd4)" />
                    <!-- Mouth Vent -->
                    <line x1="85" y1="125" x2="115" y2="125" stroke="#333" stroke-width="3" stroke-linecap="round" />
                </svg>`;

            case "goku":
                return `
                <svg viewBox="0 0 200 200" ${svgStyles}>
                    <defs>
                        <linearGradient id="bg-goku" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stop-color="#ff7b00" />
                            <stop offset="100%" stop-color="#bf360c" />
                        </linearGradient>
                    </defs>
                    <rect width="200" height="200" rx="10" fill="url(#bg-goku)" />
                    <!-- Dragon Ball Star Outline -->
                    <circle cx="100" cy="100" r="50" fill="#ffb300" stroke="#ffe082" stroke-width="4" filter="drop-shadow(0px 0px 8px rgba(255,179,0,0.6))" />
                    <!-- Five-Pointed Star in Red -->
                    <polygon points="100,75 106,90 122,90 109,100 114,115 100,105 86,115 91,100 78,90 94,90" fill="#e50914" />
                </svg>`;

            case "batman":
                return `
                <svg viewBox="0 0 200 200" ${svgStyles}>
                    <defs>
                        <linearGradient id="bg-bat" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stop-color="#121212" />
                            <stop offset="100%" stop-color="#2a2a2a" />
                        </linearGradient>
                    </defs>
                    <rect width="200" height="200" rx="10" fill="url(#bg-bat)" />
                    <!-- Yellow Oval -->
                    <ellipse cx="100" cy="100" rx="60" ry="38" fill="#f5b041" stroke="#f5b041" stroke-width="2" />
                    <!-- Bat Logo -->
                    <path d="M100,75 C94,75 92,85 86,85 C80,85 64,68 50,88 C50,110 80,125 100,125 C120,125 150,110 150,88 C136,68 120,85 114,85 C108,85 106,75 100,75 Z" fill="#000000" />
                    <path d="M100,75 L96,68 L98,80 Z" fill="#000000" />
                    <path d="M100,75 L104,68 L102,80 Z" fill="#000000" />
                </svg>`;

            case "thanos":
                return `
                <svg viewBox="0 0 200 200" ${svgStyles}>
                    <defs>
                        <linearGradient id="bg-thanos" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stop-color="#311b92" />
                            <stop offset="100%" stop-color="#1a0c40" />
                        </linearGradient>
                    </defs>
                    <rect width="200" height="200" rx="10" fill="url(#bg-thanos)" />
                    <!-- Infinity Gauntlet Silhouette (Gold) -->
                    <path d="M80,150 L80,95 C80,90 85,85 90,85 C95,85 100,90 100,95 L100,150 Z" fill="#d4af37" />
                    <path d="M92,150 L92,80 C92,75 98,72 102,72 C106,72 110,75 110,80 L110,150 Z" fill="#d4af37" />
                    <path d="M105,150 L105,88 C105,84 110,80 114,80 C118,80 122,84 122,88 L122,150 Z" fill="#d4af37" />
                    <path d="M118,150 L118,100 C118,97 122,94 125,94 C128,94 132,97 132,100 L132,150 Z" fill="#d4af37" />
                    <!-- Palm/Thumb Base -->
                    <path d="M72,160 L140,160 L132,115 L78,115 Z" fill="#c5a028" />
                    <path d="M68,140 L78,110 L85,120 Z" fill="#d4af37" />
                    <!-- Infinity Stones (Glowing circles) -->
                    <circle cx="90" cy="100" r="4" fill="#311b92" filter="drop-shadow(0 0 2px blue)" /> <!-- Space (Blue) -->
                    <circle cx="101" cy="92" r="4" fill="#ffeb3b" filter="drop-shadow(0 0 2px yellow)" /> <!-- Mind (Yellow) -->
                    <circle cx="113" cy="98" r="4" fill="#e50914" filter="drop-shadow(0 0 2px red)" /> <!-- Reality (Red) -->
                    <circle cx="125" cy="110" r="4" fill="#4caf50" filter="drop-shadow(0 0 2px green)" /> <!-- Time (Green) -->
                    <circle cx="73" cy="125" r="4" fill="#ff9800" filter="drop-shadow(0 0 2px orange)" /> <!-- Soul (Orange) -->
                    <circle cx="104" cy="130" r="8" fill="#9c27b0" filter="drop-shadow(0 0 4px purple)" /> <!-- Power (Purple) -->
                </svg>`;

            case "legobugle":
                return `
                <svg viewBox="0 0 200 200" ${svgStyles}>
                    <defs>
                        <linearGradient id="bg-lego" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stop-color="#333333" />
                            <stop offset="100%" stop-color="#000000" />
                        </linearGradient>
                    </defs>
                    <rect width="200" height="200" rx="10" fill="url(#bg-lego)" />
                    <!-- Red Lego brick -->
                    <rect x="50" y="80" width="100" height="60" rx="4" fill="#e50914" stroke="#b71c1c" stroke-width="2" />
                    <circle cx="70" cy="72" r="10" fill="#e50914" stroke="#b71c1c" stroke-width="2" />
                    <circle cx="100" cy="72" r="10" fill="#e50914" stroke="#b71c1c" stroke-width="2" />
                    <circle cx="130" cy="72" r="10" fill="#e50914" stroke="#b71c1c" stroke-width="2" />
                    <!-- Daily Bugle Building outline -->
                    <path d="M90,30 L110,30 L110,65 L90,65 Z" fill="#78909c" />
                    <text x="100" y="42" font-family="'Outfit'" font-weight="900" font-size="8" fill="#fff" text-anchor="middle">BUGLE</text>
                </svg>`;

            case "legotumbler":
                return `
                <svg viewBox="0 0 200 200" ${svgStyles}>
                    <defs>
                        <linearGradient id="bg-tumbler" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stop-color="#1c1c1c" />
                            <stop offset="100%" stop-color="#121212" />
                        </linearGradient>
                    </defs>
                    <rect width="200" height="200" rx="10" fill="url(#bg-tumbler)" />
                    <!-- Batmobile silhouette -->
                    <rect x="40" y="90" width="120" height="40" rx="10" fill="#000" stroke="#333" stroke-width="3" />
                    <!-- Big tires -->
                    <circle cx="60" cy="130" r="22" fill="#222" stroke="#444" stroke-width="2" />
                    <circle cx="60" cy="130" r="10" fill="#111" />
                    <circle cx="140" cy="130" r="22" fill="#222" stroke="#444" stroke-width="2" />
                    <circle cx="140" cy="130" r="10" fill="#111" />
                    <!-- Yellow lights -->
                    <ellipse cx="150" cy="98" rx="6" ry="3" fill="#ffb300" filter="drop-shadow(0 0 3px #ffb300)" />
                    <ellipse cx="138" cy="98" rx="3" ry="3" fill="#ffb300" />
                </svg>`;

            case "bike":
                return `
                <svg viewBox="0 0 200 200" ${svgStyles}>
                    <defs>
                        <linearGradient id="bg-bike" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stop-color="#1b5e20" />
                            <stop offset="100%" stop-color="#0a230d" />
                        </linearGradient>
                    </defs>
                    <rect width="200" height="200" rx="10" fill="url(#bg-bike)" />
                    <!-- Wheels -->
                    <circle cx="50" cy="115" r="28" fill="none" stroke="#222" stroke-width="8" />
                    <circle cx="150" cy="115" r="28" fill="none" stroke="#222" stroke-width="8" />
                    <!-- Frame -->
                    <polygon points="50,115 90,80 140,80 150,115 105,115" fill="none" stroke="#e50914" stroke-width="5" stroke-linejoin="round" />
                    <!-- Body Panels (Green/Black) -->
                    <path d="M85,75 L135,75 L125,100 L75,100 Z" fill="#2e7d32" />
                    <polygon points="135,75 155,75 145,95 125,95" fill="#111" />
                </svg>`;

            case "buzz":
                return `
                <svg viewBox="0 0 200 200" ${svgStyles}>
                    <defs>
                        <linearGradient id="bg-buzz" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stop-color="#ffffff" />
                            <stop offset="100%" stop-color="#e2e8f0" />
                        </linearGradient>
                    </defs>
                    <rect width="200" height="200" rx="10" fill="url(#bg-buzz)" />
                    <!-- Buzz space chestplate -->
                    <path d="M40,70 L160,70 L140,140 L60,140 Z" fill="#ffffff" stroke="#d2d2d2" stroke-width="4" />
                    <rect x="55" y="76" width="90" height="22" fill="#4caf50" rx="3" />
                    <!-- Action buttons -->
                    <circle cx="70" cy="87" r="6" fill="#e50914" />
                    <circle cx="100" cy="87" r="6" fill="#4caf50" />
                    <circle cx="130" cy="87" r="6" fill="#2196f3" />
                    <!-- Star Command logo -->
                    <polygon points="100,105 110,120 90,120" fill="#ffb300" />
                </svg>`;

            case "vader":
                return `
                <svg viewBox="0 0 200 200" ${svgStyles}>
                    <defs>
                        <linearGradient id="bg-vader" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stop-color="#1c1c1c" />
                            <stop offset="100%" stop-color="#000000" />
                        </linearGradient>
                    </defs>
                    <rect width="200" height="200" rx="10" fill="url(#bg-vader)" />
                    <!-- Vader Helmet Outline -->
                    <path d="M60,60 C60,40 140,40 140,60 C140,85 160,125 165,140 L35,140 C40,125 60,85 60,60 Z" fill="#111" stroke="#222" stroke-width="2" />
                    <!-- Mask Face Details -->
                    <path d="M80,85 L120,85 L115,105 L85,105 Z" fill="#000" />
                    <circle cx="90" cy="95" r="6" fill="#0c0c0c" />
                    <circle cx="110" cy="95" r="6" fill="#0c0c0c" />
                    <polygon points="100,105 92,125 108,125" fill="#111" />
                    <!-- Red Glow Saber -->
                    <line x1="30" y1="170" x2="170" y2="170" stroke="#e50914" stroke-width="6" stroke-linecap="round" filter="drop-shadow(0 0 6px #e50914)" />
                </svg>`;
            
            default:
                return `<svg viewBox="0 0 200 200" ${svgStyles}><rect width="200" height="200" fill="#333" /></svg>`;
        }
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
                state.cart = JSON.parse(savedCart);
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
                            ${getProductSVG(prod.svgType, "100%", "100%")}
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
                        ${getProductSVG(item.product.svgType, "100%", "100%")}
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
                        ${getProductSVG(prod.svgType)}
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

        // Grab products 4-8 for bestsellers
        if (bestSellersGrid) {
            const bestSellers = PRODUCTS.slice(3, 7);
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
        const specDimensions = document.getElementById('spec-dimensions');
        const specWeight = document.getElementById('spec-weight');
        const specArticulation = document.getElementById('spec-articulation');
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

        // Render main illustration SVG as image representation
        if (mainImg) {
            // We replace main image src wrapper content dynamically or load SVG
            const wrapper = mainImg.closest('.detail-main-image-wrapper');
            if (wrapper) {
                wrapper.innerHTML = getProductSVG(prod.svgType, "100%", "100%");
            }
        }

        // Setup thumbnails (Generate 3 mock color variants using CSS filters)
        if (thumbsList) {
            thumbsList.innerHTML = `
                <button class="detail-thumb-btn active" data-filter="none">
                    ${getProductSVG(prod.svgType, "48px", "48px")}
                </button>
                <button class="detail-thumb-btn" data-filter="hue-rotate(90deg)">
                    <div style="filter: hue-rotate(90deg)">${getProductSVG(prod.svgType, "48px", "48px")}</div>
                </button>
                <button class="detail-thumb-btn" data-filter="hue-rotate(240deg)">
                    <div style="filter: hue-rotate(240deg)">${getProductSVG(prod.svgType, "48px", "48px")}</div>
                </button>
            `;

            thumbsList.querySelectorAll('.detail-thumb-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    thumbsList.querySelectorAll('.detail-thumb-btn').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    
                    // Apply hue filter to main detail illustration
                    const mainSVG = document.querySelector('.detail-main-image-wrapper svg');
                    if (mainSVG) {
                        mainSVG.style.filter = btn.getAttribute('data-filter') === 'none' ? 'none' : btn.getAttribute('data-filter');
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
        if (specMaterial) specMaterial.innerText = prod.specifications.Material || 'PVC';
        if (specDimensions) specDimensions.innerText = prod.specifications.Dimensions || '7 inches';
        if (specWeight) specWeight.innerText = prod.specifications.Weight || 'N/A';
        if (specArticulation) specArticulation.innerText = prod.specifications.Articulation || 'Static';

        // Render Related Products (products matching the same theme, exclude self)
        if (relatedGrid) {
            const related = PRODUCTS.filter(p => p.theme === prod.theme && p.id !== prod.id).slice(0, 4);
            if (related.length === 0) {
                // If nothing in same theme, load any 4
                relatedGrid.innerHTML = PRODUCTS.filter(p => p.id !== prod.id).slice(0, 4).map(getProductCardHTML).join('');
            } else {
                relatedGrid.innerHTML = related.map(getProductCardHTML).join('');
            }

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
                    ${getProductSVG(item.product.svgType, "100%", "100%")}
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
