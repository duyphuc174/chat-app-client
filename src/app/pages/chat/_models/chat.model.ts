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
        this.type = data.type || ConversationType.SINGLE;
        this.status = data.status || ConversationStatus.CHATTING;
        this.updateAt = new Date(data.updated_at);

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

        this.name = data.name || '';
        this.image = data.image || './assets/media/avatars/avatar-blank.jpg';
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
    messageParent: ParentMessage;
    reactions: string[];

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
        if (data.parents) {
            const mess = new ParentMessage();
            mess.setData(data.parents);
            this.messageParent = mess;
        }
        if (data?.reaction?.length) {
            this.reactions = [];
            data?.reaction.forEach((react) => {
                this.reactions.push(react.reaction);
            });
        } else {
            this.reactions = null;
        }
    }
}

export class ParentMessage {
    id: number;
    content: string;
    images: string[];

    setData(data) {
        this.id = data.id;
        this.content = data.content;
        this.images = data.images;
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
    parentMessage: ParentMessage;
    image: string;
    type: MessageType;
    reactions: string[];

    setData(data) {
        this.id = data.id;
        this.content = data.content;
        this.isDeleted = data.isDeleted;
        this.createdAt = new Date(data.createdAt);
        if (data.messageParent) {
            const mess = new ParentMessage();
            mess.setData(data.messageParent);
            this.parentMessage = mess;
        }
        if (data?.images?.length) {
            this.image = data.images[0].file;
        }
        this.type = data.type;
        if (data?.reactions?.length) {
            this.reactions = data.reactions;
        } else {
            this.reactions = null;
        }
    }

    setData2(data) {
        this.id = data.id;

        this.content = data.content;
        this.isDeleted = data.isDeleted ? data.isDeleted : false;
        this.createdAt = new Date(data.created_at);
    }
}

export const listReactions = [
    {
        name: 'like',
        content: '👍',
    },
    {
        name: 'tym',
        content: '❤️',
    },
    {
        name: 'haha',
        content: '😂',
    },
    {
        name: 'sad',
        content: '😞',
    },
    {
        name: 'angry',
        content: '😡',
    },
];

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
