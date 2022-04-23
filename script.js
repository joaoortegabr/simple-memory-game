document.addEventListener('DOMContentLoaded', () => {

    const cardArray = [
        {
            name: 'lion',
            img: './images/lion.png'
        },
        {
            name: 'lion',
            img: './images/lion.png'
        },
        {
            name: 'bear',
            img: './images/bear.png'
        },
        {
            name: 'bear',
            img: './images/bear.png'
        },
        {
            name: 'giraffe',
            img: './images/giraffe.png'
        },
        {
            name: 'giraffe',
            img: './images/giraffe.png'
        },
        {
            name: 'elephant',
            img: './images/elephant.png'
        },
        {
            name: 'elephant',
            img: './images/elephant.png'
        },
        {
            name: 'penguin',
            img: './images/penguin.png'
        },
        {
            name: 'penguin',
            img: './images/penguin.png'
        },
        {
            name: 'cat',
            img: './images/cat.png'
        },
        {
            name: 'cat',
            img: './images/cat.png'
        },
    ]

    cardArray.sort(() => 0.5 - Math.random());

    const btn = document.getElementById('restart');
    const grid = document.querySelector('.grid');
    const resultDisplay = document.getElementById('result');
    const flippedCards = document.getElementById('flipped-cards')
    const showBestResult = localStorage.getItem('bestResult');
    let tries = 0;
    let cardsChosen = [];
    let cardsChosenId = [];
    let cardsWon = [];


    function createBoard() {
        for (let i = 0; i < cardArray.length; i++) {
            const card = document.createElement('img');
            card.setAttribute('src', './images/card.png');
            card.style.width = 100 + 'px';
            card.style.height = 'auto';
            card.setAttribute('data-id', i);
            card.addEventListener('click', flipcard);
            grid.appendChild(card);
        }
    }


    function checkForMatch() {
        const cards = document.querySelectorAll('img');
        const optionOneId = cardsChosenId[0];
        const optionTwoId = cardsChosenId[1];

        if (optionOneId == optionTwoId) {
            alert('Please pick two different cards.');
            cards[optionOneId].setAttribute('src', './images/card.png');
            cards[optionTwoId].setAttribute('src', './images/card.png');
        } else if (cardsChosen[0] == cardsChosen[1]) {
            alert('You found a match!')
            cards[optionOneId].setAttribute('src', 'images/blank.png');
            cards[optionTwoId].setAttribute('src', 'images/blank.png');
            cards[optionOneId].removeEventListener('click', flipcard);
            cards[optionTwoId].removeEventListener('click', flipcard);
            cardsWon.push(cardsChosen)
        } else {
            alert('Sorry, try again.');
            cards[optionOneId].setAttribute('src', './images/card.png');
            cards[optionTwoId].setAttribute('src', './images/card.png');
        }
        cardsChosen = [];
        cardsChosenId = [];
        tries += 2;
        flippedCards.innerHTML = tries;

        // resultDisplay.textContent = cardsWon.length;
        if (cardsWon.length == cardArray.length/2) {
            resultDisplay.textContent = 'You found all the cards. | '
            gameOver();
        }
    }

    function flipcard() {
        let cardId = this.getAttribute('data-id');
        cardsChosen.push(cardArray[cardId].name);
        cardsChosenId.push(cardId);
        this.setAttribute('src', cardArray[cardId].img);

        if (cardsChosen.length == 2) {
            setTimeout(checkForMatch, 100)
        }
    }

    function gameOver() {
        btn.style.display = "block";
        updateBestResult();
        displayBestResults()
    }

    function updateBestResult() {
        if (!showBestResult || tries < showBestResult) {
            localStorage.setItem('bestResult', tries);
        }

    }

    function displayBestResults() {
        document.getElementById('best-result').innerHTML = (showBestResult) ? `Best result: ${showBestResult}` : "";
    }


    createBoard();
    displayBestResults();

})