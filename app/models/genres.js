module.exports = (sequelize, Sequelize) => {
    const Genre = sequelize.define("generos", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      nombre: {
        type: Sequelize.STRING
      }
    },
    {
      tableName: "generos",
      timestamps: false
    }
    );
  
    return Genre;
  };