import { Router } from 'express';
import { CartManager } from '../models/cartManager.js';

const cartManager = new CartManager('./carts.json');
const routerCart = Router();

routerCart.get('/:cid', async (req, res) => {
  const { cid } = req.params;
  const cart = await cartManager.getCartById(cid);

  if (cart) {
    res.status(200).send(cart);
  } else {
    res.status(404).send('Carrito no encontrado');
  }
});

routerCart.post('/:cid/product/:pid', async (req, res) => {
  const { cid, pid } = req.params;
  const cart = await cartManager.addProductToCart(cid, pid);

  if (cart) {
    res.status(200).send(cart);
  } else {
    res.status(404).send('Carrito no encontrado');
  }
});

export default routerCart;