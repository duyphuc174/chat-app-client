import { UserModel } from 'src/app/modules/auth/_model/auth.model';

export class FriendModel {
    user: UserModel;
    friendStatus: FriendStatus;
}

export enum FriendStatus {
    NO_RELATIVE = 'no-relative',
    ACCEPTED = 'accepted',
    WAITING_FOR_ACCEPT = 'waiting-for-accept',
    GET_AN_INVITATION = 'get-an-invitation',
    BLOCKED = 'blocked',
}
