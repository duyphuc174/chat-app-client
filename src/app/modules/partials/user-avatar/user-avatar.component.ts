import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { UserModel } from '../../auth/_model/auth.model';

@Component({
    selector: 'app-user-avatar',
    templateUrl: './user-avatar.component.html',
    styleUrls: ['./user-avatar.component.scss'],
})
export class UserAvatarComponent implements OnInit {
    @HostBinding('class') class: string = 'd-content';
    // image: string = '../../../../assets/media/avatars/avatar-blank.jpg';
    image: string = '../../../../assets/media/avatars/girl.jpg';
    @Input() size: number = 40;
    @Input() borderColor: string = '--bs-white';
    @Input() isHasBorder: boolean = true;
    @Input() isActive: boolean = true;
    @Input() user: UserModel;
    @Input() canClick: boolean = true;
    @Input() borderSize: number = 1;
    activeSize!: number;

    ngOnInit(): void {
        this.activeSize = this.size / 3.5;
    }
}
