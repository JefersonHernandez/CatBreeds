import { CatRepository } from "../repositories/CatRepository";

export const catService = (repository: CatRepository): CatRepository => ({
    ...repository,
});
