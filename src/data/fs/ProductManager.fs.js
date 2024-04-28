import fs from "fs";
import crypto from "crypto";

class ProductManager {
  constructor() {
    this.path = "./src/data/fs/files/product.json"; //ruta donde se crea el archivo
    this.init();
  }
  init() {
    const exists = fs.existsSync(this.path);
    if (!exists) {
      const stringData = JSON.stringify([], null, 2);
      fs.writeFileSync(this.path, stringData);
      console.log("Archivo creada");
    } else {
      console.log("archivo ya existe");
    }
  }

  async create(data) {
    try {
      if (!data.title || !data.category || !data.price || !data.stock) {
        const error = new Error("Faltan ingresar datos");
        throw error;
      } else {
        const product = {
          id: crypto.randomBytes(12).toString("hex"),
          title: data.title,
          photo: data.photo || "./public/img/default.jpg",
          category: data.category,
          price: data.price,
          stock: data.stock,
        };
        let all = await fs.promises.readFile(this.path, "utf-8");
        all = JSON.parse(all);
        all.push(product), (all = JSON.stringify(all, null, 2));
        console.log("Producto creado");
        await fs.promises.writeFile(this.path, all);

        return product;
      }
    } catch (error) {
      throw error;
    }
  }
  async read() {
    try {
      let all = await fs.promises.readFile(this.path, "utf-8");
      all = JSON.parse(all);
      //all = all.filter((each) => each.category === cat);
      if (all.length === 0) {
        return null;
      } else {
        console.log(all);
        return all;
      }
    } catch (error) {
      throw error;
    }
  }
  async readOne(id) {
    try {
      let all = await fs.promises.readFile(this.path, "utf-8");
      all = JSON.parse(all);
      let one = all.find((each) => each.id === id);

      if (one) {
        console.log("Producto buscado");
        console.log(one);
        return one;
      } else {
        throw new Error("No encontrado");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async update(id, data) {
    try {
      let all = await this.read();
      let one = all.find((each) => each.id === id);
      if (one) {
        for (let prop in data) {
          one[prop] = data[prop];
        }
        all = JSON.stringify(all, null, 2);
        await fs.promises.writeFile(this.path, all);
        return one;
      } else {
        const error = new Error("Not Found");
        error.statusCode = 404;
        throw error;
      }
    } catch (error) {
      throw error;
    }
  }

  async destroy(id) {
    try {
      let all = await fs.promises.readFile(this.path, "utf-8");
      all = JSON.parse(all);
      let one = all.find((each) => each.id === id);
      if (!one) {
        throw new Error("No existe");
      } else {
        let filtered = all.filter((each) => each.id !== id);
        filtered = JSON.stringify(filtered, null, 2);
        await fs.promises.writeFile(this.path, filtered);
        console.log("Producto eliminado");
        console.log(one);
        return one;
      }
    } catch (error) {
      throw error;
    }
  }
}
const productManager = new ProductManager();
export default productManager;
/*
async function test() {
  const product = new ProductManager();

  await product.create({
    title: "zapato",
    photo: "zapato.jpg",
    category: "calzado",
    price: "100",
    stock: "20",
  });
  await product.create({
    title: "zapatilla",
    photo: "zapatilla.jpg",
    category: "calzado",
    price: "75",
    stock: "20",
  });
  await product.create({
    title: "estilet",
    photo: "",
    category: "calzado",
    price: "70",
    stock: "20",
  });
  await product.create({
    title: "botines",
    photo: "botines.jpg",
    category: "calzado",
    price: "110",
    stock: "20",
  });
  await product.create({
    title: "alpargata",
    photo: "",
    category: "calzado",
    price: "70",
    stock: "20",
  });
  await product.read();
  await product.readOne("1f086c9b843786e3f0565c5b");
  await product.destroy("84a9109ad178d93e0523ae3d");
}

test();
*/
