const quoteElement = document.querySelector(".quote")
const authorElement = document.querySelector(".author")

async function quoteOfTheDay() {
    const url =
        "https://quotes-inspirational-quotes-motivational-quotes.p.rapidapi.com/quote?token=ipworld.info"
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
        authorElement.textContent = `- ${data.author}`

        // Update sharing buttons with the fetched quote and author
        updateSharingButtons(data.text, data.author)
    } catch (error) {
        console.error("Error fetching the quote:", error)
    }
}

quoteOfTheDay()

function updateSharingButtons(quote, author) {
    const encodedQuote = encodeURIComponent(`"${quote}" - ${author}`)
    const pageUrl = encodeURIComponent(window.location.href)

    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}&quote=${encodedQuote}`
    const twitterUrl = `https://twitter.com/intent/tweet?url=${pageUrl}&text=${encodedQuote}`
    const linkedinUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${pageUrl}&title=Inspirational Quote&summary=${encodedQuote}&source=${pageUrl}`

    // console.log("Facebook URL:", facebookUrl)
    // console.log("Twitter URL:", twitterUrl)
    // console.log("LinkedIn URL:", linkedinUrl)

    document.querySelector(".share-button.facebook").href = facebookUrl
    document.querySelector(".share-button.twitter").href = twitterUrl
    document.querySelector(".share-button.linkedin").href = linkedinUrl
}
