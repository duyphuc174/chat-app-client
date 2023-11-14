import { UserModel } from 'src/app/modules/auth/_model/auth.model';

export class FriendModel {
    user: UserModel;
    friendStatus: FriendStatus;

    setData(data) {
        this.friendStatus = data.friend_status;
        const u = new UserModel();
        u.setData(data.user);
        this.user = u;
    }
}

export enum FriendStatus {
    NO_RELATIVE = 'no-relative',
    ACCEPTED = 'accepted',
    WAITING_FOR_ACCEPT = 'waiting-for-accept',
    GET_AN_INVITATION = 'get-an-invitation',
    BLOCKED = 'blocked',
}

export function getTextFriendStatus(status: FriendStatus): string {
    switch (status) {
        case FriendStatus.ACCEPTED:
            return 'Bạn bè';
        case FriendStatus.WAITING_FOR_ACCEPT:
            return 'Đã gửi lời mời';
        case FriendStatus.GET_AN_INVITATION:
            return 'Chấp nhận';
        case FriendStatus.BLOCKED:
            return 'Đang chặn';
        case FriendStatus.NO_RELATIVE:
            return 'Thêm bạn bè';
        default:
            return 'Thêm bạn bè';
    }
}
