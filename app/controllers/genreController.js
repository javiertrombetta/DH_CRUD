// requiero el db exportado de models\index y selecciono el modelo de tabla genres.
const db = require("../models");
const Genre = db.genres;

// Desarrollo de endpoints:

// api/generos (GET): recuperar todas los géneros con sus canciones.
exports.findAll = (req, res) => {  
    Genre.findAll({
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
          message:
            err.message || "Se produjo un error al recuperar los géneros."
        });
      });
  };

  // api/generos (POST)): crear y guardar un nuevo género.
  exports.create = (req, res) => {
    
    // verifico si es un array pasado en el JSON.
    if (Array.isArray(req.body)){    
        
        // mapeo el req.body y lo asigno a una constante.
        const genres = req.body.map(
            eachArtist => {
                // valido la solicitud sino se termina y devuelve el estado 400.
                if (!eachArtist.nombre) {
                    res.status(400).send({
                        message: "¡No puede existir un campo nombre vacío!"
                    });
                    throw message;
                }

                // en caso de ser correcto, asigna los valores de cada lectura del array.
                else{
                    return {                  
                        nombre: eachArtist.nombre
                    }
                }
            }
        );        

        // Guardo el array de artistas en base de datos.
        Genre.bulkCreate(genres)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
            message:
                err.message || "Se produjo un error al crear a los géneros."
            });
        });
    }else{

        // en caso de no ser un array, valido la solicitud sino se termina y devuelve el estado 400
        if (!req.body.nombre) {
            res.status(400).send({
                message: "¡El campo nombre no puede estar vacío!"
            });
          return;
        }

        // asigno los datos de la solicitud a una constante.
        const genres = {
            nombre: req.body.nombre    
        };

        // guardo el género en base de datos.
        Genre.create(genres)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
            message:
                err.message || "Se produjo un error al crear el género."
            });
        });
    }
};

// api/generos/:id (GET): encontrar un género por id.
exports.findOne = (req, res) => {
  const id = req.params.id;

  Genre.findByPk(id,
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
        message: "Error al recuperar el género con id=" + id + "."
      });
    });
};

// api/generos/:id (PUT): actualizar un genero por id en solicitud.
exports.update = (req, res) => {
  const id = req.params.id;

  Genre.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "El género se actualizó con éxito."
        });
      } else {
        res.send({
          message: `No se puede actualizar el género con id=${id}. No existe el registro o req.body está vacío!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error al actualizar el género con id=" + id + "."
      });
    });
};

// api/generos/:id (DELETE): eliminar un genero por id en solicitud.
exports.delete = (req, res) => {
  const id = req.params.id;

  Genre.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: `¡El género id=${id} se eliminó con éxito!`
        });
      } else {
        res.send({
          message: `No se puede eliminar el género con id=${id} porque no existe.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "No se pudo eliminar el género con id=" + id + "."
      });
    });
};

// api/generos (DELETE): Eliminar todos los generos de la base de datos.
exports.deleteAll = (req, res) => {
  Genre.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} ¡Todos los géneros se eliminaron con éxito!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Se produjo un error al eliminar todos los géneros."
      });
    });
};