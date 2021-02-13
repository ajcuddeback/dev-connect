async function newFormHandler(event) {
    event.preventDefault();
  
    const questionText = document.querySelector('input[name="question_text"]').value;
    const username = document.querySelector('input[name="username"]').value;
  
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
      document.location.replace('/dashboard/');
    } else {
      alert(response.statusText);
    }
}
  
document.querySelector('.new-question-form').addEventListener('submit', newFormHandler);