async function getFirstInitialHandler() {
    const response = await fetch('/api/users/1', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })

    if (response.ok) {
        response.json().then(data => {
            // const firstName = data[0].first_name;
            // const lastName = data[0].last_name;

            console.log(data)
        })
    }
}

getFirstInitialHandler();