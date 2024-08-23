# NextJS TypeScript PrimeReact Frontend

Esta es una interfaz de usuario construida con Next,js, TypeScript y PrimeReact que proporciona autenticación y gestión de reservas de habitaciones de hotel.
Para probar el proyecto de forma local debes instalar y correr el repositorio de su API: [`Backend Linktic Reservas`](https://github.com/DuvanR11/register-service).  

## Características

- Gestión de Reservas: listar, crear, actualizar, cancelar, obtener por id.
- Gestión de Usuarios: listar, Registrar.
- Conexión a API mediante REST.
- Seguridad mejorada utilizando variables de entorno para datos sensibles.
- Tipado estático con TypeScript.
- Diseño responsivo.
- Protección CORS.
- Despliegue usando Vercel. 

## Requisitos
- Node.js (v16 o superior)
- npm (v6 o superior) o yarn
- PrimeReact
- API backend

## Despliegue
Este frontend está desplegado usando Vercel. Puedes acceder a la aplicación en la siguiente URL:


## Instalación

Sigue estos pasos para clonar y configurar el proyecto localmente:

1. Clona el repositorio:

   ```bash
   git clone https://github.com/DuvanR11/register-front
   cd register-front

2. Instala las dependencias del proyecto:

    ```bash
    npm install
    ```
    
    o si usas yarn:
   
    ```bash
    yarn install
    ```
    
3. Crea un archivo .env en la raíz del proyecto y define las variables de entorno necesarias:

 [`Copia el contenido del archivo`](https://docs.google.com/document/d/1TGoz_tYcsJwQVXXcoqgCY1rNzQ-CMydFzkRDt9Ipf0s/edit)

4. Ejecuta el servidor en modo de desarrollo:

    ```bash
    npm run dev
    ```

    o si usas yarn:

    ```bash
    yarn dev
    ```

## Scripts Disponibles

- npm run start o yarn start: Ejecuta el codigo en modo de producción.
- npm run build o yarn build: Compila el código TypeScript a JavaScript.
- npm run dev o yarn dev: Ejecuta el servidor en modo de desarrollo.


## Contribución

Si deseas contribuir a este proyecto, por favor abre un issue o envía un pull request con tus cambios.
