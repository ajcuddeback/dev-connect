async function newFormHandler(event) {
    event.preventDefault();
  
    const question_text = document.querySelector('input[name="question-text"]').value;
  
    const response = await fetch(`/api/questions`, {
      method: 'POST',
      body: JSON.stringify({
        question_text
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