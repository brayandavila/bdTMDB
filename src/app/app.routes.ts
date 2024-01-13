import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout/layout.component';

export const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        loadChildren: () => import('./pages/pages.routes').then(m => m.routes)
    },
    {
        path: '**',
        redirectTo: '/movie',
        pathMatch: 'full'
    },
];
