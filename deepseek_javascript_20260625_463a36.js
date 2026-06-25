(function() {
  // ----- data -----
  const products = [
    { id: 1, name: 'Glow serum', price: 48, stars: 4.5, img: 'images/product1.svg' },
    { id: 2, name: 'Barrier cream', price: 62, stars: 5, img: 'images/product2.svg' },
    { id: 3, name: 'Nectar mist', price: 39, stars: 4, img: 'images/product3.svg' },
    { id: 4, name: 'Overnight mask', price: 55, stars: 4.5, img: 'images/product4.svg' },
  ];

  const reviews = [
    { stars: 5, text: 'My skin feels like silk. Absolutely love the serum.', author: 'Elena R.' },
    { stars: 4, text: 'Gentle and effective. The cream is a staple now.', author: 'Marcus L.' },
    { stars: 5, text: 'Fast shipping and beautiful packaging. 10/10', author: 'Sophia K.' },
  ];

  // ----- state -----
  let cart = [];

  // DOM refs
  const productGrid = document.getElementById('productGrid');
  const reviewGrid = document.getElementById('reviewGrid');
  const cartItemsList = document.getElementById('cartItemsList');
  const cartTotal = document.getElementById('cartTotal');
  const clearBtn = document.getElementById('clear-cart');

  // ----- render products -----
  function renderProducts() {
    productGrid.innerHTML = '';
    products.forEach(p => {
      const card = document.createElement('div');
      card.className = 'product-card';
      const fullStars = Math.floor(p.stars);
      const starStr = '★'.repeat(fullStars) + (p.stars % 1 === 0.5 ? '½' : '');
      card.innerHTML = `
        <img src="${p.img}" alt="${p.name}" loading="lazy" />
        <h3>${p.name}</h3>
        <div class="price">$${p.price}</div>
        <div class="stars">${starStr}</div>
        <button class="add-to-cart-btn" data-id="${p.id}">Add to cart</button>
      `;
      productGrid.appendChild(card);
    });

    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
      btn.addEventListener('click', function(e) {
        const id = parseInt(this.dataset.id);
        const product = products.find(p => p.id === id);
        if (product) {
          cart.push(product);
          updateCartUI();
        }
      });
    });
  }

  // ----- render reviews -----
  function renderReviews() {
    reviewGrid.innerHTML = '';
    reviews.forEach(r => {
      const div = document.createElement('div');
      div.className = 'review-item';
      const starStr = '★'.repeat(r.stars);
      div.innerHTML = `
        <div class="stars">${starStr}</div>
        <p>“${r.text}”</p>
        <div class="author">— ${r.author}</div>
      `;
      reviewGrid.appendChild(div);
    });
  }

  // ----- update cart UI -----
  function updateCartUI() {
    cartItemsList.innerHTML = '';
    if (cart.length === 0) {
      const emptyBadge = document.createElement('span');
      emptyBadge.className = 'item-badge';
      emptyBadge.style.opacity = '0.6';
      emptyBadge.textContent = 'empty';
      cartItemsList.appendChild(emptyBadge);
    } else {
      const counts = {};
      cart.forEach(item => { counts[item.id] = (counts[item.id] || 0) + 1; });
      Object.keys(counts).forEach(id => {
        const product = products.find(p => p.id === parseInt(id));
        if (product) {
          const badge = document.createElement('span');
          badge.className = 'item-badge';
          badge.textContent = `${product.name} ×${counts[id]}`;
          cartItemsList.appendChild(badge);
        }
      });
    }

    const total = cart.reduce((sum, p) => sum + p.price, 0);
    cartTotal.textContent = `$${total}`;
  }

  // ----- clear cart -----
  function clearCart() {
    cart = [];
    updateCartUI();
  }

  // ----- init -----
  function init() {
    renderProducts();
    renderReviews();
    updateCartUI();
    clearBtn.addEventListener('click', clearCart);
  }

  init();
})();