import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FriendsComponent } from './friends.component';
import { FriendsFindComponent } from './components/friends-find/friends-find.component';
import { FriendsRequestComponent } from './components/friends-request/friends-request.component';
import { FriendsListComponent } from './components/friends-list/friends-list.component';

const routes: Routes = [
    {
        path: '',
        component: FriendsComponent,
        children: [
            {
                pathMatch: 'full',
                path: '',
                redirectTo: 'find',
            },
            {
                path: 'find',
                component: FriendsFindComponent,
            },
            {
                path: 'list',
                component: FriendsListComponent,
            },
            {
                path: 'request',
                component: FriendsRequestComponent,
            },
        ],
    },
];

@NgModule({
    declarations: [],
    imports: [RouterModule.forChild(routes)],
})
export class FriendsRoutingModule {}
