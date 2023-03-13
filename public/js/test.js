// template to display user data in a list format
var info = document.querySelector("#listevents")

function even () {
    fetch('/test', {
        method: 'GET',
        credentials: 'same-origin',
        redirect: 'follow',
    })
    .then(function (response){
        return response.json();
    })
    .then(function (data){
        for (var i = 0; i <data.events.length; i++) {
            var dataObj = {
                title: data.events[i].title,
                date: data.events[i].date
            }
            console.log(data.events[i])
            console.log(data.events)
            var historyItem = document.createElement("p");
            historyItem.textContent = dataObj.title + " " + dataObj.date
            info.appendChild(historyItem)
}
    })
   
}
function addText (dataObj) {
    info.innerHTML = dataObj.title + " " + dataObj.date
}
even();