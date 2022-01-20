// requiero el db exportado de models\index y selecciono el modelo de tabla artists.
const db = require("../models");
const Artist = db.artists;

// Desarrollo de endpoints:

// api/artistas (GET): recuper todos los artistas de la base de datos.
exports.findAll = (req, res) => {  
    Artist.findAll({
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
                    model: db.albums,
                    attributes:["nombre"],    
                },
                {
                    model: db.genres,
                    attributes:["nombre"],    
                }
            ]       
        }]                
    })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Se produjo un error al recuperar el artista."
        });
      });
};

// api/artistas (POST)): crear y guardar uno o varios nuevo artista.
exports.create = (req, res) => {
    
    // verifico si es un array pasado en el JSON.
    if (Array.isArray(req.body)){    
        
        // mapeo el req.body y lo asigno a una constante.
        const artists = req.body.map(
            eachArtist => {
                // valido la solicitud sino se termina y devuelve el estado 400.
                if (!eachArtist.nombre) {
                    res.status(400).send({
                        message: "¡No puede existir un campo nombre vacío!"
                    });
                    throw message;
                }else if (!eachArtist.apellido) {
                    res.status(400).send({
                        message: "¡No puede existir un campo apellido vacío!"
                    });
                    throw message;
                // en caso de ser correcto, asigna los valores de cada lectura del array.
                }else{
                    return {                  
                        nombre: eachArtist.nombre,
                        apellido: eachArtist.apellido  
                    }
                }                
                
            }
        );        

        // Guardo el array de artistas en base de datos.
        Artist.bulkCreate(artists)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
            message:
                err.message || "Se produjo un error al crear a los artistas."
            });
        });
    }else{

        // en caso de no ser un array, valido la solicitud sino se termina y devuelve el estado 400
        if (!req.body.nombre) {
            res.status(400).send({
                message: "¡El campo nombre no puede estar vacío!"
            });
            return;
            }else if (!req.body.apellido) {
            res.status(400).send({
                message: "¡El campo apellido no puede estar vacío!"
            });
            return;
        }

        // asigno los datos de la solicitud a una constante.
        const artist = {
            nombre: req.body.nombre,
            apellido: req.body.apellido      
        };

        // guardo al artista en base de datos.
        Artist.create(artist)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
            message:
                err.message || "Se produjo un error al crear al artista."
            });
        });
    }
};

// api/artistas/:id (GET): encontrar un artista por id.
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Artist.findByPk(id,
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
                    model: db.albums,
                    attributes:["nombre"],    
                },
                {
                    model: db.genres,
                    attributes:["nombre"],    
                }
            ]       
        }]      
    })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error al recuperar al artista con id=" + id + "."
        });
      });
};

// api/artistas/:id (PUT): actualizar un artista por id en solicitud.
exports.update = (req, res) => {
    const id = req.params.id;
  
    Artist.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "El artista se actualizó con éxito."
          });
        } else {
          res.send({
            message: `No se puede actualizar al artista con id=${id}. No existe el registro o req.body está vacío!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error al actualizar al artista con id=" + id + "."
        });
      });
};

// api/artistas/:id (DELETE): eliminar un artista por id en solicitud.
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Artist.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: `¡El artista id=${id} se eliminó con éxito!`
          });
        } else {
          res.send({
            message: `No se puede eliminar al artista con id=${id} porque no existe.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "No se pudo eliminar al artista con id=" + id + "."
        });
      });
};
 
// api/artistas (DELETE): Eliminar todos los artistas de la base de datos.
exports.deleteAll = (req, res) => {
    Artist.destroy({
        where: {},
        truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} ¡Todos los artistas se eliminaron con éxito!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Se produjo un error al eliminar todos los artistas."
      });
    });
};