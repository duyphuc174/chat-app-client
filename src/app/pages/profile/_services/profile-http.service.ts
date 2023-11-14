import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUserUpdate } from '../_models/profile.model';

const API_USERS_URL = `${environment.apiUrl}/users`;
const API_BASE_URL = `${environment.apiUrl}`;

@Injectable({
    providedIn: 'root',
})
export class ProfileHttpService {
    constructor(private http: HttpClient) {}

    getUsers(): Observable<any[]> {
        return this.http.get<any[]>(`${API_USERS_URL}/getusers/all`);
    }

    getUser(id: number): Observable<any> {
        return this.http.get<any>(`${API_USERS_URL}/getuser/${id}`);
    }

    updateAvatar(body: any): Observable<any> {
        return this.http.post<any>(`${API_BASE_URL}/upload/avatar`, body);
    }

    updateProfile(body: IUserUpdate): Observable<any> {
        return this.http.put<any>(`${API_USERS_URL}/update/user`, body);
    }

    changePassword(body): Observable<any> {
        return this.http.put<any>(`${API_USERS_URL}/set/change-password`, body);
    }
}
