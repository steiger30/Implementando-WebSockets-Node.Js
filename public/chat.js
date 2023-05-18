const socket = io();

// pegar os params da url
const urlSearch = new URLSearchParams(window.location.search);

const username = urlSearch.get('username');
const room = urlSearch.get('select_room');

const usernameDiv = document.getElementById("username");
usernameDiv.innerHTML = `Olá <strong>${username}</strong> - Você está na sala <strong>${room}</strong>`

//emit => emitir alguma informação
// on => escutando alguma informação
socket.emit("select_room", {
  username,
  room
}, response => {
  response.forEach(message => createMessage(message));
})

document.getElementById("message_input").addEventListener("keypress", (event) => {
  if (event.key === 'Enter') {
    const message = event.target.value
    const data = {
      room,
      message,
      username
    };

    socket.emit("message", data);
    event.target.value = "";
  };
});

socket.on("message", (data) => {
  createMessage(data)
})

function createMessage(data) {
  const messageDiv = document.getElementById("messages");
  messageDiv.innerHTML += `
    <div class="new_message">
      <label class="form-label">
        <strong>${data.username}</strong> <span>${data.text} - ${dayjs(data.createdAt).format("DD/MM HH:mm")}</span>
      </label>
    </div>  
  `;
}

document.getElementById("logout").addEventListener("click", (event) => {
  window.location.href = "index.html";
})