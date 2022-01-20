module.exports = app => {
    const artist = require("../controllers/artistController.js");

    var router = require("express").Router();

    // Recuperar todos los artistas.
    router.get("/", artist.findAll);

    // Crear y guardar una nueva artista.
    router.post("/", artist.create);  

    // Encontrar un artista por id.
    router.get("/:id", artist.findOne);

    // Actualizar un artista por id en solicitud.
    router.put("/:id", artist.update);

    // Eliminar un artista por id en solicitud.
    router.delete("/:id", artist.delete);

    // Eliminar todos los artistas.
    router.delete("/", artist.deleteAll);

    app.use('/api/artistas', router);
};