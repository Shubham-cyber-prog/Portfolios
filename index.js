const button = document.querySelector("button");
const quotePlaceholder = document.querySelector("blockquote");
const author = document.querySelector(".author");

let data;
let isFetched = false;

const getQuote = async () => {
  try {
    const response = await fetch("https://dummyjson.com/quotes");

    if (!response.ok) {
      throw new Error("Failed to fetch quotes");
    }

    data = await response.json();
    console.log(data);

    isFetched = true;
  } catch (error) {
    console.error(error);
  }
};

getQuote();

button.addEventListener("click", () => {
  if (isFetched) {
    const randomIndex = Math.floor(Math.random() * data.quotes.length);
    quotePlaceholder.textContent = data.quotes[randomIndex].quote;
    author.textContent = data.quotes[randomIndex].author;
  } else {
    console.log("Quotes are still loading...");
  }
});