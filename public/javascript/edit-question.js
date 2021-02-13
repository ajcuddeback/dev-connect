async function editFormHandler(event) {
    event.preventDefault();
  
    const questionText = document.querySelector('input[name="question-text"]').value.trim();
    const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
    const response = await fetch(`/api/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        questionText
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
  
document.querySelector('.edit-question-form').addEventListener('submit', editFormHandler);