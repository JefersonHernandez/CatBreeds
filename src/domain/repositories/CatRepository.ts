import { Cat } from "../models/Cat";
import { Picture } from "../models/Picture";

export interface CatRepository {
    cats: ({
        queryParams,
    }: {
        queryParams: Record<string, string>;
    }) => Promise<Cat[]>;
    catsSearch: (search: string) => Promise<Cat[]>;
    cat: (id: string) => Promise<Cat>;
    catPicture: (imageId: string) => Promise<Picture>;
}
