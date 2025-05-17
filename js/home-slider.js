document.addEventListener("DOMContentLoaded", () => {
  const sliderWrapper = document.getElementById("sliderWrapper")
  const sliderDots = document.getElementById("sliderDots")
  const prevBtn = document.getElementById("prevBtn")
  const nextBtn = document.getElementById("nextBtn")

  if (!sliderWrapper || !sliderDots || !prevBtn || !nextBtn) return

  let currentSlide = 0
  let slideInterval

  // Fetch featured games data
  fetch("./games-data.json")
    .then((response) => response.json())
    .then((data) => {
      // Get 4 random games for the slider
      const featuredGames = data.games.sort(() => 0.5 - Math.random()).slice(0, 4)

      // Create slides
      featuredGames.forEach((game, index) => {
        const slide = document.createElement("div")
        slide.className = "slider-slide"

        slide.innerHTML = `
          <img src="${game.image}" alt="${game.title}" class="slider-image">
          <div class="slider-content">
            <h3 class="slider-title">${game.title}</h3>
            <div class="slider-price">$${game.price.toFixed(2)}</div>
            <a href="./game-details.html?id=${game.id}" class="btn btn-gold">View Details</a>
          </div>
        `

        sliderWrapper.appendChild(slide)

        // Create dot
        const dot = document.createElement("div")
        dot.className = "slider-dot"
        if (index === 0) dot.classList.add("active")

        dot.addEventListener("click", () => {
          goToSlide(index)
          resetInterval()
        })

        sliderDots.appendChild(dot)
      })

      // Set initial slide
      updateSlider()

      // Start auto-sliding
      startInterval()
    })
    .catch((error) => console.error("Error loading slider data:", error))

  // Navigation buttons
  prevBtn.addEventListener("click", () => {
    goToPrevSlide()
    resetInterval()
  })

  nextBtn.addEventListener("click", () => {
    goToNextSlide()
    resetInterval()
  })

  function goToSlide(slideIndex) {
    const slides = document.querySelectorAll(".slider-slide")
    const dots = document.querySelectorAll(".slider-dot")

    if (slides.length === 0) return

    currentSlide = slideIndex

    if (currentSlide < 0) {
      currentSlide = slides.length - 1
    } else if (currentSlide >= slides.length) {
      currentSlide = 0
    }

    updateSlider()
  }

  function goToNextSlide() {
    goToSlide(currentSlide + 1)
  }

  function goToPrevSlide() {
    goToSlide(currentSlide - 1)
  }

  function updateSlider() {
    const slides = document.querySelectorAll(".slider-slide")
    const dots = document.querySelectorAll(".slider-dot")

    if (slides.length === 0) return

    // Update slider position
    sliderWrapper.style.transform = `translateX(-${currentSlide * 100}%)`

    // Update dots
    dots.forEach((dot, index) => {
      if (index === currentSlide) {
        dot.classList.add("active")
      } else {
        dot.classList.remove("active")
      }
    })
  }

  function startInterval() {
    slideInterval = setInterval(() => {
      goToNextSlide()
    }, 5000)
  }

  function resetInterval() {
    clearInterval(slideInterval)
    startInterval()
  }
})
