async function postGroupFromHome(event) {
    event.preventDefault();

    const group_title = document.querySelector('.group-name').value.trim();
    const group_text = document.querySelector('#about-group').value.trim();
    const group_zip = document.querySelector('.zip').value.trim();

    const response = await fetch('/api/groups', {
        method: 'POST',
        body: JSON.stringify({
            group_title,
            group_text,
            group_zip
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

document.querySelector('.create-group-form').addEventListener('submit', postGroupFromHome);