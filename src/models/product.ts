// @ts-ignore
import Client from '../database';

export type Product = {
  id?: number;
  name: string;
  price: number;
  category: string;
  imageURL?: string;
};

export class ProductStore {
  async index(): Promise<Product[]> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = 'SELECT * FROM products';

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get products. Error: ${err}`);
    }
  }

  async show(id: string): Promise<Product> {
    try {
      const sql = 'SELECT * FROM products WHERE id=($1)';
      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find product ${id}. Error: ${err}`);
    }
  }

  async getProductsByOrderId(orderId: string): Promise<Product[]> {
    try {
      const sql = 'SELECT * FROM products WHERE id IN (SELECT product_id FROM order_products WHERE order_id=($1))';
      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [orderId]);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not find any product. Error: ${err}`);
    }
  }

  async create(b: Product): Promise<Product> {
    try {
      const sql =
        'INSERT INTO products (name, price, category, imageURL) VALUES($1, $2, $3, $4) RETURNING *';
      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [b.name, b.price, b.category, b.imageURL]);

      const book = result.rows[0];

      conn.release();

      return book;
    } catch (err) {
      throw new Error(`Could not add new product ${b.name}. Error: ${err}`);
    }
  }

  async delete(id: string): Promise<Product> {
    try {
      const sql = 'DELETE FROM products WHERE id=($1)';
      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [id]);

      const book = result.rows[0];

      conn.release();

      return book;
    } catch (err) {
      throw new Error(`Could not delete product ${id}. Error: ${err}`);
    }
  }

  async productByCategory(category: string): Promise<Product> {
    try {
      const sql = 'SELECT * FROM products WHERE category=($1)';
      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [category]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not find product with category ${category}. Error: ${err}`
      );
    }
  }
}
