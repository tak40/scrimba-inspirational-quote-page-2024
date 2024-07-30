// GLOBAL VARIABLES

const quoteElement = document.querySelector(".quote")
const authorElement = document.querySelector(".author")
const speakButton = document.querySelector(".speak-btn")
const notionButton = document.querySelector(".notion-button")

// CALLING FUNCTIONS

// Call the function to fetch the quote of the day
quoteOfTheDay()
// Call the function to fetch a random background image
fetchBackgroundImage()

// EVENT LISTENERS

// Add event listener to the speak button
speakButton.addEventListener("click", speakQuote)

// Add event listener to Notion button to copy URL to clipboard
notionButton.addEventListener("click", function (event) {
    event.preventDefault()
    const url =
        "https://tak40.github.io/scrimba-inspirational-quote-page-2024/quote-widget.html"
    copyToClipboard(url)
})

// FUNCTIONS

// Function to fetch the quote of the day
async function quoteOfTheDay() {
    const url = ""
    // "https://quotes-inspirational-quotes-motivational-quotes.p.rapidapi.com/quote?token=ipworld.info"
    const options = {
        method: "GET",
        headers: {
            "X-RapidAPI-Key":
                "94660ae66fmshacd6a2a7db96c71p1102e4jsn69f7f580edfd",
            "X-RapidAPI-Host":
                "quotes-inspirational-quotes-motivational-quotes.p.rapidapi.com",
        },
    }

    try {
        const response = await fetch(url, options)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        console.log(data)

        quoteElement.textContent = data.text
        authorElement.textContent = data.author
            ? `- ${data.author}`
            : `- Unknown`

        // Update sharing buttons with the fetched quote and author
        updateSharingButtons(data.text, data.author)
    } catch (error) {
        console.error("Error fetching the quote:", error)
    }
}

// Function to fetch a random background image
async function fetchBackgroundImage() {
    const url = ""
    // "https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature"

    try {
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        if (window.innerWidth > 600) {
            document.body.style.backgroundImage = `url(${data.urls.regular})`
            document.getElementById(
                "background-author"
            ).textContent = `Background Image By: ${data.user.name}`
        }
    } catch (error) {
        // Use a default background image/author
        if (window.innerWidth > 600) {
            document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1560008511-11c63416e52d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTEwMjl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjI4NDIxMTc&ixlib=rb-1.2.1&q=80&w=1080)`
            document.getElementById(
                "background-author"
            ).textContent = `Background Image By: Dodi Achmad`
        }
    }
}

// Function to update the sharing buttons with the quote and author
function updateSharingButtons(quote, author) {
    const authorText = author ? ` - ${author}` : "Unknown"
    const encodedQuote = encodeURIComponent(`"${quote}" - ${authorText}`)
    const pageUrl = encodeURIComponent(window.location.href)

    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}&quote=${encodedQuote}`
    const twitterUrl = `https://twitter.com/intent/tweet?url=${pageUrl}&text=${encodedQuote}`
    const linkedinUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${pageUrl}&title=Inspirational Quote&summary=${encodedQuote}&source=${pageUrl}`

    document.querySelector(".share-button.facebook").href = facebookUrl
    document.querySelector(".share-button.twitter").href = twitterUrl
    document.querySelector(".share-button.linkedin").href = linkedinUrl
}

// Function to speak the quote using the Web Speech API
function speakQuote() {
    const quote = quoteElement.textContent
    const author = authorElement.textContent
    const utterance = new SpeechSynthesisUtterance(`${quote} ${author}`)
    window.speechSynthesis.speak(utterance)
}

// Function to copy URL to clipboard
function copyToClipboard(text) {
    navigator.clipboard
        .writeText(text)
        .then(() => {
            showTooltip("Copied!")
        })
        .catch((err) => {
            console.error("Could not copy text: ", err)
        })
}

// Function to show tooltip
function showTooltip(message) {
    notionButton.setAttribute("data-tooltip", message)
    notionButton.classList.add("show-tooltip")

    setTimeout(() => {
        notionButton.classList.remove("show-tooltip")
        notionButton.setAttribute("data-tooltip", "Embed in Notion")
    }, 1000)
}
