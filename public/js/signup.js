//runs the signup route
const signup = async (event) => {
    event.preventDefault();
    const name = document.querySelector('#name').value.trim();
    const email = document.querySelector('#email').value.trim();
    const password = document.querySelector('#password').value.trim();
    const cPassword = document.querySelector('#confirm-password').value.trim();

    if(name && email && password && cPassword) {
        if(password === cPassword) {
            const response = await fetch('/api/users/signup', {
                method: 'POST',
                body: JSON.stringify({ name, email, password}),
                headers: { 'Content-Type': 'application/json' },
              });
            if (response.ok) {
                document.location.replace('/');
            } else {
                alert(response.statusText);
            }
        }
    } else {
      alert('please enter all feilds');
    }
  };
  
  document.querySelector('.btn-primary').addEventListener('click', signup);