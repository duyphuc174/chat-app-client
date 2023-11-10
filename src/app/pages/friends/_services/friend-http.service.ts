import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const API_FRIEND_URL = `${environment.apiUrl}/friends`;

@Injectable({
    providedIn: 'root',
})
export class FriendHttpService {
    constructor(private http: HttpClient) {}

    addFriend(id: number): Observable<any> {
        return this.http.post<any>(`${API_FRIEND_URL}`, { friends: id });
    }

    acceptFriend(id: number): Observable<any> {
        return this.http.post<any>(`${API_FRIEND_URL}/${id}`, {});
    }
}
