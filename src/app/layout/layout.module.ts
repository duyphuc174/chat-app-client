import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { RouterModule, Routes } from '@angular/router';
import { NavigationComponent } from './components/navigation/navigation.component';
import { AsideComponent } from './components/aside/aside.component';
import { Routing } from '../pages/routing';
import { HeaderComponent } from './components/header/header.component';
import { UserInnerComponent } from './components/user-inner/user-inner.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { PartialModule } from '../modules/partials/partial.module';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: Routing,
    },
];

@NgModule({
    declarations: [LayoutComponent, NavigationComponent, AsideComponent, HeaderComponent, UserInnerComponent],
    imports: [CommonModule, RouterModule.forChild(routes), NgbDropdownModule, PartialModule],
})
export class LayoutModule {}
