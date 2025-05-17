import { addToCart } from "./cart-manager.js"

document.addEventListener("DOMContentLoaded", () => {
  const gamesContainer = document.getElementById("games-catalog")
  const paginationContainer = document.getElementById("catalog-pagination")
  const sortSelect = document.getElementById("sort-by")
  const genreSelect = document.getElementById("genre")

  if (!gamesContainer) return

  const GAMES_PER_PAGE = 3
  let currentPage = 1
  let allGames = []
  let filteredGames = []

  // Get genre from URL if present
  const urlParams = new URLSearchParams(window.location.search)
  const genreParam = urlParams.get("genre")

  fetch("./games-data.json")
    .then((response) => response.json())
    .then((data) => {
      allGames = data.games

      // Set genre filter if provided in URL
      if (genreParam && genreSelect) {
        genreSelect.value = genreParam.toLowerCase()
      }

      filterGames()

      // Add event listeners to filters
      if (sortSelect) {
        sortSelect.addEventListener("change", () => {
          filterGames()
          currentPage = 1
          renderPagination()
        })
      }

      if (genreSelect) {
        genreSelect.addEventListener("change", () => {
          filterGames()
          currentPage = 1
          renderPagination()
        })
      }
    })
    .catch((error) => console.error("Error loading games:", error))

  function filterGames() {
    let filtered = [...allGames]

    // Filter by genre
    if (genreSelect && genreSelect.value !== "all") {
      filtered = filtered.filter((game) => game.genre.toLowerCase() === genreSelect.value.toLowerCase())
    }

    // Sort games
    if (sortSelect) {
      switch (sortSelect.value) {
        case "name-asc":
          filtered.sort((a, b) => a.title.localeCompare(b.title))
          break
        case "name-desc":
          filtered.sort((a, b) => b.title.localeCompare(a.title))
          break
        case "price-asc":
          filtered.sort((a, b) => a.price - b.price)
          break
        case "price-desc":
          filtered.sort((a, b) => b.price - a.price)
          break
      }
    }

    filteredGames = filtered
    renderGames()
    renderPagination()
  }

  function renderGames() {
    if (!gamesContainer) return

    gamesContainer.innerHTML = ""

    const startIndex = (currentPage - 1) * GAMES_PER_PAGE
    const endIndex = startIndex + GAMES_PER_PAGE
    const gamesToShow = filteredGames.slice(startIndex, endIndex)

    if (gamesToShow.length === 0) {
      gamesContainer.innerHTML = '<p class="no-games-message">No games found matching your criteria.</p>'
      return
    }

    gamesToShow.forEach((game) => {
      const gameCard = document.createElement("div")
      gameCard.className = "game-card"

      gameCard.innerHTML = `
        <div class="game-image">
          <img src="${game.image}" alt="${game.title}">
        </div>
        <div class="game-info">
          <h3 class="game-title">${game.title}</h3>
          <div class="game-price">$${game.price.toFixed(2)}</div>
          <div class="game-meta">
            <span>${game.genre}</span>
            <span>${game.publisher}</span>
          </div>
          <div class="game-actions">
            <a href="./game-details.html?id=${game.id}" class="btn btn-shop-now btn-small">View Details</a>
            <button class="btn btn-shop-now btn-small add-to-cart-btn" data-id="${game.id}">Add to Cart</button>
          </div>
        </div>
      `

      gamesContainer.appendChild(gameCard)

      // Add event listener to the Add to Cart button
      const addToCartBtn = gameCard.querySelector(".add-to-cart-btn")
      addToCartBtn.addEventListener("click", () => {
        addToCart(game)
      })
    })
  }

  function renderPagination() {
    if (!paginationContainer) return

    paginationContainer.innerHTML = ""

    const totalPages = Math.ceil(filteredGames.length / GAMES_PER_PAGE)

    // Only show pagination if there's more than one page
    if (totalPages <= 1) return

    // Create pagination buttons
    for (let i = 1; i <= totalPages; i++) {
      const button = document.createElement("button")
      button.className = "pagination-button"
      if (i === currentPage) button.classList.add("active")
      button.textContent = i

      button.addEventListener("click", () => {
        currentPage = i
        renderGames()
        renderPagination()

        // Scroll to top of games section
        const catalogSection = document.querySelector(".catalog-section")
        if (catalogSection) {
          catalogSection.scrollIntoView({ behavior: "smooth" })
        }
      })

      paginationContainer.appendChild(button)
    }
  }
})
