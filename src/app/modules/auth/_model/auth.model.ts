export class UserModel {
    id: number;
    name: string;
    account: string;
    password: string;
    isActive: boolean;
    avatar: string;
    description: string;
    birthday: Date;
    role: UserRole;
    token: string;
    createdAt: Date;

    setData(data) {
        this.id = data.id;
        this.name = data.fullName;
        this.account = data.account;
        this.password = data.password || '';
        this.avatar = data.avatar ? data.avatar : './assets/media/avatars/avatar-blank.jpg';
        this.isActive = data.active || true;
        this.description = data.description || '';
        this.birthday = new Date(data.dateOfBirth) || null;
        this.role = data.role || UserRole.USER;
        this.createdAt = new Date(data.created_at);
    }
}

export enum UserRole {
    USER = 'user',
    ADMIN = 'admin',
}

export interface ICreateUser {
    account: string;
    password: string;
    password_confirmation: string;
    fullName: string;
    dateOfBirth: string;
}
