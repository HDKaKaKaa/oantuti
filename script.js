document.addEventListener("DOMContentLoaded", () => {
    const choices = document.querySelectorAll(".choice");
    const gameSection = document.querySelector(".triangle-container");
    const userChoiceDisplay = document.getElementById("user-choice");
    const computerChoiceDisplay = document.getElementById("computer-choice");
    const resultDisplay = document.getElementById("winner");
    const resultSection = document.getElementById("result");
    const scoreDisplay = document.getElementById("score");
    const continueBtn = document.getElementById("continue");
    const rulesBtn = document.getElementById("rules-btn");
    const rulesModal = document.getElementById("rules-modal");
    const closeRulesBtn = document.getElementById("close-rules");

    let score = localStorage.getItem("score") ? parseInt(localStorage.getItem("score")) : 0;
    scoreDisplay.textContent = score;

    const choicesArray = ["rock", "paper", "scissors"];

    choices.forEach(choice => {
        choice.addEventListener("click", () => {
            const userChoice = choice.id;
            const computerChoice = choicesArray[Math.floor(Math.random() * 3)];

            gameSection.style.display = "none";
            resultSection.style.display = "block";

            userChoiceDisplay.className = "choice-display";
            computerChoiceDisplay.className = "choice-display";

            userChoiceDisplay.innerHTML = `<img src="images/icon-${userChoice}.svg" alt="${userChoice}">`;
            computerChoiceDisplay.innerHTML = `<img src="images/icon-${computerChoice}.svg" alt="${computerChoice}">`;

            userChoiceDisplay.classList.add("selected-choice");
            computerChoiceDisplay.classList.add("selected-choice");

            userChoiceDisplay.classList.add(userChoice);
            computerChoiceDisplay.classList.add(computerChoice);

            const result = getResult(userChoice, computerChoice);
            resultDisplay.textContent = result;

            if (result === "YOU WIN") {
                score++;
            } else if (result === "YOU LOSE") {
                score = 0;
            }

            localStorage.setItem("score", score);
            scoreDisplay.textContent = score;
        });
    });

    continueBtn.addEventListener("click", () => {
        gameSection.style.display = "flex";
        resultSection.style.display = "none";
    });

    function getResult(user, computer) {
        if (user === computer) return "IT'S A DRAW";
        if ((user === "rock" && computer === "scissors") ||
            (user === "paper" && computer === "rock") ||
            (user === "scissors" && computer === "paper")) {
            return "YOU WIN";
        }
        return "YOU LOSE";
    }

    rulesBtn.addEventListener("click", () => {
        rulesModal.style.display = "flex";
    });

    closeRulesBtn.addEventListener("click", () => {
        rulesModal.style.display = "none";
    });

    window.addEventListener("click", (event) => {
        if (event.target === rulesModal) {
            rulesModal.style.display = "none";
        }
    });
});
