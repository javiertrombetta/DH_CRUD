module.exports = app => {
    const album = require("../controllers/albumController.js");
  
    var router = require("express").Router();
  
    // Recuperar todos los álbumes.
    router.get("/", album.findAll);

    // Crear y guardar un álbum.
    router.post("/", album.create);  

    // Encontrar un álbum por id.
    router.get("/:id", album.findOne);
  
    // Actualizar un álbum por id en solicitud.
    router.put("/:id", album.update);
  
    // Eliminar un álbum por id en solicitud.
    router.delete("/:id", album.delete);

    // Eliminar todos los álbumes.
    router.delete("/", album.deleteAll);

    app.use('/api/albumes', router);
};