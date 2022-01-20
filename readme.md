# CRUD

## Consignas

Esta instancia consiste en desarrollar un **CRUD** de una aplicación conectada a la base de datos que se encuentra dentro del zip. 
El desarrollo a implementar es solo de backend tipo **API REST**.

Para ello se deben usar los siguientes módulos:

- **Express**
- **Sequelize**
- **Mysql2**
- *Otros que se requieran ...*

Respecto a la base de datos mysql, hay que importarla mediante el script *musicando.sql*

_Las relaciones de las tablas están definidas de la siguiente forma:_

- *Una canción tiene un album.*
- *Un album tiene muchas canciones.*

- *Una canción tiene un genero.*
- *Un genero tiene muchas canciones.*

- *Una canción tiene un artista.*
- *Un artista tiene muchas canciones.*

En nuestro proyecto de Express queremos modelar la base de datos mediante sequelize.

Deberán estar presentes los siguientes endpoints:

- **/canciones (GET)** que muestre un listado de las canciones con sus propiedades.

- **/canciones (POST)** para crear un nuevo registro de una canción.

- **/canciones/:id (GET)** que muestre una canción.

- **/canciones/:id (PUT)** para editar una canción. 

- **/canciones/:id (DELETE)** para eliminar una canción.

- **/generos (GET)** para listar todos los géneros con sus canciones.

_Aclaración_: Para todos los endpoints se debe devolver un json con su código de estado y el resultado correspondiente, en caso de haberlo.




---



## Configurando el proyecto para un entorno de desarrollo

### Instalar las dependencias del proyecto

Se deben instalar las siguientes dependencias:

- **express**
- **sequelize**
- **mysql2**
- **dotenv**


```
		
npm install
		
```
### Configuración de la base de datos

#### Generar el entorno de **DESARROLLO** 

Realizar los siguientes pasos para utilizar el proyecto con una base de datos local:

1. Modificar los parámetros del archivo `\app\config\config.js` con los valores de conexión a una base de datos.

2. Importar el script `\musicando.sql`, *ubicado en el root del proyecto*, en un servidor de base de datos mysql.

3. Ejecutar la aplicación:

    ```
        
    node app/app.js
        
    ```

4. Verificar los datos devueltos por la terminal:

    ~~~

    ---> Para acceder al SERVIDOR REMOTO, ctrl + click en https://dh-crud.herokuapp.com/
    ... o ...
    ---> Para acceder al SERVIDOR LOCAL, ctrl + click en http://localhost:8080
    Executing (default): SELECT 1+1 AS result
    Conexión establecida con base de datos local.
        
    ~~~

5. OPCIONAL: Para vaciar la base de datos y volver a crearla, descomentar el siguiente código dentro del archivo `\app\app.js`. *Luego volver al paso **3** y, luego de verificar el correcto funcionamiento, volver a comentar el código*:

    ~~~

    db.connection.sync({ force: true }).then(() => {
      console.log("Recreación completa de base de datos.");
    });
        
    ~~~

#### Verificar la estructura de la base importada

_La base de datos está compuesta por las siguientes tablas:_

- **Artistas**: `id` INTEGER auto_increment , `nombre` VARCHAR(255), `apellido` VARCHAR(255), PRIMARY KEY (`id`)

- **Canciones**: `id` INTEGER auto_increment , `titulo` VARCHAR(255), `duracion` INTEGER, `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, `updated_at` TIMESTAMP NOT NULL DEFAULT 
CURRENT_TIMESTAMP, `genero_id` INTEGER NOT NULL, `album_id` INTEGER NOT NULL, `artista_id` INTEGER NOT NULL, PRIMARY KEY (`id`), FOREIGN KEY (`genero_id`) REFERENCES `generos` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE, FOREIGN KEY (`album_id`) REFERENCES `albumes` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE, FOREIGN KEY (`artista_id`) REFERENCES `artistas` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE

- **Albumes**: `id` INTEGER auto_increment , `nombre` VARCHAR(255), `duracion` INTEGER, PRIMARY KEY (`id`)

- **Generos**: `id` INTEGER auto_increment , `nombre` VARCHAR(255), PRIMARY KEY (`id`)


---


## Probando en producción los endpoints

### App para realizar las pruebas CRUD con Postman

Descargar e instalar la aplicación **Postman** desde el siguiente link:
- [Link de descarga para Windows 64-bit](https://dl.pstmn.io/download/latest/win64/).

### Empezando a utilizar los endpoints

_Impotante: El envío de solicitudes con Postman se debe hacer por medio de `raw-JSON-body`._
   - Carga de tabla **artistas**
    
      **https://dh-crud.herokuapp.com/api/artistas [POST]**      


      ```
      [
      {
        "nombre": "‎Michael",
        "apellido": "Hutchence"
      },
      {
        "nombre": "‎Steven",
        "apellido": "Tyler"
      },
      {
        "nombre": "‎Liam",
        "apellido": "Gallagher"
      }
      ]
      ```

   - Carga de tabla **albumes**
    
      **https://dh-crud.herokuapp.com/api/albumes [POST]** 

      ```
      [
      {
        "nombre": "Welcome to Wherever You Are",
        "duracion": "2749"
      },
      {
        "nombre": "‎Kick",
        "duracion": "2394"
      },
      {
        "nombre": "‎Permanent Vacation",
        "duracion": "3112"
      },
      {
        "nombre": "‎Don't Believe the Truth",
        "duracion": "2572"
      }
      ]
      ```

  - Carga de tabla **generos**
    
    **https://dh-crud.herokuapp.com/api/generos [POST]** 

      ```
      [
      {
        "nombre": "Rock alternativo"
      },
      {
        "nombre": "‎Hard rock"
      }
      ]
      ```

    - Carga de tabla **canciones**
    
      **https://dh-crud.herokuapp.com/api/canciones [POST]** 

    ```
    [
    {
      "titulo": "Taste It",
      "duracion": "206",
      "genero_id": "1",
      "album_id": "1",
      "artista_id": "1"
    },
    {
      "titulo": "Heaven Sent",
      "duracion": "233",
      "genero_id": "1",
      "album_id": "1",
      "artista_id": "1"
    },
    {
      "titulo": "New Sensation",
      "duracion": "218",
      "genero_id": "1",
      "album_id": "2",
      "artista_id": "1"
    },
    {
      "titulo": "Rag Doll",
      "duracion": "264",
      "genero_id": "2",
      "album_id": "3",
      "artista_id": "2"
    },
    {
      "titulo": "Lyla",
      "duracion": "310",
      "genero_id": "2",
      "album_id": "4",
      "artista_id": "3"
    }
    ]
    ```


#### Usar los endpoints pedidos en el desafío

- `../api/canciones` **[GET]**: [https://dh-crud.herokuapp.com/api/canciones](https://dh-crud.herokuapp.com/api/canciones)

- `../api/canciones` **[POST]**: [https://dh-crud.herokuapp.com/api/canciones](https://dh-crud.herokuapp.com/api/canciones)

    - Ejemplo con Postman **https://dh-crud.herokuapp.com/api/canciones [POST]**:

      ```    
      {
        "titulo": "Let There Be Love",
        "duracion": "331",
        "genero_id": "1",
        "album_id": "4",
        "artista_id": "3"
      }
      ```

- `../api/canciones/:id` **[GET]**: [https://dh-crud.herokuapp.com/api/canciones/:id](https://dh-crud.herokuapp.com/api/canciones/:id)

- `../api/canciones/:id` **[PUT]**: [https://dh-crud.herokuapp.com/api/canciones/:id](https://dh-crud.herokuapp.com/api/canciones/:id)

    - Ejemplo con Postman **https://dh-crud.herokuapp.com/api/canciones/3 [POST]**:

      ```    
      {      
        "genero_id": "2"      
      }
      ```

- `../api/canciones/:id` **[DELETE]**: [https://dh-crud.herokuapp.com/api/canciones/:id](https://dh-crud.herokuapp.com/api/canciones/:id)

    - Ejemplo con Postman **https://dh-crud.herokuapp.com/api/canciones/3 [DELETE]**

    

- `../api/generos` **[GET]**: [https://dh-crud.herokuapp.com/api/generos](https://dh-crud.herokuapp.com/api/generos)


---

## Probando en entorno de desarrollo local los endpoints


La prueba en producción se puede realizar en el entorno de desarrollo, una vez finalizada la configuración de la base de datos local.

Se debe reemplazar las siguientes direcciones, al realizar las pruebas anteriormente mencionadas:

`https://dh-crud.herokuapp.com/` por `http://localhost:8080`
