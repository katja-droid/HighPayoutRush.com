document.addEventListener("DOMContentLoaded", () => {
  const popularGamesContainer = document.getElementById("popular-games")
  if (!popularGamesContainer) return

  fetch("./data/games.json")
    .then((response) => response.json())
    .then((data) => {
      // Get 4 popular games (for this demo, we'll just take the first 4)
      const popularGames = data.games.slice(0, 3)

      popularGamesContainer.innerHTML = ""

      popularGames.forEach((game) => {
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

        popularGamesContainer.appendChild(gameCard)

        // Add event listener to the Add to Cart button
        const addToCartBtn = gameCard.querySelector(".add-to-cart-btn")
        addToCartBtn.addEventListener("click", () => {
          addToCart(game)
        })
      })
    })
    .catch((error) => console.error("Error loading popular games:", error))
})

function addToCart(game) {
  // Import the addToCart function from cart-manager.js
  if (window.addItemToCart) {
    window.addItemToCart(game)
  } else {
    console.error("Cart manager not loaded")
  }
}
