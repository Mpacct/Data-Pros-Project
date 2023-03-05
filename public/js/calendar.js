const getData = () => {

        const response = fetch('/test', {
            method: 'GET',
            headers: {'Content-Type' : 'application/json'},
        });

        if (response.ok) 
        {        
            addText(response)
        }
        else 
        {
            alert(response.statusText);
        }
};

const addText = (info) => {
    const data = document.querySelector("#listofitems");
    data.innerHTML = info.title
};
getData();