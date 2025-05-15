import { addToCart } from "./cart.js"

document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search)
  const productId = urlParams.get("id")

  fetch("./products-data.json")
    .then((response) => response.json())
    .then((data) => {
      const product = data.products.find((p) => p.id == productId)

      if (product) {
        const specs = product.specs || {}
        const specsMarkup = `
          <div class="product-specs">
            <h3>Game Specifications</h3>
            <ul>
              <li><p class="spec-label">Genre:</p><p class="spec-value">${specs["Genre"] || "-"}</p></li>
              <li><p class="spec-label">Platform:</p><p class="spec-value">${specs["Platform"] || "-"}</p></li>
              <li><p class="spec-label">Release Date:</p><p class="spec-value">${specs["Release Date"] || "-"}</p></li>
              <li><p class="spec-label">Developer:</p><p class="spec-value">${specs["Developer"] || "-"}</p></li>
              <li><p class="spec-label">Publisher:</p><p class="spec-value">${specs["Publisher"] || "-"}</p></li>
              <li><p class="spec-label">OS:</p><p class="spec-value">${specs["OS"] || "-"}</p></li>
              <li><p class="spec-label">Processor:</p><p class="spec-value">${specs["Processor"] || "-"}</p></li>
              <li><p class="spec-label">Memory:</p><p class="spec-value">${specs["Memory"] || "-"}</p></li>
              <li><p class="spec-label">Graphics:</p><p class="spec-value">${specs["Graphics"] || "-"}</p></li>
              <li><p class="spec-label">Storage:</p><p class="spec-value">${specs["Storage"] || "-"}</p></li>
            </ul>
          </div>
        `

        const productMarkup = `
          <div>
            <img src="${product.photo}" alt="${product.title}" class="product-image" />
          </div>
          <div class="product-info">
            <h2 class="product-info-title">${product.title}</h2>
            <p class="product-info-price">${product.price} $</p>
            <p class="product-info-description">${product.description}</p>
            ${specsMarkup}
            <button type="button" class="basket-btn" data-id="${product.id}">
              Add to cart
              <svg width="16" height="16">
                <use href="../img/icon/icon-defs.svg#icon-shopping-cart"></use>
              </svg>
            </button>
          </div>
        `

        document.getElementById("product-container").innerHTML = productMarkup

        // Fix the product object structure for addToCart
        const addToCartBtn = document.querySelector(".basket-btn")
        addToCartBtn.addEventListener("click", () => {
          addToCart({
            id: product.id,
            title: product.title,
            photo: product.photo,
            price: Number.parseFloat(product.price),
            quantity: 1,
          })
        })
      } else {
        console.error("Product not found")
      }
    })
    .catch((error) => console.error("Error loading JSON:", error))
})
