import * as AllModels from "../models/AllModels";
import { pool } from "../config/db";
import bcrypt from "bcryptjs";

export class UserDbQueryExecuter {
  static async checkUserByEmail(email: string) {
    const sqlData: any[] = [1];
    const filters: string[] = [" is_active = ? "];
    if (email) {
      sqlData.push(email);
      filters.push(" email = ? ");
    }
    const query =
      `SELECT id, name, email, is_active AS isActive, last_login_at as lastLogin, phone FROM users WHERE ` +
      filters.join(" OR ");
    try {
      const result = await pool.query(query, sqlData);
      return result[0];
    } catch (error) {
      console.error("Error checking user existence:", error);
      throw new Error("Database error");
    }
  }

  static async loginUser(user: AllModels.LogInUserRequest) {
    const sqlData: any[] = [1];
    const filters: string[] = [" is_active = ? "];
    if (user.email) {
      sqlData.push(user.email);
      filters.push(" email = ? ");
    }
    const query =
      `SELECT id, name, email, password, is_active, phone, created_at FROM users WHERE ` +
      filters.join(" OR ");
    try {
      const result = await pool.query(query, sqlData);
      const storedUser = result[0][0];
      const isValidPassword = await bcrypt.compare(
        user.password,
        storedUser.password
      );

      if (isValidPassword) {
        const query = `UPDATE users SET last_login_at = ? WHERE email = ?`;
        const sqlData = [new Date(), user.email];
        await pool.query(query, sqlData);
        return {
          userData: {
            id: storedUser.id,
            name: storedUser.name,
            email: storedUser.email,
            phone: storedUser.phone ?? null,
            isActive: storedUser.is_active ? true : false,
            lastLogin: new Date(),
            createdAt: storedUser.created_at,
            updatedAt: new Date(),
          },
          message: "User logged in successfully",
        };
      } else {
        return { userData: null, message: "Invalid password" };
      }
    } catch (error) {
      console.error("Error checking user existence:", error);
      throw new Error("Database error");
    }
  }

  static async checkUserById(id: number) {
    const sqlData: any[] = [1];
    const filters: string[] = [" is_active = ? "];
    if (id) {
      sqlData.push(id);
      filters.push(" id = ? ");
    }
    const query =
      `SELECT id, name, email, is_active AS isActive, last_login_at AS lastLogin, phone FROM users WHERE ` +
      filters.join(" OR ");
    try {
      const [rows] = (await pool.query(query, sqlData)) as [
        AllModels.User[],
        any,
      ];
      return rows.length ? rows[0] : null;
    } catch (error) {
      console.error("Error checking user existence:", error);
      throw new Error("Database error");
    }
  }

  static async createUser(user: AllModels.RegisterUserRequest) {
    const query = `INSERT INTO users (name, email, password, phone, last_login_at) VALUES (?, ?, ?, ?, ?)`;
    const sqlData = [
      user.name,
      user.email,
      user.password,
      user.phone,
      new Date(),
    ];
    try {
      const result = await pool.query(query, sqlData);
      console.log("User created: ", result[0] as any);
      return {
        user: {
          id: (result[0] as any).insertId,
          name: user.name,
          email: user.email,
          phone: user.phone,
          isActive: true,
          lastLogin: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      };
    } catch (error) {
      console.error("Error creating user:", error);
      throw new Error("Database error");
    }
  }

  static async getAllUsers() {
    const query = `SELECT id, name, email, is_active AS isActive, last_login_at as lastLogin, phone, created_at AS createAt, updated_at AS updatedAt FROM users`;
    try {
      const result = await pool.query(query);
      return result[0] as AllModels.User[];
    } catch (error) {
      console.error("Error fetching users:", error);
      throw new Error("Database error");
    }
  }
}
