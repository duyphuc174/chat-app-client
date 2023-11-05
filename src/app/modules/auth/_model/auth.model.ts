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

    setData(data) {
        this.id = data.id;
        this.name = data.fullName;
        this.account = data.account;
        this.password = data.password || '';
        this.avatar = data.avatar || '';
        this.isActive = data.active || true;
        this.description = data.description || '';
        this.birthday = data.dateOfBirth || null;
        this.role = data.role || UserRole.USER;
    }
}

export enum UserRole {
    USER = 'user',
    ADMIN = 'admin',
}