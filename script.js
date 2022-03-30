const score = document.querySelector('#score');
const getQuoteBtn = document.querySelector('#get-quote');
const quoteContent = document.querySelector('.quote-content');
const instructionsSection = document.querySelector('.instructions');
const apiUrl = 'https://seinfeld-quotes.herokuapp.com/quotes';
const jerryBtn = document.querySelector('#jerry');
const georgeBtn = document.querySelector('#george');
const elaineBtn = document.querySelector('#elaine');
const kramerBtn = document.querySelector('#kramer');
const charactersBtn = document.querySelectorAll('.character');
const resetBtn = document.querySelector('#reset');

let scoreTracker = 0;
let quote = {};

// Main game
function main() {
	// get quote button event listener
	getQuoteBtn.addEventListener('click', generateQuote);
	// character guess button
	charactersBtn.forEach((character) => {
		disableCharacterBtns();
		enableQuoteBtn();
		resetBtn.style.display = 'none';
		character.addEventListener('click', submitGuess);
	});
	resetBtn.addEventListener('click', reset);
}
main();

//Get the quote using axios
async function fetchQuote() {
	const response = await axios.get(apiUrl);
	const quotes = response.data.quotes;
	// filter quotes to get quotes for the 4 characters
	const filteredQuotes = quotes.filter((quote) => {
		return (
			quote.author.toLowerCase() === 'jerry' ||
			quote.author.toLowerCase() === 'george' ||
			quote.author.toLowerCase() === 'elaine' ||
			quote.author.toLowerCase() === 'kramer'
		);
	});
	const randomQuote =
		filteredQuotes[Math.floor(Math.random() * filteredQuotes.length)];
	return { quote: randomQuote.quote, author: randomQuote.author };
}

// generateQuote function, hide instructions and display quote on the page
async function generateQuote() {
	instructionsSection.style.display = 'none';
	quote = await fetchQuote();
	console.log(quote);
	quoteContent.style.fontWeight = 400;
	quoteContent.innerHTML = quote.quote;
	quoteContent.classList.add('show');
	disableQuoteBtn();
	enableCharacterBtns();
	removeClasses();
}

// Submit guess function/ record the guessed character from click event and check if it's the same as the author of the quote
function submitGuess(e) {
	const correct = e.target.innerText === quote.author;
	// it it returns true, add classes to the button and update score
	if (correct) {
		enableQuoteBtn();
		disableCharacterBtns();

		e.target.classList.add('correct', 'opacity');
		console.log('This is the correct answer');
		scoreTracker++;
		// if it returns false, add classes to the button and put the score back to 0
	} else {
		enableQuoteBtn();
		disableCharacterBtns();
		e.target.classList.add('incorrect', 'opacity');
		console.log('This is not the correct answer');
		scoreTracker = 0;
	}
	score.innerText = scoreTracker;
	win();
}

// Check score, if user score is 5, user wins
function win() {
	if (scoreTracker === 5) {
		console.log('you win!');
		quoteContent.innerText = 'YOU WIN!';
		quoteContent.style.fontWeight = 700;
		quoteContent.classList.remove('show');
		disableQuoteBtn();
		resetBtn.style.display = 'inline-block';
		getQuoteBtn.style.display = 'none';
		resetBtn.classList.add('active');
	}
}

//  reset function to reset the game
function reset() {
	instructionsSection.style.display = 'block';
	resetBtn.style.display = 'none';
	quoteContent.innerText = '';
	enableQuoteBtn();
	disableCharacterBtns();
	removeClasses();
	getQuoteBtn.style.display = 'inline-block';
	scoreTracker = 0;
	score.innerText = scoreTracker;
}

function disableQuoteBtn() {
	getQuoteBtn.disabled = true;
	getQuoteBtn.classList.add('disabled');
	getQuoteBtn.classList.remove('active');
}

function enableCharacterBtns() {
	charactersBtn.forEach((character) => {
		character.disabled = false;
		character.classList.remove('disabled');
		character.classList.add('active');
	});
}

function enableQuoteBtn() {
	getQuoteBtn.disabled = false;
	getQuoteBtn.classList.remove('disabled');
	getQuoteBtn.classList.add('active');
}

function disableCharacterBtns() {
	charactersBtn.forEach((character) => {
		character.disabled = true;
		character.classList.remove('active');
		character.classList.add('disabled');
	});
}

function removeClasses() {
	charactersBtn.forEach((character) => {
		character.classList.remove('correct', 'incorrect', 'opacity');
	});
}
