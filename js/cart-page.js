document.addEventListener("DOMContentLoaded", () => {
  renderCartItems()
})

function renderCartItems() {
  const cartList = document.getElementById("cart-list")
  const emptyCartMessage = document.getElementById("empty-cart-message")
  const cartSummary = document.getElementById("cart-summary")

  if (!cartList) return

  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || []

  // Clear cart list
  cartList.innerHTML = ""

  if (cartItems.length === 0) {
    // Show empty cart message
    if (emptyCartMessage) emptyCartMessage.style.display = "block"
    if (cartSummary) cartSummary.style.display = "none"
    return
  }

  // Hide empty cart message
  if (emptyCartMessage) emptyCartMessage.style.display = "none"
  if (cartSummary) cartSummary.style.display = "block"

  // Calculate totals
  let subtotal = 0
  let itemCount = 0

  // Render cart items
  cartItems.forEach((item) => {
    const itemTotal = item.price * item.quantity
    subtotal += itemTotal
    itemCount += item.quantity

    const cartItem = document.createElement("li")
    cartItem.className = "cart-item"

    cartItem.innerHTML = `
      <img src="${item.image}" alt="${item.title}" class="cart-img">
      <div class="cart-wrapper">
        <h3 class="cart-title">${item.title}</h3>
        <div class="cart-price">$${item.price.toFixed(2)}</div>
        <div class="cart-controls">
          <button class="decrease-btn" data-id="${item.id}">-</button>
          <span class="quantity">${item.quantity}</span>
          <button class="increase-btn" data-id="${item.id}">+</button>
          <button class="remove-btn" data-id="${item.id}">Remove</button>
        </div>
      </div>
    `

    cartList.appendChild(cartItem)

    // Add event listeners
    const decreaseBtn = cartItem.querySelector(".decrease-btn")
    const increaseBtn = cartItem.querySelector(".increase-btn")
    const removeBtn = cartItem.querySelector(".remove-btn")

    decreaseBtn.addEventListener("click", () => {
      updateQuantity(item.id, -1)
      renderCartItems()
    })

    increaseBtn.addEventListener("click", () => {
      updateQuantity(item.id, 1)
      renderCartItems()
    })

    removeBtn.addEventListener("click", () => {
      removeFromCart(item.id)
      renderCartItems()
    })
  })

  // Update summary
  const itemCountEl = document.getElementById("item-count")
  const subtotalEl = document.getElementById("summary-subtotal")
  const discountEl = document.getElementById("summary-discount")
  const totalEl = document.getElementById("summary-total")

  if (itemCountEl) itemCountEl.textContent = itemCount
  if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`
  if (discountEl) discountEl.textContent = "$0.00"
  if (totalEl) totalEl.textContent = `$${subtotal.toFixed(2)}`
}

function removeFromCart(id) {
  if (window.removeFromCart) {
    window.removeFromCart(id)
  }
}

function updateQuantity(id, delta) {
  if (window.updateQuantity) {
    window.updateQuantity(id, delta)
  }
}
