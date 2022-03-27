const score = document.querySelector('#score');
const getQuoteBtn = document.querySelector('#get-quote');
const quoteContent = document.querySelector('.quote-content');
const instructionsSection = document.querySelector('.instructions');
const characterBtns = document.querySelector('.characters-content');
const url = 'https://seinfeld-quotes.herokuapp.com/quotes';
const quoteP = document.createElement('p');
const charactersBtn = document.querySelectorAll('.character');

let scoreTracker = 0;
let isDisabled = false;

// Generate quote from Seinfeld API and input it on user display

function seinfeldGame() {
	async function generateQuote() {
		const response = await fetch(url);
		const data = await response.json();
		const quotes = data.quotes;
		// const author = data.author.toLowerCase();
		// const quoteArr = data
		const quoteArr = quotes.filter((quote) => {
			if (
				quote.author === 'Jerry' ||
				quote.author === 'George' ||
				quote.author === 'Elaine' ||
				quote.author === 'Kramer'
			) {
				return quote;
			}
		});

		const randomQuote = quoteArr[Math.floor(Math.random() * quoteArr.length)];
		console.log(randomQuote);

		quoteP.innerText = randomQuote.quote;
		quoteContent.appendChild(quoteP);

		characterBtns.addEventListener('click', (e) => {
			if (e.target.matches('button')) {
				if (e.target.innerText === randomQuote.author) {
					e.target.classList.add('correct');
					scoreTracker++;
					console.log(scoreTracker);
					disableBtns();
					console.log(e.target);
				} else if (e.target.innerText !== randomQuote.author) {
					e.target.classList.add('incorrect');
					disableBtns();
				}

				console.log(e.target);
			}
		});
	}

	// * Try using event listener for buttons instead and looping through instead of putting event listener on div parent. Try that tomorrow and see if that works better to disable the buttons and put correct and incorrect classes

	// Add event listener to get quote button and replaces the instructions with the generated quote
	getQuoteBtn.addEventListener('click', () => {
		generateQuote();
		instructionsSection.innerHTML = '';
		isDisabled = true;
		if (isDisabled === true) {
			getQuoteBtn.disabled = true;
		}
	});

	// Add event listener on the guesses so user can click on to guess
}

seinfeldGame();

function disableBtns() {
	const characterBtnArr = Array.from(charactersBtn);
	characterBtnArr.forEach((button) => {
		button.disabled = true;
	});
}

//  Remove add event listener on the get quote button until the user guesses
