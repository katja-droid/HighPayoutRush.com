import { addToCart } from "./cart.js"

document.addEventListener("DOMContentLoaded", () => {
  const gamesContainer = document.getElementById("games-catalog")
  const sortSelect = document.getElementById("sort-by")
  const genreSelect = document.getElementById("genre")

  if (!gamesContainer) return

  let games = []

  fetch("./games-data.json")
    .then((response) => response.json())
    .then((data) => {
      games = data.games
      renderGames(games)

      // Add event listeners to filters
      if (sortSelect) {
        sortSelect.addEventListener("change", filterGames)
      }

      if (genreSelect) {
        genreSelect.addEventListener("change", filterGames)
      }
    })
    .catch((error) => console.error("Error loading games:", error))

  function renderGames(gamesToRender) {
    gamesContainer.innerHTML = ""

    gamesToRender.forEach((game) => {
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
            <a href="./game-details.html?id=${game.id}" class="btn btn-primary btn-small">View Details</a>
            <button class="btn btn-secondary btn-small add-to-cart-btn" data-id="${game.id}">Add to Cart</button>
          </div>
        </div>
      `

      gamesContainer.appendChild(gameCard)

      // Add event listener to the Add to Cart button
      const addToCartBtn = gameCard.querySelector(".add-to-cart-btn")
      addToCartBtn.addEventListener("click", (e) => {
        e.preventDefault() // Prevent any default behavior
        addToCart(game)
      })
    })
  }

  function filterGames() {
    let filteredGames = [...games]

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

    renderGames(filteredGames)
  }
})
