import { gif } from "./model";

export const gifMapper = (data: gif[]): gif[] => {
    return data.map(d => ({
        title: d.title,
        id: d.id,
        type: d.type,
        embed_url: d.embed_url,
        username: d.username,
        rating: d.rating,
        user: {
            avatar_url: d.user?.avatar_url,
            profile_url: d.user?.profile_url
        }
    }))
}