document.addEventListener("DOMContentLoaded", () => {
  const sliderContainer = document.getElementById("slider-container")
  const sliderDots = document.getElementById("slider-dots")
  const prevButton = document.getElementById("prev-slide")
  const nextButton = document.getElementById("next-slide")

  if (!sliderContainer) return

  // Bestseller games (top 4 from our catalog)
  const bestsellerGames = [
    {
      id: 1,
      title: "Doom Eternal",
      description: "Rip and tear through hordes of demons in this fast-paced FPS sequel.",
      image: "./img/games/1.jpg",
      price: 39.99,
    },
    {
      id: 6,
      title: "Total War: WARHAMMER III",
      description: "Command mighty armies in epic fantasy battles across the Warhammer world.",
      image: "./img/games/6.jpg",
      price: 59.99,
    },
    {
      id: 4,
      title: "Cities Skylines 2",
      description: "Build and manage your dream city with unprecedented detail and realism.",
      image: "./img/games/4.jpg",
      price: 49.99,
    },
    {
      id: 9,
      title: "Devil May Cry 5",
      description: "Stylish demon-slaying action with three unique playable characters.",
      image: "./img/games/9.jpg",
      price: 29.99,
    },
  ]

  let currentSlide = 0

  // Create slider items
  bestsellerGames.forEach((game, index) => {
    const sliderItem = document.createElement("div")
    sliderItem.className = "slider-item"
    sliderItem.innerHTML = `
      <img src="${game.image}" alt="${game.title}" class="slider-image">
      <div class="slider-content">
        <h3 class="slider-title">${game.title}</h3>
        <p class="slider-description">${game.description}</p>
        <div class="slider-price">$${game.price.toFixed(2)}</div>
        <a href="./game-details.html?id=${game.id}" class="btn btn-primary">View Game</a>
      </div>
    `
    sliderContainer.appendChild(sliderItem)

    // Create dot for this slide
    const dot = document.createElement("div")
    dot.className = "slider-dot"
    if (index === 0) dot.classList.add("active")
    dot.addEventListener("click", () => {
      goToSlide(index)
    })
    sliderDots.appendChild(dot)
  })

  // Set up controls
  prevButton.addEventListener("click", () => {
    goToSlide(currentSlide - 1)
  })

  nextButton.addEventListener("click", () => {
    goToSlide(currentSlide + 1)
  })

  // Auto-advance slider
  let slideInterval = setInterval(() => {
    goToSlide(currentSlide + 1)
  }, 5000)

  // Pause auto-advance on hover
  const sliderElement = sliderContainer.parentElement
  sliderElement.addEventListener("mouseenter", () => {
    clearInterval(slideInterval)
  })

  sliderElement.addEventListener("mouseleave", () => {
    slideInterval = setInterval(() => {
      goToSlide(currentSlide + 1)
    }, 5000)
  })

  function goToSlide(index) {
    // Handle wrapping
    if (index < 0) {
      index = bestsellerGames.length - 1
    } else if (index >= bestsellerGames.length) {
      index = 0
    }

    currentSlide = index

    // Update slider position
    sliderContainer.style.transform = `translateX(-${currentSlide * 100}%)`

    // Update dots
    const dots = sliderDots.querySelectorAll(".slider-dot")
    dots.forEach((dot, i) => {
      if (i === currentSlide) {
        dot.classList.add("active")
      } else {
        dot.classList.remove("active")
      }
    })
  }
})
