const express = require('express');
const morgan = require('morgan');

const app = express();
let productos = [
    { id: 1, name: 'Producto 1', price: 10 },
    { id: 2, name: 'Producto 2', price: 20 },
    { id: 3, name: 'Producto 3', price: 30 }
];
app.use(morgan('dev'));
app.use(express.json());

app.get('/productos', (req, res) => {
    res.json(productos);
});

app.post('/productos', (req, res) => {
    const nuevoProducto = { ...req.body, id: productos.length + 1 };
/*     console.log('Cuerpo de la solicitud:', req.body);
    console.log('Nuevo producto recibido:', nuevoProducto); */
    productos.push(nuevoProducto);
    res.send(nuevoProducto);
});

app.put('/productos/:id', (req, res) => {
    const productoEncontrado = productos.find(p => p.id === parseInt(req.params.id));
    if (productoEncontrado) {
        console.log('Actualizando producto con id:', req.params.id);
        productos = productos.map(p => p.id === parseInt(req.params.id) ? { ...p, ...req.body } : p);
        const productoActualizado = productos.find(p => p.id === parseInt(req.params.id));
        console.log('Datos del producto actualizado:', productoActualizado);
        res.json({ message: 'Producto actualizado con id: ' + req.params.id, producto: productoActualizado });
    } else {
        res.status(404).json({ error: 'Producto no encontrado' });
    }
});

app.delete('/productos/:id', (req, res) => {
    const productoEncontrado = productos.find(p => p.id === parseInt(req.params.id));
    if (productoEncontrado) {
        console.log('Eliminando producto con id:', req.params.id);
        productos = productos.filter(p => p.id !== parseInt(req.params.id));
        console.log('Productos después de eliminar:', productos);
        res.json({ message: 'Producto eliminado con id: ' + req.params.id });
    } else {
        res.status(404).json({ error: 'Producto no encontrado' });
    }
});

app.get('/productos/:id', (req, res) => {
    const productoEncontrado = productos.find(p => p.id === parseInt(req.params.id));
    if (productoEncontrado) {
        res.json(productoEncontrado);
    } else {
        res.status(404).json({ error: 'Producto no encontrado' });
    }
});

app.listen(3000);
console.log('Server con express running on port 3000!');