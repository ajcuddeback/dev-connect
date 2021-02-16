async function joinEventFormHandler(e) {
    const item = e.target;
    let event_id;
    if (item.classList[0] === 'join-event-btn') {
        event_id = item.dataset.id;
    } else {
        return;
    }
    console.log(event_id)

    const response = await fetch(`/api/events/add-user`, {
        method: 'PUT',
        body: JSON.stringify({
            event_id
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.querySelector('.attend-event-success').classList.remove('hidden');
        setTimeout(function () {
            document.querySelector('.attend-event-success').classList.add('hidden');
        }, 3000)
    } else {
        document.querySelector('.attend-event-fail').classList.remove('hidden');
        setTimeout(function () {
            document.querySelector('.attend-event-fail').classList.add('hidden');
        }, 3000)
    }
}
document.querySelector('.group-event-wrapper').addEventListener('click', joinEventFormHandler);