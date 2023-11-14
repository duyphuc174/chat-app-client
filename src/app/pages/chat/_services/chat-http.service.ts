import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const API_CONVESATIONS_URL = `${environment.apiUrl}/conversations`;
const API_MESSAGES_URL = `${environment.apiUrl}/messages`;

@Injectable({
    providedIn: 'root',
})
export class ChatHttpService {
    constructor(private http: HttpClient) {}

    createConversation(body: any): Observable<any> {
        return this.http.post<any>(`${API_CONVESATIONS_URL}`, body);
    }

    getConversations(params?: { [key: string]: any }): Observable<any> {
        return this.http.get<any>(`${API_CONVESATIONS_URL}`, { params });
    }

    getConversationById(conversationId): Observable<any> {
        return this.http.get<any>(`${API_CONVESATIONS_URL}/${conversationId}`);
    }

    getMessages(conversationId: number, params?: { [key: string]: any }): Observable<any> {
        return this.http.get<any>(`${API_MESSAGES_URL}/${conversationId}`, { params });
    }

    createMessage(body): Observable<any> {
        return this.http.post<any>(`${API_MESSAGES_URL}`, body);
    }
}
