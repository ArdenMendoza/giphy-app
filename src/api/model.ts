export interface IGifItem {
    type: string;
    id: string;
    url: string;
    username: string;
    title: string;
    rating: string;
    user: {
        avatar_url: string;
        profile_url: string;
    }
}

export interface IPagination {
    total_count: number;
    count: number;
    offset: number;
}