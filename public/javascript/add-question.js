async function newFormHandler(event) {
    event.preventDefault();
  
    const questionText = document.querySelector('input[name="question-text"]').value;
    const username = document.querySelector('input[name="user-info"]').value;
  
    const response = await fetch(`/api/questions`, {
      method: 'POST',
      body: JSON.stringify({
        questionText,
        username
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      document.location.replace('/askDevs/');
    } else {
      alert(response.statusText);
    }
}
  
document.querySelector('.new-question-form').addEventListener('submit', newFormHandler);