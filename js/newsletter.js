document.addEventListener("DOMContentLoaded", () => {
  const newsletterForm = document.getElementById("newsletterForm")
  const newsletterModal = document.getElementById("newsletterModal")
  const modalClose = document.querySelector(".newsletter-modal-close")

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

          // Force a reflow before adding the show class for the animation to work
          void newsletterModal.offsetWidth

          newsletterModal.classList.add("show")
          document.body.style.overflow = "hidden" // Prevent scrolling
        }
      }
    })
  }

  // Close modal when clicking the X
  if (modalClose) {
    modalClose.addEventListener("click", () => {
      closeNewsletterModal()
    })
  }

  // Close modal when clicking outside
  if (newsletterModal) {
    newsletterModal.addEventListener("click", (event) => {
      if (event.target === newsletterModal) {
        closeNewsletterModal()
      }
    })
  }

  // Close modal with Escape key
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && newsletterModal && newsletterModal.classList.contains("show")) {
      closeNewsletterModal()
    }
  })

  function closeNewsletterModal() {
    if (newsletterModal) {
      newsletterModal.classList.remove("show")

      // Wait for the animation to complete before hiding the modal
      setTimeout(() => {
        newsletterModal.style.display = "none"
        document.body.style.overflow = "" // Restore scrolling
      }, 300)
    }
  }
})
