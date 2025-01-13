import { CatRepository } from "../../domain/repositories/CatRepository";
import { Http } from "../interfaces/http";

export const catRepository = (client: Http): CatRepository => ({
    cats: async ({ queryParams }) => {
        const url = "/v1/breeds";

        const urlParams = new URLSearchParams();

        if (queryParams?.page) urlParams.append("page", queryParams.page);
        if (queryParams?.limit) urlParams.append("limit", queryParams.limit);

        return await client.get(`${url}?${urlParams.toString()}`);
    },
    catsSearch: async search => {
        const url = "/v1/breeds/search";

        const urlParams = new URLSearchParams();

        urlParams.append("q", search);

        return await client.get(`${url}?${urlParams.toString()}`);
    },
    cat: async (id: string) => {
        const url = `/v1/breeds/${id}`;

        const urlParams = new URLSearchParams();

        urlParams.append("attach_image", "1");

        return client.get(`${url}?${urlParams.toString()}`);
    },
    catPicture: async (imageId: string) => {
        const urlParams = new URLSearchParams();

        const url = `/v1/images/${imageId}`;

        return client.get(`${url}?${urlParams.toString()}`);
    },
});
