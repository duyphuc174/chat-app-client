import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const API_FRIEND_URL = `${environment.apiUrl}/friends`;
const API_USERS_URL = `${environment.apiUrl}/users`;

@Injectable({
    providedIn: 'root',
})
export class FriendHttpService {
    constructor(private http: HttpClient) {}

    getFriends(): Observable<any> {
        return this.http.get<any>(`${API_USERS_URL}/getusers/all`);
    }

    addFriend(id: number): Observable<any> {
        return this.http.post<any>(`${API_FRIEND_URL}`, { friends: id });
    }

    acceptFriend(id: number): Observable<any> {
        return this.http.post<any>(`${API_FRIEND_URL}/${id}`, {});
    }

    rejectFriend(body) {
        return this.http.delete<any>(`${API_FRIEND_URL}/type/rejected`, body);
    }

    deleteFriend(id: number) {
        return this.http.delete<any>(`${API_FRIEND_URL}/${id}`);
    }
}
