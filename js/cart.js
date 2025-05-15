// Utility function to normalize and validate image URLs
function normalizeImageUrl(image, baseUrl = '') {
  // Fallback placeholder image (use a data URL or a guaranteed path)
  const fallbackImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
  
  // Return fallback if no image provided
  if (!image || typeof image !== 'string' || image.trim() === '') {
    return fallbackImage;
  }

  // Trim whitespace and handle relative paths
  const cleanedImage = image.trim();
  
  // Check if the image is already an absolute URL (http, https, or data URL)
  if (/^(https?:\/\/|data:)/i.test(cleanedImage)) {
    return cleanedImage;
  }

  // Resolve relative paths with base URL
  try {
    // Remove leading slashes for relative paths and combine with baseUrl
    const relativePath = cleanedImage.replace(/^\/+/, '');
    return baseUrl ? `${baseUrl.replace(/\/$/, '')}/${relativePath}` : relativePath;
  } catch (e) {
    console.warn(`Invalid image URL: ${cleanedImage}`, e);
    return fallbackImage;
  }
}

export function addToCart(product) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Check if the product is already in the cart
  const existingItem = cart.find((item) => item.id === product.id);

  if (existingItem) {
    // Increase quantity if already in cart
    existingItem.quantity += 1;
  } else {
    // Normalize the product object to ensure consistent structure
    cart.push({
      id: product.id,
      title: product.title || 'Unknown Product', // Fallback for missing title
      // Normalize image URL with a base URL (adjust baseUrl as needed)
      image: normalizeImageUrl(product.image || product.photo, window.location.origin),
      price: Number(product.price) || 0, // Fallback for invalid price
      quantity: 1,
    });
  }

  // Save cart to localStorage
  localStorage.setItem("cart", JSON.stringify(cart));

  // Update cart count
  updateCartCount();

  // Show notification
  showNotification(`${product.title || 'Item'} added to cart`);
}

export function renderCartItems() {
  const cartList = document.getElementById("cart-list");
  const emptyCartMessage = document.getElementById("empty-cart-message");
  const cartSummary = document.getElementById("cart-summary");

  if (!cartList) return;

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Clear cart list
  cartList.innerHTML = "";

  if (cart.length === 0) {
    // Show empty cart message
    if (emptyCartMessage) emptyCartMessage.style.display = "block";
    if (cartSummary) cartSummary.style.display = "none";
    return;
  }

  // Hide empty cart message
  if (emptyCartMessage) emptyCartMessage.style.display = "none";
  if (cartSummary) cartSummary.style.display = "block";

  // Calculate totals
  let subtotal = 0;
  let itemCount = 0;

  // Render cart items
  cart.forEach((item) => {
    const itemTotal = item.price * item.quantity;
    subtotal += itemTotal;
    itemCount += item.quantity;

    const cartItem = document.createElement("li");
    cartItem.className = "cart-item";

    // Use normalized image with a fallback placeholder
    const imageSrc = normalizeImageUrl(item.image, window.location.origin);

    cartItem.innerHTML = `
      <img src="${imageSrc}" alt="${item.title}" class="cart-img" onerror="this.src='${normalizeImageUrl(null)}'">
      <div class="cart-wrapper">
        <h3 class="cart-title">${item.title}</h3>
        <div class="cart-price">$${Number(item.price).toFixed(2)}</div>
        <div class="cart-controls">
          <button class="decrease-btn" data-id="${item.id}">-</button>
          <span class="quantity">${item.quantity}</span>
          <button class="increase-btn" data-id="${item.id}">+</button>
          <button class="remove-btn" data-id="${item.id}">Remove</button>
        </div>
      </div>
    `;

    cartList.appendChild(cartItem);

    // Add event listeners
    const decreaseBtn = cartItem.querySelector(".decrease-btn");
    const increaseBtn = cartItem.querySelector(".increase-btn");
    const removeBtn = cartItem.querySelector(".remove-btn");

    decreaseBtn.addEventListener("click", () => {
      updateQuantity(item.id, -1);
    });

    increaseBtn.addEventListener("click", () => {
      updateQuantity(item.id, 1);
    });

    removeBtn.addEventListener("click", () => {
      removeFromCart(item.id);
    });
  });

  // Update summary
  const itemCountEl = document.getElementById("item-count");
  const subtotalEl = document.getElementById("summary-subtotal");
  const discountEl = document.getElementById("summary-discount");
  const totalEl = document.getElementById("summary-total");

  if (itemCountEl) itemCountEl.textContent = itemCount;
  if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
  if (discountEl) discountEl.textContent = "$0.00";
  if (totalEl) totalEl.textContent = `$${subtotal.toFixed(2)}`;
}

// The rest of the functions (removeFromCart, updateQuantity, showNotification, etc.) remain unchanged
// since they don't directly affect image display. Here's a placeholder for context:

export function removeFromCart(id) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const updatedCart = cart.filter((item) => item.id !== id);
  localStorage.setItem("cart", JSON.stringify(updatedCart));
  updateCartCount();
  if (document.getElementById("cart-list")) {
    renderCartItems();
  }
}

export function updateQuantity(id, delta) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const item = cart.find((item) => item.id === id);
  if (item) {
    item.quantity += delta;
    if (item.quantity <= 0) {
      removeFromCart(id);
      return;
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    if (document.getElementById("cart-list")) {
      renderCartItems();
    }
  }
}

import { updateCartCount } from "./cart-count.js";

function showNotification(message) {
  const existingNotification = document.querySelector(".cart-notification");
  if (existingNotification) {
    document.body.removeChild(existingNotification);
  }
  const notification = document.createElement("div");
  notification.className = "cart-notification";
  notification.textContent = message;
  notification.style.position = "fixed";
  notification.style.top = "20px";
  notification.style.right = "20px";
  notification.style.backgroundColor = "var(--primary-color)";
  notification.style.color = "var(--text-color)";
  notification.style.padding = "15px 20px";
  notification.style.borderRadius = "4px";
  notification.style.zIndex = "1000";
  notification.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.3)";
  notification.style.opacity = "0";
  notification.style.transform = "translateY(-10px)";
  notification.style.transition = "all 0.3s ease";
  document.body.appendChild(notification);
  setTimeout(() => {
    notification.style.opacity = "1";
    notification.style.transform = "translateY(0)";
  }, 100);
  setTimeout(() => {
    notification.style.opacity = "0";
    notification.style.transform = "translateY(-10px)";
    setTimeout(() => {
      if (notification.parentNode) {
        document.body.removeChild(notification);
      }
    }, 300);
  }, 3000);
}

document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("cart-list")) {
    renderCartItems();
  }
  updateCartCount();
});