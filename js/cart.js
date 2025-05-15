export function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existingProduct = cart.find(
    (item) => item.id === product.id && item.type === product.type
  );

  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      title: product.title,
      photo: product.photo || null,
      price: product.price,
      quantity: 1,
      type: product.type,
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  showNotification(`${product.title} has been added to your cart.`);
}

export function renderCartItems() {
  const cartListProducts = document.getElementById("cart-list-products");
  const emptyCartMessage = document.getElementById("empty-cart-message");
  const placeOrderBtn = document.getElementById("openModalBtn");
  const summaryBlock = document.getElementById("cart-summary"); 

  // Summary Elements
  const itemCountEl = document.getElementById("item-count");
  const subtotalEl = document.getElementById("summary-subtotal");
  const subtotalDupEl = document.getElementById("summary-subtotal-dup");
  const totalEl = document.getElementById("summary-total");

  if (!cartListProducts) return;

  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cartListProducts.innerHTML = "";

  if (cart.length === 0) {
    if (emptyCartMessage) emptyCartMessage.style.display = "block";
    if (placeOrderBtn) placeOrderBtn.style.display = "none";
    if (summaryBlock) summaryBlock.style.display = "none"; 
  } else {
    if (emptyCartMessage) emptyCartMessage.style.display = "none";
    if (placeOrderBtn) placeOrderBtn.style.display = "inline-block";
    if (summaryBlock) summaryBlock.style.display = "flex"; 
  }

  let totalItems = 0;
  let subtotal = 0;

  cart.forEach((item, index) => {
    totalItems += item.quantity;
    subtotal += item.price * item.quantity;

    const photoMarkup = item.photo
      ? `<img src="${item.photo}" alt="${item.title}" class="cart-img">`
      : "";

    const li = document.createElement("li");
    li.classList.add("cart-item");
    li.innerHTML = `
        ${photoMarkup}
        <div class="cart-wrapper">
          <h3 class="cart-title">${item.title}</h3>
          <div class="cart-controls">
            <button class="decrease-btn" data-index="${index}">−</button>
            <span class="quantity">${item.quantity}</span>
            <button class="increase-btn" data-index="${index}">+</button>
          </div>
          <p>Price: ${(item.price * item.quantity).toFixed(2)} $</p>
          <button class="remove-btn" data-index="${index}">Remove</button>
        </div>
      `;

    cartListProducts.appendChild(li);
  });

  if (itemCountEl) itemCountEl.textContent = totalItems;
  if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
  if (subtotalDupEl) subtotalDupEl.textContent = `$${subtotal.toFixed(2)}`;
  if (totalEl) totalEl.textContent = `$${subtotal.toFixed(2)}`;

  document.querySelectorAll(".increase-btn").forEach((btn) =>
    btn.addEventListener("click", (e) => {
      const index = +e.target.dataset.index;
      changeQuantity(index, 1);
    })
  );

  document.querySelectorAll(".decrease-btn").forEach((btn) =>
    btn.addEventListener("click", (e) => {
      const index = +e.target.dataset.index;
      changeQuantity(index, -1);
    })
  );

  document.querySelectorAll(".remove-btn").forEach((btn) =>
    btn.addEventListener("click", (e) => {
      const index = +e.target.dataset.index;
      removeItem(index);
    })
  );
}

function changeQuantity(index, delta) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (!cart[index]) return;

  cart[index].quantity += delta;

  if (cart[index].quantity < 1) {
    cart.splice(index, 1);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  renderCartItems();
  updateCartCount();
}

function removeItem(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (!cart[index]) return;

  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCartItems();
  updateCartCount();
}

export function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartCountEl = document.getElementById("cart-count");
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (cartCountEl) {
    cartCountEl.textContent = totalQuantity > 0 ? totalQuantity : "";
  }
}

function showNotification(message) {
  const notification = document.createElement("div");
  notification.className = "cart-notification";
  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.classList.add("show");
  }, 10);

  setTimeout(() => {
    notification.classList.remove("show");
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

document.addEventListener("DOMContentLoaded", () => {
  renderCartItems();
  updateCartCount();
});
