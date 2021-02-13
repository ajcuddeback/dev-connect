async function putEventFromHome(event) {
    event.preventDefault();

    const event_title = document.querySelector('.event-title').value.trim();
    const event_text = document.querySelector('#event-info').value
    const event_location = document.querySelector('.event-location').value.trim();
    const event_time = document.querySelector('.time-and-date').value.trim();
    const event_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const response = await fetch(`/api/events/${event_id}`, {
        method: 'PUT',
        body: JSON.stringify({
            event_title,
            event_text,
            event_location,
            event_time
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace('/meet/dashboard')
    } else {
        alert(response.statusText)
    }
}

document.querySelector('.edit-event-form').addEventListener('submit', putEventFromHome);