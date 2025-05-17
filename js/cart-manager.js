// Make addToCart available globally
window.addToCart = addToCart

document.addEventListener("DOMContentLoaded", () => {
  updateCartCount()
})

function addToCart(product) {
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || []

  // Check if the product is already in the cart
  const existingItem = cartItems.find((item) => item.id === product.id)

  if (existingItem) {
    // Increase quantity if already in cart
    existingItem.quantity += 1
  } else {
    // Add new item to cart
    cartItems.push({
      id: product.id,
      title: product.title,
      image: product.image,
      price: product.price,
      quantity: 1,
    })
  }

  // Save cart to localStorage
  localStorage.setItem("cartItems", JSON.stringify(cartItems))

  // Update cart count
  updateCartCount()

  // Show notification
  showNotification(`${product.title} added to cart`)
}

function removeFromCart(id) {
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || []
  const updatedCart = cartItems.filter((item) => item.id !== id)
  localStorage.setItem("cartItems", JSON.stringify(updatedCart))
  updateCartCount()
}

function updateQuantity(id, delta) {
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || []
  const item = cartItems.find((item) => item.id === id)

  if (item) {
    item.quantity += delta

    if (item.quantity <= 0) {
      removeFromCart(id)
      return
    }

    localStorage.setItem("cartItems", JSON.stringify(cartItems))
    updateCartCount()
  }
}

function updateCartCount() {
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || []
  const totalCount = cartItems.reduce((acc, item) => acc + (item.quantity || 0), 0)
  const cartCountElement = document.getElementById("cart-count")

  if (cartCountElement) {
    cartCountElement.textContent = totalCount
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
  notification.style.position = "fixed"
  notification.style.top = "20px"
  notification.style.right = "20px"
  notification.style.backgroundColor = "var(--color-accent)"
  notification.style.color = "var(--color-white)"
  notification.style.padding = "15px 20px"
  notification.style.zIndex = "1000"
  notification.style.opacity = "0"
  notification.style.transform = "translateY(-10px)"
  notification.style.transition = "all 0.3s ease"
  notification.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.2)"

  document.body.appendChild(notification)

  // Show notification
  setTimeout(() => {
    notification.style.opacity = "1"
    notification.style.transform = "translateY(0)"
  }, 100)

  // Hide notification after 3 seconds
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
