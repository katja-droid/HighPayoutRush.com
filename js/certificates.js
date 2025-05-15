import { addToCart } from "./cart.js";

// Функція для завантаження даних з JSON
fetch("../certificates-data.json")
  .then((response) => response.json())
  .then((data) => {
    const certificatesList = document.getElementById("certificates-list");

    data.certificates.forEach((certificate, index) => {
      const li = document.createElement("li");
      li.classList.add("certificates-item");

      const translateKeyTitle = `certificatesCard.title${index + 1}`;
      const translateKeyDesc = `certificatesCard.desc${index + 1}`;
      const translateKeyBtn = `certificatesCard.cardBtn`;

      li.innerHTML = `
        <h3 class="certificates-item-title" data-translate="${translateKeyTitle}">${i18next.t(translateKeyTitle)}</h3>
        <div class="certificates-item-thumb">
          <p class="certificates-item-price">${certificate.price} PLN</p>
          <p class="certificates-item-desk" data-translate="${translateKeyDesc}">${i18next.t(translateKeyDesc)}</p>
        </div>
        <button type="button" class="basket-btn" data-translate="${translateKeyBtn}">${i18next.t(translateKeyBtn)}
          <svg width="16" height="16">
            <use href="../img/icon/icon-defs.svg#icon-shopping-cart"></use>
          </svg>
        </button>
      `;

      certificatesList.appendChild(li);

      const addToCartBtn = li.querySelector(".basket-btn");
      addToCartBtn.addEventListener("click", () => {
        addToCart({
          id: certificate.id,
          title: certificate.title,
          price: certificate.price,
          quantity: 1,
          type: 'certificate',
        });
      });
    });

    // Викликаємо переклад для динамічно доданих елементів після рендерингу
    i18next.on('languageChanged', () => {
      document.querySelectorAll('[data-translate]').forEach((element) => {
        const key = element.getAttribute('data-translate');
        element.textContent = i18next.t(key);
      });
    });
  })
  .catch((error) => console.error("Помилка при завантаженні JSON:", error));
