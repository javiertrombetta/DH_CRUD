// requiero el db exportado de models\index y selecciono el modelo de tabla songs.
const db = require("../models");
const Song = db.songs;

// Desarrollo de endpoints:

// api/canciones (GET): recuperar todas las canciones de la base de datos.
exports.findAll = (req, res) => {  
    Song.findAll({
      attributes : [
        "id",
        "titulo",
        "duracion",  
        "created_at",
        "updated_at"                
      ],
      include: [
        {
          model: db.genres,
          as: "genero",
          attributes:["nombre"],    
        },
        {
          model: db.albums,
          attributes:["nombre"],    
        },
        {
          model: db.artists,
          attributes:["nombre","apellido"]    
        }
      ]                
    }).then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Se produjo un error al recuperar las canciones."
        });
      });
  };

  // api/albumes (POST)): crear y guardar uno o varios nuevos álbumes.
exports.create = (req, res) => {
    
  // verifico si es un array pasado en el JSON.
  if (Array.isArray(req.body)){    
      
      // mapeo el req.body y lo asigno a una constante.
      const songs = req.body.map(

          eachArtist => {

              // valido la solicitud sino se termina y devuelve el estado 400.

              if (!eachArtist.titulo) {
                  res.status(400).send({
                      message: "¡No puede existir un campo titulo vacío!"
                  });
                  throw message;
              }else if (!eachArtist.duracion) {
                  res.status(400).send({
                      message: "¡No puede existir un campo duracion vacío!"
                  });
                  throw message;
              }else if (!eachArtist.genero_id) {
                res.status(400).send({
                    message: "¡No puede existir un campo genero_id vacío!"
                });
                throw message;

              }else if (!eachArtist.album_id) {
                res.status(400).send({
                    message: "¡No puede existir un campo album_id vacío!"
                });
                throw message;

              }else if (!eachArtist.artista_id) {
                res.status(400).send({
                    message: "¡No puede existir un campo artista_id vacío!"
                });
                throw message;

                // en caso de ser correcto, asigna los valores de cada lectura del array.

              }else{
                      return {                  
                          titulo: eachArtist.titulo,
                          duracion: eachArtist.duracion,
                          genero_id: eachArtist.genero_id,
                          album_id: eachArtist.album_id,
                          artista_id: eachArtist.artista_id  
                      }
              }
          }
      );       
 
      // guardo el array de albums en base de datos.
      Song.bulkCreate(songs)
      .then(data => {
          res.send(data);
      })
      .catch(err => {
          res.status(500).send({
          message:
              err.message || "Se produjo un error al crear los álbumes."
          });
      });
      
  }else{

      // en caso de no ser un array, valido la solicitud sino se termina y devuelve el estado 400
      if (!req.body.titulo) {
        res.status(400).send({
          message: "¡El campo titulo no puede estar vacío!"
        });
        throw message;
      }else if (!req.body.duracion) {
        res.status(400).send({
          message: "¡El campo duracion no puede estar vacío!"
        });
        throw message;
      }else if (!req.body.genero_id) {
        res.status(400).send({
          message: "¡El campo genero no puede estar vacío!"
        });
        throw message;
      }else if (!req.body.album_id) {
        res.status(400).send({
          message: "¡El campo album_id no puede estar vacío!"
        });
        throw message;
      }else if (!req.body.artista_id) {
        res.status(400).send({
          message: "¡El campo artista_id no puede estar vacío!"
        });
        throw message;
      }

      // asigno los datos de la solicitud a una constante.
      const song = {
        titulo: req.body.titulo,
        duracion: req.body.duracion,
        genero_id: req.body.genero_id,
        album_id: req.body.album_id,
        artista_id: req.body.artista_id       
      };

      // guardo al álbum en la base de datos.
      Song.create(song)
      .then(data => {
          res.send(data);
      })
      .catch(err => {
          res.status(500).send({
          message:
              err.message || "Se produjo un error al crear la canción."
          });
      });
  }
};

// api/canciones/:id (GET): encontrar una canción por id.
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Song.findByPk(id,
    {
      attributes : [
        "id",
        "titulo",
        "duracion",  
        "created_at",
        "updated_at"                
      ],
      include: [
        {
          model: db.genres,
          as: "genero",
          attributes:["nombre"],    
        },
        {
          model: db.albums,
          attributes:["nombre"],    
        },
        {
          model: db.artists,
          attributes:["nombre","apellido"]    
        }
      ]      
    })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error al recuperar la canción con id=" + id + "."
        });
      });
  };

// api/canciones/:id (PUT): actualizar una canción por id en solicitud.
exports.update = (req, res) => {
    const id = req.params.id;
  
    Song.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "La canción se actualizó con éxito."
          });
        } else {
          res.send({
            message: `No se puede actualizar la canción con id=${id}. No existe el registro o req.body está vacío!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error al actualizar la canción con id=" + id + "."
        });
      });
  };

// api/canciones/:id (DELETE): eliminar una canción por id en solicitud.
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Song.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: `¡La canción id=${id} se eliminó con éxito!`
          });
        } else {
          res.send({
            message: `No se puede eliminar la canción con id=${id} porque no existe.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "No se pudo eliminar la canción con id=" + id + "."
        });
      });
  };
 
// api/canciones (DELETE): Eliminar todas las canciones de la base de datos.
exports.deleteAll = (req, res) => {
  Song.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `¡${nums} canciones se eliminaron con éxito!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Se produjo un error al eliminar todas las canciones."
      });
    });
};