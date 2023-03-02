const LoginHandler = async (event) => {
    event.preventDefault();

    const userEmail = document.getElementById('email');
    const userPassword = document.getElementById('password');

    if (userEmail && userPassword) 
    {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ userEmail, userPassword}),
            headers: {'Content-Type' : 'applicaiton/json'},
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