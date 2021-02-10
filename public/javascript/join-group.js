async function joinGroupFormHandler(e) {

    const group_id = e.target.dataset.id

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
        document.querySelector('.join-group-fail').classList.remove('hidden');
        setTimeout(function () {
            document.querySelector('.join-group-fail').classList.add('hidden');
        }, 3000)
    }
}
// document.querySelector('.groups-near-user-wrapper').addEventListener('click', joinGroupFormHandler); 
document.querySelectorAll('.join-group').forEach(button => {
    button.addEventListener('click', joinGroupFormHandler);
});

