import { Tag } from './tag.model';
import { Status } from '../enums/status.enum';

export interface Task {
    id: number;
    title: string;
    description: string;
    status: Status;
    priority: number;
    tags: Tag[];
    created_at: string;
    updated_at: string;
}

export interface TaskListResponse {
    data: Task[];
}

export interface TaskResponse {
    data: Task;
}

export interface CreateTaskPayload {
    title: string;
    description: string;
    status: Status;
    priority: number;
    tags: number[];
}

export interface UpdateTaskPayload {
    title?: string;
    description?: string;
    status?: Status;
    priority?: number;
    tags?: number[];
}