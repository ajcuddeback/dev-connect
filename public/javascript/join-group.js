async function joinGroupFormHandler(event) {
    event.preventDefault();

    const group_id = document.querySelector('.group_id').value;
    const user_id = 1

    console.log(group_id)

    const response = await fetch(`/api/groups/add-user`, {
        method: 'PUT',
        body: JSON.stringify({
            group_id,
            user_id
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
document.querySelector('.join-group').addEventListener('click', joinGroupFormHandler); 