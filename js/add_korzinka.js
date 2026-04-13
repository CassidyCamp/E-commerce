document.addEventListener('DOMContentLoaded', () => {
    const childProductContainer = document.querySelector('.child-product');
    const counterHeader = document.querySelector('.counter_heder');
    const sumProduct = document.querySelector('.sum-product p');
    const itagSuma = document.querySelector('.itag-suma h1');
    const vdeliBtn = document.querySelector('.vdeli');
    const deleteBtn = document.querySelector('.dalete');
    const elementProduct1Text = document.querySelector('.element-product1 p:first-child');
    const elementProduct1Price = document.querySelector('.element-product1 p:last-child');
    const elementProduct2Node = document.querySelector('.element-product2');
    const elementProduct2Discount = document.querySelector('.element-product2 p:last-child');

    const BASE_URL = 'http://localhost:8000';
    const accessToken = localStorage.getItem('access');

    // Agar savatcha elementi topilmasa, kodni to'xtatish
    if (!childProductContainer) return;

    const headers = {
        'Content-Type': 'application/json',
    };
    if (accessToken) {
        headers['Authorization'] = `Bearer ${accessToken}`;
    }

    async function fetchProduct(productId) {
        try {
            const res = await fetch(`${BASE_URL}/api/catalog/products/${productId}/`, { headers });
            if (!res.ok) throw new Error('Product not found');
            return await res.json();
        } catch (e) {
            console.error(e);
            return null;
        }
    }

    async function fetchCart() {
        if (!accessToken) {
            window.location.href = 'login.html';
            return;
        }
        try {
            const res = await fetch(`${BASE_URL}/api/cart/`, { headers });
            if (res.status === 401) {
                console.error("401 Unauthorized - redirecting to login");
                window.location.href = 'login.html';
                return;
            }
            if (!res.ok) throw new Error('Cart not found');
            const cartItems = await res.json();
            renderCart(cartItems);
        } catch (e) {
            console.error(e);
        }
    }

    const cardToggle = document.querySelector('.card-status-toggle');
    const toggleOptions = document.querySelectorAll('.card-status-toggle .toggle-option');
    let priceMode = localStorage.getItem('priceMode') || 'with-card';

    if (cardToggle) {
        cardToggle.setAttribute('data-active', priceMode);
        
        toggleOptions.forEach(option => {
            option.addEventListener('click', () => {
                priceMode = option.dataset.type;
                cardToggle.setAttribute('data-active', priceMode);
                localStorage.setItem('priceMode', priceMode);
                fetchCart(); // Re-render cart and calculate totals based on new priceMode
            });
        });
    }

    function toggleWalletUI() {
        const headInfo = document.querySelector('.head-info');
        const senaMain = document.querySelector('.sena-main');
        if (priceMode === 'regular') {
            if (headInfo) headInfo.style.display = 'none';
            if (senaMain) senaMain.style.display = 'none';
        } else {
            if (headInfo) headInfo.style.display = 'flex';
            if (senaMain) senaMain.style.display = 'flex';
        }
    }

    async function increaseCartItem(id) {
        try {
            const res = await fetch(`${BASE_URL}/api/cart/${id}/increase/`, {
                method: 'POST',
                headers
            });
            if (res.ok) {
                fetchCart(); // Yangilangan holatni olib kelish
            }
        } catch (e) {
            console.error(e);
        }
    }

    async function decreaseCartItem(id) {
        try {
            const res = await fetch(`${BASE_URL}/api/cart/${id}/decrease/`, {
                method: 'POST',
                headers
            });
            if (res.ok) {
                fetchCart(); // Yangilangan holatni olib kelish
            }
        } catch (e) {
            console.error(e);
        }
    }

    if (vdeliBtn) {
        vdeliBtn.addEventListener('click', () => {
            const checkboxes = document.querySelectorAll('.child .ui-checkbox');
            checkboxes.forEach(cb => cb.checked = false);
        });
    }

    if (deleteBtn) {
        deleteBtn.addEventListener('click', async () => {
            const checkedItems = document.querySelectorAll('.child input.ui-checkbox:checked');
            for (const checkbox of checkedItems) {
                const itemId = checkbox.dataset.id;
                if (itemId) {
                    try {
                        await fetch(`${BASE_URL}/api/cart/${itemId}/`, {
                            method: 'DELETE',
                            headers
                        });
                    } catch (e) {
                        console.error(e);
                    }
                }
            }
            fetchCart();
        });
    }

    async function renderCart(cartItems) {
        childProductContainer.innerHTML = '';
        let totalItems = 0;
        let totalPrice = 0;
        let totalRegularPrice = 0;

        for (const item of cartItems) {
            const product = await fetchProduct(item.product);
            if (!product) continue;

            totalItems += item.quantity;
            
            let regularP = parseFloat(product.regular_price || 0);
            let cardP = parseFloat(product.card_price || regularP);
            
            let baseP = priceMode === 'with-card' ? cardP : regularP;

            // -10% har ikkalasida ham hisoblanadi
            let itemDiscount = baseP * 0.10;
            let currentPrice = baseP - itemDiscount;

            totalRegularPrice += baseP * item.quantity;
            totalPrice += currentPrice * item.quantity;

            let productTitle = product.title || "Mahsulot nomi yo'q";
            if (productTitle.length > 37) {
                productTitle = productTitle.substring(0, 37) + '...';
            }

            const childDiv = document.createElement('div');
            childDiv.className = 'child';

            childDiv.innerHTML = `
                <div class="wrapper_info_korzinka">
                    <span class="img-icon">
                        <input type="checkbox" class="ui-checkbox" checked data-id="${item.id}" />
                        <img src="${product.image ? product.image : '../images/img_page/sir.jpg'}" alt="${product.title || ''}" />
                    </span>

                    <span class="text-child">
                        <h1><a href="#!" style="text-decoration: none; color: inherit;" title="${product.title || ''}">${productTitle}</a></h1>
                        <div class="element_2" style="margin-top: 10px;">
                            <div class="wrapper-info">
                                <nav>
                                    <span>${currentPrice.toLocaleString('ru-RU', {minimumFractionDigits: 2})}₽</span>
                                    <span style="text-decoration: line-through; margin-left: 10px; color: var(--grayColor);">${baseP.toLocaleString('ru-RU', {minimumFractionDigits: 2})}₽</span>
                                    <span style="margin-left: 10px;">за шт.</span>
                                </nav>
                            </div>
                            <span class="aksiya" style="font-size: 14px; width: 45px; height: 25px; margin-left: 10px;">-10%</span>
                        </div>
                    </span>
                </div>
                <div class="wrapper_suma">
                    <span class="countFn">
                        <button class="minus_add"><i class="bxr bx-minus"></i></button>
                        <p>${item.quantity}</p>
                        <button class="plus_add"><i class="bxr bx-plus"></i></button>
                    </span>
                    <span class="suma">
                        <h1>${(currentPrice * item.quantity).toLocaleString('ru-RU', {minimumFractionDigits: 2})}₽</h1>
                        <h5>${(baseP * item.quantity).toLocaleString('ru-RU', {minimumFractionDigits: 2})}₽</h5>
                    </span>
                </div>
            `;

            const minusBtn = childDiv.querySelector('.minus_add');
            const plusBtn = childDiv.querySelector('.plus_add');

            minusBtn.addEventListener('click', () => {
                decreaseCartItem(item.id);
            });

            plusBtn.addEventListener('click', () => {
                increaseCartItem(item.id);
            });

            childProductContainer.appendChild(childDiv);
        }

        // lengths / amounts
        if (counterHeader) counterHeader.textContent = cartItems.length;
        if (sumProduct) sumProduct.textContent = cartItems.length;

        // totals and discounts
        if (elementProduct1Text) elementProduct1Text.textContent = `${cartItems.length} товара`;
        if (elementProduct1Price) elementProduct1Price.textContent = `${totalRegularPrice.toLocaleString('ru-RU', {minimumFractionDigits: 2})} ₽`;

        let discount = totalRegularPrice - totalPrice;
        if (elementProduct2Node && elementProduct2Discount) {
            if (discount > 0) {
                elementProduct2Discount.textContent = `-${discount.toLocaleString('ru-RU', {minimumFractionDigits: 2})} ₽`;
                elementProduct2Node.style.display = 'flex';
            } else {
                elementProduct2Node.style.display = 'none';
            }
        }

        if (itagSuma) itagSuma.textContent = `${totalPrice.toLocaleString('ru-RU', {minimumFractionDigits: 2})} ₽`;

        toggleWalletUI();
    }

    // Dastlab savatchani yuklash
    fetchCart();
});