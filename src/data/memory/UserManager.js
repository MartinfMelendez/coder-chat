//const crypto = require("crypto");
class UserManager {
  //se crea una variable privada de la clase
  static #users = [];
  //se crea un metodo para crear usuarios
  create(data) {
    try {
      const user = {
        //el id deber incremental
        id:
          //crypto.randomBytes(12).toString("hex"),
          UserManager.#users.length === 0
            ? 1 //consulta si esta vacio y asigna a 1 el primer id
            : UserManager.#users[UserManager.#users.length - 1].id + 1, //accedo al ultimo elemento y luego lo incremento,
        foto: data.foto,
        email: data.email,
        password: data.password,
        role: 0,
      };
      if (!data.email || !data.password) {
        throw new Error("ingrese email o constraseña");
      } else {
        //se agrega al array
        UserManager.#users.push(user);
        //se muestra una confirmacion de la creacion del usuario
        console.log("usuario creado");
      }
    } catch (error) {
      console.log(error);
    }
  }
  //se crea metodo de lectura
  read() {
    try {
      return UserManager.#users;
    } catch (error) {
      console.log(error)
    }
    
  }
  readOne(id) {
    try {
      const one = UserManager.#users.find((each) => each.id === id);
      if (!one) {
        throw new Error("No existe el usuario");
      } else {
        return one;
      }
    } catch (error) {
      console.log(error);
    }
  }
  destroy(id) {
    try {
      this.readOne(id);
      const without = UserManager.#users.filter((each) => each.id !== id);
      UserManager.#users = without;
      console.log("Usuario eliminado");
    } catch (error) {
      console.log(error);
    }
  }
}

//se crea una nueva instancia
const gestorDeUsuarios = new UserManager();
//invocames el gestor de usuarios con el metodo create
//se crea un usuario
gestorDeUsuarios.create({
  foto: "foto.png",
  email: "martinf.melendez@gmail.com",
  password: "hola123",
});

//se crea otro usuario
gestorDeUsuarios.create({
  foto: "foto2.png",
  email: "martinf.melendez@gmail.com",
  password: "Hola213",
});

//se ejecuta el metodo read
console.log(gestorDeUsuarios.read());
console.log(gestorDeUsuarios.readOne(1));
console.log(gestorDeUsuarios.destroy(2));