console.log("logicc of the website")


const weatherform = document.querySelector("form")
const search = document.querySelector('input')
const messageLocation = document.querySelector("#message-1")
const messageforecast = document.querySelector("#message-2")



weatherform.addEventListener("submit", (e) => {
    e.preventDefault()

    messageLocation.textContent = "Loading..."
    messageforecast.textContent = ""
    
    fetch("/weather?address=" + search.value).then((response) => {
    response.json().then((data) => {
        if (data.error){
            console.log(data.error)
            messageLocation.textContent = data.error
        }
        else{
            messageLocation.textContent = data.location
            messageforecast.textContent = data.forecast
        }
    })
})

})