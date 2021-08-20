// @ts-ignore
import Client from '../database';

export type Order = {
  id?: number;
  status: string;
  userId?: number;
};

export class OrderStore {
  async index(): Promise<Order[]> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = 'SELECT * FROM orders';

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get orders. Error: ${err}`);
    }
  }

  async show(id: string): Promise<Order> {
    try {
      const sql = 'SELECT * FROM orders WHERE id=($1)';
      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find order ${id}. Error: ${err}`);
    }
  }

  async getOrdersByUserId(userId: string): Promise<Order[]> {
    try {
      const sql = 'SELECT * FROM orders WHERE userId=($1)';
      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [userId]);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not find order. Error: ${err}`);
    }
  }

  async create(b: Order): Promise<Order> {
    try {
      const sql =
        'INSERT INTO orders (status, userId) VALUES($1, $2) RETURNING *';
      // @ts-ignore
      const conn = await Client.connect();
      /*let userId = null;
    if (b.userId) {
      userId = b.userId;
    }*/
      const result = await conn.query(sql, [b.status, b.userId]);

      const order = result.rows[0];

      conn.release();

      return order;
    } catch (err) {
      throw new Error(`Could not add new order. Error: ${err}`);
    }
  }

  async delete(id: string): Promise<Order> {
    try {
      const sql = 'DELETE FROM orders WHERE id=($1)';
      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [id]);
      const order = result.rows[0];

      conn.release();

      return order;
    } catch (err) {
      throw new Error(`Could not delete order ${id}. Error: ${err}`);
    }
  }

  async addProduct(
    quantity: number,
    orderId: string,
    productId: string
  ): Promise<Order> {
    try {
      const sql =
        'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *';
      //@ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [quantity, orderId, productId]);

      const order = result.rows[0];

      conn.release();

      return order;
    } catch (err) {
      throw new Error(
        `Could not add product ${productId} to order ${orderId}: ${err}`
      );
    }
  }

  async removeProduct(orderId: string, productId: string): Promise<Order> {
    try {
      const sql =
        'DELETE FROM order_products WHERE order_id = ($1) AND product_id = ($2)';
      //@ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [orderId, productId]);

      const order = result.rows[0];

      conn.release();

      return order;
    } catch (err) {
      throw new Error(
        `Could not remove product ${productId} from order ${orderId}: ${err}`
      );
    }
  }
}
