import { addToCart } from "./cart.js"

document.addEventListener("DOMContentLoaded", () => {
  const featuredGamesContainer = document.getElementById("featured-games")

  if (!featuredGamesContainer) return

  fetch("./games-data.json")
    .then((response) => response.json())
    .then((data) => {
      // Get 3 random games for featured section
      const featuredGames = data.games.sort(() => 0.5 - Math.random()).slice(0, 3)

      featuredGamesContainer.innerHTML = "" // Clear container first

      featuredGames.forEach((game) => {
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

        featuredGamesContainer.appendChild(gameCard)

        // Add event listener to the Add to Cart button
        const addToCartBtn = gameCard.querySelector(".add-to-cart-btn")
        addToCartBtn.addEventListener("click", () => {
          addToCart(game)
        })
      })
    })
    .catch((error) => console.error("Error loading games:", error))
})
