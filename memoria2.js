document.addEventListener('DOMContentLoaded', () => {
    const memoryCards = document.querySelectorAll('.memory-card');
    const checkButton = document.getElementById('check-button');
    const backButton = document.getElementById('back-button');
    let hasFlippedCard = false;
    let lockBoard = false;
    let firstCard, secondCard;
    let pairsFound = 0;

    (function shuffle() {
        memoryCards.forEach(card => {
            let randomPos = Math.floor(Math.random() * 8);
            card.style.order = randomPos;
        });
    })();

    memoryCards.forEach(card => card.addEventListener('click', flipCard));
    checkButton.addEventListener('click', checkForMatch);
    backButton.addEventListener('click', () => {
        window.location.href = 'memoria.html';
    });

    function flipCard() {
        if (lockBoard) return;
        if (this === firstCard) return;

        this.classList.add('flip');

        if (!hasFlippedCard) {
            hasFlippedCard = true;
            firstCard = this;
            return;
        }

        secondCard = this;
        lockBoard = true;
        checkForMatch();
    }

    function checkForMatch() {
        let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

        isMatch ? disableCards() : unflipCards();
    }

    function disableCards() {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
        resetBoard();
        pairsFound++;

        if (pairsFound === 4) {
            localStorage.setItem('pairsFound', pairsFound);
            window.location.href = 'has_ganado.html';
        }
    }

    function unflipCards() {
        setTimeout(() => {
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');
            resetBoard();
        }, 1500);
    }

    function resetBoard() {
        [hasFlippedCard, lockBoard] = [false, false];
        [firstCard, secondCard] = [null, null];
    }
});
