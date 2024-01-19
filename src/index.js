import express from 'express';
import routerProd from './routes/products.routes.js';
import routerCart from './routes/carts.routes.js';
import { __dirname } from './path.js';  // Asumiendo que __dirname se exporta correctamente desde path.js
import path from 'path';

const PORT = 8080;
const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/api/products', routerProd);
app.use('/api/carts', routerCart);

// Ruta estática usando __dirname
const publicPath = path.join(__dirname, 'public');
app.use('/static', express.static(publicPath));
console.log(publicPath);

app.listen(PORT, (err) => {
  if (err) {
    console.error('Error al iniciar el servidor:', err);
  } else {
    console.log(`Servidor escuchando en puerto ${PORT}`);
  }
});