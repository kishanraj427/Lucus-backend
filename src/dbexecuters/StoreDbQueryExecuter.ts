import * as AllModels from "../models/AllModels";
import { pool } from "../config/db";
import bcrypt from "bcryptjs";

export class StoreDbQueryExecuter {
  static async createStore(store: AllModels.CreateStoreRequest) {
    const query = `INSERT INTO stores (name, description, imageUrl, address, latitude, longitude, pricePerDay, rating) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    const sqlData = [
      store.name,
      store.description,
      store.imageUrl,
      store.address,
      store.location.latitude,
      store.location.longitude,
      store.pricePerDay,
      store.rating,
    ];
    try {
      const result = await pool.query(query, sqlData);
      console.log("User created: ", result[0] as any);
      return {
        store: {
          id: (result[0] as any).insertId,
          name: store.name,
          description: store.description,
          imageUrl: store.imageUrl,
          address: store.address,
          location: {
            latitude: store.location.latitude,
            longitude: store.location.longitude,
          } as AllModels.Location,
          pricePerDay: store.pricePerDay,
          rating: store.rating,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      };
    } catch (error) {
      console.error("Error creating user:", error);
      throw new Error("Database error");
    }
  }

  static async getAllStores(filters: AllModels.GetAllStoreRequest) {
    const query = `SELECT id, name, description, imageUrl, address, latitude, longitude, pricePerDay, rating, is_active AS isActive, created_at AS createAt, updated_at AS updatedAt FROM stores WHERE is_active = 1`;
    try {
      const result = await pool.query(query);
      return result[0] as AllModels.Store[];
    } catch (error) {
      console.error("Error fetching stores:", error);
      throw new Error("Database error");
    }
  }

  static async getStoreById(storeId: number) {
    const fields: string[] = ["id = ?", " is_active = ?"];
    const values: any[] = [storeId, 1];

    const query = `SELECT id, name, description, imageUrl, address, latitude, longitude, pricePerDay, rating, is_active AS isActive, created_at AS createAt, updated_at AS updatedAt FROM stores WHERE ${fields.join(" AND ")}`;
    try {
      const result = await pool.query(query, values);
      return result[0][0] as AllModels.Store;
    } catch (error) {
      console.error("Error fetching store:", error);
      throw new Error("Database error");
    }
  }

  static async updateStore(store: Partial<AllModels.UpdateStoreRequest>) {
    const fields: string[] = [];
    const values: any[] = [];

    if (store.name !== undefined) {
      fields.push("name = ?");
      values.push(store.name);
    }
    if (store.description !== undefined) {
      fields.push("description = ?");
      values.push(store.description);
    }
    if (store.imageUrl !== undefined) {
      fields.push("imageUrl = ?");
      values.push(store.imageUrl);
    }
    if (store.address !== undefined) {
      fields.push("address = ?");
      values.push(store.address);
    }
    if (store.location !== undefined) {
      fields.push("latitude = ?", "longitude = ?");
      values.push(store.location.latitude, store.location.longitude);
    }
    if (store.pricePerDay !== undefined) {
      fields.push("pricePerDay = ?");
      values.push(store.pricePerDay);
    }
    if (store.rating !== undefined) {
      fields.push("rating = ?");
      values.push(store.rating);
    }

    if (fields.length === 0) {
      throw new Error("No valid fields provided for update");
    }

    const query = `UPDATE stores SET ${fields.join(", ")} WHERE id = ? AND is_active`;
    values.push(store.id, 1);

    try {
      await pool.query(query, values);
      return true;
    } catch (error) {
      console.error("Error updating store:", error);
      throw new Error("Database error during update");
    }
  }

  static async deactivateStore(id: number) {
    const query = `
      UPDATE stores 
      SET is_active = FALSE, updated_at = CURRENT_TIMESTAMP 
      WHERE id = ?
    `;
    try {
      await pool.query(query, [id]);
      return true;
    } catch (error) {
      console.error("Error deactivating store:", error);
      throw new Error("Database error during deactivation");
    }
  }
}
