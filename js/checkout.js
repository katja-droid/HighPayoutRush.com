document.addEventListener("DOMContentLoaded", () => {
  const checkoutBtn = document.getElementById("checkout-btn")
  const checkoutModal = document.getElementById("checkout-modal")
  const modalClose = document.querySelector(".modal-close")
  const checkoutForm = document.getElementById("checkout-form")

  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      if (checkoutModal) {
        checkoutModal.style.display = "block"
      }
    })
  }

  if (modalClose) {
    modalClose.addEventListener("click", () => {
      if (checkoutModal) {
        checkoutModal.style.display = "none"
      }
    })
  }

  // Close modal when clicking outside
  window.addEventListener("click", (event) => {
    if (event.target === checkoutModal) {
      checkoutModal.style.display = "none"
    }
  })

  // Close modal with Escape key
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && checkoutModal && checkoutModal.style.display === "block") {
      checkoutModal.style.display = "none"
    }
  })

  if (checkoutForm) {
    checkoutForm.addEventListener("submit", (event) => {
      event.preventDefault()

      // Get form data
      const formData = new FormData(checkoutForm)
      const orderData = {
        name: formData.get("name"),
        email: formData.get("email"),
        delivery: formData.get("delivery"),
        notes: formData.get("notes"),
        orderId: "DGH" + Math.floor(Math.random() * 1000000),
      }

      // In a real application, you would send this data to your server
      console.log("Order data:", orderData)

      // Clear cart and redirect to order complete page
      localStorage.removeItem("cart")
      window.location.href = `./order-complete.html?orderId=${orderData.orderId}`
    })
  }
})
