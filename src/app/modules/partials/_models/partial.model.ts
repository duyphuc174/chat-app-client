import { UserModel } from '../../auth/_model/auth.model';

export class NotificationModel {
    id: number;
    content: string;
    sender: UserModel;
    type: NotificationType;
    isRead: boolean;
    createAt: Date;

    setData(data: any) {
        this.id = data.id;
        this.type = data.type;
        this.content =
            this.type === NotificationType.INVITATION
                ? 'đã gửi cho bạn lời mời kết bạn'
                : 'đã chấp nhận lời mời kết bạn';
        if (data.sender) {
            const user = new UserModel();
            user.setData(data.sender);
            this.sender = user;
        }
        this.sender;
        this.isRead = data.isRead;
        this.createAt = new Date(data.created_at);
    }
}

export enum NotificationType {
    INVITATION = 'invitation',
}

export function transformDateToText(date: Date): string {
    const currentDate: Date = new Date();
    const timeDifference: number = currentDate.getTime() - date.getTime();
    const secondsInMilli = 1000;
    const minutesInMilli = secondsInMilli * 60;
    const hoursInMilli = minutesInMilli * 60;
    const daysInMilli = hoursInMilli * 24;
    const weeksInMilli = daysInMilli * 7;
    const yearsInMilli = daysInMilli * 365;

    let result = '';

    switch (true) {
        case timeDifference < minutesInMilli:
            result = `${Math.round(timeDifference / secondsInMilli)} giây trước`;
            break;
        case timeDifference < hoursInMilli:
            result = `${Math.round(timeDifference / minutesInMilli)} phút trước`;
            break;
        case timeDifference < daysInMilli:
            result = `${Math.round(timeDifference / hoursInMilli)} giờ trước`;
            break;
        case timeDifference < weeksInMilli:
            result = `${Math.round(timeDifference / daysInMilli)} ngày trước`;
            break;
        case timeDifference < yearsInMilli:
            result = `${Math.round(timeDifference / weeksInMilli)} tuần trước`;
            break;
        default:
            result = `${Math.round(timeDifference / yearsInMilli)} năm trước`;
            break;
    }

    return result;
}
