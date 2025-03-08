document.addEventListener("DOMContentLoaded", function () {
    mostrarComentarios();
});

document.getElementById('comment-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const commentText = document.getElementById('comment-text').value;
    const user = JSON.parse(localStorage.getItem("loggedUser")) || { username: "Guest", name: "Invitado", image: "default.png" };
    const fecha = new Date().toLocaleString();

    if (commentText.trim() === "") {
        alert("El comentario no puede ir vacío");
        return;
    }

    const newComment = {
        username: user.username,
        name: user.name,
        image: user.image,
        commentText: commentText,
        timestamp: fecha
    };

    let comments = JSON.parse(localStorage.getItem('comments')) || [];
    comments.push(newComment);
    localStorage.setItem('comments', JSON.stringify(comments));

    document.getElementById('comment-text').value = "";

    mostrarComentarios();
});

function mostrarComentarios() {
    const commentsContainer = document.getElementById('comments-container');
    const comments = JSON.parse(localStorage.getItem('comments')) || [];

    commentsContainer.innerHTML = '';

    comments.forEach((comment, index) => {
        const commentElement = document.createElement('div');
        commentElement.classList.add('comment');

        const userImage = document.createElement('img');
        userImage.src = comment.image;
        userImage.classList.add('user-image');
        commentElement.appendChild(userImage);

        const userName = document.createElement('strong');
        userName.textContent = comment.name;
        commentElement.appendChild(userName);

        const timestamp = document.createElement('small');
        timestamp.textContent = comment.timestamp;
        commentElement.appendChild(timestamp);

        const textElement = document.createElement('p');
        textElement.textContent = comment.commentText;
        commentElement.appendChild(textElement);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.addEventListener('click', function () {
            comments.splice(index, 1);
            localStorage.setItem('comments', JSON.stringify(comments));
            mostrarComentarios();
        });
        commentElement.appendChild(deleteButton);

        commentsContainer.appendChild(commentElement);
    });
}
