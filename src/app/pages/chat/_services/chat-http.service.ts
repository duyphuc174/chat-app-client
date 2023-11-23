import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const API_BASE_URL = `${environment.apiUrl}`;
const API_CONVESATIONS_URL = `${environment.apiUrl}/conversations`;
const API_MESSAGES_URL = `${environment.apiUrl}/messages`;
const API_REACTION_URL = `${environment.apiUrl}/reactions`;

@Injectable({
    providedIn: 'root',
})
export class ChatHttpService {
    constructor(private http: HttpClient) {}

    createConversation(body: any): Observable<any> {
        return this.http.post<any>(`${API_CONVESATIONS_URL}`, body);
    }

    createConversationByUser(body): Observable<any> {
        return this.http.post<any>(`${API_CONVESATIONS_URL}/message/store`, body);
    }

    getConversations(params?: { [key: string]: any }): Observable<any> {
        return this.http.get<any>(`${API_CONVESATIONS_URL}`, { params });
    }

    getConversationById(conversationId): Observable<any> {
        return this.http.get<any>(`${API_CONVESATIONS_URL}/${conversationId}`);
    }

    getConversationByUserId(userId): Observable<any> {
        return this.http.get<any>(`${API_CONVESATIONS_URL}/byUser/${userId}`);
    }

    getMessages(conversationId: number, params?: { [key: string]: any }): Observable<any> {
        return this.http.get<any>(`${API_MESSAGES_URL}/${conversationId}`, { params });
    }

    getMessagesByUserId(userId: number, params?: { [key: string]: any }): Observable<any> {
        return this.http.post<any>(`${API_MESSAGES_URL}/all/getByUser`, { params: params, user: userId });
    }

    createMessage(body): Observable<any> {
        return this.http.post<any>(`${API_MESSAGES_URL}`, body);
    }

    createImageMessage(body): Observable<any> {
        return this.http.post<any>(`${API_MESSAGES_URL}`, body);
    }

    createReaction(body): Observable<any> {
        return this.http.post<any>(`${API_REACTION_URL}/create`, body);
    }

    deleteReaction(id): Observable<any> {
        return this.http.delete<any>(`${API_REACTION_URL}/delete/${id}`);
    }

    leaveGroup(id) {
        return this.http.post<any>(`${API_BASE_URL}/conversationMember/delete/${id}`, { type: 'leave' });
    }

    addMember(id, data) {
        return this.http.post<any>(`${API_BASE_URL}/conversationMember/add/${id}`, data);
    }

    // leaveConversation(id): Observable<any> {
    //     return this.http.delete<any>(`${API_BASE_URL}/conversationMember/delete/${id}`, {type: 'leave'})
    // }
}
