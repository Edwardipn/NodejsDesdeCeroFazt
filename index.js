/** se creo un servidor basico con Node.js que sirve archivos estáticos, en este caso index.html */
/* 
const http = require('http');
const fileSystem = require('fs');
const server = http.createServer((request, response) => {
    const readFile = fileSystem.createReadStream('static/index.html');
    readFile.pipe(response);
});
server.listen(3000);
console.log('Server con Node.js running on port 3000!');
 */
/** Se creo un servidor con Express que hace lo mismo que el servidor básico de Node.js pero con menos código*/
/* 
const express = require('express');
const app = express();
app.get('/', (request, response) => {
    response.sendFile(__dirname + '/static/index.html');
});

app.listen(3000);
console.log('Server con express running on port 3000!');
 */
/** Tomando el servidor con Express creare sus métodos para un CRUD */
const express = require('express');
const morgan = require('morgan');
const app = express();
app.use(morgan('combined'));
/** */
app.get('/about', (request, response) => {
    response.send('Bienvenido a la API desde About');
});
/** Middleware para registrar peticiones */
app.use((request, response, next) => {
    console.log('Middleware ejecutado aqui');
    console.log(`Petición recibida: Método: ${request.method} URL: ${request.url}`);
    next();
});
/** Middleware para validar la operacion de un login */
app.use((request, response, next) => {
    if(request.query.login === 'admin'){
        console.log('Login exitoso');
        next();
    } else {
        console.log('Login fallido');
        response.status(401).send('Unauthorized');
    }
});

/** Método para obtener todos los productos */
app.get('/productos', (request, response) => {
    response.send('Lista de productos');
});
/** Método para crear un nuevo producto */
app.post('/productos', (request, response) => {
    response.send('Producto creado');
});
/** Método para escuchar en el puerto 3000 */
app.listen(3000);
console.log('Server con express running on port 3000!');