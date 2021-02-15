async function editFormHandler(event) {
    event.preventDefault();
  
    const question_text = document.querySelector('input[name="question-text"]').value.trim();
    const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
    const response = await fetch(`/api/questions/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        question_text
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      document.location.replace('/askDevs/my-questions/');
    } else {
      alert(response.statusText);
    }
}
  
document.querySelector('.edit-question-form').addEventListener('submit', editFormHandler);