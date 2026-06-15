import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';
import { Tag, TagListResponse, TagResponse, CreateTagPayload, UpdateTagPayload } from '../models/tag.model';

@Injectable({ providedIn: 'root' })
export class TagService {

    private url = `${environment.apiUrl}/tag`;

    constructor(private http: HttpClient) { }

    getAll(): Observable<Tag[]> {
        return this.http.get<TagListResponse>(this.url).pipe(
            map(res => res.data)
        );
    }

    getById(id: number): Observable<Tag> {
        return this.http.get<TagResponse>(`${this.url}/${id}`).pipe(
            map(res => res.data)
        );
    }

    create(payload: CreateTagPayload): Observable<Tag> {
        return this.http.post<TagResponse>(this.url, payload).pipe(
            map(res => res.data)
        );
    }

    update(id: number, payload: UpdateTagPayload): Observable<Tag> {
        return this.http.patch<TagResponse>(`${this.url}/${id}`, payload).pipe(
            map(res => res.data)
        );
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.url}/${id}`);
    }
}