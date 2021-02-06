
function joinGroupFormHandler(event) {
    event.preventDefault();

    const group_id = document.querySelector('.group_id').value;

    const response = await fetch(`/api/groups/add-user`, {
        method: 'PUT',
        body: JSON.stringify({
            group_id
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace(`/meet/group-home/${group_id}`)
    } else {
        alert(response.statusText);
    }
};

document.querySelector('.join-group').addEventListener('click', joinGroupFormHandler);