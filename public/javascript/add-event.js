async function addEventFromHandler(e) {
    e.preventDefault();

    const event_title = document.querySelector('.event-title').value.trim();
    const event_text = document.querySelector('#event-info').value
    const event_location = document.querySelector('.event-location').value.trim();
    const event_time = document.querySelector('.time-and-date').value.trim();
    const group_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
    console.log(group_id)

    const response = await fetch('/api/events', {
        method: 'POST',
        body: JSON.stringify({
            event_title,
            event_text,
            event_location,
            event_time,
            group_id
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace(`/meet/dashboard/${group_id}`)
    } else {
        alert(response.statusText)
    }
};

document.querySelector('.add-event-form').addEventListener('submit', addEventFromHandler);