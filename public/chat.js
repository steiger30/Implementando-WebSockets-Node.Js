const socket = io();

// pegar os params da url
const urlSearch = new URLSearchParams(window.location.search);

const username = urlSearch.get("username");

const usernameDiv = document.getElementById("username");
usernameDiv.innerHTML = `Olá <strong>${username}</strong>!`;

//emit => emitir alguma informação
// on => escutando alguma informação
socket.emit("select_room", {
  username,
});

document
  .getElementById("message_input")
  .addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      const message = event.target.value;
      const data = {
        message,
        username,
      };

      socket.emit("message", data);
      event.target.value = "";
    }
  });

socket.on("message", (data) => {
  createMessage(data);
});

function createMessage(data) {
  const messageDiv = document.getElementById("messages");
  messageDiv.innerHTML += `
  <div class="col-md-1"></div>
  <div class="col-md-10">
  <div class="dialogo">
  <h4>${data.username} - ${dayjs(data.createdAt).format("DD/MM HH:mm")}</h4>
  <p>${data.text} </p>
  </div>  
  </div>
  <div class="col-md-1"></div>
  `;
}

document.getElementById("logout").addEventListener("click", (event) => {
  window.location.href = "index.html";
});
