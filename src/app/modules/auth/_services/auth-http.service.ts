import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserModel } from '../_model/auth.model';
import { environment } from 'src/environments/environment';

const API_AUTH_URL = `http://127.0.0.1:8000/api/auth`;

@Injectable({
    providedIn: 'root',
})
export class AuthHttpService {
    constructor(private http: HttpClient) {}

    login(body: { account: string; password: string }): Observable<any> {
        return this.http.post<any>(`${API_AUTH_URL}/login`, body);
    }
}
