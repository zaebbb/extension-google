let inputFullLink = document.createElement("input")
let inputShortLink = document.createElement("input")

// settings input elements
inputFullLink.className = "form__input"
inputFullLink.placeholder = "Введите ссылку"
inputShortLink.className = "form__input"
inputShortLink.placeholder = "Укороченная ссылка"
inputShortLink.readOnly = true

let buttons = document.querySelectorAll(".form__button")

document.querySelectorAll(".form__group").forEach((group, i) => {
    let btn = group.querySelector(".form__button")
    i == 0 ? group.insertBefore(inputFullLink, btn) : group.insertBefore(inputShortLink, btn)
})

buttons.forEach(button => {
    button.addEventListener("click", e => {
        e.preventDefault()

        if(button.classList.contains("btn__full") && inputFullLink.value !== "" && inputFullLink.value.includes("http")){
            short_link_fetch()
            inputFullLink.value = ""
        } else if(button.classList.contains("btn__short") && inputShortLink.value !== ""){
            copy_link()
        }
    })
})

async function short_link_fetch(){
    let data = new FormData(document.querySelector(".app__form"))
    data.append("url", inputFullLink.value)

    let result = await fetch("https://goo.su/api/links/create", {
        headers: {
            "x-goo-api-token": "a6L5SJfhhU5PT4ucPbK6A7Q9u2Mbi2JlMshry02kbO9TVPIoNPlieuHSPknF",
        },
        method: "POST",
        body: data,
    }).then(res => {
        try {
            return res.json()
        } catch (err) {
            return err
        }
    })

    if(result && result.successful){
        inputShortLink.value = result.short_url
    }
}

function copy_link(){
    inputShortLink.select()
    document.execCommand('copy')
    
    let link = inputShortLink.value

    inputShortLink.value += " (Скопировано)"

    setTimeout(() => {
        inputShortLink.value = link
    }, 1500)
}