document.addEventListener("DOMContentLoaded", () => {
  const slider = document.getElementById("main-slider")
  if (!slider) return

  const slides = slider.querySelectorAll(".slide")
  const prevButton = document.getElementById("prev-slide")
  const nextButton = document.getElementById("next-slide")
  const dotsContainer = document.getElementById("slider-dots")

  let currentSlide = 0
  let slideInterval
  const intervalTime = 5000

  // Create dots
  slides.forEach((_, index) => {
    const dot = document.createElement("div")
    dot.classList.add("slider-dot")
    if (index === 0) dot.classList.add("active")
    dot.addEventListener("click", () => {
      goToSlide(index)
      resetInterval()
    })
    dotsContainer.appendChild(dot)
  })

  const dots = dotsContainer.querySelectorAll(".slider-dot")

  // Initialize slider
  function showSlide(index) {
    slides.forEach((slide) => slide.classList.remove("active"))
    dots.forEach((dot) => dot.classList.remove("active"))

    slides[index].classList.add("active")
    dots[index].classList.add("active")
    currentSlide = index
  }

  function goToSlide(index) {
    if (index < 0) {
      index = slides.length - 1
    } else if (index >= slides.length) {
      index = 0
    }

    showSlide(index)
  }

  function nextSlide() {
    goToSlide(currentSlide + 1)
  }

  function prevSlide() {
    goToSlide(currentSlide - 1)
  }

  function resetInterval() {
    clearInterval(slideInterval)
    slideInterval = setInterval(nextSlide, intervalTime)
  }

  // Event listeners
  if (prevButton) {
    prevButton.addEventListener("click", () => {
      prevSlide()
      resetInterval()
    })
  }

  if (nextButton) {
    nextButton.addEventListener("click", () => {
      nextSlide()
      resetInterval()
    })
  }

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      prevSlide()
      resetInterval()
    } else if (e.key === "ArrowRight") {
      nextSlide()
      resetInterval()
    }
  })

  // Start automatic slideshow
  slideInterval = setInterval(nextSlide, intervalTime)

  // Pause slideshow on hover
  slider.addEventListener("mouseenter", () => {
    clearInterval(slideInterval)
  })

  slider.addEventListener("mouseleave", () => {
    resetInterval()
  })
})
