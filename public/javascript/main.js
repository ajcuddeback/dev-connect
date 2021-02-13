const bubbleButton = document.querySelector('.bubble-button');
function bubbleClickHandler(e) {
    const bubbleNav = document.querySelector('.bubble-nav');
    if (bubbleNav.classList.contains('no-opac')) {
        bubbleNav.classList.remove('no-opac')
    } else {
        bubbleNav.classList.add('no-opac')
    };
};

bubbleButton.addEventListener('click', bubbleClickHandler);