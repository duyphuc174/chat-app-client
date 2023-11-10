import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from 'src/app/modules/auth';
import { UserModel } from 'src/app/modules/auth/_model/auth.model';
import { ProfileService } from '../_services/profile.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ProfileUpdateModalComponent } from '../profile-update-modal/profile-update-modal.component';
import { FriendStatus } from '../../friends/_models/friend.model';
import { FriendService } from '../../friends/_services/friend.service';

@Component({
    selector: 'app-profile-card',
    templateUrl: './profile-card.component.html',
    styleUrls: ['./profile-card.component.scss'],
})
export class ProfileCardComponent implements OnInit {
    profileId: number;

    imgFile: File;
    userLogged: UserModel;

    userSubject: BehaviorSubject<UserModel> = new BehaviorSubject<UserModel>(null);
    user$: Observable<UserModel> = this.userSubject.asObservable();

    friendStatus = FriendStatus;
    status: FriendStatus;

    isLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    isLoading$: Observable<boolean> = new Observable<boolean>();

    constructor(
        private activateRoute: ActivatedRoute,
        private router: Router,
        private authService: AuthService,
        private profileService: ProfileService,
        private bsModalService: BsModalService,
        private friendService: FriendService,
    ) {}

    ngOnInit(): void {
        this.loadData();
    }

    loadData() {
        this.isLoadingSubject.next(true);
        this.userLogged = this.authService.currentUserValue;

        this.activateRoute.params.subscribe((param) => {
            this.profileId = +param.id;
            if (this.profileId) {
                if (this.profileId === this.userLogged.id) {
                    this.userSubject.next(this.userLogged);
                } else {
                    this.profileService.getUser(this.profileId).subscribe((res) => {
                        this.userSubject.next(res.user);
                        this.status = res.friendStatus;
                    });
                }
            } else {
                this.router.navigate(['/home']).then();
            }
            this.isLoadingSubject.next(false);
        });
    }

    changeAvatar(event: Event | any) {
        if (this.profileId !== this.userLogged.id) {
            return;
        }

        if (event.target.files && event.target.files[0]) {
            this.imgFile = event.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(this.imgFile);
        }

        if (this.imgFile) {
            const formData = new FormData();
            formData.append('file[]', this.imgFile);

            this.profileService.updateAvatar(formData).subscribe((user) => {
                if (user) {
                    this.authService.currentUserSubject.next(user);
                    this.userSubject.next(user);
                }
            });
        }
    }

    openModalUpdateUser() {
        const initialState = {
            userLogged: this.userLogged,
        };
        this.bsModalService.show(ProfileUpdateModalComponent, { initialState });
    }

    submitFriend() {
        switch (this.status) {
            case this.friendStatus.NO_RELATIVE:
                this.friendService.addFriend(this.profileId).subscribe((res) => {
                    this.status = this.friendStatus.WAITING_FOR_ACCEPT;
                });
                break;
            case this.friendStatus.GET_AN_INVITATION:
                this.friendService.acceptFriend(this.profileId).subscribe((res) => {
                    this.status = this.friendStatus.ACCEPTED;
                });
                break;
            default:
                return;
        }
    }
}
