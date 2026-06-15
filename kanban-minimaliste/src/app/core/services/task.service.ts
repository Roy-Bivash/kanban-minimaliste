import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';
import { Task, TaskListResponse, TaskResponse, CreateTaskPayload, UpdateTaskPayload } from '../models/task.model';

@Injectable({ providedIn: 'root' })
export class TaskService {

    private url = `${environment.apiUrl}/task`;

    constructor(private http: HttpClient) { }

    getAll(): Observable<Task[]> {
        return this.http.get<TaskListResponse>(this.url).pipe(
            map(res => res.data)
        );
    }

    getById(id: number): Observable<Task> {
        return this.http.get<TaskResponse>(`${this.url}/${id}`).pipe(
            map(res => res.data)
        );
    }

    create(payload: CreateTaskPayload): Observable<Task> {
        return this.http.post<TaskResponse>(this.url, payload).pipe(
            map(res => res.data)
        );
    }

    update(id: number, payload: UpdateTaskPayload): Observable<Task> {
        return this.http.patch<TaskResponse>(`${this.url}/${id}`, payload).pipe(
            map(res => res.data)
        );
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.url}/${id}`);
    }
}