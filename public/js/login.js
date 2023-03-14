// handles the login and runs the login route that sets user status to logged_in if they entered the correct email and password
const loginHandler = async (event) => {
    event.preventDefault();

    const email = document.querySelector('#email').value.trim();
    const password = document.querySelector('#password').value.trim();
    console.log(email)
    console.log(password)
    if (email && password) 
    {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ email, password}),
            headers: {'Content-Type' : 'application/json'},
        });

        if (response.ok) 
        {        
            document.location.replace('/');
        }
        else 
        {
            alert(response.statusText);
        }
    }
    else 
    {
         alert('error with user email and password');
    }
};
document.querySelector('#loginbtn').addEventListener('click', loginHandler);