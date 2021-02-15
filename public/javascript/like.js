async function likeClickHandler(event) {
    event.preventDefault();

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
      ];
      const response = await fetch('/api/posts/like', {
        method: 'PUT',
        body: JSON.stringify({
          post_id: id
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        document.location.reload();
        console.log("Everything is fine!");
      } else {
        alert(response.statusText);
      }
      const likeBtn = document.querySelector('.like-btn')
      if(likeBtn.classList.contains('like-btn-style')){
        likeBtn.classList.remove('like-btn-style');
      }else{
        likeBtn.classList.add('like-btn-style');
      }   
  }
  
  document.querySelector('.fa-heart').addEventListener('click', likeClickHandler);