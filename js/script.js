const quote = document.querySelector(".quote")
const author = document.querySelector(".author")

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

        quote.textContent = data.text
        author.textContent = `- ${data.author}`
    } catch (error) {
        console.error("Error fetching the quote:", error)
    }
}

quoteOfTheDay()
