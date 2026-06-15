import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'board',
    pathMatch: 'full'
  },
  {
    path: 'board',
    loadComponent: () =>
      import('./features/kanban/kanban-board.component')
        .then(m => m.KanbanBoardComponent)
  },
  { path: '**', redirectTo: 'board' }
];