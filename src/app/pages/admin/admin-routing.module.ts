import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { UsersComponent } from './users/users.component';
import { ConversationsComponent } from './conversations/conversations.component';

const routes: Routes = [
    {
        path: '',
        component: AdminComponent,
        children: [
            {
                pathMatch: 'full',
                path: '',
                redirectTo: 'users',
            },
            {
                path: 'users',
                component: UsersComponent,
            },
            {
                path: 'conversations',
                component: ConversationsComponent,
            },
        ],
    },
];

@NgModule({
    declarations: [],
    imports: [RouterModule.forChild(routes)],
})
export class AdminRoutingModule {}
