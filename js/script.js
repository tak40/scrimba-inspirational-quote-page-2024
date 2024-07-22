const quote = document.querySelector(".quote")
const author = document.querySelector(".author")
const body = document.querySelector("body")
const backgroundAuthor = document.querySelector(".background-author")

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

async function fetchBackgroundImage() {
    const url =
        "https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature"

    try {
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        if (window.innerWidth > 600) {
            body.style.backgroundImage = `url(${data.urls.regular})`
            backgroundAuthor.textContent = `Image Courtesy of: ${data.user.name}`
        }
    } catch (error) {
        // Use a default background image/author
        if (window.innerWidth > 600) {
            body.style.backgroundImage = `url(https://images.unsplash.com/photo-1560008511-11c63416e52d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTEwMjl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjI4NDIxMTc&ixlib=rb-1.2.1&q=80&w=1080)`
            backgroundAuthor.textContent = `By: Dodi Achmad`
        }
    }
}

fetchBackgroundImage()
