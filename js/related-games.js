import { addToCart } from "./cart.js"

document.addEventListener("DOMContentLoaded", () => {
  const relatedGamesContainer = document.getElementById("related-games")

  if (!relatedGamesContainer) return

  // Get current game ID from URL
  const urlParams = new URLSearchParams(window.location.search)
  const currentGameId = Number.parseInt(urlParams.get("id"))

  fetch("./games-data.json")
    .then((response) => response.json())
    .then((data) => {
      // Get current game to find its genre
      const currentGame = data.games.find((g) => g.id === currentGameId)

      if (!currentGame) return

      // Find games with the same genre, excluding the current game
      let relatedGames = data.games
        .filter((game) => game.genre === currentGame.genre && game.id !== currentGameId)
        .slice(0, 3)

      // If we don't have enough related games by genre, add some random games
      if (relatedGames.length < 3) {
        const randomGames = data.games
          .filter((game) => game.id !== currentGameId && !relatedGames.some((g) => g.id === game.id))
          .sort(() => 0.5 - Math.random())
          .slice(0, 3 - relatedGames.length)

        relatedGames = [...relatedGames, ...randomGames]
      }

      relatedGames.forEach((game) => {
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

        relatedGamesContainer.appendChild(gameCard)

        // Add event listener to the Add to Cart button
        const addToCartBtn = gameCard.querySelector(".add-to-cart-btn")
        addToCartBtn.addEventListener("click", () => {
          addToCart(game)
        })
      })
    })
    .catch((error) => console.error("Error loading related games:", error))
})
