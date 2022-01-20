module.exports = (sequelize, Sequelize) => {
    const Song = sequelize.define("canciones", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      titulo: {
        type: Sequelize.STRING
      },
      duracion: {
        type: Sequelize.INTEGER
      },
      created_at: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
      },
      updated_at: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
      },
      genero_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      album_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      artista_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    },
    {
      tableName: "canciones",
      timestamps: false
    }
    );  
  
    return Song;
  };