document.addEventListener("DOMContentLoaded", () => {
  // Load header
  const headerElement = document.getElementById("site-header")
  if (headerElement) {
    fetch("./includes/header.html")
      .then((response) => response.text())
      .then((html) => {
        headerElement.innerHTML = html
        initializeHeader()
      })
      .catch((error) => console.error("Error loading header:", error))
  }

  // Update cart count immediately in case header is cached or loads quickly
  setTimeout(() => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || []
    const totalCount = cartItems.reduce((acc, item) => acc + (item.quantity || 0), 0)
    const cartCountElement = document.getElementById("cart-count")
    if (cartCountElement) {
      cartCountElement.textContent = totalCount
    }
  }, 100)

  // Load footer
  const footerElement = document.getElementById("site-footer")
  if (footerElement) {
    fetch("./includes/footer.html")
      .then((response) => response.text())
      .then((html) => {
        footerElement.innerHTML = html
        initializeFooter()
      })
      .catch((error) => console.error("Error loading footer:", error))
  }
})

function initializeHeader() {
  const menuToggle = document.getElementById("menu-toggle")
  const mainNav = document.getElementById("main-nav")

  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
      menuToggle.classList.toggle("active")
      mainNav.parentElement.classList.toggle("active")

      // Prevent body scrolling when menu is open
      document.body.style.overflow = mainNav.parentElement.classList.contains("active") ? "hidden" : ""
    })

    // Close menu when clicking outside
    document.addEventListener("click", (event) => {
      if (
        mainNav.parentElement.classList.contains("active") &&
        !mainNav.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {
        mainNav.parentElement.classList.remove("active")
        menuToggle.classList.remove("active")
        document.body.style.overflow = ""
      }
    })

    // Close menu when pressing Escape key
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && mainNav.parentElement.classList.contains("active")) {
        mainNav.parentElement.classList.remove("active")
        menuToggle.classList.remove("active")
        document.body.style.overflow = ""
      }
    })
  }

  // Update cart count
  if (window.updateCartCount) {
    window.updateCartCount()
  } else {
    // Fallback if updateCartCount isn't available
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || []
    const totalCount = cartItems.reduce((acc, item) => acc + (item.quantity || 0), 0)
    const cartCountElement = document.getElementById("cart-count")
    if (cartCountElement) {
      cartCountElement.textContent = totalCount
    }
  }
}

function initializeFooter() {
  const footerSubscribeForm = document.getElementById("footer-subscribe-form")

  if (footerSubscribeForm) {
    footerSubscribeForm.addEventListener("submit", (event) => {
      event.preventDefault()

      const emailInput = footerSubscribeForm.querySelector('input[type="email"]')
      const email = emailInput.value.trim()

      if (email) {
        // In a real application, you would send this to your server
        console.log("Newsletter subscription for:", email)

        // Clear the form
        emailInput.value = ""

        // Show a success message
        alert("Thank you for subscribing to our newsletter!")
      }
    })
  }
}
