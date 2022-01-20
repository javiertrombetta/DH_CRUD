module.exports = app => {
    const songs = require("../controllers/songController.js");
  
    var router = require("express").Router();
  
    // Recuperar todas las canciones.
    router.get("/", songs.findAll);

    // Crear y guardar una nueva canción.
    router.post("/", songs.create);  

    // Encontrar una canción por id.
    router.get("/:id", songs.findOne);
  
    // Actualizar una canción por id en solicitud.
    router.put("/:id", songs.update);
  
    // Eliminar una canción por id en solicitud.
    router.delete("/:id", songs.delete);

    // Eliminar todas las canciones.
    router.delete("/", songs.deleteAll);

    app.use('/api/canciones', router);
};