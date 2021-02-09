async function joinEventFormHandler(event) {
    event.preventDefault();

    const event_id = document.querySelector('.join-event-btn').dataset.id;
    const user_id = 1

    const response = await fetch(`/api/events/add-user`, {
        method: 'PUT',
        body: JSON.stringify({
            event_id,
            user_id
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.querySelector('.attend-event-succeess').classList.remove('hidden');
        setTimeout(function () {
            document.querySelector('.attend-event-succeess').classList.add('hidden');
        }, 3000)
    } else {
        document.querySelector('.attend-event-fail').classList.remove('hidden');
        setTimeout(function () {
            document.querySelector('.attend-event-fail').classList.add('hidden');
        }, 3000)
    }
}
document.querySelector('.join-event-btn').addEventListener('click', joinEventFormHandler);