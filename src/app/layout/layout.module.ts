import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { RouterModule, Routes } from '@angular/router';
import { NavigationComponent } from './components/navigation/navigation.component';
import { AsideComponent } from './components/aside/aside.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent
  }
]

@NgModule({
  declarations: [
    LayoutComponent,
    NavigationComponent,
    AsideComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class LayoutModule { }
