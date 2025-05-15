document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contact-form")
  const contactSuccessModal = document.getElementById("contact-success-modal")
  const modalClose = document.querySelector(".modal-close")

  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault()

      // Get form data
      const formData = new FormData(contactForm)
      const contactData = {
        name: formData.get("name"),
        email: formData.get("email"),
        subject: formData.get("subject"),
        message: formData.get("message"),
      }

      // In a real application, you would send this data to your server
      console.log("Contact form data:", contactData)

      // Clear form
      contactForm.reset()

      // Show success modal
      if (contactSuccessModal) {
        contactSuccessModal.style.display = "block"
      }
    })
  }

  if (modalClose) {
    modalClose.addEventListener("click", () => {
      if (contactSuccessModal) {
        contactSuccessModal.style.display = "none"
      }
    })
  }

  // Close modal when clicking outside
  window.addEventListener("click", (event) => {
    if (event.target === contactSuccessModal) {
      contactSuccessModal.style.display = "none"
    }
  })

  // Close modal with Escape key
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && contactSuccessModal && contactSuccessModal.style.display === "block") {
      contactSuccessModal.style.display = "none"
    }
  })
})
