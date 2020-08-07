const RANDOM_QUOTE_API_URL = "http://api.quotable.io/random";
const quote_display = document.getElementById("quoteDisplay");
const quote_input = document.getElementById("quoteInput");

function getRandomQuote() {
    return (fetch(RANDOM_QUOTE_API_URL)
        .then(response => response.json())
        .then(data => data.content));
}

async function renderNewQuote() {
    const quote = await getRandomQuote();
    quote_display.innerText = quote;
    quote_input.value = null;
}

renderNewQuote();