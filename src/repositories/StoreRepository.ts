import { StoreDbQueryExecuter } from "../dbexecuters/StoreDbQueryExecutore";
import * as AllModels from "../models/AllModels";
export class StoreRepository {
  static async getAllStores(filters: AllModels.GetAllStoreRequest) {
    const response: AllModels.GetAllStoreResponse = {
      message: "Failed to fetch stores data",
      isSuccess: false,
      stores: [],
    };
    const stores = await StoreDbQueryExecuter.getAllStores(filters);
    if (stores) {
      response.message = "Store fetched successfully";
      response.isSuccess = true;
      response.stores = stores;
    }
    return response;
  }

  static async createStore(store: AllModels.CreateStoreRequest) {
    const response: AllModels.CreateStoreResponse = {
      message: "Failed to create store",
      isSuccess: false,
    };
    const createdStore = await StoreDbQueryExecuter.createStore(store);
    if (createdStore) {
      response.message = "Store fetched successfully";
      response.isSuccess = true;
      response.store = createdStore.store;
    }
    return response;
  }

  static async updateStore(store: AllModels.UpdateStoreRequest) {
    const response: AllModels.UpdateStoreResponse = {
      message: "Failed to update store data",
      isSuccess: false,
    };
    const updatedStore = await StoreDbQueryExecuter.upadateStore(store);
    if (updatedStore) {
      response.message = "Store fetched successfully";
      response.isSuccess = true;
      response.store = updatedStore;
    }
    return response;
  }

  static async deactivateStore({ id }: AllModels.DeactivateStoreRequest) {
    const response: AllModels.DeactivateStoreResponse = {
      message: "Failed to deactivate store",
      isSuccess: false,
    };
    const stores = await StoreDbQueryExecuter.deactivateStore(id);
    if (stores) {
      response.message = "Store deactivated successfully";
      response.isSuccess = true;
    }
    return response;
  }
}
