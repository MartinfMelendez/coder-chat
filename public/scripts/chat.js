const socket = io();

let nickname = "";
let allMessages = [];
Swal.fire({
  title: "Write your name",
  input: "text",
  allowOutsideClick: false,
  inputValidator: (value) => !value && "PLASE, write your name",
}).then((data) => {
  nickname = data.value;
  document.querySelector("#nickname").innerHTML = nickname.toUpperCase();
  socket.emit("nickname", nickname);
});

socket.on("messages", (messages) => {
  document.querySelector("#allMessages").innerHTML = messages
    .map((each) => `<p>${each}</p>`)
    .join("");
});

document.querySelector("#message").addEventListener("keyup", (event) => {
  if (event.key == "Enter") {
    const message = `<p class="py-1 px-3"><span class="fw-bolder">${nickname}:</span>  ${event.target.value}</p>`;
    allMessages.push(message);
    socket.emit("all messeges", allMessages);
    event.target.value= ""
  }
});
