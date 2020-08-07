const RANDOM_QUOTE_API_URL = "http://api.quotable.io/random";
const quote_display = document.getElementById("quoteDisplay");
const quote_input = document.getElementById("quoteInput");
const timer = document.getElementById("timer");

function getRandomQuote() {
    return (fetch(RANDOM_QUOTE_API_URL)
        .then(response => response.json())
        .then(data => data.content));
}

async function renderNewQuote() {
    const quote = await getRandomQuote();
    quote_display.innerText = '';

    quote.split('').forEach(character => {
        const characterSpan = document.createElement('span');
        characterSpan.innerText = character;
        quote_display.appendChild(characterSpan);
    });;

    quote_input.value = null;
    startTimer();   
}

quote_input.addEventListener('input', ()=> {
    const quote_arr = quote_display.querySelectorAll('span');
    const input_arr = quote_input.value.split('');

    let correct = true;

    quote_arr.forEach((characterSpan, index) => {
        const char = input_arr[index];
        if (char == null) {
            characterSpan.classList.remove('correct');
            characterSpan.classList.remove('wrong');
            correct = false;
        }
        else if (char === characterSpan.innerText) {
            characterSpan.classList.add('correct');
            characterSpan.classList.remove('wrong');
        }
        else {
            characterSpan.classList.remove('correct');
            characterSpan.classList.add('wrong');
            correct = false;
        }
    })

    if (correct) renderNewQuote();
});

let startTime;

function startTimer() {
    timer.innerText = 0;
    startTime = new Date();

    setInterval(() => {
        timer.innerText = getTimerTime();
    }, 1000);
}

function getTimerTime() {
    return Math.floor((new Date() - startTime) / 1000);
}

renderNewQuote();