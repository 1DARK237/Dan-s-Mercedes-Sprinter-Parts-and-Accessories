// script.js

// --- CONFIGURATION ---
// Change this email address to your actual email where orders/contacts should be sent
const TARGET_EMAIL = 'dantimberlake62@gmail.com';

// --- DYNAMIC CATALOG DATA ---
// This simulates data that will eventually come from your Admin Page backend.
// When you build the admin panel, you can replace this with a fetch() call.
const partsData = [
  {
    id: 1,
    name: "Sprinter High Roof Rear Door Handle",
    category: "High Roof",
    description: "Genuine replacement rear door handle for high roof models. Engineered for durability.",
    price: "$45.00",
    imageUrl: "https://images.unsplash.com/photo-1600705722908-bab1e61c0b4d?auto=format&fit=crop&w=600&q=80", // Placeholder
    featured: true
  },
  {
    id: 2,
    name: "Sprinter Low Roof Roof Rack Mounts",
    category: "Low Roof",
    description: "Set of 4 heavy-duty roof rack mounts specifically designed for low roof Sprinters.",
    price: "$120.00",
    imageUrl: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=600&q=80", // Placeholder
    featured: false
  },
  {
    id: 3,
    name: "OM642 V6 Diesel Oil Filter",
    category: "Engine",
    description: "OEM quality oil filter for 3.0L V6 Sprinter engines. Ensures optimal performance.",
    price: "$18.50",
    imageUrl: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=600&q=80", // Placeholder
    featured: true
  },
  {
    id: 4,
    name: "Sprinter Front Brake Pads Set",
    category: "Brakes",
    description: "High-performance ceramic front brake pads. Low dust and excellent stopping power.",
    price: "$65.00",
    imageUrl: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=600&q=80", // Placeholder
    featured: true
  },
  {
    id: 5,
    name: "High Roof Interior LED Light Bar",
    category: "High Roof",
    description: "Ultra-bright 12V LED light bar for cargo area illumination.",
    price: "$35.00",
    imageUrl: "https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&w=600&q=80", // Placeholder
    featured: false
  },
  {
    id: 6,
    name: "Sprinter Side Mirror Assembly (Right)",
    category: "Exterior",
    description: "Complete power-adjustable side mirror assembly with heated glass.",
    price: "$150.00",
    imageUrl: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=600&q=80", // Placeholder
    featured: false
  },
  {
    id: 7,
    name: "Fuel Injector Seal Kit",
    category: "Engine",
    description: "Complete copper seal and bolt kit for Sprinter diesel injectors.",
    price: "$24.00",
    imageUrl: "https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?auto=format&fit=crop&w=600&q=80", // Placeholder
    featured: false
  },
  {
    id: 8,
    name: "Low Roof Rear Step Bumper",
    category: "Low Roof",
    description: "Heavy-duty steel rear step bumper for easy cargo access.",
    price: "$280.00",
    imageUrl: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=600&q=80", // Placeholder
    featured: false
  }
];

document.addEventListener('DOMContentLoaded', () => {
  
  // --- MOBILE MENU TOGGLE ---
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  // --- RENDER FEATURED PRODUCTS (Home Page) ---
  const featuredGrid = document.getElementById('featured-grid');
  if (featuredGrid) {
    const featuredParts = partsData.filter(part => part.featured).slice(0, 3);
    renderProducts(featuredParts, featuredGrid);
  }

  // --- RENDER CATALOG & FILTERING (Catalog Page) ---
  const catalogGrid = document.getElementById('catalog-grid');
  if (catalogGrid) {
    // Initial render
    renderProducts(partsData, catalogGrid);

    // Setup filters
    const filterCheckboxes = document.querySelectorAll('.filter-list input[type="checkbox"]');
    filterCheckboxes.forEach(checkbox => {
      checkbox.addEventListener('change', () => {
        const activeCategories = Array.from(filterCheckboxes)
                                      .filter(cb => cb.checked)
                                      .map(cb => cb.value);
        
        if (activeCategories.length === 0) {
          renderProducts(partsData, catalogGrid); // Show all if none selected
        } else {
          const filteredParts = partsData.filter(part => activeCategories.includes(part.category));
          renderProducts(filteredParts, catalogGrid);
        }
      });
    });
  }

  // --- PRE-FILL ORDER FORM ---
  const orderForm = document.getElementById('order-form');
  if (orderForm) {
    const urlParams = new URLSearchParams(window.location.search);
    const partNameParam = urlParams.get('part');
    if (partNameParam) {
      const partInput = document.getElementById('part-name');
      if (partInput) partInput.value = partNameParam;
    }

    // Handle Order Submission
    orderForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const fullName = document.getElementById('full-name').value;
      const email = document.getElementById('email').value;
      const phone = document.getElementById('phone').value;
      const partName = document.getElementById('part-name').value;
      const quantity = document.getElementById('quantity').value;
      const address = document.getElementById('address').value;
      const notes = document.getElementById('notes').value;

      const subject = encodeURIComponent(`New Order Request: ${partName} - ${fullName}`);
      const body = encodeURIComponent(
        `--- NEW ORDER REQUEST ---\n\n` +
        `CUSTOMER DETAILS:\n` +
        `Name: ${fullName}\n` +
        `Email: ${email}\n` +
        `Phone: ${phone}\n\n` +
        `ORDER DETAILS:\n` +
        `Part Name/Number: ${partName}\n` +
        `Quantity: ${quantity}\n\n` +
        `DELIVERY ADDRESS:\n${address}\n\n` +
        `ADDITIONAL NOTES:\n${notes ? notes : 'None'}`
      );

      window.location.href = `mailto:${TARGET_EMAIL}?subject=${subject}&body=${body}`;
    });
  }

  // --- HANDLE CONTACT FORM ---
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

// --- HELPER FUNCTION TO RENDER PRODUCTS ---
function renderProducts(parts, container) {
  container.innerHTML = '';
  
  if (parts.length === 0) {
    container.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 40px; color: #666;">No parts found matching your criteria.</p>';
    return;
  }

  parts.forEach(part => {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    // Check if image exists, otherwise use a placeholder text
    const imageSrc = part.imageUrl ? part.imageUrl : 'https://via.placeholder.com/600x400?text=Image+Coming+Soon';
    
    card.innerHTML = `
      <div class="product-image">
        <span class="product-badge">${part.category}</span>
        <!-- INSERT PART IMAGE HERE -->
        <img src="${imageSrc}" alt="${part.name}" loading="lazy">
      </div>
      <div class="product-info">
        <span class="product-category">Mercedes Sprinter</span>
        <h3 class="product-title">${part.name}</h3>
        <p style="font-size: 0.85rem; color: #666; margin-bottom: 15px; line-height: 1.4;">${part.description}</p>
        <div class="product-price">${part.price}</div>
        <a href="order.html?part=${encodeURIComponent(part.name)}" class="btn btn-primary" style="width: 100%;">Order Part</a>
      </div>
    `;
    
    container.appendChild(card);
  });
}
