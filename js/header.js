/**
 * Header related logic: Profile dropdown, Cart counter, etc.
 */

document.addEventListener("DOMContentLoaded", () => {
    initProfileDropdown();
    if (localStorage.getItem('access')) {
        updateCartCounter();
    }
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
            window.location.href = window.location.pathname.includes('/page/') ? './login.html' : './page/login.html';
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

// ─── Update Cart Counter ─────────────────────────────────────────────────────
async function updateCartCounter() {
    try {
        const res = await apiFetch('/api/cart/');
        if (res.ok) {
            const items = await res.json();
            const totalQuantity = items.length;
            
            const counterElements = document.querySelectorAll('.counter_heder');
            counterElements.forEach(counter => {
                counter.textContent = totalQuantity;
            });
        }
    } catch (e) {
        console.error('Failed to update cart counter:', e);
    }
}

// Export for global access if needed
window.updateCartCounter = updateCartCounter;
