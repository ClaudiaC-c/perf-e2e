const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hola Claudia 🚀, tu aplicación Node.js está corriendo!');
});

app.get('/productos', (req, res) => {
  res.json([
    { id: 1, nombre: "Producto A", precio: 100 },
    { id: 2, nombre: "Producto B", precio: 200 }
  ]);
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
