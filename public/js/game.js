// public/js/game.js
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".card");
  let firstCard, secondCard;
  let lockBoard = false;
  let score = 0;
  let guesses = 0;
  const maxGuesses = 10;
  const username = document.querySelector("h1").dataset.username;

  function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add("flipped");

    if (!firstCard) {
      firstCard = this;
      return;
    }

    secondCard = this;
    checkForMatch();
  }

  function checkForMatch() {
    let isMatch = firstCard.dataset.value === secondCard.dataset.value;

    if (isMatch) {
      disableCards();
      score++;
      updateScore();
    } else {
      unflipCards();
    }

    guesses++;
    updateGuesses();
    checkForEndGame();
  }

  function disableCards() {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
    resetBoard();
  }

  function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
      firstCard.classList.remove("flipped");
      secondCard.classList.remove("flipped");

      resetBoard();
    }, 1500);
  }

  function resetBoard() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
  }

  function updateScore() {
    document.querySelector("h2").textContent = `Score: ${score}`;
  }

  function updateGuesses() {
    document.querySelector("h3").textContent = `Guesses Remaining: ${
      maxGuesses - guesses
    }`;
  }

  function checkForEndGame() {
    const allCardsMatched = [...cards].every((card) =>
      card.classList.contains("flipped")
    );

    if (allCardsMatched || guesses >= maxGuesses) {
      endGame();
    }
  }

  function endGame() {
    fetch(`/game/${username}/end`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ score }),
    }).then((response) => {
      if (response.ok) {
        window.location.href = `/users/${username}/profile`;
      } else {
        alert("Error ending game");
      }
    });
  }
  function checkForMatch() {
    let isMatch = firstCard.dataset.value === secondCard.dataset.value;

    if (isMatch) {
      disableCards();
      score++;
      updateScore();
    } else {
      unflipCards();
      guesses++; // Only increment guesses if it's not a match
    }

    updateGuesses();
    checkForEndGame();
  }

  cards.forEach((card) => card.addEventListener("click", flipCard));

  // Initialize the guesses remaining display
  updateGuesses();
});
