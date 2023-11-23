import { Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { UserModel } from 'src/app/modules/auth/_model/auth.model';
import { ProfileService } from 'src/app/pages/profile/_services/profile.service';
import { ChatService } from '../../_services/chat.service';
import {
    ConversationModel,
    IBodyPostMessage,
    MessageContainer,
    MessageContainerItem,
    MessageModel,
    MessageType,
} from '../../_models/chat.model';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { PusherService } from 'src/app/modules/partials/_services/pusher.service';
import { AuthService } from 'src/app/modules/auth';
import { FriendModel } from 'src/app/pages/friends/_models/friend.model';

@Component({
    selector: 'app-chat-box',
    templateUrl: './chat-box.component.html',
    styleUrls: ['./chat-box.component.scss'],
})
export class ChatBoxComponent implements OnInit, OnChanges, OnDestroy {
    @ViewChild('textarea', { static: false }) _textarea: ElementRef;
    userId: number;
    ownerId: number;
    conversationId: number;
    form: UntypedFormGroup;
    type: any = 'group';

    isShowMenu: boolean = true;
    conversationSubject: BehaviorSubject<ConversationModel> = new BehaviorSubject<ConversationModel>(undefined);
    conversation$: Observable<ConversationModel> = this.conversationSubject.asObservable();

    isLoadSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    isLoading$: Observable<boolean> = this.isLoadSubject.asObservable();

    isLoadSendMessageSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    isLoadSendMessage$: Observable<boolean> = this.isLoadSubject.asObservable();

    messageList: MessageModel[];
    messageContainers: MessageContainer[] = [];
    messageContainer: MessageContainer = new MessageContainer();

    currentUserMessage: UserModel;

    pusherChannelName: string = 'messages';
    pusherChannelEvents: string = '';

    routeSubscription: Subscription;

    currentPage: number;

    canViewMore: boolean = true;

    imgPreview: string = '';
    imageFile: File;

    user: FriendModel;

    messageResponse: {
        user: UserModel;
        content: string;
        messageId: number;
    };

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private profileService: ProfileService,
        private chatService: ChatService,
        private fb: UntypedFormBuilder,
        private pusherService: PusherService,
        private auth: AuthService,
    ) {
        activatedRoute.data.subscribe((res) => {
            this.type = res.type;
        });

        this.routeSubscription = this.activatedRoute.params.subscribe((param) => {
            if (this.type === 'single') {
                this.userId = +param.id;

                this.loadDataSingle();
            }
            if (this.type === 'group') {
                this.ownerId = this.auth.currentUserValue.id;
                this.conversationId = +param.id;
                this.loadPusher();
                this.loadData();
            }
        });
    }
    ngOnInit(): void {
        this.initForm();
    }

    initForm() {
        this.form = this.fb.group({
            content: [''],
        });
    }

    loadData(reload: boolean = false) {
        this.canViewMore = true;
        this.messageContainers = [];
        this.currentUserMessage = undefined;
        this.isLoadSubject.next(true);
        this.chatService.getConversationById(this.conversationId).subscribe((res) => {
            if (res) {
                this.conversationSubject.next(res);
            }
            this.isLoadSubject.next(false);
        });
        this.loadMessages();
    }

    loadDataSingle() {
        this.canViewMore = true;
        this.messageContainers = [];
        this.currentUserMessage = undefined;
        this.isLoadSubject.next(true);
        this.chatService.getConversationByUserId(this.userId).subscribe((res) => {
            if (res) {
                this.conversationSubject.next(res);
                this.conversationId = res.id;
                console.log(this.conversationId);
                this.loadPusher();
                this.loadMessages();
            } else {
                this.profileService.getUser(this.userId).subscribe((res) => {
                    this.user = res;
                    console.log(res);
                });
            }
            this.isLoadSubject.next(false);
        });
    }

    loadMessages(reload: boolean = false) {
        if (!this.canViewMore) {
            return;
        }
        this.currentPage = reload ? this.chatService.currentPage + 1 : 1;

        this.chatService.getMessages(this.conversationId, { page: this.currentPage }).subscribe((res) => {
            this.messageList = res;
            console.log(this.messageList);

            if (res.length < 20) {
                this.canViewMore = false;
            }

            if (reload) {
                this.messageList.forEach((mess) => {
                    this.pushNewMessage(mess);
                });
            } else {
                this.converMessagesToContainer();
            }
        });
    }

    converMessagesToContainer() {
        if (!this.messageList.length) {
            return;
        }
        if (!this.currentUserMessage) {
            this.currentUserMessage = this.messageList[0].userSent;
        }

        this.messageList.forEach((message) => {
            const messContainerItem = new MessageContainerItem();
            messContainerItem.setData(message);

            if (this.currentUserMessage?.id !== message.userSent.id) {
                this.messageContainer.user = this.currentUserMessage;
                this.currentUserMessage = message.userSent;
                this.messageContainers.push(this.messageContainer);
                this.messageContainer = new MessageContainer();
            }
            this.messageContainer.messages.unshift(messContainerItem);
        });
        this.messageContainer.user = this.currentUserMessage;
        this.messageContainers.push(this.messageContainer);
    }

    sendMessage() {
        const content = this.form.value.content;
        if (!content || this.isLoadSendMessageSubject.value) {
            return;
        }

        this.isLoadSendMessageSubject.next(true);

        if (this.user) {
            const body = {
                type: 'text',
                user: this.user.user.id,
                content: content,
            };
            this.chatService.createConversationByUser(body).subscribe((res) => {
                window.location.reload();
            });
        } else {
            const body: IBodyPostMessage = {
                conversationId: this.conversationId,
                content: content,
                type: MessageType.TEXT,
            };

            if (this.messageResponse) {
                body.parentMessageId = this.messageResponse.messageId;
            }

            this.chatService.createMessage(body).subscribe((res) => {
                if (!res.status) {
                    this.form.reset();
                    if (this.messageResponse) {
                        this.deleteMessageResponse();
                    }
                }
                this.isLoadSendMessageSubject.next(false);
            });
        }
    }

    loadPusher() {
        this.pusherService.setChannel(this.pusherChannelName);
        this.pusherChannelEvents = `messages-sent-${this.conversationId}`;
        this.pusherService.bind(this.pusherChannelEvents, (res) => {
            console.log(res);

            const mess = new MessageModel();
            mess.setData(res.data);
            this.insertNewMessage(mess);
        });
    }

    insertNewMessage(message: MessageModel) {
        const messContainerItem = new MessageContainerItem();
        messContainerItem.setData(message);

        if (this.messageContainers.length > 0) {
            if (this.messageContainers[0].user.id === message.userSent.id) {
                this.messageContainers[0].messages.push(messContainerItem);
            } else {
                const messContainer = new MessageContainer();
                messContainer.user = message.userSent;
                messContainer.messages.push(messContainerItem);
                this.messageContainers.unshift(messContainer);
            }
        } else {
            const messContainer = new MessageContainer();
            messContainer.user = message.userSent;
            messContainer.messages.push(messContainerItem);
            this.messageContainers.unshift(messContainer);
        }
    }

    pushNewMessage(message: MessageModel) {
        const messContainerItem = new MessageContainerItem();
        messContainerItem.setData(message);
        if (this.messageContainers.length > 0) {
            if (this.messageContainers[this.messageContainers.length - 1].user.id === message.userSent.id) {
                this.messageContainers[this.messageContainers.length - 1].messages.unshift(messContainerItem);
            } else {
                const messContainer = new MessageContainer();
                messContainer.user = message.userSent;
                messContainer.messages.unshift(messContainerItem);
                this.messageContainers.push(messContainer);
            }
        } else {
            const messContainer = new MessageContainer();
            messContainer.user = message.userSent;
            messContainer.messages.unshift(messContainerItem);
            this.messageContainers.push(messContainer);
        }
    }

    addContent(content) {
        const curContent = this.form.get('content').value;
        const newContent = curContent + content;
        this.form.patchValue({ content: newContent });
    }

    showMenu() {
        this.isShowMenu = !this.isShowMenu;
    }

    adjustTextareaHeight(textarea: ElementRef) {
        const element = textarea.nativeElement;
        element.style.height = 'auto';
        element.style.height = element.scrollHeight + 2 + 'px';
    }

    ngOnChanges(changes: SimpleChanges): void {}

    setMessageResponse({ user, content, id }) {
        this.messageResponse = {
            user,
            content,
            messageId: id,
        };
    }

    deleteMessageResponse() {
        this.messageResponse = undefined;
    }

    readURL(event: Event | any) {
        if (event.target.files && event.target.files[0]) {
            this.imageFile = event.target.files[0];
            const reader = new FileReader();
            reader.onload = () => (this.imgPreview = reader.result as string);
            reader.readAsDataURL(this.imageFile);
        }
    }

    sendImageMessage() {
        if (!this.imageFile && !this.imgPreview) {
            return;
        }
        const formData = new FormData();
        formData.append('file[]', this.imageFile);
        formData.append('type', 'image');
        formData.append('conversationId', this.conversationId.toString());
        this.chatService.createImageMessage(formData).subscribe((res) => {
            this.cancelUploadImage();
        });
    }

    cancelUploadImage() {
        this.imgPreview = '';
        this.imageFile = null;
    }

    ngOnDestroy(): void {
        this.canViewMore = true;
        this.messageContainers = [];
        this.currentUserMessage = undefined;
        this.routeSubscription.unsubscribe();
    }
}
