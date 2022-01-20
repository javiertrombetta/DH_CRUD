module.exports = app => {
    const genre = require("../controllers/genreController.js");

    var router = require("express").Router();

    // Recuperar todos los géneros.
    router.get("/", genre.findAll);

    // Crear y guardar una nuevo género.
    router.post("/", genre.create);  

    // Encontrar un género por id.
    router.get("/:id", genre.findOne);

    // Actualizar un género por id en solicitud.
    router.put("/:id", genre.update);

    // Eliminar un género por id en solicitud.
    router.delete("/:id", genre.delete);

    // Eliminar todos los géneros.
    router.delete("/", genre.deleteAll);

    app.use('/api/generos', router);
};