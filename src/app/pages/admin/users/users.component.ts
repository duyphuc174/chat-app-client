import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserModel } from 'src/app/modules/auth/_model/auth.model';
import { FriendService } from '../../friends/_services/friend.service';
import { AuthService } from 'src/app/modules/auth';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
    usersSubject: BehaviorSubject<UserModel[]> = new BehaviorSubject<UserModel[]>([]);
    users$: Observable<UserModel[]> = this.usersSubject.asObservable();

    constructor(private auth: AuthService) {}

    ngOnInit(): void {
        this.loadData();
    }

    loadData() {
        this.auth.getUsers().subscribe((res) => {
            this.usersSubject.next(res);
        });
    }

    deleteUser(id) {
        this.auth.deleteUser(id).subscribe((res) => {
            this.loadData();
        });
    }
}
