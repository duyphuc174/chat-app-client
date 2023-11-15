import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './chat.component';
import { ChatBoxComponent } from './components/chat-box/chat-box.component';

const routes: Routes = [
    {
        path: '',
        component: ChatComponent,
        children: [
            {
                path: 'messages/:id',
                component: ChatBoxComponent,
                data: { type: 'group' },
            },
            {
                path: 'messages/single/:id',
                component: ChatBoxComponent,
                data: { type: 'single' },
            },
        ],
    },
];

@NgModule({
    declarations: [],
    imports: [RouterModule.forChild(routes)],
})
export class ChatRoutingModule {}
