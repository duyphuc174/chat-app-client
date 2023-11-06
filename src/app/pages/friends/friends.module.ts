import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FriendsRoutingModule } from './friends-routing.module';
import { FriendsComponent } from './friends.component';
import { FriendsListComponent } from './components/friends-list/friends-list.component';
import { FriendsMenuComponent } from './components/friends-menu/friends-menu.component';
import { PartialModule } from 'src/app/modules/partials/partial.module';
import { FriendsFindComponent } from './components/friends-find/friends-find.component';
import { FriendsRequestComponent } from './components/friends-request/friends-request.component';
import { RouterModule } from '@angular/router';
import { FriendsItemComponent } from './components/friends-item/friends-item.component';

@NgModule({
    declarations: [
        FriendsComponent,
        FriendsListComponent,
        FriendsMenuComponent,
        FriendsFindComponent,
        FriendsRequestComponent,
        FriendsItemComponent,
    ],
    imports: [CommonModule, RouterModule, FriendsRoutingModule, PartialModule],
})
export class FriendsModule {}
