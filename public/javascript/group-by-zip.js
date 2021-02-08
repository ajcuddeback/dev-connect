async function groupByZipHandler(event) {
    event.preventDefault();

    const zip = document.querySelector('input[name="zip-code"]').value;

    document.location.replace(`/meet/get-zip/${zip}`)
};

function groupUsersZipHandler() {

    document.location.replace(`/meet/get-zip/`)
};

document.querySelector('.find-group-form').addEventListener('submit', groupByZipHandler);
document.querySelector('.use-location').addEventListener('click', groupUsersZipHandler);