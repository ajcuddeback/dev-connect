async function likeClickHandler(event) {
   let post_id;
  //   if (event.target.classList.contains( "liked-btn")) {
       post_id = event.target.dataset.postid;
  //   }else{
  //     return;
  //   };
      console.log(post_id);
      const response = await fetch(`/api/posts/like/${post_id}`, {
        method: 'GET',
       
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        
      } else {
        alert(response.statusText);
      }
    }
  
  document.querySelectorAll('.fa-heart').forEach(btn => {
    btn.addEventListener('click', likeClickHandler);
  })