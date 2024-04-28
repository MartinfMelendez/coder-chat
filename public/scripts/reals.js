const socket = io();
socket.on("products", data =>{  
  let template = ``
  template = data.map(each=>`<div class="card" style="width: 18rem;">
 <a href="/products/${each.id}"> <img style="height: 10rem" src="${each.photo}" class="card-img-top p-2" alt="${each.title}"></>
  <div class="card-body">
    <h5 class="card-title">${each.category}</h5>

  </div>
</div>`).join("")
document.querySelector("#products").innerHTML = template
})

document.querySelector("#create").addEventListener("click", event=>{
const title = document.querySelector("#title").value
const category = document.querySelector("#category").value
const price = document.querySelector("#price").value
const stock = document.querySelector("#stock").value
const photo = document.querySelector("#photo").value
socket.emit("registerProduct", {title, category, price, stock, photo})
})
