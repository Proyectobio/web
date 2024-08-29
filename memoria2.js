document.addEventListener('DOMContentLoaded', () => {
    const memoryCards = document.querySelectorAll('.memory-card');
    const backButton = document.getElementById('back-button');
    let hasFlippedCard = false;
    let lockBoard = false;
    let firstCard, secondCard;
    let pairsFound = 0;
    let startTime;

    // Barajar las cartas al inicio
    (function shuffle() {
        memoryCards.forEach(card => {
            let randomPos = Math.floor(Math.random() * 8);
            card.style.order = randomPos;
        });
    })();

    memoryCards.forEach(card => card.addEventListener('click', flipCard));
    backButton.addEventListener('click', () => {
        window.location.href = 'memoria.html';
    });

    function flipCard() {
        if (lockBoard) return;
        if (this === firstCard) return;
        if (this.classList.contains('matched')) return;

        this.classList.add('flip');

        if (!hasFlippedCard) {
            hasFlippedCard = true;
            firstCard = this;
        } else {
            hasFlippedCard = false;
            secondCard = this;
            lockBoard = true;
            checkForMatch();
        }
    }

    function checkForMatch() {
        if (!firstCard || !secondCard) return;

        let firstCardImage = window.getComputedStyle(firstCard, '::before').backgroundImage;
        let secondCardImage = window.getComputedStyle(secondCard, '::before').backgroundImage;

        let isMatch = firstCardImage === secondCardImage;

        if (isMatch) {
            disableCards();
        } else {
            unflipCards();
        }
    }

    function disableCards() {
        if (!firstCard || !secondCard) return;

        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');

        pairsFound++;

        if (pairsFound === 4) {
            setTimeout(() => {
                let endTime = new Date();
                let elapsedTime = endTime - startTime;
                localStorage.setItem('pairsFound', pairsFound);
                localStorage.setItem('elapsedTime', elapsedTime);
                window.location.href = 'has ganado.html';
            }, 1500); // Esperar a que termine la animación
        }
        resetBoard();
    }

    function unflipCards() {
        if (!firstCard || !secondCard) return;

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

    startTime = new Date();
});
