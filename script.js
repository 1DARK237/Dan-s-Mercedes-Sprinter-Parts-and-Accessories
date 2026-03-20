// script.js

// --- CONFIGURATION ---
const TARGET_EMAIL = 'dantimberlake62@gmail.com';

// --- DYNAMIC CATALOG DATA ---
const partsData = [
  {
    id: 1,
    name: "Sprinter High Roof Rear Door Handle",
    category: "High Roof",
    description: "Genuine replacement rear door handle for high roof models. Engineered for durability.",
    price: 45.00,
    imageUrl: "https://images.unsplash.com/photo-1600705722908-bab1e61c0b4d?auto=format&fit=crop&w=600&q=80",
    featured: true
  },
  {
    id: 2,
    name: "Sprinter Low Roof Roof Rack Mounts",
    category: "Low Roof",
    description: "Set of 4 heavy-duty roof rack mounts specifically designed for low roof Sprinters.",
    price: 120.00,
    imageUrl: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=600&q=80",
    featured: false
  },
  {
    id: 3,
    name: "OM642 V6 Diesel Oil Filter",
    category: "Engine",
    description: "OEM quality oil filter for 3.0L V6 Sprinter engines. Ensures optimal performance.",
    price: 18.50,
    imageUrl: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=600&q=80",
    featured: true
  },
  {
    id: 4,
    name: "Sprinter Front Brake Pads Set",
    category: "Brakes",
    description: "High-performance ceramic front brake pads. Low dust and excellent stopping power.",
    price: 65.00,
    imageUrl: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=600&q=80",
    featured: true
  },
  {
    id: 5,
    name: "High Roof Interior LED Light Bar",
    category: "High Roof",
    description: "Ultra-bright 12V LED light bar for cargo area illumination.",
    price: 35.00,
    imageUrl: "https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&w=600&q=80",
    featured: false
  },
  {
    id: 6,
    name: "Sprinter Side Mirror Assembly (Right)",
    category: "Exterior",
    description: "Complete power-adjustable side mirror assembly with heated glass.",
    price: 150.00,
    imageUrl: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=600&q=80",
    featured: false
  },
  {
    id: 7,
    name: "Fuel Injector Seal Kit",
    category: "Engine",
    description: "Complete copper seal and bolt kit for Sprinter diesel injectors.",
    price: 24.00,
    imageUrl: "https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?auto=format&fit=crop&w=600&q=80",
    featured: false
  },
  {
    id: 8,
    name: "Low Roof Rear Step Bumper",
    category: "Low Roof",
    description: "Heavy-duty steel rear step bumper for easy cargo access.",
    price: 280.00,
    imageUrl: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=600&q=80",
    featured: false
  }
];

// --- CART SYSTEM ---
let cart = JSON.parse(localStorage.getItem('sprinterCart')) || [];

function saveCart() {
  localStorage.setItem('sprinterCart', JSON.stringify(cart));
  updateCartUI();
}

function addToCart(partId) {
  const part = partsData.find(p => p.id === partId);
  if (!part) return;

  const existingItem = cart.find(item => item.id === partId);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...part, quantity: 1 });
  }
  
  saveCart();
  openCart();
}

function removeFromCart(partId) {
  cart = cart.filter(item => item.id !== partId);
  saveCart();
}

function updateQuantity(partId, delta) {
  const item = cart.find(item => item.id === partId);
  if (item) {
    item.quantity += delta;
    if (item.quantity <= 0) {
      removeFromCart(partId);
    } else {
      saveCart();
    }
  }
}

function formatPrice(price) {
  return `$${price.toFixed(2)}`;
}

// --- UI INJECTION & UPDATES ---
function injectCartUI() {
  if (document.getElementById('cart-drawer')) return; // Already injected

  const cartHTML = `
    <div class="cart-overlay" id="cart-overlay"></div>
    <div class="cart-drawer" id="cart-drawer">
      <div class="cart-header">
        <h2>Your Cart</h2>
        <button class="close-cart" id="close-cart">&times;</button>
      </div>
      <div class="cart-items" id="cart-items"></div>
      <div class="cart-footer">
        <div class="cart-total">
          <span>Total:</span>
          <span id="cart-total-price">$0.00</span>
        </div>
        <a href="order.html" class="btn btn-primary" style="width:100%">Proceed to Checkout</a>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', cartHTML);

  // Bind Cart Drawer Events
  document.getElementById('cart-overlay').addEventListener('click', closeCart);
  document.getElementById('close-cart').addEventListener('click', closeCart);
}

function openCart() {
  document.getElementById('cart-drawer').classList.add('open');
  document.getElementById('cart-overlay').classList.add('open');
}

function closeCart() {
  document.getElementById('cart-drawer').classList.remove('open');
  document.getElementById('cart-overlay').classList.remove('open');
}

function updateCartUI() {
  // Update Badge
  const badge = document.getElementById('cart-badge');
  if (badge) {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    badge.textContent = totalItems;
    badge.style.display = totalItems > 0 ? 'flex' : 'none';
  }

  // Update Drawer Items
  const cartItemsContainer = document.getElementById('cart-items');
  const cartTotalPrice = document.getElementById('cart-total-price');
  
  if (cartItemsContainer && cartTotalPrice) {
    cartItemsContainer.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = '<div class="empty-cart-msg">Your cart is empty.</div>';
    } else {
      cart.forEach(item => {
        total += item.price * item.quantity;
        const itemEl = document.createElement('div');
        itemEl.className = 'cart-item';
        itemEl.innerHTML = `
          <img src="${item.imageUrl}" alt="${item.name}" class="cart-item-img">
          <div class="cart-item-details">
            <div class="cart-item-title">${item.name}</div>
            <div class="cart-item-price">${formatPrice(item.price)}</div>
            <div class="cart-item-actions">
              <div class="qty-controls">
                <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                <input type="text" class="qty-input" value="${item.quantity}" readonly>
                <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
              </div>
              <button class="remove-item" onclick="removeFromCart(${item.id})">Remove</button>
            </div>
          </div>
        `;
        cartItemsContainer.appendChild(itemEl);
      });
    }
    cartTotalPrice.textContent = formatPrice(total);
  }

  // Update Checkout Page Summary (if on order.html)
  updateCheckoutSummary();
}

function updateCheckoutSummary() {
  const summaryContainer = document.getElementById('checkout-summary');
  if (!summaryContainer) return;

  if (cart.length === 0) {
    summaryContainer.innerHTML = '<p style="color: var(--text-light);">Your cart is empty. <a href="catalog.html" style="color: var(--merc-accent);">Go to catalog</a>.</p>';
    document.getElementById('submit-order-btn').disabled = true;
    return;
  }

  document.getElementById('submit-order-btn').disabled = false;
  let html = '<div class="checkout-summary-box">';
  let total = 0;

  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;
    html += `
      <div class="checkout-item">
        <span>${item.quantity}x ${item.name}</span>
        <span>${formatPrice(itemTotal)}</span>
      </div>
    `;
  });

  html += `
    <div class="checkout-total">
      <span>Total</span>
      <span>${formatPrice(total)}</span>
    </div>
  </div>`;
  
  summaryContainer.innerHTML = html;
}

// --- HELPER FUNCTION TO RENDER PRODUCTS ---
function renderProducts(parts, container) {
  container.innerHTML = '';
  
  if (parts.length === 0) {
    container.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 40px; color: #666;">No parts found matching your criteria.</p>';
    return;
  }

  parts.forEach(part => {
    const card = document.createElement('div');
    card.className = 'product-card fade-in';
    
    const imageSrc = part.imageUrl ? part.imageUrl : 'https://via.placeholder.com/600x400?text=Image+Coming+Soon';
    
    card.innerHTML = `
      <div class="product-image">
        <span class="product-badge">${part.category}</span>
        <img src="${imageSrc}" alt="${part.name}" loading="lazy">
      </div>
      <div class="product-info">
        <span class="product-category">Mercedes Sprinter</span>
        <h3 class="product-title">${part.name}</h3>
        <p style="font-size: 0.85rem; color: var(--text-light); margin-bottom: 15px; line-height: 1.4;">${part.description}</p>
        <div class="product-price">${formatPrice(part.price)}</div>
        <button onclick="addToCart(${part.id})" class="btn btn-primary" style="width: 100%;">Add to Cart</button>
      </div>
    `;
    
    container.appendChild(card);
  });

  // Trigger fade-in animation
  setTimeout(() => {
    const elements = container.querySelectorAll('.fade-in');
    elements.forEach(el => el.classList.add('visible'));
  }, 50);
}

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
  
  // Inject Cart UI & Bind Header Toggle
  injectCartUI();
  updateCartUI();
  
  const cartToggle = document.getElementById('cart-toggle');
  if (cartToggle) {
    cartToggle.addEventListener('click', openCart);
  }

  // Mobile Menu Toggle
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  // Render Featured Products (Home Page)
  const featuredGrid = document.getElementById('featured-grid');
  if (featuredGrid) {
    const featuredParts = partsData.filter(part => part.featured).slice(0, 3);
    renderProducts(featuredParts, featuredGrid);
  }

  // Render Catalog & Filtering (Catalog Page)
  const catalogGrid = document.getElementById('catalog-grid');
  if (catalogGrid) {
    renderProducts(partsData, catalogGrid);

    const filterCheckboxes = document.querySelectorAll('.filter-list input[type="checkbox"]');
    filterCheckboxes.forEach(checkbox => {
      checkbox.addEventListener('change', () => {
        const activeCategories = Array.from(filterCheckboxes)
                                      .filter(cb => cb.checked)
                                      .map(cb => cb.value);
        
        if (activeCategories.length === 0) {
          renderProducts(partsData, catalogGrid);
        } else {
          const filteredParts = partsData.filter(part => activeCategories.includes(part.category));
          renderProducts(filteredParts, catalogGrid);
        }
      });
    });
  }

  // Scroll Animations (Fade-in on scroll)
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.section-header, .feature-item, .category-card, .info-section, .form-section').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
  });

  // Handle Order Submission (Checkout Page)
  const orderForm = document.getElementById('order-form');
  if (orderForm) {
    orderForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
      }

      const fullName = document.getElementById('full-name').value;
      const email = document.getElementById('email').value;
      const phone = document.getElementById('phone').value;
      const address = document.getElementById('address').value;
      const notes = document.getElementById('notes').value;

      // Format Cart Items for Email
      let orderDetails = '';
      let total = 0;
      cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        orderDetails += `- ${item.quantity}x ${item.name} (${formatPrice(itemTotal)})\n`;
      });
      orderDetails += `\nTOTAL: ${formatPrice(total)}`;

      const subject = encodeURIComponent(`New Order Request - ${fullName}`);
      const body = encodeURIComponent(
        `--- NEW ORDER REQUEST ---\n\n` +
        `CUSTOMER DETAILS:\n` +
        `Name: ${fullName}\n` +
        `Email: ${email}\n` +
        `Phone: ${phone}\n\n` +
        `ORDER ITEMS:\n` +
        `${orderDetails}\n\n` +
        `DELIVERY ADDRESS:\n${address}\n\n` +
        `ADDITIONAL NOTES:\n${notes ? notes : 'None'}`
      );

      window.location.href = `mailto:${TARGET_EMAIL}?subject=${subject}&body=${body}`;
      
      // Optional: Clear cart after submission
      // cart = [];
      // saveCart();
    });
  }

  // Handle Contact Form
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('contact-name').value;
      const email = document.getElementById('contact-email').value;
      const phone = document.getElementById('contact-phone').value;
      const message = document.getElementById('contact-message').value;

      const subject = encodeURIComponent(`Contact Inquiry from ${name}`);
      const body = encodeURIComponent(
        `--- NEW CONTACT INQUIRY ---\n\n` +
        `Name: ${name}\n` +
        `Email: ${email}\n` +
        `Phone: ${phone ? phone : 'Not provided'}\n\n` +
        `Message:\n${message}`
      );

      window.location.href = `mailto:${TARGET_EMAIL}?subject=${subject}&body=${body}`;
    });
  }
});
