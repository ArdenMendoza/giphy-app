import { gif } from "./model";

export const gifMapper = (data: gif[]): gif[] => {
    return data.map(d => ({
        title: d.title,
        id: d.id,
        type: d.type,
        embed_url: d.embed_url,
        username: d.username,
        rating: d.rating,
    }))
}