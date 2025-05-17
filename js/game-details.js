document.addEventListener("DOMContentLoaded", () => {
  const gameDetailsContainer = document.getElementById("game-details-container")
  const gameDescriptionContainer = document.getElementById("game-description-container")
  const gameFeaturesContainer = document.getElementById("game-features-container")

  if (!gameDetailsContainer) return

  // Get game ID from URL
  const urlParams = new URLSearchParams(window.location.search)
  const gameId = Number.parseInt(urlParams.get("id"))

  if (!gameId) {
    gameDetailsContainer.innerHTML = "<p>Game not found</p>"
    return
  }

  fetch("./data/games.json")
    .then((response) => response.json())
    .then((data) => {
      const game = data.games.find((g) => g.id === gameId)

      if (!game) {
        gameDetailsContainer.innerHTML = "<p>Game not found</p>"
        return
      }

      // Update page title
      document.title = `${game.title} - GameVault`

      // Render game details
      gameDetailsContainer.innerHTML = `
        <div class="game-image-large">
          <img src="${game.image}" alt="${game.title}">
        </div>
        <div class="game-info-large">
          <h1 class="game-title-large">${game.title}</h1>
          <div class="game-price-large">$${game.price.toFixed(2)}</div>
          
          <div class="game-meta-large">
            <div class="game-meta-item">
              <span class="meta-label">Genre</span>
              <span class="meta-value">${game.genre}</span>
            </div>
            
            <div class="game-meta-item">
              <span class="meta-label">Platform</span>
              <span class="meta-value">${game.platform}</span>
            </div>
            
            <div class="game-meta-item">
              <span class="meta-label">Release Date</span>
              <span class="meta-value">${game.releaseDate}</span>
            </div>
            
            <div class="game-meta-item">
              <span class="meta-label">Publisher</span>
              <span class="meta-value">${game.publisher}</span>
            </div>
          </div>
          
          <p class="game-description">${game.description}</p>
          
          <div class="game-actions">
            <button class="btn btn-primary add-to-cart-btn" data-id="${game.id}">Add to Cart</button>
            <a href="./catalog.html" class="btn btn-secondary">Back to Catalog</a>
          </div>
        </div>
      `

      // Render game description
      if (gameDescriptionContainer) {
        gameDescriptionContainer.innerHTML = `
          <h2 class="game-description-title">About ${game.title}</h2>
          <div class="game-description-text">
            <p>${game.description}</p>
            <p>Experience the ultimate gaming adventure with ${game.title}. This ${game.genre.toLowerCase()} title offers hours of engaging gameplay, stunning visuals, and an immersive storyline that will keep you on the edge of your seat.</p>
            <p>Developed by talented creators and published by ${game.publisher}, this game has received critical acclaim for its innovative mechanics and attention to detail.</p>
          </div>
        `
      }

      // Render game features
      if (gameFeaturesContainer) {
        gameFeaturesContainer.innerHTML = `
          <h2 class="game-features-title">Key Features</h2>
          <div class="game-features-list">
            <div class="game-feature-item">
              <div class="feature-icon">
                <img src="./assets/images/icons/gameplay.png" alt="Gameplay">
              </div>
              <div class="feature-content">
                <h3 class="feature-title">Immersive Gameplay</h3>
                <p class="feature-text">Engage with responsive controls and dynamic gameplay mechanics that adapt to your style.</p>
              </div>
            </div>
            
            <div class="game-feature-item">
              <div class="feature-icon">
                <img src="./assets/images/icons/graphics.png" alt="Graphics">
              </div>
              <div class="feature-content">
                <h3 class="feature-title">Stunning Visuals</h3>
                <p class="feature-text">Experience breathtaking graphics with detailed environments and realistic character models.</p>
              </div>
            </div>
            
            <div class="game-feature-item">
              <div class="feature-icon">
                <img src="./assets/images/icons/story.png" alt="Story">
              </div>
              <div class="feature-content">
                <h3 class="feature-title">Compelling Narrative</h3>
                <p class="feature-text">Dive into a rich storyline with memorable characters and unexpected plot twists.</p>
              </div>
            </div>
            
            <div class="game-feature-item">
              <div class="feature-icon">
                <img src="./assets/images/icons/multiplayer.png" alt="Multiplayer">
              </div>
              <div class="feature-content">
                <h3 class="feature-title">Multiplayer Options</h3>
                <p class="feature-text">Connect with friends and compete in various multiplayer modes for endless entertainment.</p>
              </div>
            </div>
          </div>
        `
      }

      // Add event listener to the Add to Cart button
      const addToCartBtn = gameDetailsContainer.querySelector(".add-to-cart-btn")
      addToCartBtn.addEventListener("click", () => {
        addToCart(game)
      })
    })
    .catch((error) => console.error("Error loading game details:", error))
})

function addToCart(game) {
  if (window.addToCart) {
    window.addToCart(game)
  } else {
    console.error("Cart manager not loaded")
  }
}
