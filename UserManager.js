class UserManager {
  //se crea una variable privada de la clase
  static #users = [];
  //se crea un metodo para crear usuarios
  create(data) {
    const user = {
      //el id deber incremental
      id:
        UserManager.#users.length === 0
          ? 1 //consulta si esta vacio y asigna a 1 el primer id
          : UserManager.#users[UserManager.#users.length - 1].id + 1, //accedo al ultimo elemento y luego lo incremento,
      foto: data.foto,
      email: data.email,
      password: data.password,
      role: 0,
    };
    //se agrega al array
    UserManager.#users.push(user);
    //se muestra una confirmacion de la creacion del usuario
    console.log("usuario creado");
  }
  //se crea metodo de lectura
  read(){
    return UserManager.#users;
  }
}

//se crea una nueva instancia
const gestorDeUsuarios = new UserManager()
//invocames el gestor de usuarios con el metodo create
//se crea un usuario
gestorDeUsuarios.create({
    foto: "foto.png",
    email: "martinf.melendez@gmail.com",
    password: "hola123"
})


//se crea otro usuario
gestorDeUsuarios.create({
  foto:"foto2.png",
  email: "titacba@gmail.com",
  password: "hola123"
})

//se ejecuta el metodo read
console.log(gestorDeUsuarios.read())

