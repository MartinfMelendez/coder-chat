//muestro los usuarios
const socket = io();
  socket.on("users", data => {
    let template = ``
    template = data.map(each => `<div class="card" style="width: 18rem;">
  <img style="height: 10rem" src="${each.photo}" class="card-img-top p-2" alt="${each.email}">
  <div class="card-body">
    <h5 class="card-title">${each.email}</h5>

  </div>
</div>`).join("")
    document.querySelector("#users").innerHTML = template

  })
//se crea un usuario nuevo
document.querySelector("#create").addEventListener("click", (event) => {
    const email = document.querySelector("#email").value
    const password = document.querySelector("#password").value
    const photo = document.querySelector("#photo").value
    socket.emit("register", { email, password, photo })
  })