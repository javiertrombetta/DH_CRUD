// requiero el db exportado de models\index y selecciono el modelo de tabla albums.
const db = require("../models");
const Album = db.albums;

// Desarrollo de endpoints:

// api/albumes (GET): recuperar todos los albumes de la base de datos.
exports.findAll = (req, res) => {  
    Album.findAll({
        include: [{ 
            model: db.songs,
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
                    attributes:["nombre"],    
                },
                {
                    model: db.artists,
                    attributes:["nombre","apellido"]    
                }
            ]       
        }]                
    }).then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Se produjo un error al recuperar los albumes."
        });
      });
  };

// api/albumes (POST)): crear y guardar uno o varios nuevos álbumes.
exports.create = (req, res) => {
    
    // verifico si es un array pasado en el JSON.
    if (Array.isArray(req.body)){    
        
        // mapeo el req.body y lo asigno a una constante.
        const albums = req.body.map(
            eachArtist => {
                // valido la solicitud sino se termina y devuelve el estado 400.
                if (!eachArtist.nombre) {
                    res.status(400).send({
                        message: "¡No puede existir un campo nombre vacío!"
                    });
                    throw message;
                }else if (!eachArtist.duracion) {
                    res.status(400).send({
                        message: "¡No puede existir un campo duracion vacío!"
                    });
                    throw message;
                // en caso de ser correcto, asigna los valores de cada lectura del array.
                }else{
                    return {                  
                        nombre: eachArtist.nombre,
                        duracion: eachArtist.duracion  
                    }
                } 
            }
        );       
   
        // guardo el array de albums en base de datos.
        Album.bulkCreate(albums)
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
        if (!req.body.nombre) {
            res.status(400).send({
                message: "¡El campo nombre no puede estar vacío!"
            });
            return;
            }else if (!req.body.duracion) {
            res.status(400).send({
                message: "¡El campo duracion no puede estar vacío!"
            });
            return;
        }

        // asigno los datos de la solicitud a una constante.
        const album = {
            nombre: req.body.nombre,
            apellido: req.body.duracion      
        };

        // guardo al álbum en la base de datos.
        Album.create(album)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
            message:
                err.message || "Se produjo un error al crear el álbum."
            });
        });
    }
};

// api/albumes/:id (GET): encontrar un album por id.
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Album.findByPk(id,
    {
        include: [{ 
            model: db.songs,
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
                    attributes:["nombre"],    
                },
                {
                    model: db.artists,
                    attributes:["nombre","apellido"]    
                }
            ]       
        }]      
    })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error al recuperar el album con id=" + id + "."
        });
      });
  };

// api/albumes/:id (PUT): actualizar un album por id en solicitud.
exports.update = (req, res) => {
    const id = req.params.id;
  
    Album.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "El album se actualizó con éxito."
          });
        } else {
          res.send({
            message: `No se puede actualizar el album con id=${id}. No existe el registro o req.body está vacío!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error al actualizar el album con id=" + id + "."
        });
      });
  };

// api/albumes/:id (DELETE): eliminar un album por id en solicitud.
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Album.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: `¡El álbum id=${id} se eliminó con éxito!`
          });
        } else {
          res.send({
            message: `No se puede eliminar el álbum con id=${id} porque no existe.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "No se pudo eliminar la canción con id=" + id + "."
        });
      });
  };
 
// api/albumes (DELETE): Eliminar todos los albumes de la base de datos.
exports.deleteAll = (req, res) => {
    Album.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
        res.send({ message: `${nums} ¡Todas los álbumes se eliminaron con éxito!` });
        })
        .catch(err => {
        res.status(500).send({
            message:
            err.message || "Se produjo un error al eliminar todos los álbumes."
        });
        });
    };