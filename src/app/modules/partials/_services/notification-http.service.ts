import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const API_NOTIFICATION_URL = `${environment.apiUrl}/notifications`;

@Injectable({
    providedIn: 'root',
})
export class NotificationHttpService {
    constructor(private http: HttpClient) {}

    getNotifications(): Observable<any> {
        return this.http.get<any>(`${API_NOTIFICATION_URL}`);
    }
}
