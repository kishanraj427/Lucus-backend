import * as Models from "../models/AllModels";
import { pool } from "../config/db";

export class UserDbQueryExecuter {
  static async checkUserByEmail(email: string) {
    const sqlData: any[] = [];
    const filters: string[] = [];
    if (email) {
      sqlData.push(email);
      filters.push(" email = ? ");
    }
    const query =
      "SELECT id, name, email, password FROM users WHERE " +
      filters.join(" OR ");
    try {
      const result = await pool.query(query, sqlData);
      return result[0];
    } catch (error) {
      console.error("Error checking user existence:", error);
      throw new Error("Database error");
    }
  }

  static async checkUserById(id: number) {
    const sqlData: any[] = [];
    const filters: string[] = [];
    if (id) {
      sqlData.push(id);
      filters.push(" id = ? ");
    }
    const query =
      "SELECT id, name, email  FROM users WHERE " + filters.join(" OR ");
    try {
      const [rows] = (await pool.query(query, sqlData)) as [Models.User[], any];
      return rows.length ? rows[0] : null;
    } catch (error) {
      console.error("Error checking user existence:", error);
      throw new Error("Database error");
    }
  }

  static async createUser(user: Models.RegisterUserRequest) {
    const query = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
    const sqlData = [user.name, user.email, user.password];
    try {
      const result = await pool.query(query, sqlData);
      return {
        user: {
          id: (result[0] as any).insertId,
          name: user.name,
          email: user.email,
        },
      };
    } catch (error) {
      console.error("Error creating user:", error);
      throw new Error("Database error");
    }
  }

  static async getAllUsers() {
    const query = "SELECT id, name, email FROM users";
    try {
      const result = await pool.query(query);
      return result[0] as Models.User[];
    } catch (error) {
      console.error("Error fetching users:", error);
      throw new Error("Database error");
    }
  }
}
