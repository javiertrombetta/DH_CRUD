require('dotenv').config();

const enviroment = process.argv[2] || 'development';

//Requiero los parmámetros de conexión a base de datos y sequelize

const dbConfig = require("../config/config.js")[enviroment];
const Sequelize = require("sequelize");

if(enviroment == 'development')
{  
  // Conexión a base de datos local
    connection = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, 
    {
      host: dbConfig.host,
      dialect: dbConfig.dialect,
      operatorsAliases: 0,
      pool: 
      {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
      }
    }
  );
  connection
  .authenticate()
  .then(() => 
    {
      console.log('Conexión establecida con base de datos local.');
    }
  )
  .catch(err => 
    {
    console.error('No se puede conectar a la base de datos local:', err);
    }
  );
}
else{
  // Conexión a ClearDB en Heroku
    connection = new Sequelize(process.env.DATABASE_URL, 
    {
        dialectOptions: 
        {
          ssl: 
          {
            require: true,
            rejectUnauthorized: false
          }
        }
    }
  );

  connection
  .authenticate()
  .then(() => 
    {
      console.log('Conexión establecida con ClearDB en Heroku.');
    }
  )
  .catch(err => 
    {
    console.error('No se puede conectar a ClearDB:', err);
    }
  );
}

// Genero el objeto db que se va a exportar para ser utilizado por los controladores.
const db = {};

// Asigno el módulo sequelize y la conexión utlizada.
db.Sequelize = Sequelize;
db.connection = connection;

// Asigno el modelo de tablas en sequelize, utilizando las parámetros de la conexión a la base de datos.
db.artists = require("./artists.js")(connection, Sequelize);
db.albums = require("./albums.js")(connection, Sequelize);
db.songs = require("./songs.js")(connection, Sequelize);
db.genres = require("./genres.js")(connection, Sequelize);


// Defino las relaciones entre las tablas de la base de datos.

// Una canción tiene un album.
db.songs.belongsTo(db.albums, {
    foreignKey: "album_id"
  });

// Una canción tiene un artista.
db.songs.belongsTo(db.artists, {
    foreignKey: "artista_id"
});

// Una canción tiene un genero.
db.songs.belongsTo(db.genres, {
    foreignKey: "genero_id" 
});



// Un album tiene muchas canciones.
db.albums.hasMany(db.songs, {  
    foreignKey: "album_id"
});



// Un genero tiene muchas canciones.
db.genres.hasMany(db.songs, {
    foreignKey: "genero_id"
});



// Un artista tiene muchas canciones.
db.artists.hasMany(db.songs, {
  foreignKey: "artista_id"
});

// exporto el objeto con sequelize, las tablas y los parámetros de la conexión establecida.
// el objeto va a ser utilizado por los controladores.
module.exports = db;