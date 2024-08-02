function createPostElement(data) {
  //   Element.insertAdjacentHTML(
  //     "beforeend",
  //     `<div>
  //         <h2>${data.title}</h2>
  //         <p>${data.content}</p>
  //         <p>${data.post_date}</p>
  //         <p>${data.category}</p>
  //     </div>`
  //   );

  const post = document.createElement("div");
  post.className = "post";

  const header = document.createElement("h2");
  header.textContent = data["title"];
  post.appendChild(header);

  const content = document.createElement("p");
  content.textContent = data["content"];
  post.appendChild(content);

  const postDate = document.createElement("p");
  postDate.textContent = `Date: ${data["post_date"]}`;
  post.appendChild(postDate);

  const category = document.createElement("p");
  category.textContent = `Category: ${data["category"]}`;
  post.appendChild(category);

  const updateButton = document.createElement("button");
  updateButton.textContent = "Update";
  updateButton.addEventListener("click", () => openUpdateModal(data));
  post.appendChild(updateButton);

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", () => openDeleteModal(data.post_id));
  post.appendChild(deleteButton);

  return post;
}

// Load posts from the server, this is from chatgpt dont know if it works
async function loadPosts() {
  const response = await fetch(
    "https://la-fosse-bridget-diary.onrender.com/diary/",
    {
      headers: { Authorization: localStorage.getItem("token") },
    }
  );

  if (response.status === 200) {
    const { data } = await response.json();
    const container = document.getElementById("posts");
    container.innerHTML = ""; // Clear existing posts

    data.forEach((post) => {
      const elem = createPostElement(post);
      container.appendChild(elem);
    });
  } else {
    window.location.assign("./index.html");
  }
}

document.getElementById("post-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const form = new FormData(e.target);

  const options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: form.get("title"),
      content: form.get("content"),
      post_date: form.get("post-date"),
      category: form.get("category"),
    }),
  };

  const result = await fetch(
    "https://la-fosse-bridget-diary.onrender.com/diary",
    options
  );

  if (result.status === 201) {
    loadPosts();
  }
});

document.getElementById("search-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const date = document.getElementById("search-date").value;

  const query = new URLSearchParams({ post_date: date }).toString();

  const response = await fetch(
    `https://la-fosse-bridget-diary.onrender.com/diary/${query}`,
    {
      headers: { Authorization: localStorage.getItem("token") },
    }
  );

  if (response.status === 200) {
    const posts = await response.json();
    const container = document.getElementById("posts");
    container.innerHTML = "";

    posts.forEach((post) => {
      const elem = createPostElement(post);
      container.appendChild(elem);
    });
  }
});

document
  .getElementById("search-category-form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const category = document.getElementById("search-category").value;

    const query = new URLSearchParams({ category: category }).toString();

    const response = await fetch(
      `https://la-fosse-bridget-diary.onrender.com/diary?${query}`,
      {
        headers: { Authorization: localStorage.getItem("token") },
      }
    );

    if (response.status === 200) {
      const posts = await response.json();
      const container = document.getElementById("posts");
      container.innerHTML = "";

      posts.forEach((post) => {
        const elem = createPostElement(post);
        container.appendChild(elem);
      });
    }
  });

// // Function to open the update modal with pre-filled data, also from chatGPT
// function openUpdateModal(postData) {
//     const modal = document.getElementById("update-post-modal");
//     modal.style.display = "block";

//     document.getElementById("update-title").value = postData.title;
//     document.getElementById("update-content").value = postData.content;
//     document.getElementById("update-category").value = postData.category;
//     document.getElementById("update-post-id").value = postData.post_id;
// }

document
  .getElementById("update-post-form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);

    const postId = form.get("post_id");

    const options = {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: form.get("title"),
        content: form.get("content"),
        category: form.get("category"),
      }),
    };

    const result = await fetch(
      `https://la-fosse-bridget-diary.onrender.com/diary/${postId}`,
      options
    );

    if (result.status === 200) {
      loadPosts();
      closeUpdateModal();
    }
  });

// // Function to close the update modal, also from chat gpt
// function closeUpdateModal() {
//     const modal = document.getElementById("update-post-modal");
//     modal.style.display = "none";
// }

// // Function to open the delete modal, also from chat gpt
// function openDeleteModal(postId) {
//     const modal = document.getElementById("delete-post-modal");
//     modal.style.display = "block";

//     document.getElementById("confirm-delete").onclick = () => deletePost(postId);
//     document.getElementById("cancel-delete").onclick = closeDeleteModal;
// }

// Function to delete a post
async function deletePost(postId) {
  const result = await fetch(
    `https://la-fosse-bridget-diary.onrender.com/diary${postId}`,
    {
      method: "DELETE",
      headers: { Authorization: localStorage.getItem("token") },
    }
  );

  if (result.status === 204) {
    loadPosts();
    closeDeleteModal();
  }
}

// // Function to close the delete modal, also from chat gpt
// function closeDeleteModal() {
//     const modal = document.getElementById("delete-post-modal");
//     modal.style.display = "none";
// }

// Load posts initially
loadPosts();
