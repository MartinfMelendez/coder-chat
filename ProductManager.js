class ProductManager {
    //se crea una variable privada de la clase
    static #products = [];
    //se crea un metodo para crear usuarios
    create(data) {
      const product = {
        //el id debe ser incremental
        id:
         ProductManager.#products.length === 0
            ? 1 //consulta si esta vacio y asigna a 1 el primer id
            : ProductManager.#products[ProductManager.#products.length - 1].id + 1, //accedo al ultimo elemento y luego lo incremento,
            title: data.title,
            photo: data.photo,
            category: data.category,
            price: data.price,
            stock: data.stock
      };
      //se agrega al array
      ProductManager.#products.push(product);
      //se muestra una confirmacion de la creacion del usuario
      console.log("Productos creados");
    }
    //se crea metodo de lectura
    read(){
      return ProductManager.#products;
    }
  }
  
  //se crea una nueva instancia
  const gestorDeProductos = new ProductManager()
  //invocames el gestor de productoscon el metodo create
  //se crea un producto
  gestorDeProductos.create({
    title: "Zapatos",
    photo: "zapato.jpg",
    category: "Calzados",
    price: "100",
    stock: "100"
  })
  
  //Se crean 4 productos mas
  gestorDeProductos.create({
    title: "Zapatillas",
    photo: "zapatillas.jpg",
    category: "Calzados",
    price: "75",
    stock: "1150"
  })

  gestorDeProductos.create({
    title: "Sandalias",
    photo: "Sandalias.jpg",
    category: "Calzados",
    price: "50",
    stock: "200"
  })

  gestorDeProductos.create({
    title: "Borsego",
    photo: "Borsego.jpg",
    category: "Calzados",
    price: "80",
    stock: "125"
  })

  gestorDeProductos.create({
    title: "Chancletas",
    photo: "chancletas.jpg",
    category: "Calzados",
    price: "25",
    stock: "120"
  })

  gestorDeProductos.create({
    title: "Estiletos",
    photo: "estiletos.jpg",
    category: "Calzados",
    price: "75",
    stock: "110"
  })
  
  //se ejecuta el metodo read
  console.log(gestorDeProductos.read())