import { Injectable } from '@angular/core';
import { ChatHttpService } from './chat-http.service';
import { Observable, catchError, map, of } from 'rxjs';
import { ConversationModel, IBodyPostMessage, MessageModel } from '../_models/chat.model';

@Injectable({
    providedIn: 'root',
})
export class ChatService {
    currentPage: number;

    constructor(private chatHttpService: ChatHttpService) {}

    createConversation(body: any): Observable<any> {
        return this.chatHttpService.createConversation(body).pipe(
            map((res) => {
                return res.data;
            }),
            catchError(() => of(undefined)),
        );
    }

    createConversationByUser(body: any): Observable<any> {
        return this.chatHttpService.createConversationByUser(body).pipe(
            map((res) => {
                return res.data;
            }),
            catchError(() => of(undefined)),
        );
    }

    getConversations(params?: { [key: string]: any }): Observable<ConversationModel[]> {
        return this.chatHttpService.getConversations(params).pipe(
            map((res) => {
                return res.data.map((conversation) => {
                    const conver = new ConversationModel();
                    conver.setData(conversation);
                    return conver;
                });
            }),
            catchError(() => of(undefined)),
        );
    }

    getConversationById(id: number): Observable<ConversationModel> {
        return this.chatHttpService.getConversationById(id).pipe(
            map((res) => {
                const conversation = res;
                const conver = new ConversationModel();
                conver.setData(conversation);
                return conver;
            }),
            catchError(() => of(undefined)),
        );
    }

    getConversationByUserId(id: number): Observable<ConversationModel> {
        return this.chatHttpService.getConversationByUserId(id).pipe(
            map((res) => {
                if (res) {
                    const conver = new ConversationModel();
                    conver.setData(res.data);
                    return conver;
                }
                return null;
            }),
            catchError(() => of(undefined)),
        );
    }

    getMessages(conversationId: number, params?: { [key: string]: any }): Observable<MessageModel[]> {
        return this.chatHttpService.getMessages(conversationId, params).pipe(
            map((res) => {
                this.currentPage = res.message.current_page || 1;
                return res.message.data.map((message) => {
                    const mess = new MessageModel();
                    mess.setData(message);
                    return mess;
                });
            }),
            catchError(() => of(undefined)),
        );
    }

    getMessagesByUserId(userId: number, params?: { [key: string]: any }): Observable<MessageModel[]> {
        return this.chatHttpService.getMessagesByUserId(userId, params).pipe(
            map((res) => {
                this.currentPage = res.message.current_page || 1;
                return res.message.data.map((message) => {
                    const mess = new MessageModel();
                    mess.setData(message);
                    return mess;
                });
            }),
            catchError(() => of(undefined)),
        );
    }

    createMessage(body: IBodyPostMessage): Observable<any> {
        return this.chatHttpService.createMessage(body).pipe(
            map((res) => res),
            catchError(() => of(undefined)),
        );
    }

    createImageMessage(body): Observable<any> {
        return this.chatHttpService.createImageMessage(body).pipe(
            map((res) => res),
            catchError(() => of(undefined)),
        );
    }

    createReaction(body): Observable<any> {
        return this.chatHttpService.createReaction(body).pipe(
            map((res) => res),
            catchError(() => of(undefined)),
        );
    }

    deleteReaction(id): Observable<any> {
        return this.chatHttpService.deleteReaction(id).pipe(
            map((res) => res),
            catchError(() => of(undefined)),
        );
    }

    leaveGroup(id): Observable<any> {
        return this.chatHttpService.leaveGroup(id).pipe(
            map((res) => res),
            catchError(() => of(undefined)),
        );
    }

    addMember(id, data): Observable<any> {
        return this.chatHttpService.addMember(id, data).pipe(
            map((res) => res),
            catchError(() => of(undefined)),
        );
    }
}
