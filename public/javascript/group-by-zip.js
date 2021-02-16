const updateMile = function (e) {
    const mileText = document.querySelector('.miles-nr');

    mileText.innerText = e.target.value;
};

async function groupByZipHandler(event) {
    event.preventDefault();

    const zip = document.querySelector('input[name="zip-code"]').value;
    const miles = document.querySelector('.mile-slider').value;


    document.location.replace(`/meet/get-zip/${zip}/${miles}`)
};

function groupUsersZipHandler() {
    const miles = document.querySelector('.mile-slider').value;

    document.location.replace(`/meet/get-zip/${miles}`)
};

document.querySelector('.mile-slider').addEventListener('change', updateMile);
document.querySelector('.find-group-form').addEventListener('submit', groupByZipHandler);
document.querySelector('.use-location').addEventListener('click', groupUsersZipHandler);