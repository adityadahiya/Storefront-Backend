//@ts-ignore
import Client from '../database';

export class DashboardQueries {
  async mostPopularProducts(): Promise<{ name: string; category: string }[]> {
    try {
      //@ts-ignore
      const conn = await Client.connect();
      const sql =
        'SELECT products.name, products.category FROM products INNER JOIN order_products ON products.id = order_products.product_id group by products.id order by count(products.id) LIMIT 5';

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Unable get top products: ${err}`);
    }
  }
}
