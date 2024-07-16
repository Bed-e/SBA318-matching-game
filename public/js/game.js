document.addEventListener("DOMContentLoaded", () => {
  let score = 0;
  let firstCard = null;
  let secondCard = null;

  const cards = document.querySelectorAll(".card");

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      if (card.classList.contains("hidden")) {
        card.classList.remove("hidden");
        if (!firstCard) {
          firstCard = card;
        } else {
          secondCard = card;
          setTimeout(() => {
            if (firstCard.textContent === secondCard.textContent) {
              score++;
              firstCard = null;
              secondCard = null;
              document.querySelector("h2").textContent = `Score: ${score}`;
            } else {
              firstCard.classList.add("hidden");
              secondCard.classList.add("hidden");
              firstCard = null;
              secondCard = null;
            }
          }, 1000);
        }
      }
    });
  });
});
