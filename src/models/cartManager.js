import { promises as fs } from 'fs';
import uuid4 from 'uuid4';

export class CartManager {
  constructor(path) {
    this.path = path;
  }

  async getCartById(id) {
    const carts = JSON.parse(await fs.readFile(this.path, 'utf-8'));
    const cart = carts.find((cart) => cart.id === id);
    return cart;
  }

  async addCart(cart) {
    const carts = JSON.parse(await fs.readFile(this.path, 'utf-8'));
    cart.id = uuid4();
    carts.push(cart);
    await fs.writeFile(this.path, JSON.stringify(carts));
    return cart;
  }

  async addProductToCart(cartId, productId) {
    const carts = JSON.parse(await fs.readFile(this.path, 'utf-8'));
    const cart = carts.find((cart) => cart.id === cartId);

    if (cart) {
      const existingProduct = cart.products.find((product) => product.id === productId);

      if (existingProduct) {
        // Incrementa la cantidad si el producto ya existe en el carrito
        existingProduct.quantity++;
      } else {
        // Agregar el producto al carrito
        cart.products.push({ id: productId, quantity: 1 });
      }

      await fs.writeFile(this.path, JSON.stringify(carts));
      return cart;
    } else {
      return null;
    }
  }
}