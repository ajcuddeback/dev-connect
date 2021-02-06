function joinGroupFormHandler(event) {
    event.preventDefault();

    const group_id = document.querySelector('.group_id').value;

    console.log(group_id)
}

document.querySelector('.join-group').addEventListener('click', joinGroupFormHandler)