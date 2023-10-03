import { Routes } from '@angular/router';

const Routing: Routes = [
    {
        path: 'chat',
        loadChildren: () => import('./chat/chat.module').then((m) => m.ChatModule),
    },
    {
        path: 'home',
        loadChildren: () => import('./chat/chat.module').then((m) => m.ChatModule),
    }
];

export { Routing };