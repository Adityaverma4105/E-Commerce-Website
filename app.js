// app.js - shared logic: products data + localStorage cart utilities

/* ---------- PRODUCTS ----------
   You can replace or extend this array.
   Each product: id, title, price (number), img (relative or remote), desc
*/
const PRODUCTS = [
  {id: 'pd01', title: 'Classic Sneakers', price: 39.99, img: 'https://www.bing.com/th?id=OPAC.Gi5wmNPTXvuULQ474C474&o=5&pid=21.1&w=128&h=128&rs=1&qlt=100&dpr=1.5&o=2&bw=6&bc=FFFFFF', desc: 'Comfortable everyday sneakers.', rating: 4.7, reviews: 248, discount: 10},
  {id: 'pd02', title: 'Canvas Backpack', price: 49.50, img: 'https://www.bing.com/th?id=OPAC.Uf4dxrzRjI7inw474C474&o=5&pid=21.1&w=128&h=188&rs=1&qlt=100&dpr=1.5&o=2&bw=6&bc=FFFFFF', desc: 'Durable, water-resistant.', rating: 4.6, reviews: 156, discount: 15},
  {id: 'pd03', title: 'Wireless Headphones', price: 79.00, img: 'https://th.bing.com/th/id/OIP.6y2wrgZQNEO85hfKXnHRwgHaGT?w=218&h=186&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3', desc: 'Noise-reducing, long battery.', rating: 4.8, reviews: 432, discount: 5},
  {id: 'pd04', title: 'Sport Shoes', price: 129.99, img: 'data:image/webp;base64,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', desc: 'Fitness tracker + notifications.', rating: 4.5, reviews: 189, discount: 0}
];

/* ---------- CART STORAGE UTIL ----------
 cart stored as object { productId: qty, ... } in localStorage key 'ecom_cart'
*/
const CART_KEY = 'ecom_cart';

function readCart() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) { return {}; }
}
function writeCart(cartObj) { localStorage.setItem(CART_KEY, JSON.stringify(cartObj)); }

function addToCart(productId, qty = 1) {
  const cart = readCart();
  cart[productId] = (cart[productId] || 0) + Number(qty);
  writeCart(cart);
}

function setQty(productId, qty) {
  const cart = readCart();
  qty = Number(qty);
  if (qty <= 0) { delete cart[productId]; } else { cart[productId] = qty; }
  writeCart(cart);
}

function removeFromCart(productId) {
  const cart = readCart();
  delete cart[productId];
  writeCart(cart);
}

function cartItemsDetailed() {
  const cart = readCart();
  const items = [];
  for (const id of Object.keys(cart)) {
    const p = PRODUCTS.find(x => x.id === id);
    if (!p) continue;
    items.push({ ...p, qty: cart[id], subtotal: Number((p.price * cart[id]).toFixed(2)) });
  }
  return items;
}

function cartTotals() {
  const items = cartItemsDetailed();
  const subtotal = Number(items.reduce((s,i)=>s+i.subtotal,0).toFixed(2));
  const shipping = subtotal > 0 && subtotal < 50 ? 5.99 : 0; // example rule
  const tax = Number((subtotal * 0.12).toFixed(2)); // example 12% tax
  const total = Number((subtotal + shipping + tax).toFixed(2));
  return { subtotal, shipping, tax, total };
}

/* helper to show a small notification */
function toast(msg) {
  let t = document.createElement('div');
  t.textContent = msg;
  Object.assign(t.style, {
    position:'fixed', right:'20px', bottom:'20px', background:'#111827', color:'white',
    padding:'10px 14px', borderRadius:'10px', boxShadow:'0 8px 20px rgba(2,6,23,0.4)', zIndex:9999
  });
  document.body.appendChild(t);
  setTimeout(()=> t.style.opacity = '0', 1800);
  setTimeout(()=> t.remove(), 2200);
}

/* ========== WISHLIST FUNCTIONS ========== */
const WISHLIST_KEY = 'ecom_wishlist';

function readWishlist() {
  try {
    const raw = localStorage.getItem(WISHLIST_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) { return []; }
}

function writeWishlist(wishlistArr) {
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlistArr));
}

function addToWishlist(productId) {
  const wishlist = readWishlist();
  if (!wishlist.includes(productId)) {
    wishlist.push(productId);
    writeWishlist(wishlist);
    return true;
  }
  return false;
}

function removeFromWishlist(productId) {
  const wishlist = readWishlist();
  const idx = wishlist.indexOf(productId);
  if (idx > -1) {
    wishlist.splice(idx, 1);
    writeWishlist(wishlist);
    return true;
  }
  return false;
}

function toggleWishlist(productId) {
  const wishlist = readWishlist();
  if (wishlist.includes(productId)) {
    removeFromWishlist(productId);
    return false;
  } else {
    addToWishlist(productId);
    return true;
  }
}

function isInWishlist(productId) {
  return readWishlist().includes(productId);
}

function wishlistItemsDetailed() {
  const wishlist = readWishlist();
  const items = [];
  for (const id of wishlist) {
    const p = PRODUCTS.find(x => x.id === id);
    if (p) items.push(p);
  }
  return items;
}

/* ========== SEARCH & FILTER FUNCTIONS ========== */

function searchProducts(query) {
  const q = query.toLowerCase();
  return PRODUCTS.filter(p => 
    p.title.toLowerCase().includes(q) || 
    p.desc.toLowerCase().includes(q)
  );
}

function filterByPriceRange(minPrice, maxPrice) {
  return PRODUCTS.filter(p => p.price >= minPrice && p.price <= maxPrice);
}

function filterByRating(minRating) {
  return PRODUCTS.filter(p => p.rating >= minRating);
}

function sortProducts(products, sortBy) {
  const copy = [...products];
  switch(sortBy) {
    case 'price-low':
      return copy.sort((a, b) => a.price - b.price);
    case 'price-high':
      return copy.sort((a, b) => b.price - a.price);
    case 'rating':
      return copy.sort((a, b) => b.rating - a.rating);
    case 'newest':
      return copy;
    default:
      return copy;
  }
}

/* ========== PRODUCT COMPARISON ========== */
const COMPARISON_KEY = 'ecom_comparison';

function readComparison() {
  try {
    const raw = localStorage.getItem(COMPARISON_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) { return []; }
}

function writeComparison(comparisonArr) {
  localStorage.setItem(COMPARISON_KEY, JSON.stringify(comparisonArr));
}

function addToComparison(productId) {
  const comparison = readComparison();
  if (!comparison.includes(productId) && comparison.length < 4) {
    comparison.push(productId);
    writeComparison(comparison);
    return true;
  }
  return false;
}

function removeFromComparison(productId) {
  const comparison = readComparison();
  const idx = comparison.indexOf(productId);
  if (idx > -1) {
    comparison.splice(idx, 1);
    writeComparison(comparison);
    return true;
  }
  return false;
}

function toggleComparison(productId) {
  const comparison = readComparison();
  if (comparison.includes(productId)) {
    removeFromComparison(productId);
    return false;
  } else {
    if (comparison.length < 4) {
      addToComparison(productId);
      return true;
    }
    toast('Maximum 4 products can be compared');
    return false;
  }
}

function getComparisonProducts() {
  const comparison = readComparison();
  return PRODUCTS.filter(p => comparison.includes(p.id));
}

function clearComparison() {
  writeComparison([]);
}
