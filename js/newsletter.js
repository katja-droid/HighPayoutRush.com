document.addEventListener("DOMContentLoaded", () => {
  const newsletterForm = document.getElementById("newsletter-form")
  const newsletterModal = document.getElementById("newsletter-modal")
  const modalClose = document.querySelector(".modal-close")

  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (event) => {
      event.preventDefault()

      const emailInput = newsletterForm.querySelector('input[type="email"]')
      const email = emailInput.value.trim()

      if (email) {
        // In a real application, you would send this to your server
        console.log("Newsletter subscription for:", email)

        // Clear the form
        emailInput.value = ""

        // Show the thank you modal
        if (newsletterModal) {
          newsletterModal.style.display = "block"
        }
      }
    })
  }

  // Close modal when clicking the X
  if (modalClose) {
    modalClose.addEventListener("click", () => {
      if (newsletterModal) {
        newsletterModal.style.display = "none"
      }
    })
  }

  // Close modal when clicking outside
  window.addEventListener("click", (event) => {
    if (event.target === newsletterModal) {
      newsletterModal.style.display = "none"
    }
  })

  // Close modal with Escape key
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && newsletterModal && newsletterModal.style.display === "block") {
      newsletterModal.style.display = "none"
    }
  })
})
