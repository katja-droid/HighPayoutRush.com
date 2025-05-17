// Utility function to normalize image URLs
function normalizeImageUrl(image) {
  const fallbackImage = "./img/placeholder.jpg"

  if (!image || typeof image !== "string") {
    return fallbackImage
  }

  return image
}

export function addToCart(product) {
  const cart = JSON.parse(localStorage.getItem("cart")) || []

  // Check if the product is already in the cart
  const existingItem = cart.find((item) => item.id === product.id)

  if (existingItem) {
    // Increase quantity if already in cart
    existingItem.quantity += 1
  } else {
    // Add new item to cart
    cart.push({
      id: product.id,
      title: product.title || "Unknown Game",
      image: normalizeImageUrl(product.image),
      price: Number(product.price) || 0,
      quantity: 1,
    })
  }

  // Save cart to localStorage
  localStorage.setItem("cart", JSON.stringify(cart))

  // Update cart count
  updateCartCount()

  // Show notification
  showNotification(`${product.title} added to your cart`)
}

export function renderCartItems() {
  const cartList = document.getElementById("cart-list")
  const emptyCartMessage = document.getElementById("empty-cart-message")
  const cartSummary = document.getElementById("cart-summary")

  if (!cartList) return

  const cart = JSON.parse(localStorage.getItem("cart")) || []

  // Clear cart list
  cartList.innerHTML = ""

  if (cart.length === 0) {
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
  cart.forEach((item) => {
    const itemTotal = item.price * item.quantity
    subtotal += itemTotal
    itemCount += item.quantity

    const cartItem = document.createElement("li")
    cartItem.className = "cart-item"

    cartItem.innerHTML = `
      <img src="${item.image}" alt="${item.title}" class="cart-img">
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
    `

    cartList.appendChild(cartItem)

    // Add event listeners
    const decreaseBtn = cartItem.querySelector(".decrease-btn")
    const increaseBtn = cartItem.querySelector(".increase-btn")
    const removeBtn = cartItem.querySelector(".remove-btn")

    decreaseBtn.addEventListener("click", () => {
      updateQuantity(item.id, -1)
    })

    increaseBtn.addEventListener("click", () => {
      updateQuantity(item.id, 1)
    })

    removeBtn.addEventListener("click", () => {
      removeFromCart(item.id)
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

export function removeFromCart(id) {
  const cart = JSON.parse(localStorage.getItem("cart")) || []
  const updatedCart = cart.filter((item) => item.id !== id)
  localStorage.setItem("cart", JSON.stringify(updatedCart))
  updateCartCount()
  if (document.getElementById("cart-list")) {
    renderCartItems()
  }
}

export function updateQuantity(id, delta) {
  const cart = JSON.parse(localStorage.getItem("cart")) || []
  const item = cart.find((item) => item.id === id)
  if (item) {
    item.quantity += delta
    if (item.quantity <= 0) {
      removeFromCart(id)
      return
    }
    localStorage.setItem("cart", JSON.stringify(cart))
    updateCartCount()
    if (document.getElementById("cart-list")) {
      renderCartItems()
    }
  }
}

export function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || []
  const totalCount = cart.reduce((acc, item) => acc + (item.quantity || 0), 0)
  const cartCountElement = document.getElementById("cart-count")

  if (cartCountElement) {
    cartCountElement.textContent = totalCount > 0 ? totalCount : "0"
  }
}

function showNotification(message) {
  // Remove any existing notification
  const existingNotification = document.querySelector(".cart-notification")
  if (existingNotification) {
    document.body.removeChild(existingNotification)
  }

  // Create notification element
  const notification = document.createElement("div")
  notification.className = "cart-notification"
  notification.textContent = message

  // Style the notification
  notification.style.position = "fixed"
  notification.style.top = "20px"
  notification.style.right = "20px"
  notification.style.padding = "15px 20px"
  notification.style.borderRadius = "var(--border-radius)"
  notification.style.background = "linear-gradient(135deg, var(--gold-light), var(--gold-dark))"
  notification.style.color = "var(--primary-dark)"
  notification.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.3)"
  notification.style.zIndex = "1000"
  notification.style.fontWeight = "600"
  notification.style.opacity = "0"
  notification.style.transform = "translateY(-10px)"
  notification.style.transition = "all 0.3s ease"

  // Add to DOM
  document.body.appendChild(notification)

  // Trigger animation
  setTimeout(() => {
    notification.style.opacity = "1"
    notification.style.transform = "translateY(0)"
  }, 100)

  // Remove after delay
  setTimeout(() => {
    notification.style.opacity = "0"
    notification.style.transform = "translateY(-10px)"
    setTimeout(() => {
      if (notification.parentNode) {
        document.body.removeChild(notification)
      }
    }, 300)
  }, 3000)
}

document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("cart-list")) {
    renderCartItems()
  }
  updateCartCount()
})
