module.exports = (sequelize, Sequelize) => {
    const Artist = sequelize.define("artistas", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      nombre: {
        type: Sequelize.STRING
      },
      apellido: {
        type: Sequelize.STRING
      }
    },
    {
      tableName: "artistas",
      timestamps: false
    }
    );
  
    return Artist;
  };