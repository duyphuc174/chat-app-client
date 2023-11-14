import { UserModel } from 'src/app/modules/auth/_model/auth.model';

export class ConversationModel {
    id: number;
    creatorId: number;
    name: string;
    type: ConversationType;
    status: ConversationStatus;
    image: string;
    updateAt: Date;
    members: ConvesationMember[];
    lastMessage: MessageContainerItem;
    lastSender: UserModel;
    isRead: boolean;

    setData(data) {
        this.id = data.id;
        this.creatorId = data.creatorId;
        this.name = data.name || '';
        this.type = data.type || ConversationType.SINGLE;
        this.image = data.image || './assets/media/avatars/avatar-blank.jpg';
        this.status = data.status || ConversationStatus.CHATTING;
        if (data.members?.length) {
            this.members = data.members.map((member) => {
                const user = new UserModel();
                user.setData(member);
                return {
                    user: user,
                    role: member.pivot.role,
                };
            });
        } else {
            this.members = [];
        }
        this.updateAt = new Date(data.updated_at);
        if (data.lastMessage) {
            const lm = new MessageContainerItem();
            lm.setData2(data.lastMessage);
            this.lastMessage = lm;
        } else {
            this.lastMessage = undefined;
        }
        if (data.lastMessage) {
            if (data.lastMessage.sender) {
                const u = new UserModel();
                u.setData(data.lastMessage.sender);
                this.lastSender = u;
            } else {
                this.lastSender = new UserModel();
            }
        }
        this.isRead = data.isRead ? data.isRead : false;
    }
}

export class MessageModel {
    id: number;
    type: MessageType;
    content: string;
    isDeleted: boolean;
    isPin: boolean;
    createdAt: Date;
    updateAt: Date;
    userSent: UserModel;
    images: string[];
    messageParent: MessageModel;

    setData(data) {
        this.id = data.id;
        this.type = data.type;
        this.content = data.content;
        this.isDeleted = data.isDeleted;
        this.isPin = data.isPin;
        this.createdAt = new Date(data.created_at);
        this.updateAt = new Date(data.updated_at);
        const user = new UserModel();
        user.setData(data.user);
        this.userSent = user;
        this.images = data.images;
        // this.messageParent = parent;
    }
}

export class MessageContainer {
    user: UserModel;
    messages: MessageContainerItem[] = [];
}

export class MessageContainerItem {
    id: number;
    content: string;
    isDeleted: boolean;
    createdAt: Date;

    setData(data) {
        this.id = data.id;
        this.content = data.content;
        this.isDeleted = data.isDeleted;
        this.createdAt = new Date(data.createdAt);
    }

    setData2(data) {
        this.id = data.id;

        this.content = data.content;
        this.isDeleted = data.isDeleted ? data.isDeleted : false;
        this.createdAt = new Date(data.created_at);
    }
}

export interface IBodyPostMessage {
    conversationId: number;
    type: MessageType;
    content: string;
    parentMessageId?: number;
}

export enum MessageType {
    TEXT = 'text',
    IMAGE = 'image',
    FILE = 'file',
}

export interface ConvesationMember {
    user: UserModel;
    role: ConversationMemberRole;
}

export enum ConversationMemberRole {
    ADMIN = 'administrators',
    MEMBER = 'member',
}

export enum ConversationType {
    GROUP = 'group',
    SINGLE = 'single',
}

export enum ConversationStatus {
    CHATTING = 'texted',
}
