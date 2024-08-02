# Endpoints de Categorías

Base URL: `http://localhost:4000/api/categorias/`

## Obtener Todas las Categorías

**Tipo:** `GET`

**Descripción:** Obtiene una lista de todas las categorías.

**URL:** `http://localhost:4000/api/categorias/`

**Respuesta Exitosa:**
```` json
[
    {
        "_id": "ID de la categoría",
        "nombre": "Nombre de la categoría",
        "descripcion": "Descripción de la categoría",
        "imagen": "/public/images/nombre_de_imagen.png",
        "fechaCreacion": "Fecha de creación",
        "__v": 0
    },
    {
        "_id": "ID de la categoría",
        "nombre": "Nombre de la categoría",
        "descripcion": "Descripción de la categoría",
        "imagen": "/public/images/nombre_de_imagen.png",
        "fechaCreacion": "Fecha de creación",
        "__v": 0
    }
]
```` 

## Obtener una Categoría

**Tipo:** `GET`

**Descripción:** Obtiene una categoría específica por su ID.

**URL:** `:id`

**Respuesta Exitosa:**
```` json
{
    "_id": "ID de la categoría",
    "nombre": "Nombre de la categoría",
    "descripcion": "Descripción de la categoría",
    "imagen": "/public/images/nombre_de_imagen.png",
    "fechaCreacion": "Fecha de creación",
    "__v": 0
}
````

## Crear una Categoría

**Tipo:** `POST`

**Descripción:** Crea una nueva categoría.

**URL:** ``

**Cuerpo de la solicitud:**
```` json
{
    "nombre": "Nombre de la categoría",
    "descripcion": "Descripción de la categoría",
    "imagen": "Archivo de imagen (subido como form-data)"
}
````
**Respuesta Exitosa:**
```` json
{
    "_id": "ID de la categoría",
    "nombre": "Nombre de la categoría",
    "descripcion": "Descripción de la categoría",
    "imagen": "/public/images/nombre_de_imagen.png",
    "fechaCreacion": "Fecha de creación",
    "__v": 0
}
````

## Actualizar una Categoría

**Tipo:** `PUT`

**Descripción:** Actualiza una categoría existente por su ID.

**URL:** `:id`

**Cuerpo de la solicitud:**
```` json
{
    "nombre": "Nuevo nombre de la categoría",
    "descripcion": "Nueva descripción de la categoría",
    "imagen": "Archivo de imagen (subido como form-data)"
}
````
**Respuesta Exitosa:**
```` json
{
    "_id": "ID de la categoría",
    "nombre": "Nuevo nombre de la categoría",
    "descripcion": "Nueva descripción de la categoría",
    "imagen": "/public/images/nuevo_nombre_de_imagen.png",
    "fechaCreacion": "Fecha de creación",
    "__v": 0
}
````

## Eliminar una Categoría

**Tipo:** `DELETE`

**Descripción:** Elimina una categoría existente por su ID.

**URL:** `:id`

**Respuesta Exitosa:**
```` json
{
    "msg": "Categoría eliminada con éxito"
}
````