const loadHTML = (url, selector, callback) => {
  fetch(url)
    .then((response) => response.text())
    .then((html) => {
      document.querySelector(selector).innerHTML = html
      if (callback) callback()
    })
    .catch((error) => console.error("Error loading HTML:", error))
}

document.addEventListener("DOMContentLoaded", () => {
  loadHTML("header.html", ".header", () => {
    // Initialize mobile menu after header is loaded
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
    }

    // Update cart count after header is loaded
    import("./cart-count.js").then((module) => {
      module.updateCartCount()
    })
  })

  loadHTML("footer.html", ".footer")
})
