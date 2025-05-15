import { addToCart } from "./cart.js"

document.addEventListener("DOMContentLoaded", () => {
  const productsPerPage = 4
  let currentPage = 1

  fetch("./products-data.json")
    .then((response) => response.json())
    .then((data) => {
      const productsData = data.products
      const productsList = document.getElementById("our-products")
      const paginationContainer = document.getElementById("pagination")

      if (!productsList) {
        return
      }

      const isHomePage = window.location.pathname.includes("index.html")
      const productsToShow = isHomePage ? productsData.slice(0, 3) : productsData

      function displayProducts(page) {
        productsList.innerHTML = ""
        const start = (page - 1) * productsPerPage
        const end = start + productsPerPage
        const productsToDisplay = productsToShow.slice(start, end)

        productsToDisplay.forEach((product) => {
          const li = document.createElement("li")
          li.classList.add("our-products-item")

          li.innerHTML = `
            <a href="../product-page.html?id=${product.id}">
            <div class="products-item-thumb">
                <h3 class="products-item-title">${product.title}</h3>
              </div>
              <img src="${product.photo}" alt="${product.title}" class="products-item-img">
            </a>
            <div class="products-item-wrapper">
              <p class="products-item-price">${product.price} $</p>
              <button type="button" class="basket-btn" data-id="${product.id}">
                Add to cart
                <svg width="16" height="16">
                  <use href="../img/icon/icon-defs.svg#icon-shopping-cart"></use>
                </svg>
              </button>
            </div>
          `
          productsList.appendChild(li)

          // Обробник для додавання в кошик
          li.querySelector(".basket-btn").addEventListener("click", () => {
            addToCart({
              id: product.id,
              title: product.title,
              photo: product.photo,
              price: product.price,
              quantity: 1,
              type: "product",
            })
          })
        })
      }

      function setupPagination() {
        if (!paginationContainer) {
          return
        }
        paginationContainer.innerHTML = ""
        const pageCount = Math.ceil(productsToShow.length / productsPerPage)

        for (let i = 1; i <= pageCount; i++) {
          const button = document.createElement("button")
          button.innerText = i
          button.classList.add("pagination-button")
          if (i === currentPage) {
            button.classList.add("active")
          }

          button.addEventListener("click", () => {
            currentPage = i
            displayProducts(currentPage)
            setupPagination()
          })

          paginationContainer.appendChild(button)
        }
      }

      if (!isHomePage) {
        displayProducts(currentPage)
        setupPagination()
      } else {
        displayProducts(1)
      }
    })
    .catch((error) => console.error("Error loading JSON:", error))
})
