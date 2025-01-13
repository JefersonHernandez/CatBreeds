import { catService } from "../../domain/services/CatService";
import { axiosInstance } from "../instances/axiosInstance";
import { catRepository } from "../repositories/catRepository";

export const catServiceInstance = catService(catRepository(axiosInstance));
