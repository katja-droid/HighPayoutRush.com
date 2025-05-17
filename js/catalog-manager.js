document.addEventListener("DOMContentLoaded", () => {
  const gamesContainer = document.getElementById("games-catalog")
  const sortSelect = document.getElementById("sort-by")
  const genreSelect = document.getElementById("genre")
  const paginationButtons = document.querySelectorAll(".pagination-btn")

  if (!gamesContainer) return

  let allGames = []
  let currentPage = 1
  const gamesPerPage = 6

  fetch("./data/games.json")
    .then((response) => response.json())
    .then((data) => {
      allGames = data.games

      // Add event listeners to filters
      if (sortSelect) {
        sortSelect.addEventListener("change", () => {
          filterAndDisplayGames()
        })
      }

      if (genreSelect) {
        genreSelect.addEventListener("change", () => {
          filterAndDisplayGames()
        })
      }

      // Add event listeners to pagination buttons
      paginationButtons.forEach((button) => {
        button.addEventListener("click", () => {
          currentPage = Number.parseInt(button.getAttribute("data-page"))

          // Update active state
          paginationButtons.forEach((btn) => btn.classList.remove("active"))
          button.classList.add("active")

          filterAndDisplayGames()
        })
      })

      // Initial display
      filterAndDisplayGames()
    })
    .catch((error) => console.error("Error loading games:", error))

  function filterAndDisplayGames() {
    let filteredGames = [...allGames]

    // Filter by genre
    if (genreSelect && genreSelect.value !== "all") {
      filteredGames = filteredGames.filter((game) => game.genre.toLowerCase() === genreSelect.value.toLowerCase())
    }

    // Sort games
    if (sortSelect) {
      switch (sortSelect.value) {
        case "name-asc":
          filteredGames.sort((a, b) => a.title.localeCompare(b.title))
          break
        case "name-desc":
          filteredGames.sort((a, b) => b.title.localeCompare(a.title))
          break
        case "price-asc":
          filteredGames.sort((a, b) => a.price - b.price)
          break
        case "price-desc":
          filteredGames.sort((a, b) => b.price - a.price)
          break
      }
    }

    // Paginate
    const startIndex = (currentPage - 1) * gamesPerPage
    const endIndex = startIndex + gamesPerPage
    const paginatedGames = filteredGames.slice(startIndex, endIndex)

    renderGames(paginatedGames)
  }

  function renderGames(games) {
    gamesContainer.innerHTML = ""

    games.forEach((game) => {
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
            <a href="./game-details.html?id=${game.id}" class="btn btn-secondary btn-small">Details</a>
            <button class="btn btn-primary btn-small add-to-cart-btn" data-id="${game.id}">Add to Cart</button>
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

  function addToCart(game) {
    // Import the addToCart function from cart-manager.js
    if (window.addToCart) {
      window.addToCart(game)
    } else {
      console.error("Cart manager not loaded")
    }
  }
})
