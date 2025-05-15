document.addEventListener("DOMContentLoaded", () => {
  const cookieNotice = document.getElementById("cookie-notice")
  const cookieAccept = document.getElementById("cookie-accept")

  // Check if cookie consent has already been given
  if (!localStorage.getItem("cookieAccepted")) {
    cookieNotice.style.display = "block"
  }

  if (cookieAccept) {
    cookieAccept.addEventListener("click", () => {
      localStorage.setItem("cookieAccepted", "true")
      cookieNotice.style.display = "none"
    })
  }
})
