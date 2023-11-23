import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICreateUser } from '../_model/auth.model';

const API_AUTH_URL = `${environment.apiUrl}/auth`;
const API_ADMIN_URL = `${environment.apiUrl}/admin`;

@Injectable({
    providedIn: 'root',
})
export class AuthHttpService {
    constructor(private http: HttpClient) {}

    login(body: { account: string; password: string }): Observable<any> {
        return this.http.post<any>(`${API_AUTH_URL}/login`, body);
    }

    register(body: ICreateUser) {
        return this.http.post<any>(`${API_AUTH_URL}/register`, body);
    }

    getUserByToken(token: string): Observable<any> {
        const httpHeaders = new HttpHeaders({
            Authorization: `Bearer ${token}`,
        });
        return this.http.get<any>(`${API_AUTH_URL}/token`, {
            headers: httpHeaders,
        });
    }

    getUsers(): Observable<any> {
        return this.http.get<any>(`${API_ADMIN_URL}/users`);
    }

    deleteUser(id): Observable<any> {
        return this.http.delete<any>(`${API_ADMIN_URL}/user/delete/${id}`);
    }
}
