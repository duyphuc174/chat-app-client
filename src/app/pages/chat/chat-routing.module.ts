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
            },
        ],
    },
];

@NgModule({
    declarations: [],
    imports: [RouterModule.forChild(routes)],
})
export class ChatRoutingModule {}
