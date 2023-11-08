import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const API_USERS_URL = `${environment.apiUrl}/users`;
const API_BASE_URL = `${environment.apiUrl}`;

@Injectable({
    providedIn: 'root',
})
export class ProfileHttpService {
    constructor(private http: HttpClient) {}

    getUsers(): Observable<any[]> {
        return this.http.get<any[]>(`${API_USERS_URL}`);
    }

    getUser(id: number): Observable<any> {
        return this.http.get<any>(`${API_USERS_URL}/${id}`);
    }

    updateAvatar(body: any): Observable<any> {
        return this.http.post<any>(`${API_BASE_URL}/upload/avatar`, body);
    }
}
