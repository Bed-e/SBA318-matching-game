document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".card");
  let score = 0;
  let flippedCards = [];

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      if (card.classList.contains("hidden")) {
        card.classList.remove("hidden");
        flippedCards.push(card);

        if (flippedCards.length === 2) {
          const [firstCard, secondCard] = flippedCards;
          const firstCardValue = `${firstCard.dataset.value}${firstCard.dataset.suit}`;
          const secondCardValue = `${secondCard.dataset.value}${secondCard.dataset.suit}`;

          if (firstCardValue === secondCardValue) {
            score++;
            document.querySelector("h2").innerText = `Score: ${score}`;
            flippedCards = [];
          } else {
            setTimeout(() => {
              firstCard.classList.add("hidden");
              secondCard.classList.add("hidden");
              flippedCards = [];
            }, 1000);
          }
        }
      }
    });
  });
});
