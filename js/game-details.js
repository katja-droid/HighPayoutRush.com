import { addToCart } from "./cart.js"

document.addEventListener("DOMContentLoaded", () => {
  const gameDetailsContainer = document.getElementById("game-details-container")

  if (!gameDetailsContainer) return

  // Get game ID from URL
  const urlParams = new URLSearchParams(window.location.search)
  const gameId = urlParams.get("id")

  if (!gameId) {
    gameDetailsContainer.innerHTML = "<p>Game not found</p>"
    return
  }

  fetch("./games-data.json")
    .then((response) => response.json())
    .then((data) => {
      const game = data.games.find((g) => g.id === Number.parseInt(gameId))

      if (!game) {
        gameDetailsContainer.innerHTML = "<p>Game not found</p>"
        return
      }

      // Update page title
      document.title = `${game.title} - VictoryPathRush`

      gameDetailsContainer.innerHTML = `
        <div class="game-image-large">
          <img src="${game.image}" alt="${game.title}">
        </div>
        <div class="game-info-large">
          <h1 class="game-title-large">${game.title}</h1>
          <div class="game-price-large">$${game.price.toFixed(2)}</div>
          
          <div class="game-specs">
            <div class="game-spec">
              <span class="spec-label">Genre</span>
              <span class="spec-value">${game.genre}</span>
            </div>
            <div class="game-spec">
              <span class="spec-label">Platform</span>
              <span class="spec-value">${game.platform}</span>
            </div>
            <div class="game-spec">
              <span class="spec-label">Release Date</span>
              <span class="spec-value">${game.releaseDate}</span>
            </div>
            <div class="game-spec">
              <span class="spec-label">Publisher</span>
              <span class="spec-value">${game.publisher}</span>
            </div>
          </div>
          
          <button class="btn btn-primary add-to-cart-btn" data-id="${game.id}">Add to Cart</button>
        </div>
      `

      // Add event listener to the Add to Cart button
      const addToCartBtn = gameDetailsContainer.querySelector(".add-to-cart-btn")
      addToCartBtn.addEventListener("click", (e) => {
        e.preventDefault() // Prevent any default behavior
        addToCart(game)
      })
    })
    .catch((error) => console.error("Error loading game details:", error))
})
