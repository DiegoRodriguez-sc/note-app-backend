const express = require("express");
const cors =    require("cors");
const { dbConnection } = require("../database/config");



class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.path = {
      auth:"/api/auth",
      note:"/api/note"
    };

    // conectar a base de datos
    this.conectarDB();

    // middlewares
    this.middlewares();

    // rutas de mi app
    this.routes();
  }

  async conectarDB() {
    await dbConnection();
  }

  middlewares() {
    // cors
    this.app.use(cors());

    // lectura y parseo del body
    this.app.use(express.json());

    // directorio publico
    this.app.use(express.static("public"));

  
  }

  routes() {
    this.app.use(this.path.auth,require("../routes/auth"));
    this.app.use(this.path.note,require("../routes/notes"));
  }
  listen() {
    this.app.listen(this.port,()=>{
      console.log("Servidor corriendo en el puerto",this.port);
    });
  }
}

module.exports = Server;
