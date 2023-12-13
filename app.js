  // Wrap your code in a function or another appropriate scope
(function () {
    const apps = [
        { name: 'Biocon', icon: 'biocon.jpeg' },
        { name: 'audible', icon: 'audible.jpeg' },
        { name: 'Chanel',    icon: 'chanel.jpeg' },
        { name: 'Cadillac',   icon:'cadillac.jpeg'},
        { name:'Ralph Lauren', icon:'ralph lauren.jpeg'},
        { name:'Buffer',icon:'Buffer.jpeg'},
        {  name: 'Piramal',     icon:'piramal.jpeg'},
        {  name:  'Airbnb', icon:'Airbnb.jpeg'},
        {  name: '',     icon:''},
        
       
        // Add more apps as needed
    ];
    const memoryGame = document.getElementById('memory-game');

    const allCards = [];
    let flippedCards = [];
    let lockBoard = false;

    apps.forEach((app, index) => {
        // Create two cards for each app
        for (let i = 0; i < 2; i++) {
            const cardElement = createCardElement(index, app, i);
            cardElement.addEventListener('click', () => flipCard(cardElement, app.name));
            allCards.push(cardElement);
        }
    });

    // Shuffle the array of cards
    allCards.sort(() => 0.5 - Math.random());

    // Append the shuffled cards to the game
    allCards.forEach(card => memoryGame.appendChild(card));

    function createCardElement(index, app, iteration) {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.innerHTML = `
            <div class="card-inner">
                <div class="front"></div>
                <div class="back" data-app="${app.name}">
                    ${iteration === 0 ? `<img src="${app.icon}" alt="${app.name}">` : app.name}
                </div>
            </div>
        `;
        return cardElement;
    }

    function flipCard(card, appName) {
        if (lockBoard) return;
        if (card.classList.contains('flipped')) return;

        card.classList.add('flipped');
        flippedCards.push({ card, appName });

        if (flippedCards.length === 2) {
            lockBoard = true;

            setTimeout(() => {
                const [firstCard, secondCard] = flippedCards;

                if (firstCard.appName === secondCard.appName) {
                    // Match found
                    flippedCards = [];
                    if (document.querySelectorAll('.flipped').length === allCards.length) {
                        // All matches found
                        alert('Congratulations! You matched all the apps.');
                        window.location.href = '5.html';
                    }
                } else {
                    // No match, flip cards back immediately
                    firstCard.card.classList.remove('flipped');
                    secondCard.card.classList.remove('flipped');
                    flippedCards = [];
                }

                lockBoard = false;
            }, 800); // Adjusted the delay to 500 milliseconds
        }
    }
})();
