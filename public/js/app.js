
const messagetwo = document.getElementById("message-2");
const messageOne = document.getElementById("message-1");
const weatherForm = document.querySelector("form");
const search = document.querySelector("input");



weatherForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const location = search.value

    messagetwo.textContent = "loading message....."
    messageOne.textContent = "";


    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if(data.error){
                messagetwo.textContent = data.error;
            }else{
                messageOne.textContent = data.location;
                messagetwo.textContent = data.forecast;
            }
        });
    });

    

    
});