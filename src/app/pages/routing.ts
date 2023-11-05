import { Routes } from '@angular/router';

const Routing: Routes = [
    {
        path: '',
        redirectTo: 'chat',
        pathMatch: 'full'
    },
    {
        path: 'chat',
        loadChildren: () => import('./chat/chat.module').then((m) => m.ChatModule),
    },
    {
        path: 'home',
        loadChildren: () => import('./chat/chat.module').then((m) => m.ChatModule),
    },
    {
        path: 'profile',
        loadChildren: () => import('./profile/profile.module').then((m) => m.ProfileModule),
    }
];

export { Routing };