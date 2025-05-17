export function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("shoppingCart")) || []
  const totalCount = cart.reduce((acc, item) => acc + (item.quantity || 0), 0)
  const cartCountElement = document.getElementById("cart-count")

  if (cartCountElement) {
    // Always show the cart count element
    cartCountElement.style.display = "flex"

    // Update the text content
    cartCountElement.textContent = totalCount > 0 ? totalCount : "0"
  }
}

document.addEventListener("DOMContentLoaded", () => {
  updateCartCount()

  // Add event listener for storage changes to update cart count across tabs
  window.addEventListener("storage", (event) => {
    if (event.key === "shoppingCart") {
      updateCartCount()
    }
  })
})
