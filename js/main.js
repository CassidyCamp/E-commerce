// BASE_URL, apiFetch, authHeader — api.js dan keladi (index.html da oldin yuklanadi)


document.addEventListener("DOMContentLoaded", () => {
    fetchProducts();
    fetchCategories();
    initProfileDropdown();
});

// ─── Profile / Seller Dropdown ────────────────────────────────────────────────
function initProfileDropdown() {
    const btn = document.getElementById('profileDropdownBtn');
    const dropdown = document.getElementById('sellerDropdown');
    if (!btn || !dropdown) return;

    dropdown.style.display = 'none'; // hidden by default

    btn.addEventListener('click', async () => {
        // If dropdown already visible, just toggle it closed
        if (dropdown.style.display === 'block') {
            dropdown.style.display = 'none';
            return;
        }

        const token = localStorage.getItem('access');
        if (!token) {
            window.location.href = './page/login.html';
            return;
        }

        try {
            const res = await apiFetch('/api/auth/profile/');
            if (!res.ok) throw new Error('Unauthorized');
            const user = await res.json();
            if (user.is_seller) {
                dropdown.style.display = 'block';
            } else {
                dropdown.style.display = 'none';
            }
        } catch (err) {
            console.error('Profile fetch error:', err);
        }
    });

    // Close dropdown on outside click
    document.addEventListener('click', (e) => {
        if (!btn.contains(e.target) && !dropdown.contains(e.target)) {
            dropdown.style.display = 'none';
        }
    });
}

async function fetchProducts() {
    try {
        const response = await apiFetch('/api/catalog/products/');
        if (!response.ok) throw new Error('Network error');
        const products = await response.json();
        
        const cardShops = document.querySelectorAll('.card_shop');
        if (cardShops.length > 0) {
            // Populate the first block (Акции)
            renderProducts(products.slice(0, 4), cardShops[0]);
        }
        if (cardShops.length > 1) {
            // Populate the second block (Новинки)
            renderProducts(products.length > 4 ? products.slice(4, 8) : products, cardShops[1]);
        }
        if (cardShops.length > 2) {
            // Populate the third block (Покупали раньше)
            renderProducts(products, cardShops[2]);
        }
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

async function fetchCategories() {
    // Optionally fetch categories if there is a category container
    try {
        const response = await apiFetch('/api/catalog/categories/');
        if (!response.ok) throw new Error('Network error');
        const categories = await response.json();
        console.log("Categories loaded:", categories);
    } catch (error) {
        console.error('Error fetching categories:', error);
    }
}

// ─── Star SVG path data (5 stars, each 20px wide in a 256×16 viewport) ────────
const STAR_PATHS = [
    "M7.10326 1.81698C7.47008 1.07374 8.52992 1.07374 8.89674 1.81699L10.1185 4.29249C10.2641 4.58763 10.5457 4.7922 10.8714 4.83953L13.6033 5.2365C14.4235 5.35568 14.751 6.36365 14.1575 6.94219L12.1807 8.8691C11.945 9.09884 11.8375 9.42984 11.8931 9.75423L12.3598 12.4751C12.4999 13.292 11.6424 13.9149 10.9088 13.5293L8.46534 12.2446C8.17402 12.0915 7.82598 12.0915 7.53466 12.2446L5.09119 13.5293C4.35756 13.9149 3.50013 13.292 3.64024 12.4751L4.1069 9.75423C4.16254 9.42984 4.05499 9.09884 3.81931 8.8691L1.8425 6.94219C1.24898 6.36365 1.57649 5.35568 2.39671 5.2365L5.12859 4.83953C5.4543 4.7922 5.73587 4.58763 5.88153 4.29249L7.10326 1.81698Z",
    "M27.1033 1.81698C27.4701 1.07374 28.5299 1.07374 28.8967 1.81699L30.1185 4.29249C30.2641 4.58763 30.5457 4.7922 30.8714 4.83953L33.6033 5.2365C34.4235 5.35568 34.751 6.36365 34.1575 6.94219L32.1807 8.8691C31.945 9.09884 31.8375 9.42984 31.8931 9.75423L32.3598 12.4751C32.4999 13.292 31.6424 13.9149 30.9088 13.5293L28.4653 12.2446C28.174 12.0915 27.826 12.0915 27.5347 12.2446L25.0912 13.5293C24.3576 13.9149 23.5001 13.292 23.6402 12.4751L24.1069 9.75423C24.1625 9.42984 24.055 9.09884 23.8193 8.8691L21.8425 6.94219C21.249 6.36365 21.5765 5.35568 22.3967 5.2365L25.1286 4.83953C25.4543 4.7922 25.7359 4.58763 25.8815 4.29249L27.1033 1.81698Z",
    "M47.1033 1.81698C47.4701 1.07374 48.5299 1.07374 48.8967 1.81699L50.1185 4.29249C50.2641 4.58763 50.5457 4.7922 50.8714 4.83953L53.6033 5.2365C54.4235 5.35568 54.751 6.36365 54.1575 6.94219L52.1807 8.8691C51.945 9.09884 51.8375 9.42984 51.8931 9.75423L52.3598 12.4751C52.4999 13.292 51.6424 13.9149 50.9088 13.5293L48.4653 12.2446C48.174 12.0915 47.826 12.0915 47.5347 12.2446L45.0912 13.5293C44.3576 13.9149 43.5001 13.292 43.6402 12.4751L44.1069 9.75423C44.1625 9.42984 44.055 9.09884 43.8193 8.8691L41.8425 6.94219C41.249 6.36365 41.5765 5.35568 42.3967 5.2365L45.1286 4.83953C45.4543 4.7922 45.7359 4.58763 45.8815 4.29249L47.1033 1.81698Z",
    "M67.1033 1.81698C67.4701 1.07374 68.5299 1.07374 68.8967 1.81699L70.1185 4.29249C70.2641 4.58763 70.5457 4.7922 70.8714 4.83953L73.6033 5.2365C74.4235 5.35568 74.751 6.36365 74.1575 6.94219L72.1807 8.8691C71.945 9.09884 71.8375 9.42984 71.8931 9.75423L72.3598 12.4751C72.4999 13.292 71.6424 13.9149 70.9088 13.5293L68.4653 12.2446C68.174 12.0915 67.826 12.0915 67.5347 12.2446L65.0912 13.5293C64.3576 13.9149 63.5001 13.292 63.6402 12.4751L64.1069 9.75423C64.1625 9.42984 64.055 9.09884 63.8193 8.8691L61.8425 6.94219C61.249 6.36365 61.5765 5.35568 62.3967 5.2365L65.1286 4.83953C65.4543 4.7922 65.7359 4.58763 65.8815 4.29249L67.1033 1.81698Z",
    "M87.1033 1.81698C87.4701 1.07374 88.5299 1.07374 88.8967 1.81699L90.1185 4.29249C90.2641 4.58763 90.5457 4.7922 90.8714 4.83953L93.6033 5.2365C94.4235 5.35568 94.751 6.36365 94.1575 6.94219L92.1807 8.8691C91.945 9.09884 91.8375 9.42984 91.8931 9.75423L92.3598 12.4751C92.4999 13.292 91.6424 13.9149 90.9088 13.5293L88.4653 12.2446C88.174 12.0915 87.826 12.0915 87.5347 12.2446L85.0912 13.5293C84.3576 13.9149 83.5001 13.292 83.6402 12.4751L84.1069 9.75423C84.1625 9.42984 84.055 9.09884 83.8193 8.8691L81.8425 6.94219C81.249 6.36365 81.5765 5.35568 82.3967 5.2365L85.1286 4.83953C85.4543 4.7922 85.7359 4.58763 85.8815 4.29249L87.1033 1.81698Z"
];

function buildStarSvg(rating) {
    // rating: 1–5, filled = orange, empty = grey
    const filled = Math.round(Math.max(0, Math.min(5, rating || 3)));
    const paths = STAR_PATHS.map((d, i) =>
        `<path d="${d}" fill="${i < filled ? '#FF6633' : '#BFBFBF'}"/>`
    ).join('');
    return `<svg width="256" height="16" viewBox="0 0 256 16" fill="none" xmlns="http://www.w3.org/2000/svg">${paths}</svg>`;
}

function renderProducts(products, container) {
    if (!products || products.length === 0) return;
    container.innerHTML = '';

    products.forEach(product => {
        // ── New backend fields ──────────────────────────────────────────────
        // regular_price  → "Обычная" (original price, shown smaller/muted)
        // card_price     → "С картой" (discounted price, shown bold/large)
        // discount_percent → e.g. "50.00" → shown as -50%
        const regularPrice  = parseFloat(product.regular_price)  || 0;
        const cardPrice     = product.card_price ? parseFloat(product.card_price) : null;
        const discountPct   = product.discount_percent ? Math.round(parseFloat(product.discount_percent)) : null;

        // ── Discount badge ──────────────────────────────────────────────────
        const percentBadge = discountPct
            ? `<div class="foiz">-${discountPct}%</div>`
            : '';

        // ── Price block ─────────────────────────────────────────────────────
        // If card_price exists → two-row layout (matches screenshot exactly)
        let priceHTML;
        if (cardPrice !== null) {
            priceHTML = `
                <div class="narx">
                  <p>${cardPrice.toLocaleString('ru-RU', {minimumFractionDigits: 2, maximumFractionDigits: 2})}₽</p>
                  <p>${regularPrice.toLocaleString('ru-RU', {minimumFractionDigits: 2, maximumFractionDigits: 2})}₽</p>
                </div>
                <div class="malumot">
                  <p>С картой</p>
                  <p>Обычная</p>
                </div>`;
        } else {
            priceHTML = `
                <div class="narx narx-2">
                  <p>${regularPrice.toLocaleString('ru-RU', {minimumFractionDigits: 2, maximumFractionDigits: 2})}₽</p>
                </div>`;
        }

        // ── Stars ───────────────────────────────────────────────────────────
        const starSvg = buildStarSvg(product.rating);

        // ── Card ────────────────────────────────────────────────────────────
        const card = document.createElement('div');
        card.className = 'shoping';
        card.innerHTML = `
              <div class="img_product">
                <img src="${product.image || './images/img_product/shirinlik.png'}" class="shirinlik" alt="${product.title}" />
                ${percentBadge}
                <div class="arxiv">
                  <i class="bxr bx-heart"></i>
                </div>
              </div>
              <div class="info_product" style="flex:1">
                ${priceHTML}
                <div class="city">${product.title}</div>
                <div class="rating">${starSvg}</div>
                <button onclick="addToCart(${product.id})">В корзину</button>
              </div>
        `;
        container.appendChild(card);
    });
}


