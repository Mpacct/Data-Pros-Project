let monthTracker = 0;
let selectedDay = null;
// let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];

const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const calendar = document.getElementById('calendar');
const createNewEvent = document.getElementById('new-calendar-event');
const deleteCalendarEvent = document.getElementById('delete-calendar-event');
const eventBackground = document.getElementById('event-calendar-backdrop');
const eventTextInput = document.getElementById('calendar-event-title');

function events () {
    fetch('/test', {
        method: 'GET',
        redirect: 'follow',
})
  .then(function (response) {
    return response.json();
  })
}

function createEvent(date) {
    selectedDay = date;

    const selectedDaysEvents = events().events.find(event => event.date === selectedDay);

    if (selectedDaysEvents)
    {
        document.getElementById('eventText').innerText = selectedDaysEvents.title;
        deleteCalendarEvent.style.display = 'block';
    }
    else 
    {
        createNewEvent.style.display='block';

    }

    eventBackground.style.display ='block';
}

function calendarLoad() {
    const date = new Date();

    if (monthTracker !== 0 ) 
    {
        date.setMonth(new Date().getMonth() + monthTracker);
    }

    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    const firstDayOfTheMonth = new Date(year, month, 1);
    const daysInMonth = new Date(year, month+1, 0).getDate();

    const dateStr = firstDayOfTheMonth.toLocaleDateString('en-us', {
        weekday: 'long',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
    });

    const currentMonth = document.getElementById('monthDisplay');
    currentMonth.innerText = `${date.toLocaleDateString('en-us', {month : 'long'})} ${year}`;
    
    const VoidDays = weekdays.indexOf(dateStr.split(', ')[0]);

    calendar.innerHTML='';

    for (let i = 1; i <= VoidDays + daysInMonth; i++) {
        const dayTile = document.createElement('div');
        dayTile.classList.add('day');
        const dateString = `${month+1}/${i-VoidDays}}/${year}`;

        if (i > VoidDays) {
            dayTile.innerText = i - VoidDays;
            const selectedDaysEvents = events().events.find(event => event.date === dateString);
           
            if (selectedDaysEvents)
            {
                const eventDiv = document.createElement('div');
                eventDiv.classList.add('event');
                eventDiv.innerText = selectedDaysEvents.title;
                dayTile.appendChild(eventDiv);
            }
            dayTile.addEventListener('click', function() {
                createEvent(dateString);
            });
        }
        else {
            dayTile.classList.add('padding');
        }
        calendar.appendChild(dayTile);
    }
}

function closeEvent () {
    eventTextInput.classList.remove('error');
    createNewEvent.style.display = 'none';
    deleteCalendarEvent.style.display = 'none';
    eventBackground.style.display = 'none';
    eventTextInput.value='';
    selectedDay = null;
    calendarLoad();
}

function saveEvent() {
    if (eventTextInput.value) 
    {
        eventTextInput.classList.remove('error');
        events.push({
            date: selectedDay,
            title: eventTextInput.value,
        });
        localStorage.setItem('events', JSON.stringify(events));
        closeEvent();
    }
    else 
    {
        eventTextInput.classList.add('error');
    }
}

function deleteEvent () {
    events = events.filter(e => e.date !== selectedDay);
    localStorage.setItem('events', JSON.stringify(events));
    closeEvent();
}

function InitializeButton() {
    const nextButton = document.getElementById('next-month');
    nextButton.addEventListener('click', function() {
        monthTracker++;
        calendarLoad();
    });
    const backButton = document.getElementById('last-month');
    backButton.addEventListener('click', function() {
        monthTracker--;
        calendarLoad();
    });

    document.getElementById('save-event-button').addEventListener('click', saveEvent);
    document.getElementById('delete-event-button').addEventListener('click', closeEvent);

    document.getElementById('delete-button').addEventListener('click', deleteEvent)
    document.getElementById('close-button').addEventListener('click', closeEvent);
};

InitializeButton();

calendarLoad();
