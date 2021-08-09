
// @ts-ignore
import Client from '../database';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

//dotenv.config();

/*const {
  BCRYPT_PASSWORD,
  SALT_ROUNDS
} = process.env */

export type User = {
  id?: number;
  username: string;
  firstname?: string;
  lastname?: string;
  password: string;
  token?: string;
};

export class UserStore {
  async index(): Promise<User[]> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = 'SELECT * FROM users';

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get users. Error: ${err}`);
    }
  }

  async show(id: string): Promise<User> {
    try {
      const sql = 'SELECT * FROM users WHERE id=($1)';
      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find order ${id}. Error: ${err}`);
    }
  }

  async delete(id: string): Promise<User> {
    try {
      const sql = 'DELETE FROM users WHERE id=($1)';
      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [id]);

      const book = result.rows[0];

      conn.release();

      return book;
    } catch (err) {
      throw new Error(`Could not delete order ${id}. Error: ${err}`);
    }
  }

  async create(u: User): Promise<User> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql =
        'INSERT INTO users (firstname, lastname, username, password_digest) VALUES($1, $2, $3, $4) RETURNING *';

      const hash = bcrypt.hashSync(
        u.password + process.env.BCRYPT_PASSWORD,
        parseInt(process.env.SALT_ROUNDS!)
      );

      const result = await conn.query(sql, [
        u.firstname,
        u.lastname,
        u.username,
        hash
      ]);
      const user = result.rows[0];

      conn.release();

      return user;
    } catch (err) {
      throw new Error(`unable create user (${u.username}): ${err}`);
    }
  }

  async authenticate(username: string, password: string): Promise<User | null> {
    //@ts-ignore
    const conn = await Client.connect();
    const sql = 'SELECT password_digest FROM users WHERE username=($1)';

    const result = await conn.query(sql, [username]);

    if (result.rows.length) {
      const user = result.rows[0];

      if (
        bcrypt.compareSync(
          password + process.env.BCRYPT_PASSWORD,
          user.password_digest
        )
      ) {
        return user;
      }
    }

    return null;
  }
}
