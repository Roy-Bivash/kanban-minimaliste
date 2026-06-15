export interface Tag {
    id: number;
    name: string;
    color: string;
}

export interface TagResponse {
    data: Tag;
}

export interface TagListResponse {
    data: Tag[];
}

export interface CreateTagPayload {
    name: string;
    color: string;
}

export interface UpdateTagPayload {
    name?: string;
    color?: string;
}