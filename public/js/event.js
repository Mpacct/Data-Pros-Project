//function to add a new event based on user inputted values from the form.  Saves to the database events table
const addNew = async (event) => {
    event.preventDefault();
    const title = document.querySelector('#title').value.trim();
    const date = document.querySelector('#date').value.trim();
    const time = document.querySelector('#time').value.trim();
    const description = document.querySelector('#description').value.trim();


    if (title && date && time && description) {
        const response = await fetch('/api/events/', {
            method: 'POST',
            body: JSON.stringify({ title, date, time, description }),
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
            document.location.replace('/');
        } else {
            alert(response.statusText);
        }
    }
};
document.querySelector('.btn-primary').addEventListener('click', addNew);