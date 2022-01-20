module.exports = (sequelize, Sequelize) => {
    const Album = sequelize.define("albumes", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      nombre: {
        type: Sequelize.STRING
      },
      duracion: {
        type: Sequelize.INTEGER
      }
    },
    {
      tableName: "albumes",
      timestamps: false
    }
    );
  
    return Album;
  };