// ─── Избраное.js ─────────────────────────────────────────────────────────────
// Requires: api.js (apiFetch) loaded before this script.

// ── Star SVG paths ────────────────────────────────────────────────────────────
const FAV_STAR_PATHS = [
    "M7.10326 1.81698C7.47008 1.07374 8.52992 1.07374 8.89674 1.81699L10.1185 4.29249C10.2641 4.58763 10.5457 4.7922 10.8714 4.83953L13.6033 5.2365C14.4235 5.35568 14.751 6.36365 14.1575 6.94219L12.1807 8.8691C11.945 9.09884 11.8375 9.42984 11.8931 9.75423L12.3598 12.4751C12.4999 13.292 11.6424 13.9149 10.9088 13.5293L8.46534 12.2446C8.17402 12.0915 7.82598 12.0915 7.53466 12.2446L5.09119 13.5293C4.35756 13.9149 3.50013 13.292 3.64024 12.4751L4.1069 9.75423C4.16254 9.42984 4.05499 9.09884 3.81931 8.8691L1.8425 6.94219C1.24898 6.36365 1.57649 5.35568 2.39671 5.2365L5.12859 4.83953C5.4543 4.7922 5.73587 4.58763 5.88153 4.29249L7.10326 1.81698Z",
    "M27.1033 1.81698C27.4701 1.07374 28.5299 1.07374 28.8967 1.81699L30.1185 4.29249C30.2641 4.58763 30.5457 4.7922 30.8714 4.83953L33.6033 5.2365C34.4235 5.35568 34.751 6.36365 34.1575 6.94219L32.1807 8.8691C31.945 9.09884 31.8375 9.42984 31.8931 9.75423L32.3598 12.4751C32.4999 13.292 31.6424 13.9149 30.9088 13.5293L28.4653 12.2446C28.174 12.0915 27.826 12.0915 27.5347 12.2446L25.0912 13.5293C24.3576 13.9149 23.5001 13.292 23.6402 12.4751L24.1069 9.75423C24.1625 9.42984 24.055 9.09884 23.8193 8.8691L21.8425 6.94219C21.249 6.36365 21.5765 5.35568 22.3967 5.2365L25.1286 4.83953C25.4543 4.7922 25.7359 4.58763 25.8815 4.29249L27.1033 1.81698Z",
    "M47.1033 1.81698C47.4701 1.07374 48.5299 1.07374 48.8967 1.81699L50.1185 4.29249C50.2641 4.58763 50.5457 4.7922 50.8714 4.83953L53.6033 5.2365C54.4235 5.35568 54.751 6.36365 54.1575 6.94219L52.1807 8.8691C51.945 9.09884 51.8375 9.42984 51.8931 9.75423L52.3598 12.4751C52.4999 13.292 51.6424 13.9149 50.9088 13.5293L48.4653 12.2446C48.174 12.0915 47.826 12.0915 47.5347 12.2446L45.0912 13.5293C44.3576 13.9149 43.5001 13.292 43.6402 12.4751L44.1069 9.75423C44.1625 9.42984 44.055 9.09884 43.8193 8.8691L41.8425 6.94219C41.249 6.36365 41.5765 5.35568 42.3967 5.2365L45.1286 4.83953C45.4543 4.7922 45.7359 4.58763 45.8815 4.29249L47.1033 1.81698Z",
    "M67.1033 1.81698C67.4701 1.07374 68.5299 1.07374 68.8967 1.81699L70.1185 4.29249C70.2641 4.58763 70.5457 4.7922 70.8714 4.83953L73.6033 5.2365C74.4235 5.35568 74.751 6.36365 74.1575 6.94219L72.1807 8.8691C71.945 9.09884 71.8375 9.42984 71.8931 9.75423L72.3598 12.4751C72.4999 13.292 71.6424 13.9149 70.9088 13.5293L68.4653 12.2446C68.174 12.0915 67.826 12.0915 67.5347 12.2446L65.0912 13.5293C64.3576 13.9149 63.5001 13.292 63.6402 12.4751L64.1069 9.75423C64.1625 9.42984 64.055 9.09884 63.8193 8.8691L61.8425 6.94219C61.249 6.36365 61.5765 5.35568 62.3967 5.2365L65.1286 4.83953C65.4543 4.7922 65.7359 4.58763 65.8815 4.29249L67.1033 1.81698Z",
    "M87.1033 1.81698C87.4701 1.07374 88.5299 1.07374 88.8967 1.81699L90.1185 4.29249C90.2641 4.58763 90.5457 4.7922 90.8714 4.83953L93.6033 5.2365C94.4235 5.35568 94.751 6.36365 94.1575 6.94219L92.1807 8.8691C91.945 9.09884 91.8375 9.42984 91.8931 9.75423L92.3598 12.4751C92.4999 13.292 91.6424 13.9149 90.9088 13.5293L88.4653 12.2446C88.174 12.0915 87.826 12.0915 87.5347 12.2446L85.0912 13.5293C84.3576 13.9149 83.5001 13.292 83.6402 12.4751L84.1069 9.75423C84.1625 9.42984 84.055 9.09884 83.8193 8.8691L81.8425 6.94219C81.249 6.36365 81.5765 5.35568 82.3967 5.2365L85.1286 4.83953C85.4543 4.7922 85.7359 4.58763 85.8815 4.29249L87.1033 1.81698Z"
];

// ── Mock / offline fallback products ─────────────────────────────────────────
const MOCK_PRODUCTS = [
    { id: 1001, _favId: 1, title: "Молоко ПРОСТОКВАШИНО пастеризованное цельное отборное...", regular_price: "69.99", card_price: "49.99", discount_percent: "28", rating: 3, image: "../images/img_page/sut.png" },
    { id: 1002, _favId: 2, title: "Молоко сгущенное РОГАЧЕВ Егорка, цельное с сахаром...", regular_price: "140.50", card_price: "69.99", discount_percent: "50", rating: 2, image: "../images/img_page/sir.jpg" },
    { id: 1003, _favId: 3, title: "Йогурт фруктовый FRUTTIS", regular_price: "77.99", card_price: null, discount_percent: null, rating: 4, image: "../images/img_page/yogurt.jpg" },
    { id: 1004, _favId: 4, title: "Масло сливочное ПРОСТОКВАШИНО 82.5%", regular_price: "192.99", card_price: null, discount_percent: null, rating: 2, image: "../images/img_page/yog.jpg" },
    { id: 1005, _favId: 5, title: "Йогурт мевали FRUTTIS", regular_price: "29.99", card_price: null, discount_percent: null, rating: 3, image: "../images/img_page/yogurt-mevali.jpg" },
    { id: 1006, _favId: 6, title: "Сыр твердый ПАРМЕЗАН", regular_price: "299.50", card_price: "249.99", discount_percent: "17", rating: 5, image: "../images/img_page/sir.jpg" },
    { id: 1007, _favId: 7, title: "Кефир ПРОСТОКВАШИНО 2.5%", regular_price: "59.99", card_price: null, discount_percent: null, rating: 3, image: "../images/img_page/sut.png" },
];

// ── State ─────────────────────────────────────────────────────────────────────
let allFavProducts  = [];
let favoriteItems   = [];
let filteredProducts= [];
let displayedCount  = 0;
const PAGE_SIZE     = 6;

let priceMin  = 0;
let priceMax  = 1000;
let filterMin = 0;
let filterMax = 1000;

let currentPage = 1;
let totalPages  = 1;
let isOffline   = false;

// ── Init ──────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', async () => {
    await loadFavorites();
    initRangeSlider();
    initOchistit();
    initPokazat();
});

// ── Fetch favorites ───────────────────────────────────────────────────────────
async function loadFavorites() {
    // Try backend first
    if (localStorage.getItem('access') && typeof apiFetch !== 'undefined') {
        try {
            let page      = 1;
            let allFavs   = [];
            let success   = false;

            while (true) {
                const res = await apiFetch(`/api/catalog/favorites/?page=${page}`);
                if (!res.ok) break;
                success = true;
                const data   = await res.json();
                const results = Array.isArray(data) ? data : (data.results || []);
                allFavs = allFavs.concat(results);
                if (!(!Array.isArray(data) && data.next)) break;
                page++;
            }

            favoriteItems = allFavs;

            if (success && favoriteItems.length > 0) {
                // Fetch each product's details
                const prods = await Promise.all(
                    favoriteItems.map(async fav => {
                        try {
                            const r = await apiFetch(`/api/catalog/products/${fav.product}/`);
                            if (!r.ok) return null;
                            const p = await r.json();
                            p._favId = fav.id;
                            return p;
                        } catch { return null; }
                    })
                );
                allFavProducts = prods.filter(Boolean);
                isOffline = false;

                if (allFavProducts.length > 0) {
                    setupSliderBounds();
                    applyFilterAndRender(true);
                    return;
                }
            }

            // Backend worked but no favorites
            if (success && favoriteItems.length === 0) {
                renderEmpty('Список избранного пуст');
                return;
            }
        } catch (e) {
            console.warn('Backend unavailable, using mock data', e);
        }
    }

    // ── Offline / no token fallback ───────────────────────────────────────────
    isOffline = true;
    allFavProducts = MOCK_PRODUCTS;
    setupSliderBounds();
    applyFilterAndRender(true);
}

// ── Set slider min/max from product prices ────────────────────────────────────
function setupSliderBounds() {
    const prices = allFavProducts.map(p => parseFloat(p.regular_price) || 0).filter(n => !isNaN(n));
    if (prices.length === 0) { priceMin = 0; priceMax = 1000; }
    else {
        priceMin = Math.floor(Math.min(...prices));
        priceMax = Math.ceil(Math.max(...prices));
        // Ensure visible range even if only 1 product
        if (priceMin === priceMax) { priceMin = Math.max(0, priceMin - 10); priceMax += 10; }
    }

    filterMin = priceMin;
    filterMax = priceMax;

    const iMin = document.getElementById('rangeMin');
    const iMax = document.getElementById('rangeMax');
    if (iMin) { iMin.min = priceMin; iMin.max = priceMax; iMin.value = priceMin; }
    if (iMax) { iMax.min = priceMin; iMax.max = priceMax; iMax.value = priceMax; }

    updatePriceDisplay();
    updateSliderTrack();
}

// ── Filter + render ───────────────────────────────────────────────────────────
function applyFilterAndRender(reset = false) {
    filteredProducts = allFavProducts.filter(p => {
        const price = parseFloat(p.regular_price) || 0;
        return price >= filterMin && price <= filterMax;
    });

    totalPages = Math.max(1, Math.ceil(filteredProducts.length / PAGE_SIZE));

    if (reset) {
        displayedCount = 0;
        currentPage    = 1;
        const grid = document.querySelector('.fav-card-grid');
        if (grid) grid.innerHTML = '';
    }

    renderPage(currentPage);
    buildPagination();
    updatePokazatBtn();
}

// ── Render one page ───────────────────────────────────────────────────────────
function renderPage(page, append = false) {
    const grid  = document.querySelector('.fav-card-grid');
    if (!grid) return;

    const start = (page - 1) * PAGE_SIZE;
    const slice = filteredProducts.slice(start, start + PAGE_SIZE);

    if (!append) {
        grid.innerHTML = '';
        displayedCount = 0;
    }

    if (slice.length === 0 && !append) {
        grid.innerHTML = '<div class="fav-empty"><p>Нет товаров в выбранном диапазоне цен</p></div>';
        return;
    }

    slice.forEach(product => {
        grid.appendChild(buildCard(product));
        displayedCount++;
    });
}

// ── Build product card (matching reference design) ────────────────────────────
function buildCard(product) {
    const regPrice  = parseFloat(product.regular_price) || 0;
    const cardPrice = product.card_price ? parseFloat(product.card_price) : null;
    const discount  = product.discount_percent ? Math.round(parseFloat(product.discount_percent)) : null;

    const badge = discount ? `<div class="foiz">-${discount}%</div>` : '';

    let priceHTML;
    if (cardPrice !== null) {
        priceHTML = `
          <div class="narx">
            <p>${fmtPrice(cardPrice)}₽</p>
            <p>${fmtPrice(regPrice)}₽</p>
          </div>
          <div class="malumot"><p>С картой</p><p>Обычная</p></div>`;
    } else {
        priceHTML = `
          <div class="narx narx-2">
            <p>${fmtPrice(regPrice)}₽</p>
          </div>`;
    }

    const stars  = buildStars(product.rating);
    const favId  = product._favId;
    const prodId = product.id;

    const div = document.createElement('div');
    div.className = 'shoping';
    div.innerHTML = `
      <div class="img_product">
        <img src="${product.image || '../images/img_page/sir.jpg'}" alt="${product.title}" />
        ${badge}
        <div class="arxiv active" onclick="favRemove(${favId}, ${prodId}, event)">
          <i class="bxr bx-heart"></i>
        </div>
      </div>
      <div class="info_product">
        ${priceHTML}
        <div class="city">${product.title}</div>
        <div class="rating">${stars}</div>
        <button onclick="favAddToCart(${prodId}, event)">В корзину</button>
      </div>`;
    return div;
}

function fmtPrice(n) {
    return n.toLocaleString('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function buildStars(rating) {
    const filled = Math.round(Math.max(0, Math.min(5, rating || 3)));
    const paths = FAV_STAR_PATHS.map((d, i) =>
        `<path d="${d}" fill="${i < filled ? '#FF6633' : '#BFBFBF'}"/>`
    ).join('');
    return `<svg width="100" height="16" viewBox="0 0 110 16" fill="none" xmlns="http://www.w3.org/2000/svg">${paths}</svg>`;
}

// ── Remove from favorites ─────────────────────────────────────────────────────
async function favRemove(favId, productId, event) {
    if (event) event.stopPropagation();
    if (isOffline) {
        // Just remove locally in offline mode
        allFavProducts = allFavProducts.filter(p => p.id !== productId);
        setupSliderBounds();
        applyFilterAndRender(true);
        return;
    }
    try {
        const res = await apiFetch(`/api/catalog/favorites/${favId}/`, { method: 'DELETE' });
        if (res.ok) {
            allFavProducts = allFavProducts.filter(p => p.id !== productId);
            favoriteItems  = favoriteItems.filter(f => f.id !== favId);
            // Sync with main.js global
            if (typeof userFavorites !== 'undefined') {
                const idx = userFavorites.findIndex(f => f.id === favId);
                if (idx !== -1) userFavorites.splice(idx, 1);
            }
            setupSliderBounds();
            applyFilterAndRender(true);
        }
    } catch (e) { console.error('favRemove', e); }
}

// ── Add to cart ───────────────────────────────────────────────────────────────
async function favAddToCart(productId, event) {
    if (event) event.stopPropagation();
    const btn = event ? (event.currentTarget || event.target) : null;
    if (btn) { btn.disabled = true; btn.textContent = '...'; }
    try {
        if (isOffline || typeof apiFetch === 'undefined') throw new Error('offline');
        const res = await apiFetch('/api/cart/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ product: productId })
        });
        if (res.ok) {
            if (btn) { btn.textContent = '✓ Добавлено'; btn.style.background = '#70c05b'; btn.style.color = '#fff'; btn.style.border = 'none'; }
        } else { throw new Error('fail'); }
    } catch {
        if (btn) { btn.disabled = false; btn.textContent = 'В корзину'; }
    }
}

// ── Pagination ────────────────────────────────────────────────────────────────
function buildPagination() {
    const ul = document.querySelector('.fav-pagination');
    if (!ul) return;
    ul.innerHTML = '';
    if (totalPages <= 1) { ul.style.display = 'none'; return; }
    ul.style.display = 'flex';

    const make = (html, page) => {
        const li  = document.createElement('li');
        const btn = document.createElement('button');
        btn.innerHTML = html;
        if (page === currentPage && typeof html === 'number') btn.classList.add('active-page');
        btn.addEventListener('click', () => {
            currentPage = page;
            renderPage(currentPage, false);
            buildPagination();
            updatePokazatBtn();
            document.querySelector('.fav-card-grid')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
        li.appendChild(btn);
        return li;
    };

    ul.appendChild(make('<i class="bxr bx-chevrons-left"></i>', 1));
    ul.appendChild(make('<i class="bxr bx-chevron-left"></i>',  Math.max(1, currentPage - 1)));

    const startP = Math.max(1, currentPage - 3);
    const endP   = Math.min(totalPages, startP + 7);
    for (let p = startP; p <= endP; p++) {
        const li  = document.createElement('li');
        const btn = document.createElement('button');
        btn.innerHTML = `<p>${p}</p>`;
        if (p === currentPage) btn.classList.add('active-page');
        const pg = p;
        btn.addEventListener('click', () => {
            currentPage = pg;
            renderPage(currentPage, false);
            buildPagination();
            updatePokazatBtn();
            document.querySelector('.fav-card-grid')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
        li.appendChild(btn);
        ul.appendChild(li);
    }

    ul.appendChild(make('<i class="bxr bx-chevron-right"></i>',  Math.min(totalPages, currentPage + 1)));
    ul.appendChild(make('<i class="bxr bx-chevrons-right"></i>', totalPages));
}

// ── Показать ещё ──────────────────────────────────────────────────────────────
function initPokazat() {
    const btn = document.querySelector('.btn_pokazat');
    if (!btn) return;
    btn.addEventListener('click', () => {
        const nextStart = displayedCount;
        const slice     = filteredProducts.slice(nextStart, nextStart + PAGE_SIZE);
        const grid      = document.querySelector('.fav-card-grid');
        if (!grid || slice.length === 0) return;
        slice.forEach(p => { grid.appendChild(buildCard(p)); displayedCount++; });
        buildPagination();
        updatePokazatBtn();
        slice[0] && grid.children[displayedCount - slice.length]
            ?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
}

function updatePokazatBtn() {
    const btn = document.querySelector('.btn_pokazat');
    if (btn) btn.style.display = displayedCount < filteredProducts.length ? 'flex' : 'none';
}

// ── Dual range slider ─────────────────────────────────────────────────────────
function initRangeSlider() {
    const iMin = document.getElementById('rangeMin');
    const iMax = document.getElementById('rangeMax');
    if (!iMin || !iMax) return;

    iMin.addEventListener('input', () => {
        if (parseFloat(iMin.value) > parseFloat(iMax.value)) iMin.value = iMax.value;
        filterMin = parseFloat(iMin.value);
        updatePriceDisplay();
        updateSliderTrack();
        applyFilterAndRender(true);
    });

    iMax.addEventListener('input', () => {
        if (parseFloat(iMax.value) < parseFloat(iMin.value)) iMax.value = iMin.value;
        filterMax = parseFloat(iMax.value);
        updatePriceDisplay();
        updateSliderTrack();
        applyFilterAndRender(true);
    });
}

function updatePriceDisplay() {
    const dMin = document.getElementById('priceDisplayMin');
    const dMax = document.getElementById('priceDisplayMax');
    if (dMin) dMin.textContent = Math.round(filterMin);
    if (dMax) dMax.textContent = Math.round(filterMax);
}

// Fills the green track between the two thumbs
function updateSliderTrack() {
    const iMin = document.getElementById('rangeMin');
    const iMax = document.getElementById('rangeMax');
    const wrap = document.querySelector('.dual-range-wrap');
    if (!iMin || !iMax || !wrap) return;

    const min   = parseFloat(iMin.min);
    const max   = parseFloat(iMin.max);
    const range = max - min || 1;
    const left  = ((parseFloat(iMin.value) - min) / range) * 100;
    const right = ((parseFloat(iMax.value) - min) / range) * 100;

    wrap.style.background = `linear-gradient(
      to right,
      #d0f0c0 ${left}%,
      #70c05b ${left}%,
      #70c05b ${right}%,
      #d0f0c0 ${right}%
    )`;
}

// ── Очистить ──────────────────────────────────────────────────────────────────
function initOchistit() {
    const btn = document.querySelector('.btn_ochistit');
    if (!btn) return;
    btn.addEventListener('click', () => {
        filterMin = priceMin; filterMax = priceMax;
        const iMin = document.getElementById('rangeMin');
        const iMax = document.getElementById('rangeMax');
        if (iMin) iMin.value = priceMin;
        if (iMax) iMax.value = priceMax;
        updatePriceDisplay();
        updateSliderTrack();
        applyFilterAndRender(true);
    });
}

// ── Empty state ───────────────────────────────────────────────────────────────
function renderEmpty(msg) {
    const grid = document.querySelector('.fav-card-grid');
    if (grid) grid.innerHTML = `<div class="fav-empty"><p>${msg}</p></div>`;
    const ul = document.querySelector('.fav-pagination');
    if (ul) { ul.innerHTML = ''; ul.style.display = 'none'; }
    const btn = document.querySelector('.btn_pokazat');
    if (btn) btn.style.display = 'none';
}
