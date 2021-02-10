async function deleteButtonHandler(event) {
    const id = event.target.dataset.eventid;

    const response = await fetch(`/api/events/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.reload();
    } else {
        alert(response.statusText)
    }
};

document.querySelectorAll('.delete-event-button').forEach(button => {
    button.addEventListener('click', deleteButtonHandler)
});