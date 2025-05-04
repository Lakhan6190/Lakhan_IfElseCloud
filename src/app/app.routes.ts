import { Routes } from '@angular/router';

export const routes: Routes = [
    
    { path: '', redirectTo: 'layout', pathMatch: 'full' },
    {
    path: 'layout',
    loadComponent: () =>
      import('../layout/layout/layout.component').then(m => m.LayoutComponent),
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('../pages/dashboard/dashboard.component').then(m => m.DashboardComponent),
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
    ],
  },
];
