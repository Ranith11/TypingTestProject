let typingContainerE = document.getElementById("speedTypingTest");
let timerE = document.getElementById("timer");
let secondsE = document.getElementById("secondsText");
let quoteDisplayE = document.getElementById("quoteDisplay");
let quoteInputE = document.getElementById("quoteInput");
let resultE = document.getElementById("result");
let submitBtnE = document.getElementById("submitBtn");
let resetBtnE = document.getElementById("resetBtn");
let spinnerE = document.getElementById("spinner");
let count = 0;
let randomQuote = "";

let setTimer =  setInterval(function() {
    count = count + 1;
    timerE.textContent = count;
}, 1000);



function RandomQuoteRequest() {
    let options = {
        method: "GET"

    };
    let url = "https://apis.ccbp.in/random-quote";

    fetch(url, options)
        .then(function(response) {

            return response.json();
        })
        .then(function(quote) {
            spinnerE.classList.add("d-none");
            typingContainerE.classList.remove("d-none");
            randomQuote = quote.content;
            console.log(quote.content);
            quoteDisplayE.textContent = randomQuote;
        });
}
RandomQuoteRequest();

function checkInput() {
    if (quoteInputE.value === randomQuote) {
        clearInterval(setTimer);
        resultE.style.color = "#3e4c59";
        resultE.textContent = "You typed in " + timerE.textContent + " seconds";
    } else if (quoteInputE.value === "") {
        resultE.textContent = "Please Type anything!!";
        resultE.style.color = "#f21505";

    } else {
        resultE.textContent = "You typed Incorrect!! Continue typing...";
        resultE.style.color = "#f21505";

    }

}


submitBtnE.addEventListener("click", checkInput);
resetBtnE.addEventListener("click", function() {
    quoteDisplayE.textContent = "";
    RandomQuoteRequest();
    count = 0;
    clearInterval(setTimer);
    setTimer = setInterval(function() {
        count = count + 1;
        timerE.textContent = count;
    }, 1000);
    spinnerE.classList.remove("d-none");
    typingContainerE.classList.add("d-none");

    quoteInputE.value = "";
    resultE.textContent = "";
});