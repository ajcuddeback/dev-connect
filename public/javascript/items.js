// async function itemsFormHandler(event) {
//   event.preventDefault();

//   const quantity = document
//     .querySelector('textarea[name="comment-body"]')
//     .value.trim();

//   const product_id = window.location.toString().split("/")[
//     window.location.toString().split("/").length - 1
//   ];

//   if (quantity) {
//     const response = await fetch("/api/items", {
//       method: "POST",
//       body: JSON.stringify({
//         quantity,
//         product_id,
//       }),
//       headers: { "Content-Type": "application/json" },
//     });

//     if (response.ok) {
//       document.location.reload();
//     } else {
//       alert(response.statusText);
//     }
//   }
// }

// document
//   .querySelector(".comment-form")
//   .addEventListener("submit", commentFormHandler);
