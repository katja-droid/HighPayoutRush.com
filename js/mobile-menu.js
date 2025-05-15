document.addEventListener("DOMContentLoaded", () => {
    const mobileMenuToggle = document.getElementById("mobileMenuToggle")
    const mainNav = document.getElementById("mainNav")
  
    if (mobileMenuToggle && mainNav) {
      mobileMenuToggle.addEventListener("click", () => {
        mainNav.classList.toggle("active")
        mobileMenuToggle.classList.toggle("active")
  
        // Toggle aria-expanded attribute for accessibility
        const isExpanded = mainNav.classList.contains("active")
        mobileMenuToggle.setAttribute("aria-expanded", isExpanded)
  
        // Prevent body scrolling when menu is open
        document.body.style.overflow = isExpanded ? "hidden" : ""
      })
  
      // Close menu when clicking outside
      document.addEventListener("click", (event) => {
        if (
          mainNav.classList.contains("active") &&
          !mainNav.contains(event.target) &&
          !mobileMenuToggle.contains(event.target)
        ) {
          mainNav.classList.remove("active")
          mobileMenuToggle.classList.remove("active")
          mobileMenuToggle.setAttribute("aria-expanded", false)
          document.body.style.overflow = ""
        }
      })
  
      // Close menu when pressing Escape key
      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && mainNav.classList.contains("active")) {
          mainNav.classList.remove("active")
          mobileMenuToggle.classList.remove("active")
          mobileMenuToggle.setAttribute("aria-expanded", false)
          document.body.style.overflow = ""
        }
      })
    }
  })
  