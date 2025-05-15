document.addEventListener("DOMContentLoaded", function () {
  const cookieBar = document.getElementById("cookieBar");
  const cookieAccept = document.getElementById("cookieAccept");

  // Перевірка, чи вже збережено згоду
  if (!localStorage.getItem("cookieAccepted")) {
    cookieBar.style.display = "flex";
  }

  cookieAccept.addEventListener("click", function () {
    localStorage.setItem("cookieAccepted", "true");
    cookieBar.style.display = "none";
  });
});
