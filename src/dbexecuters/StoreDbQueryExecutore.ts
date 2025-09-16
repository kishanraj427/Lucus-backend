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
      store.Location.latitude,
      store.Location.longitude,
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
            latitude: store.Location.latitude,
            longitude: store.Location.longitude,
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
    const query = `SELECT id, name, description, imageUrl, address, latitude, longitude, pricePerDay, rating, is_active AS isActive, created_at AS createAt, updated_at AS updatedAt FROM stores`;
    try {
      const result = await pool.query(query);
      return result[0] as AllModels.Store[];
    } catch (error) {
      console.error("Error fetching stores:", error);
      throw new Error("Database error");
    }
  }
}
